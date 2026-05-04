import { NextResponse } from "next/server";

/**
 * Fetches LeetCode solved count via the unofficial stats API.
 * GET /api/stats?username=coderMayank69
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username") ?? "coderMayank69";

  try {
    const res = await fetch(
      `https://leetcode-stats-api.herokuapp.com/${username}`,
      { next: { revalidate: 3600 } } // cache 1 hour
    );
    if (!res.ok) throw new Error("leetcode api error");
    const data = await res.json();
    return NextResponse.json({
      leetcode: data.totalSolved ?? null,
      status: "ok",
    });
  } catch {
    return NextResponse.json({ leetcode: null, status: "error" }, { status: 500 });
  }
}
