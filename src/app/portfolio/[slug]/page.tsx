
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const portfolio = await prisma.portfolio.findUnique({
    where: { slug },
  });

  if (!portfolio) {
    notFound();
  }

  const data = portfolio.data as any;

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      {/* HERO */}
      <section className="mb-20">
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 rounded-3xl border border-zinc-700 p-12">
          <h1 className="text-white text-6xl md:text-7xl font-extrabold tracking-tight">
            {data.personalInfo?.fullName}
          </h1>

          {data.summary && (
            <p className="mt-6 text-zinc-300 leading-8 max-w-4xl">
              {data.summary}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-6 text-zinc-300">
            {data.personalInfo?.location && (
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>{data.personalInfo.location}</span>
              </div>
            )}

            {data.personalInfo?.phone && (
              <div className="flex items-center gap-2">
                <span>📞</span>
                <span>{data.personalInfo.phone}</span>
              </div>
            )}

            {data.personalInfo?.email && (
              <div className="flex items-center gap-2">
                <span>✉️</span>
                <span>{data.personalInfo.email}</span>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://github.com/raam-7"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition"
            >
              GitHub
            </a>

            <a
              href="https://linkedin.com/in/raambhanushali"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      {data.skills?.length > 0 && (
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8">Skills</h2>

          <div className="flex flex-wrap gap-4">
            {data.skills.map((skill: any, index: number) => (
              <span
                key={index}
                className="px-5 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {data.projects?.length > 0 && (
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8">Projects</h2>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {data.projects.map((project: any, index: number) => (
              <div
                key={index}
                className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-xl hover:-translate-y-1 hover:border-zinc-600 transition-all flex flex-col h-full"
              >
                <h3 className="text-2xl font-semibold">
                  {project.title}
                </h3>

                <p className="mt-4 text-zinc-300 leading-7">
                  {project.description}
                </p>

                {project.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto pt-5">
                    {project.technologies.map(
                      (tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 rounded-full bg-zinc-800 text-sm"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {data.education?.length > 0 && (
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8">
            🎓 Education
          </h2>

          <div className="space-y-5">
            {data.education.map(
              (education: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6"
                >
                  <h3 className="text-xl font-semibold">
                    {education.degree}
                  </h3>

                  <p className="mt-2 text-zinc-300">
                    {education.institution ||
                      education.university}
                  </p>

                  <p className="mt-2 text-zinc-500">
                    {education.duration}
                  </p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* CERTIFICATIONS */}
      {data.certifications?.length > 0 && (
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8">
            🏆 Certifications
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {data.certifications.map(
              (cert: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5"
                >
                  {cert.name}
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* CONNECT */}
      <section>
        <h2 className="text-4xl font-bold mb-8">
          🔗 Connect
        </h2>

        <div className="flex flex-wrap gap-4">
          <a
            href="https://github.com/raam-7"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition"
          >
            GitHub
          </a>

          <a
            href="https://linkedin.com/in/raambhanushali"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </main>
  );
}

