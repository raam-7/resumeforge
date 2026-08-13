import { PORTFOLIO_SYSTEM_PROMPT } from "./prompts";

export async function parseResumeWithOllama(
  resumeText: string
) {
  const prompt = `
${PORTFOLIO_SYSTEM_PROMPT}

IMPORTANT:

You MUST return the complete resume analysis as JSON.

The "professionalProfile" object is REQUIRED.

You MUST determine the professional profile from the complete resume.

Do not assume the candidate is a software engineer.

Do not use a generic "Professional" title when the resume clearly identifies a profession or specialization.

The professionalProfile must contain:

{
  "title": "",
  "domain": "",
  "specializations": [],
  "seniority": "",
  "evidence": []
}

The title, domain, specializations, seniority, and evidence must be based on information actually present in the resume.

Return ONLY the JSON object.

Do not return:
- reasoning
- thinking
- explanations
- markdown
- code fences
- text before or after the JSON

Resume Text:

${resumeText}
`;

  const response = await fetch(
    "http://localhost:11434/api/generate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen3:4b",
        stream: false,

        // Important for structured JSON extraction
        think: false,

        // Ask Ollama for valid JSON
        format: "json",

        prompt,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Ollama request failed: ${response.status}`
    );
  }

  const result = await response.json();

  console.log(
    "[ollama] response:",
    result.response
  );

  if (!result.response) {
    throw new Error(
      "Ollama returned an empty response."
    );
  }

  return result.response;
}