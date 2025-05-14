import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://eventeer-woad.vercel.app",
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1
  },
  {
    url: "https://eventeer-woad.vercel.app/login",
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.8
  }
];

export default sitemap;
