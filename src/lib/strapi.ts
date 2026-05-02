/**
 * Strapi CMS client — fetches Projects and Certificates
 * Strapi v5 REST API with flat response format
 *
 * Local dev:  NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
 * Production: NEXT_PUBLIC_STRAPI_URL=https://your-railway-app.up.railway.app
 */

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN ?? "";

function strapiHeaders() {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (STRAPI_TOKEN) headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
  return headers;
}

/* ─── Types ────────────────────────────────────────────────────────── */

export interface StrapiProject {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[]; // JSON array stored as text → parse on fetch
  github: string | null;
  live: string | null;
  featured: boolean;
  highlights: string[];
  coverImage?: {
    url: string;
    alternativeText: string | null;
    formats?: {
      medium?: { url: string };
      thumbnail?: { url: string };
    };
  } | null;
}

export interface StrapiCertificate {
  id: number;
  documentId: string;
  title: string;
  issuer: string;
  date: string; // "2024-01-15"
  credentialUrl: string | null;
  category: string;
  image?: {
    url: string;
    alternativeText: string | null;
  } | null;
}

/* ─── Fetch helpers ─────────────────────────────────────────────────── */

async function strapiGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api${path}`, {
      headers: strapiHeaders(),
      next: { revalidate: 3600 }, // ISR: revalidate every hour
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as T;
  } catch {
    return null;
  }
}

/* ─── Public API ────────────────────────────────────────────────────── */

export async function getStrapiProjects(): Promise<StrapiProject[]> {
  const data = await strapiGet<StrapiProject[]>(
    "/projects?populate=coverImage&sort=featured:desc,createdAt:desc"
  );
  return data ?? [];
}

export async function getStrapiCertificates(): Promise<StrapiCertificate[]> {
  const data = await strapiGet<StrapiCertificate[]>(
    "/certificates?populate=image&sort=date:desc"
  );
  return data ?? [];
}

/** Returns true if Strapi is reachable — used for graceful fallback */
export async function isStrapiReachable(): Promise<boolean> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/projects?pagination[limit]=1`, {
      headers: strapiHeaders(),
      next: { revalidate: 60 },
    });
    return res.ok;
  } catch {
    return false;
  }
}
