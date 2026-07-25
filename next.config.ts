import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // These libraries are used only by the upload route. Keeping them external
  // prevents Turbopack from evaluating pdf-parse's package test entrypoint.
  serverExternalPackages: ["pdf-parse", "mammoth"],
};

export default nextConfig;
