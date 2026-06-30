"use client";

import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

export default function ProjectCard({
  project,
}: {
  project: any;
}) {
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.35}
      scale={1.03}
      tiltMaxAngleX={12}
      tiltMaxAngleY={12}
      transitionSpeed={1500}
      className="rounded-3xl"
    >
      <motion.div
        whileHover={{ y: -8 }}
        className="
        relative
        bg-zinc-900/90
        border
        border-cyan-500/40
        rounded-3xl
        p-6
        shadow-[0_0_25px_rgba(34,211,238,0.15)]
        hover:shadow-[0_0_40px_rgba(34,211,238,0.35)]
        transition-all
        duration-500
        overflow-hidden
        "
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/10 pointer-events-none" />

        {/* Featured Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
            ★ Featured
          </span>
        </div>

        <h3 className="text-2xl font-bold mb-4">
          {project.title}
        </h3>

        <p className="text-zinc-300 leading-7">
          {project.description}
        </p>

        {project.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {project.technologies.map(
              (tech: string, i: number) => (
                <span
                  key={i}
                  className="
                  px-3 py-1
                  rounded-full
                  text-sm
                  bg-cyan-500/10
                  border
                  border-cyan-500/30
                  text-cyan-300
                  "
                >
                  {tech}
                </span>
              )
            )}
          </div>
        )}

        <div className="flex gap-3 mt-6">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="
              px-4 py-2
              rounded-xl
              bg-cyan-500
              text-black
              font-semibold
              hover:scale-105
              transition
              "
            >
              GitHub
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="
              px-4 py-2
              rounded-xl
              border
              border-purple-500
              hover:bg-purple-500
              transition
              "
            >
              Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </Tilt>
  );
}