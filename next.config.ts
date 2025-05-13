import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://cdn.discordapp.com/**"),
      new URL("https://lh3.googleusercontent.com/**"),
      new URL("https://**blob.vercel-storage.com/**")
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb"
    },
    useCache: true
  }
  /* config options here */
};

export default nextConfig;
