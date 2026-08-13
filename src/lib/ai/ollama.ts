const OLLAMA_URL = "http://localhost:11434/api/generate";
const MODEL = "qwen3:4b";

export async function generateWithOllama(
  prompt: string
): Promise<string> {
  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      stream: false,

      // Force structured JSON output
      format: "json",

      // Disable Qwen thinking for this extraction task
      think: false,

      options: {
        temperature: 0,
        num_predict: 4000,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Ollama request failed: ${response.status} ${errorText}`
    );
  }

  const data = await response.json();

  if (!data.response) {
    throw new Error("Ollama returned an empty response.");
  }

  return data.response.trim();
}