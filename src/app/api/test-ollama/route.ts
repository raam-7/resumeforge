import { NextResponse } from "next/server";
import { parseResumeWithOllama } from "@/lib/ollama/parser";

export async function GET() {
  const result = await parseResumeWithOllama(`
Name: Raam Bhanushali
Skills: React, Node.js, Python
`);

  return NextResponse.json({
    response: result,
  });
}