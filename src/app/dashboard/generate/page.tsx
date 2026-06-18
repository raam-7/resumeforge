"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GeneratePage() {
const [file, setFile] = useState<File | null>(null);
const [loading, setLoading] = useState(false);
const [result, setResult] = useState("");
const [template, setTemplate] = useState("developer");
  const router = useRouter();
async function handleGenerate() {
  if (!file) {
    alert("Please select a resume first.");
    return;
  }

  setLoading(true);
  setResult("");

  try {
const formData = new FormData();
formData.append("file", file);
formData.append("template", template);

    const response = await fetch(
      "/api/parse-resume",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (
      data.success &&
      data.slug
    ) {
      router.push(
        `/portfolio/${data.slug}`
      );

      return;
    }

    setResult(
      JSON.stringify(data, null, 2)
    );

  } catch (error) {
    console.error(error);

    setResult(
      JSON.stringify(
        {
          error: "Failed to generate portfolio",
        },
        null,
        2
      )
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">
        Generate Portfolio
      </h1>

      <p className="mt-2 text-gray-500">
        Upload your resume and let AI generate your portfolio.
      </p>

      <div className="mt-8 space-y-4">
        
        <select
  value={template}
  onChange={(e) => setTemplate(e.target.value)}
  className="border rounded px-3 py-2"
>
  <option value="developer">
    Developer Template
  </option>

  <option value="modern">
    Modern Template
  </option>

  <option value="corporate">
    Corporate Template
  </option>
</select>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) =>
            setFile(e.target.files?.[0] ?? null)
          }
        />
        

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="rounded border px-4 py-2"
        >
          {loading
            ? "Generating..."
            : "Generate Portfolio"}
        </button>
      </div>

      {result && (
        <pre className="mt-6 rounded border p-4 overflow-auto text-sm">
          {result}
        </pre>
      )}
    </main>
  );
}