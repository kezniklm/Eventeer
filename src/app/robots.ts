import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/"
  },
  sitemap: "https://eventeer-woad.vercel.app/sitemap.xml"
});

export default robots;
