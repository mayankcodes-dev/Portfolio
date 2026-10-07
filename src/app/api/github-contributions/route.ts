import { NextResponse } from "next/server";

const STATIC_FALLBACK = 2174;
const USERNAME = "mayankcodes-dev";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json({ contributions: STATIC_FALLBACK, source: "static" });
  }

  try {
    // Query the last 365 days — same range that react-github-calendar shows.
    // Without an explicit date range, GitHub defaults to Jan 1 → Dec 31 of the
    // current year, which returns 0 if activity was mostly in the prior year.
    const now  = new Date();
    const from = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
          user(login: "${USERNAME}") {
            contributionsCollection(
              from: "${from.toISOString()}"
              to:   "${now.toISOString()}"
            ) {
              contributionCalendar { totalContributions }
            }
          }
        }`,
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`GitHub API ${res.status}`);

    const json = await res.json();
    const total: number | null =
      json?.data?.user?.contributionsCollection?.contributionCalendar
        ?.totalContributions ?? null;

    // Guard against unexpected 0 — use static fallback instead
    if (total === null || total === 0) throw new Error("invalid total");

    return NextResponse.json({ contributions: total, source: "github" });
  } catch {
    return NextResponse.json({ contributions: STATIC_FALLBACK, source: "static" });
  }
}
