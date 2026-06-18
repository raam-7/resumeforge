import { NextResponse } from "next/server";
import { repairPortfolioData } from "@/lib/ollama/repair";
import { extractResumeText } from "@/lib/resume/extract";
import { parseResumeWithOllama } from "@/lib/ollama/parser";
import { validatePortfolioData } from "@/lib/ollama/validate";
import { parseSkillsWithOllama } from "@/lib/ollama/skills-parser";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/portfolio/generateSlug";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const template =
  formData.get("template")?.toString() ||
  "developer";

    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Only PDF and DOCX files are allowed",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "File exceeds 5MB limit",
        },
        { status: 400 }
      );
    }

    // Extract resume text
    const resumeText = await extractResumeText(file);

    // Parse portfolio
    const aiResponse = await parseResumeWithOllama(
      resumeText
    );

    let parsedData;

    try {
      parsedData = JSON.parse(aiResponse);
    } catch {
      return NextResponse.json(
        {
          error: "AI returned invalid JSON",
          rawResponse: aiResponse,
        },
        {
          status: 500,
        }
      );
    }

    // Validate + Repair
    const portfolioData =
      repairPortfolioData(
        validatePortfolioData(parsedData)
      );

    // Extract skills separately
    const extractedSkills =
      await parseSkillsWithOllama(
        resumeText.slice(0, 1500)
      );

    if (
      Array.isArray(extractedSkills) &&
      extractedSkills.length > 0
    ) {
      portfolioData.skills =
        extractedSkills;
    }

    const fullName =
      portfolioData.personalInfo.fullName ||
      "portfolio";

    // Generate unique slug
    const baseSlug =
      generateSlug(fullName);

    let slug = baseSlug;
    let counter = 1;

    while (
      await prisma.portfolio.findUnique({
        where: { slug },
      })
    ) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // TEMP user id
    const userId =
      "cmqgwvi7h0000f8ucupr7jvk8";
const portfolio =
  await prisma.portfolio.create({
    data: {
      title: `${fullName} Portfolio`,
      slug,
      template,
      data: portfolioData,
      userId,
    },
  });

    return NextResponse.json({
      success: true,
      slug: portfolio.slug,
      portfolioId: portfolio.id,
      portfolioData,
    });
  } catch (error) {
    console.error(error);
return NextResponse.json(
  {
    error: "Resume parsing failed",
    details:
      error instanceof Error
        ? error.message
        : String(error),
  },
  {
    status: 500,
  }
);
  }
}