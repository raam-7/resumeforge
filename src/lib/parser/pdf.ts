import pdfParse from "pdf-parse";

export async function parsePDF(buffer: Buffer): Promise<string> {
  console.info(`[resume-parser] PDF parser started (${buffer.length} bytes)`);

  try {
    const data = await pdfParse(buffer);
    const text = data.text.trim();

    console.info(`[resume-parser] PDF parser completed (${text.length} characters)`);
    return text;
  } catch (error) {
    console.error("[resume-parser] PDF parsing failed:", error);
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to parse PDF: ${message}`);
  }
}
