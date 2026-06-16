import { NextResponse } from "next/server";
import { extractResumeText } from "@/lib/resume/extract";

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
        { error: "Only PDF and DOCX files are allowed" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File exceeds 5 MB limit" },
        { status: 400 }
      );
    }

    const text = await extractResumeText(file);

    return NextResponse.json({
      success: true,
      fileName: file.name,
      extractedCharacters: text.length,
      preview: text.slice(0, 500),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to extract resume text",
      },
      { status: 500 }
    );
  }
}