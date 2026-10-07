import type { MetadataRoute } from "next";

/**
 * Generates /sitemap.xml for search engine and LLM crawlers.
 * Next.js App Router automatically serves this at /sitemap.xml.
 *
 * SEO notes:
 * - Priority 1.0 = homepage (highest)
 * - Certifications page removed — content now lives on home page (#certs section)
 * - Blog is weekly (new posts appear regularly)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mayankcodes.dev";

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
