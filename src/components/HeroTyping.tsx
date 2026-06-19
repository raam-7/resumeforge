"use client";

import { TypeAnimation } from "react-type-animation";

export default function HeroTyping() {
  return (
    <TypeAnimation
      sequence={[
        "AI Engineer",
        2000,
        "Full Stack Developer",
        2000,
        "MERN Stack Developer",
        2000,
        "Machine Learning Enthusiast",
        2000,
      ]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
      className="text-cyan-300 text-2xl font-medium"
    />
  );
}