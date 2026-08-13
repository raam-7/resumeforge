"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GeneratePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [template, setTemplate] = useState("developer");

  const router = useRouter();

  async function handleGenerate() {
    setLoading(true);
    setResult("");

    try {
   const response = await fetch(
  "/api/generate-portfolio",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      template,
    }),
  }
);

      const data = await response.json();

      if (!response.ok) {
        setResult(
          JSON.stringify(
            {
              error:
                data.error || "Failed to generate portfolio.",
            },
            null,
            2
          )
        );

        return;
      }

      if (data.success && data.portfolio?.slug) {
        router.push(
          `/portfolio/${data.portfolio.slug}`
        );

        return;
      }

      setResult(
        JSON.stringify(data, null, 2)
      );
    } catch (error) {
      console.error(
        "Portfolio generation error:",
        error
      );

      setResult(
        JSON.stringify(
          {
            error:
              "Something went wrong while generating the portfolio.",
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
    <main className="min-h-screen bg-black text-white p-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div>
          <p className="text-sm font-medium text-cyan-400">
            ResumeForge AI
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Generate Portfolio
          </h1>

          <p className="mt-3 max-w-2xl text-zinc-400">
            Your resume has already been analyzed by AI.
            Choose a portfolio template and generate your
            personal portfolio website.
          </p>
        </div>

        {/* Main Card */}
        <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

          {/* Resume Status */}
          <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                ✓
              </div>

              <div>
                <h2 className="font-semibold text-green-400">
                  Resume AI Analysis Complete
                </h2>

                <p className="mt-1 text-sm text-zinc-400">
                  Your structured resume data is ready
                  to generate a portfolio.
                </p>
              </div>
            </div>
          </div>

          {/* Template Selection */}
          <div className="mt-8">
            <label
              htmlFor="template"
              className="block text-sm font-medium text-zinc-300"
            >
              Choose Portfolio Template
            </label>

            <select
              id="template"
              value={template}
              onChange={(event) =>
                setTemplate(event.target.value)
              }
              disabled={loading}
              className="mt-3 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
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

              <option value="ai">
                AI Neon
              </option>
            </select>
          </div>

          {/* Selected Template */}
          <div className="mt-6 rounded-2xl border border-zinc-800 bg-black/50 p-5">
            <p className="text-sm text-zinc-500">
              Selected template
            </p>

            <p className="mt-1 text-lg font-semibold capitalize text-cyan-400">
              {template}
            </p>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 font-semibold text-black transition hover:scale-[1.01] hover:from-cyan-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Generating Portfolio..."
              : "Generate Portfolio"}
          </button>

          {/* Loading */}
          {loading && (
            <div className="mt-6 text-center">
              <p className="text-sm text-zinc-400">
                Creating your portfolio...
              </p>

              <p className="mt-1 text-xs text-zinc-600">
                This may take a few seconds.
              </p>
            </div>
          )}

          {/* Error / Result */}
          {result && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-red-400">
                Generation Result
              </p>

              <pre className="max-h-96 overflow-auto rounded-xl border border-red-500/20 bg-black p-4 text-sm text-zinc-300">
                {result}
              </pre>
            </div>
          )}
        </div>

        {/* Process */}
        <div className="mt-8 grid gap-4 md:grid-cols-4">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-xs text-zinc-500">
              STEP 01
            </p>

            <p className="mt-2 font-semibold">
              Resume
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Resume uploaded
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-xs text-zinc-500">
              STEP 02
            </p>

            <p className="mt-2 font-semibold">
              AI Analysis
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Resume structured
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-xs text-zinc-500">
              STEP 03
            </p>

            <p className="mt-2 font-semibold">
              Template
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              {template}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-xs text-zinc-500">
              STEP 04
            </p>

            <p className="mt-2 font-semibold">
              Portfolio
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Ready to publish
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}