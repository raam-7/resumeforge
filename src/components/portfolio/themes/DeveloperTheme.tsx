"use client";

import type { ThemeProps } from "./theme-types";

type SkillItem =
  | string
  | {
      name?: string | null;
      category?: string | null;
    };

type ExperienceItem = {
  role?: string | null;
  title?: string | null;
  company?: string | null;
  location?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  description?: string | string[] | null;
};

type ProjectItem = {
  title?: string | null;
  name?: string | null;
  description?: string | string[] | null;
  technologies?: string[] | null;
  githubUrl?: string | null;
  liveUrl?: string | null;
  url?: string | null;
};

type EducationItem = {
  degree?: string | null;
  institution?: string | null;
  location?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  grade?: string | null;
};

type PersonalInfo = {
  fullName?: string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  linkedin?: string | null;
  linkedIn?: string | null;
  github?: string | null;
  website?: string | null;
};

type ProfessionalProfile = {
  title?: string | null;
  domain?: string | null;
  specializations?: string[] | null;
  seniority?: string | null;
};

type DeveloperThemeData = {
  personalInfo?: PersonalInfo;
  personal?: PersonalInfo;

  professionalProfile?: ProfessionalProfile;

  summary?: string | null;

  skills?: SkillItem[];

  experience?: ExperienceItem[];

  projects?: ProjectItem[];

  education?: EducationItem[];
};

