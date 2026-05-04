import { NextResponse } from "next/server";

/**
 * Fetches total GitHub contributions for the past year via the GraphQL API.
 * Requires GITHUB_TOKEN env var (read:user scope is enough).
 * Falls back to a static default if the token is missing.
 * GET /api/github-contributions
 */
export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = "coderMayank69";

  if (!token) {
    // No token — return a static fallback value
    return NextResponse.json({ contributions: 1200, source: "static" });
  }

  try {
    const query = `
      query {
        user(login: "${username}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }
    `;
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });
    const json = await res.json();
    const total =
      json?.data?.user?.contributionsCollection?.contributionCalendar
        ?.totalContributions ?? null;
    return NextResponse.json({ contributions: total, source: "github" });
  } catch {
    return NextResponse.json({ contributions: null, source: "error" }, { status: 500 });
  }
}
