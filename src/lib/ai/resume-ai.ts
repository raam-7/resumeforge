import { generateWithOllama } from "./ollama";

export interface ParsedResume {
  personal: {
    name: string | null;
    email: string | null;
    phone: string | null;
    location: string | null;
    linkedin: string | null;
    github: string | null;
  };

  summary: string | null;

  skills: string[];

  education: {
    degree: string | null;
    institution: string | null;
    location: string | null;
    startDate: string | null;
    endDate: string | null;
    grade: string | null;
  }[];

  experience: {
    company: string | null;
    role: string | null;
    location: string | null;
    startDate: string | null;
    endDate: string | null;
    description: string[];
  }[];

  projects: {
    title: string | null;
    description: string[];
    technologies: string[];
    url: string | null;
  }[];

  certifications: string[];

  achievements: string[];

  languages: string[];

  interests: string[];
}

function cleanAIResponse(response: string): string {
  let cleaned = response.trim();

  // Remove Qwen thinking/reasoning section.
  cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

  // Remove Markdown code fences if the model adds them.
  cleaned = cleaned
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  // Find the JSON object if the model added extra text.
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace !== -1) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  return cleaned;
}

export async function parseResumeWithAI(
  resumeText: string
): Promise<ParsedResume> {
  if (!resumeText.trim()) {
    throw new Error("Resume text is empty.");
  }

  const prompt = `
You are a resume parsing system.

Extract information from the resume below.

Return ONLY one valid JSON object.

Do not return:
- explanations
- Markdown
- code fences
- reasoning
- <think> tags

Do not invent information.

If information is missing:
- use null for single values
- use [] for arrays

Use exactly this structure:

{
  "personal": {
    "name": null,
    "email": null,
    "phone": null,
    "location": null,
    "linkedin": null,
    "github": null
  },
  "summary": null,
  "skills": [],
  "education": [
    {
      "degree": null,
      "institution": null,
      "location": null,
      "startDate": null,
      "endDate": null,
      "grade": null
    }
  ],
  "experience": [
    {
      "company": null,
      "role": null,
      "location": null,
      "startDate": null,
      "endDate": null,
      "description": []
    }
  ],
  "projects": [
    {
      "title": null,
      "description": [],
      "technologies": [],
      "url": null
    }
  ],
  "certifications": [],
  "achievements": [],
  "languages": [],
  "interests": []
}

RESUME TEXT:

${resumeText}
`;

 const response = await generateWithOllama(prompt);

console.log("Ollama structured response:");
console.log(response);

const cleaned = response.trim();

  try {
    const parsed = JSON.parse(cleaned) as ParsedResume;

    return parsed;
  } catch (error) {
    console.error("AI JSON parsing failed.");
    console.error("Cleaned response:", cleaned);

    throw new Error(
      "Ollama returned invalid JSON."
    );
  }
}