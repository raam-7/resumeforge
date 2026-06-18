export default function ModernTemplate({
  data,
}: {
  data: any;
}) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 text-white">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-[40px] p-12 shadow-[0_0_80px_rgba(59,130,246,0.35)] border border-white/10">

          <div className="flex flex-col md:flex-row gap-8 items-center">

            <div
              className="
              floating
              w-32
              h-32
              rounded-full
              bg-gradient-to-br
              from-cyan-400
              to-purple-600
              flex
              items-center
              justify-center
              text-5xl
              font-bold
              shadow-[0_0_50px_rgba(59,130,246,0.5)]
              "
            >
              {data.personalInfo?.fullName?.charAt(0)}
            </div>

            <div>
              <h1 className="text-5xl md:text-7xl font-extrabold">
                {data.personalInfo?.fullName}
              </h1>

              <p className="mt-6 text-lg md:text-xl text-white/90 max-w-4xl leading-9">
                {data.summary}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-8 pb-16">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="space-y-6">

            {/* CONTACT */}
            <div className="
              bg-zinc-900/70
              backdrop-blur-xl
              rounded-3xl
              p-6
              border
              border-zinc-700
              shadow-xl
              hover:border-cyan-400
              hover:-translate-y-1
              transition-all
            ">
              <h2 className="text-2xl font-bold mb-5 text-cyan-400">
                Contact
              </h2>

              <div className="space-y-4 text-zinc-300">

                {data.personalInfo?.email && (
                  <p>📧 {data.personalInfo.email}</p>
                )}

                {data.personalInfo?.phone && (
                  <p>📞 {data.personalInfo.phone}</p>
                )}

                {data.personalInfo?.location && (
                  <p>📍 {data.personalInfo.location}</p>
                )}

              </div>
            </div>

            {/* SKILLS */}
            <div className="
              bg-zinc-900/70
              backdrop-blur-xl
              rounded-3xl
              p-6
              border
              border-zinc-700
              shadow-xl
              hover:border-cyan-400
              hover:-translate-y-1
              transition-all
            ">
              <h2 className="text-2xl font-bold mb-5 text-cyan-400">
                Skills
              </h2>

              <div className="flex flex-wrap gap-3">
                {data.skills?.map(
                  (skill: any, index: number) => (
                    <span
                      key={index}
                      className="
                      px-4
                      py-2
                      rounded-full
                      bg-gradient-to-r
                      from-cyan-500
                      to-purple-600
                      text-white
                      text-sm
                      font-medium
                      shadow-lg
                      hover:scale-110
                      transition
                      duration-300
                      "
                    >
                      {skill.name}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* SOCIAL */}
            {data.socialLinks?.length > 0 && (
              <div className="
                bg-zinc-900/70
                backdrop-blur-xl
                rounded-3xl
                p-6
                border
                border-zinc-700
                shadow-xl
                hover:border-cyan-400
                hover:-translate-y-1
                transition-all
              ">
                <h2 className="text-2xl font-bold mb-5 text-cyan-400">
                  Connect
                </h2>

                <div className="space-y-3">
                  {data.socialLinks.map(
                    (
                      social: any,
                      index: number
                    ) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="
                        block
                        text-cyan-400
                        hover:text-purple-400
                        transition
                        "
                      >
                        {social.platform}
                      </a>
                    )
                  )}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT */}
          <div className="lg:col-span-2 space-y-8">

            {/* PROJECTS */}
            {data.projects?.length > 0 && (
              <div className="
                bg-zinc-900/70
                backdrop-blur-xl
                rounded-3xl
                p-8
                border
                border-zinc-700
                shadow-xl
              ">
                <h2 className="text-4xl font-bold mb-8 text-cyan-400">
                  Projects
                </h2>

                <div className="grid gap-6">

                  {data.projects.map(
                    (
                      project: any,
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="
                        group
                        rounded-2xl
                        p-6
                        bg-zinc-950
                        border
                        border-zinc-700
                        hover:border-cyan-400
                        hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]
                        hover:-translate-y-1
                        transition-all
                        duration-300
                        "
                      >
                        <h3
                          className="
                          text-2xl
                          font-bold
                          group-hover:text-cyan-400
                          transition-colors
                          "
                        >
                          {project.title}
                        </h3>

                        <p className="mt-4 text-zinc-300 leading-8">
                          {project.description}
                        </p>

                        {project.technologies?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-5">
                            {project.technologies.map(
                              (
                                tech: string,
                                techIndex: number
                              ) => (
                                <span
                                  key={techIndex}
                                  className="
                                  px-3
                                  py-1
                                  rounded-full
                                  bg-zinc-800
                                  text-sm
                                  "
                                >
                                  {tech}
                                </span>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    )
                  )}

                </div>
              </div>
            )}

            {/* EDUCATION */}
            {data.education?.length > 0 && (
              <div className="
                bg-zinc-900/70
                backdrop-blur-xl
                rounded-3xl
                p-8
                border
                border-zinc-700
                shadow-xl
              ">
                <h2 className="text-4xl font-bold mb-8 text-cyan-400">
                  Education
                </h2>

                <div className="space-y-5">

                  {data.education.map(
                    (
                      education: any,
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="
                        bg-zinc-950
                        rounded-2xl
                        p-5
                        border
                        border-zinc-700
                        "
                      >
                        <h3 className="font-bold text-xl">
                          {education.degree}
                        </h3>

                        <p className="mt-2 text-zinc-300">
                          {education.institution ||
                            education.university}
                        </p>

                        <p className="text-zinc-500 mt-2">
                          {education.duration ||
                            education.dates}
                        </p>
                      </div>
                    )
                  )}

                </div>
              </div>
            )}

            {/* CERTIFICATIONS */}
            {data.certifications?.length > 0 && (
              <div className="
                bg-zinc-900/70
                backdrop-blur-xl
                rounded-3xl
                p-8
                border
                border-zinc-700
                shadow-xl
              ">
                <h2 className="text-4xl font-bold mb-8 text-cyan-400">
                  Certifications
                </h2>

                <div className="grid md:grid-cols-2 gap-4">

                  {data.certifications.map(
                    (
                      cert: any,
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="
                        bg-zinc-950
                        rounded-2xl
                        p-5
                        border
                        border-zinc-700
                        hover:border-purple-500
                        transition
                        "
                      >
                        <h3 className="font-semibold">
                          {cert.name}
                        </h3>

                        {cert.provider && (
                          <p className="text-zinc-400 mt-2">
                            {cert.provider}
                          </p>
                        )}
                      </div>
                    )
                  )}

                </div>
              </div>
            )}

          </div>

        </div>

      </section>

    </main>
  );
}