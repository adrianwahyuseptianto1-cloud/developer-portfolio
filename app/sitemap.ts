import type { MetadataRoute } from "next";
import { works } from "./portfolio-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://adrianwahyuseptianto.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date("2026-04-30"),
      changeFrequency: "monthly",
      priority: 1
    },
    ...works.map((work) => ({
      url: `${siteUrl}/demos/${work.slug}`,
      lastModified: new Date("2026-04-30"),
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  ];
}