export default function DeveloperTheme({
  data,
}: ThemeProps) {
  /*
   * ---------------------------------------------
   * Normalize incoming data
   * ---------------------------------------------
   */

  const resumeData =
    data as DeveloperThemeData;

  const personal =
    resumeData.personalInfo ??
    resumeData.personal ??
    {};

  const professional =
    resumeData.professionalProfile ??
    {};

  /*
   * ---------------------------------------------
   * Candidate information
   * ---------------------------------------------
   */

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

  const specializations =
    Array.isArray(
      professional.specializations
    )
      ? professional.specializations
      : [];

  /*
   * ---------------------------------------------
   * Resume sections
   * ---------------------------------------------
   */

  const skills =
    Array.isArray(resumeData.skills)
      ? resumeData.skills
      : [];

  const experience =
    Array.isArray(resumeData.experience)
      ? resumeData.experience
      : [];

  const projects =
    Array.isArray(resumeData.projects)
      ? resumeData.projects
      : [];

  const education =
    Array.isArray(resumeData.education)
      ? resumeData.education
      : [];

  /*
   * ---------------------------------------------
   * Helper: Skill name
   * ---------------------------------------------
   */

  function getSkillName(
    skill: SkillItem
  ): string {
    if (typeof skill === "string") {
      return skill;
    }

    return skill.name || "";
  }

  /*
   * ---------------------------------------------
   * Helper: Description
   * ---------------------------------------------
   */

  function getDescription(
    description:
      | string
      | string[]
      | null
      | undefined
  ): string[] {
    if (Array.isArray(description)) {
      return description;
    }

    if (typeof description === "string") {
      return [description];
    }

    return [];
  }

  /*
   * ---------------------------------------------
   * UI
   * ---------------------------------------------
   */

  return (
    <main className="min-h-screen bg-black text-white">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="border-b border-zinc-800">

        <div className="mx-auto max-w-6xl px-6 py-24">

          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Portfolio
          </p>

          <h1 className="mt-4 text-5xl font-extrabold tracking-tight md:text-7xl">
            {name}
          </h1>

          <div className="mt-6">

            <p className="text-2xl font-medium text-zinc-300">
              {title}
            </p>

            {domain && (
              <p className="mt-2 text-cyan-400">
                {domain}
              </p>
            )}

            {specializations.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">

                {specializations.map(
                  (
                    specialization,
                    index
                  ) => (
                    <span
                      key={`${specialization}-${index}`}
                      className="rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-2 text-sm text-cyan-300"
                    >
                      {specialization}
                    </span>
                  )
                )}

              </div>
            )}

          </div>

          {/* CONTACT */}

          <div className="mt-8 flex flex-wrap gap-3">

            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="rounded-full border border-zinc-700 px-5 py-2 text-sm transition hover:border-cyan-400 hover:text-cyan-400"
              >
                {personal.email}
              </a>
            )}

            {personal.phone && (
              <a
                href={`tel:${personal.phone}`}
                className="rounded-full border border-zinc-700 px-5 py-2 text-sm transition hover:border-cyan-400 hover:text-cyan-400"
              >
                {personal.phone}
              </a>
            )}

            {personal.location && (
              <span className="rounded-full border border-zinc-700 px-5 py-2 text-sm">
                📍 {personal.location}
              </span>
            )}

          </div>

          {/* SOCIAL LINKS */}

          <div className="mt-6 flex flex-wrap gap-3">

            {(personal.linkedin ||
              personal.linkedIn) && (
              <a
                href={
                  personal.linkedin ||
                  personal.linkedIn ||
                  ""
                }
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-semibold transition hover:border-cyan-400 hover:text-cyan-400"
              >
                LinkedIn
              </a>
            )}

            {personal.github && (
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-semibold transition hover:border-cyan-400 hover:text-cyan-400"
              >
                GitHub
              </a>
            )}

            {personal.website && (
              <a
                href={personal.website}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-semibold transition hover:border-cyan-400 hover:text-cyan-400"
              >
                Website
              </a>
            )}

          </div>

        </div>

      </section>

      {/* =========================================
          SUMMARY
      ========================================= */}

      {resumeData.summary && (
        <section className="mx-auto max-w-6xl px-6 py-16">

          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
            About
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Professional Summary
          </h2>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-zinc-400">
            {resumeData.summary}
          </p>

        </section>
      )}

      {/* =========================================
          SKILLS
      ========================================= */}

      {skills.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-16">

          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
            Expertise
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Skills
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">

            {skills.map(
              (skill, index) => {

                const skillName =
                  getSkillName(skill);

                if (!skillName) {
                  return null;
                }

                return (
                  <span
                    key={`${skillName}-${index}`}
                    className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition hover:border-cyan-400 hover:text-cyan-300"
                  >
                    {skillName}
                  </span>
                );
              }
            )}

          </div>

        </section>
      )}

      {/* =========================================
          EXPERIENCE
      ========================================= */}

      {experience.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-16">

          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
            Career
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Experience
          </h2>

          <div className="mt-8 space-y-6">

            {experience.map(
              (item, index) => {

                const descriptions =
                  getDescription(
                    item.description
                  );

                return (
                  <article
                    key={index}
                    className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-cyan-500/30"
                  >

                    <div className="flex flex-col justify-between gap-3 md:flex-row">

                      <div>

                        <h3 className="text-xl font-semibold">
                          {item.role ||
                            item.title ||
                            "Professional Role"}
                        </h3>

                        {item.company && (
                          <p className="mt-1 text-cyan-400">
                            {item.company}
                          </p>
                        )}

                        {item.location && (
                          <p className="mt-1 text-sm text-zinc-500">
                            {item.location}
                          </p>
                        )}

                      </div>

                      {(item.startDate ||
                        item.endDate) && (
                        <p className="text-sm text-zinc-500">
                          {item.startDate ||
                            "—"}{" "}
                          —{" "}
                          {item.endDate ||
                            "Present"}
                        </p>
                      )}

                    </div>

                    {descriptions.length > 0 && (
                      <ul className="mt-5 space-y-2">

                        {descriptions.map(
                          (
                            description,
                            descriptionIndex
                          ) => (
                            <li
                              key={
                                descriptionIndex
                              }
                              className="text-zinc-400"
                            >
                              • {description}
                            </li>
                          )
                        )}

                      </ul>
                    )}

                  </article>
                );
              }
            )}

          </div>

        </section>
      )}

      {/* =========================================
          PROJECTS
      ========================================= */}

      {projects.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-16">

          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
            Featured Work
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Projects
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            {projects.map(
              (project, index) => {

                const descriptions =
                  getDescription(
                    project.description
                  );

                return (
                  <article
                    key={index}
                    className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition hover:-translate-y-1 hover:border-cyan-500/40"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <h3 className="text-xl font-semibold">
                        {project.title ||
                          project.name ||
                          "Project"}
                      </h3>

                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-cyan-400 hover:underline"
                        >
                          View ↗
                        </a>
                      )}

                    </div>

                    {descriptions.length > 0 && (
                      <ul className="mt-4 space-y-2">

                        {descriptions.map(
                          (
                            description,
                            descriptionIndex
                          ) => (
                            <li
                              key={
                                descriptionIndex
                              }
                              className="text-zinc-400"
                            >
                              {description}
                            </li>
                          )
                        )}

                      </ul>
                    )}

                    {Array.isArray(
                      project.technologies
                    ) &&
                      project.technologies.length >
                        0 && (
                        <div className="mt-5 flex flex-wrap gap-2">

                          {project.technologies.map(
                            (
                              technology,
                              technologyIndex
                            ) => (
                              <span
                                key={`${technology}-${technologyIndex}`}
                                className="rounded bg-zinc-800 px-3 py-1 text-xs text-zinc-300"
                              >
                                {technology}
                              </span>
                            )
                          )}

                        </div>
                      )}

                    <div className="mt-5 flex flex-wrap gap-4">

                      {project.githubUrl && (
                        <a
                          href={
                            project.githubUrl
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-zinc-400 hover:text-cyan-400"
                        >
                          GitHub ↗
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={
                            project.liveUrl
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-zinc-400 hover:text-cyan-400"
                        >
                          Live Demo ↗
                        </a>
                      )}

                    </div>

                  </article>
                );
              }
            )}

          </div>

        </section>
      )}

      {/* =========================================
          EDUCATION
      ========================================= */}

      {education.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-20">

          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
            Academic Background
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Education
          </h2>

          <div className="mt-8 space-y-5">

            {education.map(
              (item, index) => (
                <article
                  key={index}
                  className="rounded-2xl border border-zinc-800 p-6"
                >

                  <div className="flex flex-col justify-between gap-4 md:flex-row">

                    <div>

                      <h3 className="text-xl font-semibold">
                        {item.degree ||
                          "Education"}
                      </h3>

                      {item.institution && (
                        <p className="mt-2 text-cyan-400">
                          {item.institution}
                        </p>
                      )}

                      {item.location && (
                        <p className="mt-1 text-sm text-zinc-500">
                          {item.location}
                        </p>
                      )}

                    </div>

                    <div className="text-sm text-zinc-500">

                      {(item.startDate ||
                        item.endDate) && (
                        <p>
                          {item.startDate ||
                            "—"}{" "}
                          —{" "}
                          {item.endDate ||
                            "Present"}
                        </p>
                      )}

                      {item.grade && (
                        <p className="mt-2">
                          Grade: {item.grade}
                        </p>
                      )}

                    </div>

                  </div>

                </article>
              )
            )}

          </div>

        </section>
      )}

      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="border-t border-zinc-800 py-8">

        <div className="mx-auto max-w-6xl px-6 text-sm text-zinc-500">

          © {new Date().getFullYear()}{" "}
          {name}

        </div>

      </footer>

    </main>
  );
}