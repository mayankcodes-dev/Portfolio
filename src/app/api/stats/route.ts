import { NextResponse } from "next/server";

export const revalidate = 3600;

/* ── Verified fallback constants (as of Oct 2026) ─────────────────── */
const FB = {
  dsa: {
    totalSolved: 510,
    easy: 154,
    medium: 211,
    hard: 63,
    activeDays: 237,
    currentStreak: 102,
    maxStreak: 129,
    profileUrl: "https://codeyes.in/u/mayankcodes-dev",
    codolioUrl: "https://codolio.com/profile/mayankcodes-dev",
    platforms: { leetcode: 385, codechef: 79, geeksforgeeks: 42, atcoder: 3, codeforces: 1 },
  },
  github: {
    totalContributions: 1369,
    profileUrl: "https://github.com/mayankcodes-dev",
  },
};

/* ── Helpers ───────────────────────────────────────────────────────── */
function parseNum(s: string | undefined): number | null {
  if (!s) return null;
  const n = parseInt(s.replace(/,/g, ""), 10);
  return isNaN(n) ? null : n;
}

/* ── CodEyes SSR scrape ────────────────────────────────────────────── */
async function fetchCodEyes(): Promise<typeof FB.dsa | null> {
  try {
    const res = await fetch("https://codeyes.in/u/mayankcodes-dev", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const html = await res.text();

    const totalMatch  = html.match(/Solved\s+([\d,]+)/i) ??
                        html.match(/Total[^<:]*:\s*([\d,]+)/i);
    const easyMatch   = html.match(/Easy[^<>]*?>\s*([\d,]+)/i);
    const mediumMatch = html.match(/Medium[^<>]*?>\s*([\d,]+)/i);
    const hardMatch   = html.match(/Hard[^<>]*?>\s*([\d,]+)/i);
    const activeMatch = html.match(/Active\s+[Dd]ays[^<>]*?>\s*([\d,]+)/i);
    const streakMatch = html.match(/[Cc]urrent\s+[Ss]treak[^<>]*?>\s*([\d,]+)/i) ??
                        html.match(/Day\s+[Ss]treak[^<>]*?>\s*([\d,]+)/i);

    const total = parseNum(totalMatch?.[1]);
    // Sanity-check: reject obviously wrong parses
    if (!total || total < 50) return null;

    return {
      totalSolved:   total,
      easy:          parseNum(easyMatch?.[1])   ?? FB.dsa.easy,
      medium:        parseNum(mediumMatch?.[1]) ?? FB.dsa.medium,
      hard:          parseNum(hardMatch?.[1])   ?? FB.dsa.hard,
      activeDays:    parseNum(activeMatch?.[1]) ?? FB.dsa.activeDays,
      currentStreak: parseNum(streakMatch?.[1]) ?? FB.dsa.currentStreak,
      maxStreak:     FB.dsa.maxStreak,
      profileUrl:    FB.dsa.profileUrl,
      codolioUrl:    FB.dsa.codolioUrl,
      platforms:     FB.dsa.platforms,
    };
  } catch {
    return null;
  }
}

/* ── GitHub contributions total ───────────────────────────────────── */
async function fetchGitHubContributions(): Promise<number | null> {
  try {
    const res = await fetch(
      "https://github-contributions-api.jogruber.de/v4/mayankcodes-dev?y=last",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();

    // data.total may be: number | { lastYear: n } | { "2025": n, "2026": n }
    const t = data?.total;
    if (typeof t === "number") return t > 0 ? t : null;
    if (typeof t === "object" && t !== null) {
      if (typeof t.lastYear === "number" && t.lastYear > 0) return t.lastYear;
      const vals = Object.values(t) as number[];
      const sum  = vals.reduce<number>((a, b) => a + (typeof b === "number" ? b : 0), 0);
      return sum > 0 ? sum : null;
    }
    return null;
  } catch {
    return null;
  }
}

/* ── Route handler ────────────────────────────────────────────────── */
export async function GET() {
  const [codeyesResult, ghResult] = await Promise.allSettled([
    fetchCodEyes(),
    fetchGitHubContributions(),
  ]);

  const dsa = (codeyesResult.status === "fulfilled" ? codeyesResult.value : null) ?? FB.dsa;
  const contributions =
    (ghResult.status === "fulfilled" && ghResult.value !== null
      ? ghResult.value
      : null) ?? FB.github.totalContributions;

  return NextResponse.json(
    {
      dsa,
      github: { totalContributions: contributions, profileUrl: FB.github.profileUrl },
      // Legacy field for backward compat with any old code reading `.leetcode`
      leetcode: dsa.totalSolved,
    },
    {
      headers: {
        "Cache-Control": `public, s-maxage=${revalidate}, stale-while-revalidate=600`,
      },
    }
  );
}
