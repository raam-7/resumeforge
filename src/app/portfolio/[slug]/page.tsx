import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import HeroTyping from "@/components/HeroTyping";

type Personal = {
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
  specializations?: string[];
  seniority?: string | null;
  evidence?: string[];
};

type Skill =
  | string
  | {
      name?: string | null;
      category?: string | null;
    };

type Education = {
  degree?: string | null;
  institution?: string | null;
  location?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  grade?: string | null;
};

type Experience = {
  company?: string | null;
  role?: string | null;
  location?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  description?: string[];
};

type Project = {
  title?: string | null;
  description?: string[];
  technologies?: string[];
  url?: string | null;
  githubUrl?: string | null;
  liveUrl?: string | null;
};

type ResumeData = {
  professionalProfile?: ProfessionalProfile;

  // New structure
  personalInfo?: Personal;

  // Backward compatibility
  personal?: Personal;

  summary?: string | null;
  skills?: Skill[];
  education?: Education[];
  experience?: Experience[];
  projects?: Project[];
  certifications?: string[];
  achievements?: string[];
  languages?: string[];
  interests?: string[];

  socialLinks?: {
    platform?: string;
    url?: string;
  }[];
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PortfolioPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const portfolio = await prisma.portfolio.findUnique({
    where: {
      slug,
    },
  });

  if (!portfolio) {
    notFound();
  }

  const data = portfolio.data as ResumeData;

  /*
   * --------------------------------------------------
   * PERSONAL INFORMATION
   * --------------------------------------------------
   *
   * New portfolios use:
   * data.personalInfo
   *
   * Older portfolios may use:
   * data.personal
   *
   * We support both.
   */

  const personal =
    data.personalInfo ??
    data.personal ??
    {};

  const personalInfo =
    data.personalInfo ??
    data.personal ??
    {};

  /*
   * --------------------------------------------------
   * PROFESSIONAL PROFILE
   * --------------------------------------------------
   */

  const professionalProfile =
    data.professionalProfile ?? {};

  const professionalTitle =
    professionalProfile.title ||
    "Professional";

  const professionalDomain =
    professionalProfile.domain || "";

  /*
   * --------------------------------------------------
   * NORMALIZE ARRAY DATA
   * --------------------------------------------------
   */

  const skills = Array.isArray(data.skills)
    ? data.skills
    : [];

  const education = Array.isArray(data.education)
    ? data.education
    : [];

  const experience = Array.isArray(data.experience)
    ? data.experience
    : [];

  const projects = Array.isArray(data.projects)
    ? data.projects
    : [];

  const certifications = Array.isArray(
    data.certifications
  )
    ? data.certifications
    : [];

  const achievements = Array.isArray(
    data.achievements
  )
    ? data.achievements
    : [];

  const languages = Array.isArray(data.languages)
    ? data.languages
    : [];

  const interests = Array.isArray(data.interests)
    ? data.interests
    : [];

  /*
   * --------------------------------------------------
   * CANDIDATE NAME
   * --------------------------------------------------
   */

  const candidateName =
    personalInfo.fullName ||
    personalInfo.name ||
    "My Portfolio";

  return (
    <main className="min-h-screen bg-black text-white">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden border-b border-zinc-800">

        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

        <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-10">

          <div className="max-w-4xl">

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Portfolio
            </p>

            <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
              {candidateName}
            </h1>

            <div className="mt-6">

              <p className="text-xl font-medium text-zinc-300 md:text-2xl">
                {professionalTitle}
              </p>

              {professionalDomain && (
                <p className="mt-2 text-base text-cyan-400 md:text-lg">
                  {professionalDomain}
                </p>
              )}

              {professionalProfile.specializations &&
                professionalProfile.specializations.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">

                    {professionalProfile.specializations
                      .slice(0, 5)
                      .map((specialization, index) => (
                        <span
                          key={`${specialization}-${index}`}
                          className="rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-2 text-sm text-zinc-300"
                        >
                          {specialization}
                        </span>
                      ))}

                  </div>
                )}

            </div>

            {/* Contact information */}

            <div className="mt-8 flex flex-wrap gap-3">

              {personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="rounded-full border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-sm text-zinc-300 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  {personal.email}
                </a>
              )}

              {personal.phone && (
                <a
                  href={`tel:${personal.phone}`}
                  className="rounded-full border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-sm text-zinc-300 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  {personal.phone}
                </a>
              )}

              {personal.location && (
                <span className="rounded-full border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-sm text-zinc-300">
                  📍 {personal.location}
                </span>
              )}

            </div>

            {/* Social links */}

            <div className="mt-6 flex gap-4">

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
                  className="rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-cyan-400"
                >
                  LinkedIn
                </a>
              )}

              {personal.github && (
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-zinc-700 px-5 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  GitHub
                </a>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* ================= MAIN ================= */}

      <div className="mx-auto max-w-6xl px-6 md:px-10">

        {/* ================= ABOUT ================= */}

        {data.summary && (
          <section className="py-16">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              About Me
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Professional Summary
            </h2>

            <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 shadow-2xl">

              <p className="text-lg leading-8 text-zinc-300">
                {data.summary}
              </p>

            </div>

          </section>
        )}

        {/* ================= SKILLS ================= */}

        {skills.length > 0 && (
          <section className="pb-16">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Expertise
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Skills
            </h2>

            <div className="mt-8 flex flex-wrap gap-3">

              {skills.map((skill, index) => {

                const skillName =
                  typeof skill === "string"
                    ? skill
                    : skill?.name || "";

                if (!skillName) {
                  return null;
                }

                return (
                  <span
                    key={`${skillName}-${index}`}
                    className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300"
                  >
                    {skillName}
                  </span>
                );
              })}

            </div>

          </section>
        )}

        {/* ================= EXPERIENCE ================= */}

        {experience.length > 0 && (
          <section className="pb-16">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Career
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Experience
            </h2>

            <div className="mt-8 space-y-6">

              {experience.map((item, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-7"
                >

                  <div className="flex flex-col justify-between gap-4 md:flex-row">

                    <div>

                      <h3 className="text-2xl font-bold">
                        {item.role ||
                          "Professional Role"}
                      </h3>

                      {item.company && (
                        <p className="mt-1 text-lg text-cyan-400">
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
                      <div className="text-sm text-zinc-500">
                        {item.startDate || "—"}{" "}
                        —{" "}
                        {item.endDate || "Present"}
                      </div>
                    )}

                  </div>

                  {item.description &&
                    item.description.length > 0 && (
                      <ul className="mt-6 space-y-3">

                        {item.description.map(
                          (description, i) => (
                            <li
                              key={i}
                              className="flex gap-3 text-zinc-300"
                            >
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />

                              <span>
                                {description}
                              </span>
                            </li>
                          )
                        )}

                      </ul>
                    )}

                </div>
              ))}

            </div>

          </section>
        )}

        {/* ================= PROJECTS ================= */}

        {projects.length > 0 && (
          <section className="pb-16">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Featured Work
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Projects
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2">

              {projects.map((project, index) => (
                <article
                  key={index}
                  className="group rounded-3xl border border-zinc-800 bg-zinc-900/50 p-7 transition hover:-translate-y-1 hover:border-cyan-500/50"
                >

                  <div className="flex items-start justify-between gap-4">

                    <h3 className="text-2xl font-bold">
                      {project.title ||
                        "Untitled Project"}
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

                  {project.description &&
                    project.description.length > 0 && (
                      <ul className="mt-5 space-y-3">

                        {project.description.map(
                          (description, i) => (
                            <li
                              key={i}
                              className="text-sm leading-6 text-zinc-400"
                            >
                              {description}
                            </li>
                          )
                        )}

                      </ul>
                    )}

                  {project.technologies &&
                    project.technologies.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2">

                        {project.technologies.map(
                          (technology, i) => (
                            <span
                              key={`${technology}-${i}`}
                              className="rounded-full bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300"
                            >
                              {technology}
                            </span>
                          )
                        )}

                      </div>
                    )}

                </article>
              ))}

            </div>

          </section>
        )}

        {/* ================= EDUCATION ================= */}

        {education.length > 0 && (
          <section className="pb-16">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Academic Background
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Education
            </h2>

            <div className="mt-8 space-y-5">

              {education.map((item, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-7"
                >

                  <div className="flex flex-col justify-between gap-4 md:flex-row">

                    <div>

                      <h3 className="text-xl font-bold">
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
                          {item.startDate || "—"}{" "}
                          —{" "}
                          {item.endDate || "Present"}
                        </p>
                      )}

                      {item.grade && (
                        <p className="mt-2">
                          Grade: {item.grade}
                        </p>
                      )}

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </section>
        )}

        {/* ================= CERTIFICATIONS ================= */}

        {certifications.length > 0 && (
          <section className="pb-16">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Credentials
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Certifications
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">

              {certifications.map(
                (certification, index) => (
                  <div
                    key={`${certification}-${index}`}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-cyan-500/40"
                  >

                    <div className="flex items-center gap-4">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                        ✓
                      </div>

                      <p className="font-medium text-zinc-200">
                        {certification}
                      </p>

                    </div>

                  </div>
                )
              )}

            </div>

          </section>
        )}

        {/* ================= ACHIEVEMENTS ================= */}

        {achievements.length > 0 && (
          <section className="pb-16">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Highlights
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Achievements
            </h2>

            <div className="mt-8 space-y-4">

              {achievements.map(
                (achievement, index) => (
                  <div
                    key={`${achievement}-${index}`}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
                  >

                    <div className="flex gap-4">

                      <span className="text-xl">
                        🏆
                      </span>

                      <p className="text-zinc-300">
                        {achievement}
                      </p>

                    </div>

                  </div>
                )
              )}

            </div>

          </section>
        )}

        {/* ================= LANGUAGES + INTERESTS ================= */}

        {(languages.length > 0 ||
          interests.length > 0) && (
          <section className="pb-20">

            <div className="grid gap-6 md:grid-cols-2">

              {/* Languages */}

              {languages.length > 0 && (
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-7">

                  <h2 className="text-2xl font-bold">
                    Languages
                  </h2>

                  <div className="mt-5 flex flex-wrap gap-3">

                    {languages.map(
                      (language, index) => (
                        <span
                          key={`${language}-${index}`}
                          className="rounded-full bg-zinc-800 px-4 py-2 text-sm text-zinc-300"
                        >
                          {language}
                        </span>
                      )
                    )}

                  </div>

                </div>
              )}

              {/* Interests */}

              {interests.length > 0 && (
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-7">

                  <h2 className="text-2xl font-bold">
                    Interests
                  </h2>

                  <div className="mt-5 flex flex-wrap gap-3">

                    {interests.map(
                      (interest, index) => (
                        <span
                          key={`${interest}-${index}`}
                          className="rounded-full bg-zinc-800 px-4 py-2 text-sm text-zinc-300"
                        >
                          {interest}
                        </span>
                      )
                    )}

                  </div>

                </div>
              )}

            </div>

          </section>
        )}

      </div>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-zinc-800">

        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 py-8 text-sm text-zinc-500 md:flex-row md:px-10">

          <p>
            © {new Date().getFullYear()}{" "}
            {personal.fullName ||
              personal.name ||
              "Portfolio"}
          </p>

          <p>
            Generated with{" "}
            <span className="font-medium text-cyan-400">
              ResumeForge AI
            </span>
          </p>

        </div>

      </footer>

    </main>
  );
}