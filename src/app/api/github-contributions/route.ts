import { NextResponse } from "next/server";

const STATIC_FALLBACK = 2174;
const USERNAME = "mayankcodes-dev";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json({ contributions: STATIC_FALLBACK, source: "static" });
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query { user(login: "${USERNAME}") { contributionsCollection { contributionCalendar { totalContributions } } } }`,
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`GitHub API ${res.status}`);

    const json = await res.json();
    const total: number | null =
      json?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ?? null;

    if (total === null) throw new Error("null total");

    return NextResponse.json({ contributions: total, source: "github" });
  } catch {
    return NextResponse.json({ contributions: STATIC_FALLBACK, source: "static" });
  }
}
