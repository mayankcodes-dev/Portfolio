"use client";

import { useState, useEffect } from "react";

interface HeroStats {
  problemsRaw: number;
  contributionsRaw: number;
  problems: string;
  contributions: string;
  loading: boolean;
}

const FALLBACK_PROBLEMS      = 510;
const FALLBACK_CONTRIBUTIONS = 1369;

function fmt(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(".0", "")}K`;
  return `${n}`;
}

export function useHeroStats(): HeroStats {
  const [problems,      setProblems]      = useState<number | null>(null);
  const [contributions, setContributions] = useState<number | null>(null);
  const [loading,       setLoading]       = useState(true);

  useEffect(() => {
    let cancelled = false;

    // Single fetch — new /api/stats returns both dsa + github in one request
    fetch("/api/stats")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: {
        dsa?: { totalSolved?: number };
        github?: { totalContributions?: number };
        leetcode?: number;
      } | null) => {
        if (cancelled || !data) return;
        const p = data?.dsa?.totalSolved ?? data?.leetcode ?? null;
        const c = data?.github?.totalContributions ?? null;
        setProblems(typeof p === "number" ? p : null);
        setContributions(typeof c === "number" ? c : null);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  const p = problems      ?? FALLBACK_PROBLEMS;
  const c = contributions ?? FALLBACK_CONTRIBUTIONS;

  return {
    problemsRaw:      p,
    contributionsRaw: c,
    problems:         fmt(p),
    contributions:    fmt(c),
    loading,
  };
}
