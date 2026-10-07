import { NextResponse } from "next/server";

/**
 * Fetches LeetCode problems solved via the unofficial alfa-leetcode-api.
 * Falls back to 711 (verified count) if the API is down or times out.
 * GET /api/stats
 */

const USERNAME       = "mayankcodes-dev";
const FALLBACK_COUNT = 711;

export async function GET() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(
      `https://alfa-leetcode-api.onrender.com/${USERNAME}/solved`,
      {
        signal: controller.signal,
        next: { revalidate: 3600 },
      }
    );
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`LeetCode API ${res.status}`);

    const data = await res.json();
    const solved: number | null = data?.solvedProblem ?? data?.totalSolved ?? null;

    return NextResponse.json({
      leetcode: solved ?? FALLBACK_COUNT,
      source: solved !== null ? "leetcode" : "static",
    });
  } catch {
    return NextResponse.json({ leetcode: FALLBACK_COUNT, source: "static" });
  }
}
