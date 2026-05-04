"use client";

import { useState, useEffect } from "react";

interface HeroStats {
  problems: string;
  contributions: string;
  loading: boolean;
}

function fmt(n: number | null, fallback: string): string {
  if (n === null) return fallback;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(".0", "")}K+`;
  return `${n}+`;
}

/** Race a promise against a timeout — returns null if timed out */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([
    promise,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ]);
}

export function useHeroStats(): HeroStats {
  const [problems, setProblems] = useState<number | null>(null);
  const [contributions, setContributions] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        // Fetch from public CORS-friendly APIs directly — no server round-trip
        // LeetCode: alfa-leetcode-api (more reliable than heroku endpoint)
        const lcFetch = fetch(
          "https://alfa-leetcode-api.onrender.com/coderMayank69/solved",
          { cache: "no-store" }
        )
          .then((r) => r.json())
          .then((d) => d?.solvedProblem ?? null)
          .catch(() => null);

        // GitHub contributions via free public API (no token needed)
        const ghFetch = fetch(
          "https://github-contributions-api.jogruber.de/v4/coderMayank69",
          { cache: "no-store" }
        )
          .then((r) => r.json())
          .then((d) => {
            // Returns { total: { "2024": N, ... }, contributions: [...] }
            if (d?.total) {
              return Object.values(d.total as Record<string, number>).reduce(
                (a, b) => a + b,
                0
              );
            }
            return null;
          })
          .catch(() => null);

        // 6-second timeout — show fallback if APIs are slow
        const [lc, gh] = await Promise.all([
          withTimeout(lcFetch, 6000),
          withTimeout(ghFetch, 6000),
        ]);

        if (cancelled) return;

        if (typeof lc === "number") setProblems(lc);
        if (typeof gh === "number") setContributions(gh);
      } catch {
        // silent — fallback values shown via fmt()
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    problems: fmt(problems, "450+"),
    contributions: fmt(contributions, "1.2K+"),
    loading,
  };
}
