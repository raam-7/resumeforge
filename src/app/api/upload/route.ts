import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { parseResume } from "@/lib/parser/resume-parser";

export async function POST(request: NextRequest) {
  let resumeId: string | undefined;

  try {
    // Check authentication
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find user
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

    // Read uploaded file
    const formData = await request.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Validate type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only PDF and Word files are allowed." },
        { status: 400 }
      );
    }

    // Validate size (10 MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Maximum file size is 10MB." },
        { status: 400 }
      );
    }

    // Create uploads directory
    const uploadDir = path.join(
      process.cwd(),
      "uploads",
      "resumes"
    );

    await mkdir(uploadDir, { recursive: true });

    // Generate filename
    const extension = path.extname(file.name);

    const filename = `${randomUUID()}${extension}`;

    const filepath = path.join(uploadDir, filename);

    // Read uploaded file and save it.
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Create the initial database record.
    const resume = await prisma.resume.create({
      data: {
        filename,
        originalName: file.name,
        fileType: file.type,
        fileSize: file.size,
        filePath: filepath,
        status: "UPLOADED",
        userId: user.id,
      },
    });
    resumeId = resume.id;

    console.info(`[upload] Resume ${resumeId} saved; starting parsing`);

    // Persist the in-progress state before any parser work starts.
    await prisma.resume.update({
      where: { id: resume.id },
      data: { status: "PARSING" },
    });

    const extractedText = await parseResume(buffer, file.type);

    console.info(
      `[upload] Resume ${resumeId} parsed successfully (${extractedText.length} characters)`
    );

    const updatedResume = await prisma.resume.update({
      where: { id: resume.id },
      data: {
        extractedText,
        status: "PARSED",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Resume uploaded and parsed successfully.",
      resume: updatedResume,
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(
      `[upload] Resume upload/parsing failed${resumeId ? ` for ${resumeId}` : ""}:`,
      error
    );

    if (resumeId) {
      try {
        await prisma.resume.update({
          where: { id: resumeId },
          data: { status: "FAILED" },
        });
        console.info(`[upload] Resume ${resumeId} marked as FAILED`);
      } catch (statusError) {
        console.error(
          `[upload] Could not mark Resume ${resumeId} as FAILED:`,
          statusError
        );
      }
    }

    return NextResponse.json(
      {
        error: message || "Resume upload or parsing failed.",
        resumeId,
      },
      {
        status: 422,
      }
    );
  }
}
