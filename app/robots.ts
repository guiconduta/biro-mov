import type { MetadataRoute } from "next";

const BASE = "https://biro.mov";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/pricing"] },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
