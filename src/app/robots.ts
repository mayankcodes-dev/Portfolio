import type { MetadataRoute } from "next";

/**
 * Generates /robots.txt served by Next.js App Router.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Disallow Next.js internals and API routes from being indexed
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://mayankcodes.dev/sitemap.xml",
  };
}
