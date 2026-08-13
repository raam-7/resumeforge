import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    // 1. Check authentication
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Find the logged-in user
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // 3. Find the latest AI-parsed resume
    const resume = await prisma.resume.findFirst({
      where: {
        userId: user.id,
        status: "AI_PARSED",
        parsedData: {
          not: null,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!resume || !resume.parsedData) {
      return NextResponse.json(
        {
          error:
            "No AI-parsed resume found. Please upload and analyze a resume first.",
        },
        { status: 404 }
      );
    }

    // 4. Extract the AI-generated resume data
    const parsedData = resume.parsedData as Record<string, unknown>;

    const personal = parsedData.personal as
      | Record<string, unknown>
      | undefined;

    // 5. Generate portfolio title
    const name =
      typeof personal?.name === "string"
        ? personal.name
        : "My Portfolio";

    const title = `${name} - Portfolio`;

    // 6. Generate unique slug
    const baseSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    let slug = baseSlug || `portfolio-${Date.now()}`;

    const existingPortfolio = await prisma.portfolio.findUnique({
      where: {
        slug,
      },
    });

    if (existingPortfolio) {
      slug = `${slug}-${Date.now()}`;
    }

    // 7. Create portfolio
    const portfolio = await prisma.portfolio.create({
      data: {
        title,
        slug,
        template: "developer",
        data: parsedData,
        published: false,
        userId: user.id,
      },
    });

    // 8. Return portfolio information
    return NextResponse.json({
      success: true,
      message: "Portfolio generated successfully.",
      portfolio: {
        id: portfolio.id,
        title: portfolio.title,
        slug: portfolio.slug,
        published: portfolio.published,
        url: `/portfolio/${portfolio.slug}`,
      },
    });
  } catch (error) {
    console.error("Portfolio generation failed:", error);

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