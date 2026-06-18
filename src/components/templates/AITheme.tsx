"use client";

import { motion } from "framer-motion";

export default function AITheme({
  data,
}: {
  data: any;
}) {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* Animated Hero */}
      <section className="relative px-8 py-24">

        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-6xl mx-auto text-center"
        >
          <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-6xl font-bold shadow-[0_0_80px_rgba(34,211,238,0.5)]">
            {data.personalInfo?.fullName?.charAt(0)}
          </div>

          <h1 className="mt-8 text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            {data.personalInfo?.fullName}
          </h1>

          <p className="mt-8 text-xl text-zinc-300 max-w-4xl mx-auto">
            {data.summary}
          </p>
        </motion.div>

      </section>

      {/* Skills */}
      <section className="max-w-6xl mx-auto px-8 py-12">

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-8 text-cyan-400"
        >
          AI Skills Matrix
        </motion.h2>

        <div className="flex flex-wrap gap-4">
          {data.skills?.map(
            (skill: any, index: number) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.1,
                }}
                className="
                px-5 py-3
                rounded-full
                bg-zinc-900
                border
                border-cyan-500
                shadow-[0_0_20px_rgba(34,211,238,0.3)]
                "
              >
                {skill.name}
              </motion.div>
            )
          )}
        </div>

      </section>

      {/* Projects */}
      <section className="max-w-6xl mx-auto px-8 py-12">

        <h2 className="text-4xl font-bold mb-8 text-purple-400">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {data.projects?.map(
            (project: any, index: number) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                }}
                className="
                bg-zinc-900
                border
                border-zinc-700
                rounded-3xl
                p-6
                shadow-xl
                "
              >
                <h3 className="text-2xl font-bold">
                  {project.title}
                </h3>

                <p className="mt-4 text-zinc-300">
                  {project.description}
                </p>
              </motion.div>
            )
          )}

        </div>

      </section>

    </main>
  );
}