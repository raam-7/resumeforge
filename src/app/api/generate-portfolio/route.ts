import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { parseResumeWithOllama } from "@/lib/ollama/parser";
import { validatePortfolioData } from "@/lib/ollama/validate";
import { repairPortfolioData } from "@/lib/ollama/repair";

export async function POST(request: Request) {
  try {
    // --------------------------------------------------
    // 1. Authentication
    // --------------------------------------------------

    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // --------------------------------------------------
    // 2. Find logged-in user
    // --------------------------------------------------

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found.",
        },
        { status: 404 }
      );
    }

    // --------------------------------------------------
    // 3. Read template from request
    // --------------------------------------------------

    let template = "developer";

    try {
      const body = await request.json();

      if (
        body &&
        typeof body.template === "string" &&
        body.template.trim()
      ) {
        template = body.template.trim();
      }
    } catch {
      // Request may have no JSON body.
      // Keep developer as fallback.
    }

    // --------------------------------------------------
    // 4. Find latest resume belonging to THIS user
    // --------------------------------------------------

    const resume = await prisma.resume.findFirst({
      where: {
        userId: user.id,
        parsedData: {
          not: Prisma.JsonNull,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!resume) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No parsed resume found. Please upload and analyze your resume first.",
        },
        { status: 404 }
      );
    }

    // --------------------------------------------------
    // 5. Get existing parsed data
    // --------------------------------------------------

    let parsedData =
      (resume.parsedData as Record<string, any>) || {};

    // --------------------------------------------------
    // 6. Ensure professionalProfile exists
    //
    // If an older resume was parsed before we introduced
    // professionalProfile, re-run the AI parser using the
    // extracted resume text.
    // --------------------------------------------------

    const hasProfessionalProfile =
      parsedData.professionalProfile &&
      typeof parsedData.professionalProfile === "object" &&
      typeof parsedData.professionalProfile.title ===
        "string" &&
      parsedData.professionalProfile.title.trim() !== "";

    if (
      !hasProfessionalProfile &&
      resume.extractedText
    ) {
      console.log(
        "[generate-portfolio] professionalProfile missing."
      );

      console.log(
        "[generate-portfolio] Re-running AI analysis..."
      );

      const aiResponse =
        await parseResumeWithOllama(
          resume.extractedText
        );

      try {
        parsedData = JSON.parse(aiResponse);
      } catch (error) {
        console.error(
          "[generate-portfolio] Invalid AI JSON:",
          aiResponse
        );

        return NextResponse.json(
          {
            success: false,
            error:
              "AI returned invalid resume JSON.",
          },
          { status: 500 }
        );
      }
    }

    // --------------------------------------------------
    // 7. Validate + repair AI data
    // --------------------------------------------------

    const portfolioData =
      repairPortfolioData(
        validatePortfolioData(parsedData)
      );

    console.log(
      "========== PROFESSIONAL PROFILE =========="
    );

    console.log(
      JSON.stringify(
        portfolioData.professionalProfile,
        null,
        2
      )
    );

    // --------------------------------------------------
    // 8. Determine candidate name
    //
    // Support both old and new structures.
    // --------------------------------------------------
const fullName =
  portfolioData.personalInfo?.fullName?.trim() ||
  parsedData?.personalInfo?.fullName?.trim?.() ||
  parsedData?.personalInfo?.full_name?.trim?.() ||
  parsedData?.personalInfo?.name?.trim?.() ||
  parsedData?.personalInfo?.candidateName?.trim?.() ||
  parsedData?.personal?.fullName?.trim?.() ||
  parsedData?.personal?.full_name?.trim?.() ||
  parsedData?.personal?.name?.trim?.() ||
  parsedData?.personal?.candidateName?.trim?.() ||
  "My Portfolio";

    // --------------------------------------------------
    // 9. Generate unique slug
    // --------------------------------------------------

    const baseSlug =
      fullName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") ||
      `portfolio-${Date.now()}`;

    let slug = baseSlug;
    let counter = 1;

    while (
      await prisma.portfolio.findUnique({
        where: {
          slug,
        },
      })
    ) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // --------------------------------------------------
    // 10. Create portfolio for CURRENT USER
    // --------------------------------------------------

    const portfolio =
      await prisma.portfolio.create({
        data: {
          title: `${fullName} - Portfolio`,
          slug,
          template,
          data: JSON.parse(JSON.stringify(portfolioData)),
          published: false,
          userId: user.id,
        },
      });

    // --------------------------------------------------
    // 11. Return result
    // --------------------------------------------------

    return NextResponse.json({
      success: true,
      message:
        "Portfolio generated successfully.",

      portfolio: {
        id: portfolio.id,
        title: portfolio.title,
        slug: portfolio.slug,
        template: portfolio.template,
        published: portfolio.published,
        url: `/portfolio/${portfolio.slug}`,
      },

      professionalProfile:
        portfolioData.professionalProfile,
    });
  } catch (error) {
    console.error(
      "Portfolio generation failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Portfolio generation failed.",
      },
      { status: 500 }
    );
  }
}
