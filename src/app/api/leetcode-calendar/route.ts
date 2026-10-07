import { NextResponse } from "next/server";

/**
 * Server-side proxy for the LeetCode calendar data.
 *
 * WHY: alfa-leetcode-api.onrender.com is a free Render instance — it sleeps
 * after 15 minutes of inactivity and takes 30–50s to cold-start. A client-side
 * fetch with an 8s timeout always times out on a cold start.
 *
 * The server-side `next: { revalidate }` ISR cache means:
 *   - First ever request: may be slow (Render cold start), cached for 12h
 *   - All subsequent requests within 12h: instant (served from Next.js cache)
 *   - Vercel's edge cache makes this globally fast
 *
 * GET /api/leetcode-calendar  →  { submissionCalendar: "{...}" } | { error }
 */

const USERNAME = "mayankcodes-dev";
const REVALIDATE = 43200; // 12 hours

export async function GET() {
  try {
    const res = await fetch(
      `https://alfa-leetcode-api.onrender.com/${USERNAME}/calendar`,
      {
        // ISR: cache on the server for 12 hours — clients get instant responses
        next: { revalidate: REVALIDATE },
        headers: { Accept: "application/json" },
      }
    );

    if (!res.ok) throw new Error(`LeetCode calendar API ${res.status}`);

    const data = await res.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": `public, s-maxage=${REVALIDATE}, stale-while-revalidate=3600`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "unavailable" },
      {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }
}
