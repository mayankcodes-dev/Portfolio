import { NextResponse } from "next/server";

/**
 * Server-side proxy for GitHub contribution data.
 *
 * Uses jogruber's GitHub contributions API (same source as react-github-calendar).
 * ISR-cached for 1 hour — clients get instant responses after the first request.
 *
 * Returns Activity[] in react-activity-calendar format:
 *   [{ date: "YYYY-MM-DD", count: number, level: 0|1|2|3|4 }]
 *
 * GET /api/github-calendar
 */

const USERNAME  = "mayankcodes-dev";
const REVALIDATE = 3600; // 1 hour

export async function GET() {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
      {
        next: { revalidate: REVALIDATE },
        headers: { Accept: "application/json" },
      }
    );

    if (!res.ok) throw new Error(`GitHub calendar API ${res.status}`);

    const data = await res.json();

    // jogruber returns { total: {...}, contributions: [{date, count, level}] }
    // `level` is already 0–4. Just pass it through.
    const contributions: { date: string; count: number; level: number }[] =
      data?.contributions ?? [];

    if (contributions.length === 0) throw new Error("empty contributions");

    return NextResponse.json(
      { contributions, total: data?.total ?? {} },
      {
        headers: {
          "Cache-Control": `public, s-maxage=${REVALIDATE}, stale-while-revalidate=600`,
        },
      }
    );
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
