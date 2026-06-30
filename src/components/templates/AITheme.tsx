"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/AnimatedCounter";
import ParticleBackground from "@/components/ParticleBackground";
import HeroTyping from "@/components/HeroTyping";
import BootLoader from "@/components/BootLoader";
import MouseGlow from "@/components/MouseGlow";
import FloatingOrbs from "@/components/FloatingOrbs"; 
import ProjectCard from "@/components/ProjectCard";
export default function AITheme({
  data,
  views,
}: {
  data: any;
  views: number;
}) {
  return (
   <BootLoader>
    <FloatingOrbs />
<MouseGlow />

<main className="relative min-h-screen bg-black text-white overflow-hidden z-10">
      <ParticleBackground />

      {/* HERO */}
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

       <div className="mt-4">
  <HeroTyping />
</div>
          <p className="mt-8 text-xl text-zinc-300 max-w-4xl mx-auto">
            {data.summary}
          </p>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-8 py-10">
        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-zinc-900 border border-cyan-500 rounded-3xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]">
            <h3 className="text-4xl font-bold text-cyan-400">
              <AnimatedCounter value={views} />
            </h3>
            <p className="text-zinc-400 mt-2">Portfolio Views</p>
          </div>

          <div className="bg-zinc-900 border border-purple-500 rounded-3xl p-6 text-center transition-all duration-300 hover:scale-105">
            <h3 className="text-4xl font-bold text-purple-400">
              <AnimatedCounter value={data.skills?.length || 0} />
            </h3>
            <p className="text-zinc-400 mt-2">Skills</p>
          </div>

          <div className="bg-zinc-900 border border-pink-500 rounded-3xl p-6 text-center transition-all duration-300 hover:scale-105">
            <h3 className="text-4xl font-bold text-pink-400">
              <AnimatedCounter value={data.projects?.length || 0} />
            </h3>
            <p className="text-zinc-400 mt-2">Projects</p>
          </div>

          <div className="bg-zinc-900 border border-green-500 rounded-3xl p-6 text-center transition-all duration-300 hover:scale-105">
            <h3 className="text-4xl font-bold text-green-400">
              <AnimatedCounter value={data.certifications?.length || 0} />
            </h3>
            <p className="text-zinc-400 mt-2">Certificates</p>
          </div>

        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT SIDEBAR */}
          <div className="space-y-6">

            {/* AI SCORE */}
            <div className="bg-zinc-900 rounded-3xl border border-green-500 p-6">
              <h2 className="text-2xl font-bold text-green-400">
                AI Resume Score
              </h2>

              <div className="mt-4 text-5xl font-bold">
                87
                <span className="text-green-400">
                  /100
                </span>
              </div>

              <div className="mt-4 h-3 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-cyan-400"
                  style={{ width: "87%" }}
                />
              </div>

              <p className="mt-4 text-sm text-zinc-400">
                Strong MERN + AI profile.
              </p>
            </div>

            {/* AI INSIGHTS */}
            <div className="bg-zinc-900 rounded-3xl border border-purple-500 p-6">
              <h2 className="text-2xl font-bold text-purple-400">
                AI Insights
              </h2>

              <ul className="mt-4 space-y-3 text-zinc-300">
                <li>✅ Strong Full Stack Profile</li>
                <li>✅ AI / ML Specialization</li>
                <li>✅ Multiple Real Projects</li>
                <li>⚠ Internship Missing</li>
              </ul>
            </div>

            {/* CONTACT */}
            <div className="bg-zinc-900 rounded-3xl border border-cyan-500 p-6">
              <h2 className="text-2xl font-bold text-cyan-400">
                Contact
              </h2>

              <div className="mt-4 space-y-3 text-zinc-300">
                <p>{data.personalInfo?.email}</p>
                <p>{data.personalInfo?.phone}</p>
                <p>{data.personalInfo?.location}</p>
              </div>
            </div>

            {/* CONNECT */}
            <div className="bg-zinc-900 rounded-3xl border border-cyan-500 p-6">
              <h2 className="text-2xl font-bold text-cyan-400">
                Connect
              </h2>

              <div className="mt-4 flex flex-col gap-3">
                {data.socialLinks?.map(
                  (social: any, index: number) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-300 hover:text-cyan-100"
                    >
                      {social.platform}
                    </a>
                  )
                )}
              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2 space-y-8">

            {/* SKILLS */}
            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
              <h2 className="text-4xl font-bold mb-8 text-cyan-400">
                AI Skills Matrix
              </h2>

              <div className="flex flex-wrap gap-3">
                {data.skills?.map((skill: any, index: number) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="px-4 py-2 rounded-full border border-cyan-500 bg-zinc-950 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                  >
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* PROJECTS */}
            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
              <h2 className="text-4xl font-bold mb-8 text-purple-400">
                Featured Projects
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
  {data.projects?.map((project: any, index: number) => (
    <ProjectCard
      key={index}
      project={project}
    />
  ))}
</div>
            </div>

            {/* EDUCATION */}
            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
              <h2 className="text-4xl font-bold mb-8 text-cyan-400">
                Education
              </h2>

              <div className="space-y-4">
                {data.education?.map(
                  (edu: any, index: number) => (
                    <div
                      key={index}
                      className="bg-black border border-zinc-700 rounded-2xl p-5"
                    >
                      <h3 className="font-bold text-xl">
                        {edu.degree}
                      </h3>

                      <p className="text-zinc-400 mt-2">
                        {edu.institution || edu.university}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* CERTIFICATIONS */}
            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
              <h2 className="text-4xl font-bold mb-8 text-cyan-400">
                Certifications
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {data.certifications?.map(
                  (cert: any, index: number) => (
                    <div
                      key={index}
                      className="bg-black border border-zinc-700 rounded-2xl p-5"
                    >
                      {cert.name}
                    </div>
                  )
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

    </main>
    </BootLoader>
  );
}