import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://cdn.discordapp.com/**"), new URL("https://lh3.googleusercontent.com/**")]
  }
  /* config options here */
};

export default nextConfig;
