"use client";

import { useState } from "react";

export default function GeneratePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

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

      const response = await fetch(
        "/api/parse-resume",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

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