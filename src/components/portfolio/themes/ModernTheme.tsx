"use client";

import type { ThemeProps } from "./theme-types";

export default function ModernTheme({
  data,
}: ThemeProps) {
  const personal = data?.personalInfo ?? data?.personal ?? {};

  const professional = data?.professionalProfile ?? {};

  const name =
    personal.fullName ||
    personal.name ||
    "My Portfolio";

  const title =
    professional.title ||
    "Professional";

  const domain =
    professional.domain ||
    "";

  const skills = Array.isArray(data?.skills)
    ? data.skills
    : [];

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-24">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
            Portfolio
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">
            {name}
          </h1>

          <p className="mt-6 text-2xl font-medium text-zinc-600">
            {title}
          </p>

          {domain && (
            <p className="mt-2 text-indigo-600">
              {domain}
            </p>
          )}

          {personal.email && (
            <p className="mt-8 text-zinc-500">
              {personal.email}
            </p>
          )}

        </div>
      </section>

      {data?.summary && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-bold">
            About
          </h2>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-zinc-600">
            {data.summary}
          </p>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <h2 className="text-3xl font-bold">
            Skills
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {skills.map(
              (
                skill: unknown,
                index: number
              ) => {
                const skillName =
                  typeof skill === "string"
                    ? skill
                    : typeof skill === "object" &&
                        skill !== null &&
                        "name" in skill &&
                        typeof skill.name ===
                          "string"
                      ? skill.name
                      : "";

                if (!skillName) {
                  return null;
                }

                return (
                  <span
                    key={`${skillName}-${index}`}
                    className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm shadow-sm"
                  >
                    {skillName}
                  </span>
                );
              }
            )}
          </div>
        </section>
      )}

      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-zinc-500">
          © {new Date().getFullYear()} {name}
        </div>
      </footer>

    </main>
  );
}
