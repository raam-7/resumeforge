import { PORTFOLIO_SYSTEM_PROMPT } from "./prompts";

export async function parseResumeWithOllama(
  resumeText: string
) {
  const response = await fetch(
    "http://localhost:11434/api/generate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen2.5:3b",
        stream: false,
        prompt: `
${PORTFOLIO_SYSTEM_PROMPT}

Resume Text:

${resumeText}
`,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Ollama request failed: ${response.status}`
    );
  }

  const result = await response.json();

  return result.response;
}