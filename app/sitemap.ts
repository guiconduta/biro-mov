import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { getFeaturedCases } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/cases`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const cases: MetadataRoute.Sitemap = getFeaturedCases().map((c) => ({
    url: `${SITE_URL}/cases/${c.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...cases];
}
