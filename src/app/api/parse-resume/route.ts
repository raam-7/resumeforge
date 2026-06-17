import { NextResponse } from "next/server";

import { extractResumeText } from "@/lib/resume/extract";
import { parseResumeWithOllama } from "@/lib/ollama/parser";
import { validatePortfolioData } from "@/lib/ollama/validate";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

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

    // Step 1: Extract text
    const resumeText = await extractResumeText(file);

    // Step 2: Send to Ollama
    const aiResponse = await parseResumeWithOllama(
      resumeText
    );

    // Step 3: Parse JSON
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

    // Step 4: Validate structure
    const portfolioData =
      validatePortfolioData(parsedData);

    return NextResponse.json({
      success: true,
      portfolioData,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Resume parsing failed",
      },
      {
        status: 500,
      }
    );
  }
}