"use client";

import type { ThemeProps } from "./theme-types";

type PersonalInfo = {
  fullName?: string;
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  linkedIn?: string;
  github?: string;
  website?: string;
};

type ProfessionalProfile = {
  title?: string;
  domain?: string;
  specializations?: string[];
  seniority?: string;
};

type Skill =
  | string
  | {
      name?: string;
      category?: string;
    };

type AINeonData = {
  personalInfo?: PersonalInfo;
  personal?: PersonalInfo;
  professionalProfile?: ProfessionalProfile;
  summary?: string;
  skills?: Skill[];
};

export default function AINeonTheme({
  data,
}: ThemeProps) {
  /*
   * Normalize portfolio data
   */

  const portfolioData =
    data as AINeonData;

  const personal =
    portfolioData.personalInfo ??
    portfolioData.personal ??
    {};

  const professional =
    portfolioData.professionalProfile ??
    {};

  /*
   * Personal information
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

  /*
   * Professional specializations
   */

  const specializations =
    Array.isArray(
      professional.specializations
    )
      ? professional.specializations
      : [];

  /*
   * Skills
   */

  const skills =
    Array.isArray(portfolioData.skills)
      ? portfolioData.skills
      : [];

  /*
   * Helper for skills
   */

  function getSkillName(
    skill: Skill
  ): string {
    if (typeof skill === "string") {
      return skill;
    }

    return skill.name || "";
  }

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">

      {/* =========================================
          BACKGROUND
      ========================================= */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.18),transparent_40%)]
        "
      />

      {/* =========================================
          HERO
      ========================================= */}

      <section className="relative">

        <div className="mx-auto max-w-6xl px-6 py-28">

          <p className="font-mono text-sm uppercase tracking-[0.4em] text-cyan-400">
            SYSTEM // PROFILE
          </p>

          <h1 className="mt-6 text-5xl font-black tracking-tight md:text-8xl">
            {name}
          </h1>

          <p className="mt-8 font-mono text-xl text-cyan-300 md:text-2xl">
            &gt; {title}
          </p>

          {domain && (
            <p className="mt-3 font-mono text-zinc-500">
              DOMAIN::{domain}
            </p>
          )}

          {/* SPECIALIZATIONS */}

          {specializations.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">

              {specializations.map(
                (
                  specialization,
                  index
                ) => (
                  <span
                    key={`${specialization}-${index}`}
                    className="
                      rounded-lg
                      border
                      border-cyan-500/30
                      bg-cyan-500/5
                      px-4
                      py-2
                      font-mono
                      text-sm
                      text-cyan-300
                    "
                  >
                    {specialization}
                  </span>
                )
              )}

            </div>
          )}

          {/* CONTACT */}

          <div className="mt-8 flex flex-wrap gap-3">

            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="
                  rounded-lg
                  border
                  border-zinc-800
                  bg-zinc-950
                  px-4
                  py-2
                  font-mono
                  text-sm
                  text-zinc-400
                  transition
                  hover:border-cyan-400
                  hover:text-cyan-300
                "
              >
                {personal.email}
              </a>
            )}

            {personal.location && (
              <span
                className="
                  rounded-lg
                  border
                  border-zinc-800
                  bg-zinc-950
                  px-4
                  py-2
                  font-mono
                  text-sm
                  text-zinc-500
                "
              >
                LOCATION::{personal.location}
              </span>
            )}

          </div>

        </div>

      </section>

      {/* =========================================
          SUMMARY
      ========================================= */}

      {portfolioData.summary && (
        <section className="relative mx-auto max-w-6xl px-6 py-16">

          <div
            className="
              rounded-2xl
              border
              border-cyan-500/20
              bg-zinc-950/80
              p-8
            "
          >

            <p
              className="
                font-mono
                text-xs
                uppercase
                tracking-widest
                text-cyan-500
              "
            >
              PROFILE_SUMMARY
            </p>

            <p className="mt-6 text-lg leading-8 text-zinc-300">
              {portfolioData.summary}
            </p>

          </div>

        </section>
      )}

      {/* =========================================
          SKILLS
      ========================================= */}

      {skills.length > 0 && (
        <section className="relative mx-auto max-w-6xl px-6 pb-20">

          <p
            className="
              font-mono
              text-xs
              uppercase
              tracking-widest
              text-cyan-500
            "
          >
            SKILL_MATRIX
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">

            {skills.map(
              (skill, index) => {

                const skillName =
                  getSkillName(skill);

                if (!skillName) {
                  return null;
                }

                return (
                  <div
                    key={`${skillName}-${index}`}
                    className="
                      rounded-xl
                      border
                      border-zinc-800
                      bg-zinc-950
                      px-5
                      py-4
                      font-mono
                      text-sm
                      text-zinc-300
                      transition
                      hover:border-cyan-400
                      hover:text-cyan-300
                    "
                  >
                    {">"} {skillName}
                  </div>
                );
              }
            )}

          </div>

        </section>
      )}

      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="relative border-t border-cyan-500/10">

        <div
          className="
            mx-auto
            max-w-6xl
            px-6
            py-8
            font-mono
            text-xs
            text-zinc-600
          "
        >

          <span className="text-cyan-500">
            ResumeForge
          </span>{" "}
           AI Generated Portfolio

        </div>

      </footer>

    </main>
  );
}