import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

export async function extractResumeText(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());

  if (file.type === "application/pdf") {
    const parser = new PDFParse({ data: buffer });

    try {
      const pdf = await parser.getText();

      return pdf.text;
    } finally {
      await parser.destroy();
    }
  }

  if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({
      buffer,
    });

    return result.value;
  }

  throw new Error("Unsupported file type");
}
