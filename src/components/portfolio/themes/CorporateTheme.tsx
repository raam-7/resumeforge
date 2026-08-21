"use client";

import type { ThemeProps } from "./theme-types";

export default function CorporateTheme({
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

  return (
    <main className="min-h-screen bg-white text-slate-900">

      <header className="border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-20">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Professional Portfolio
          </p>

          <h1 className="mt-5 text-5xl font-bold md:text-6xl">
            {name}
          </h1>

          <p className="mt-5 text-2xl text-slate-600">
            {title}
          </p>

          {domain && (
            <p className="mt-2 font-medium text-slate-500">
              {domain}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-500">

            {personal.email && (
              <span>{personal.email}</span>
            )}

            {personal.phone && (
              <span>{personal.phone}</span>
            )}

            {personal.location && (
              <span>{personal.location}</span>
            )}

          </div>

        </div>
      </header>

      {data?.summary && (
        <section className="mx-auto max-w-6xl px-6 py-16">

          <h2 className="text-2xl font-bold">
            Executive Summary
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-slate-600">
            {data.summary}
          </p>

        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 pb-20">

        <div className="grid gap-6 md:grid-cols-2">

          {Array.isArray(data?.experience) &&
            data.experience.length > 0 && (
              <div className="rounded-xl border border-slate-200 p-6">

                <h2 className="text-2xl font-bold">
                  Experience
                </h2>

                <div className="mt-6 space-y-6">

                  {data.experience.map(
                    (
                      experience: Record<
                        string,
                        unknown
                      >,
                      index: number
                    ) => (
                      <div key={index}>

                        <h3 className="font-semibold">
                          {typeof experience.role ===
                          "string"
                            ? experience.role
                            : "Professional Role"}
                        </h3>

                        {typeof experience.company ===
                          "string" && (
                          <p className="mt-1 text-sm text-slate-500">
                            {experience.company}
                          </p>
                        )}

                      </div>
                    )
                  )}

                </div>

              </div>
            )}

          {Array.isArray(data?.education) &&
            data.education.length > 0 && (
              <div className="rounded-xl border border-slate-200 p-6">

                <h2 className="text-2xl font-bold">
                  Education
                </h2>

                <div className="mt-6 space-y-5">

                  {data.education.map(
                    (
                      education: Record<
                        string,
                        unknown
                      >,
                      index: number
                    ) => (
                      <div key={index}>

                        <h3 className="font-semibold">
                          {typeof education.degree ===
                          "string"
                            ? education.degree
                            : "Education"}
                        </h3>

                        {typeof education.institution ===
                          "string" && (
                          <p className="mt-1 text-sm text-slate-500">
                            {education.institution}
                          </p>
                        )}

                      </div>
                    )
                  )}

                </div>

              </div>
            )}

        </div>

      </section>

      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-500">
          © {new Date().getFullYear()} {name}
        </div>
      </footer>

    </main>
  );
}
