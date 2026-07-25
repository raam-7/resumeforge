import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
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

    // Save file
    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    await writeFile(filepath, buffer);

    // Save metadata to database
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

    return NextResponse.json({
      success: true,
      resume,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}