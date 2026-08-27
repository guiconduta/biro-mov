import type { MetadataRoute } from "next";
import { getFeaturedCases } from "@/lib/catalog";

const BASE = "https://biro.mov";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/cases`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const cases: MetadataRoute.Sitemap = getFeaturedCases().map((c) => ({
    url: `${BASE}/cases/${c.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...cases];
}
