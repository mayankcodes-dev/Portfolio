"use client";

import { useState, useEffect } from "react";

interface HeroStats {
  problems: string;
  contributions: string;
  loading: boolean;
}

const FALLBACK_PROBLEMS      = 711;
const FALLBACK_CONTRIBUTIONS = 2174;

function fmt(n: number | null, fallback: number): string {
  const val = n ?? fallback;
  if (val >= 1000) return `${(val / 1000).toFixed(1).replace(".0", "")}K`;
  return `${val}`;
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([
    promise,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ]);
}

export function useHeroStats(): HeroStats {
  const [problems, setProblems]           = useState<number | null>(null);
  const [contributions, setContributions] = useState<number | null>(null);
  const [loading, setLoading]             = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [leetcodeResult, githubResult] = await Promise.allSettled([
        withTimeout(
          fetch("/api/stats").then((r) => (r.ok ? r.json() : null)),
          7000
        ),
        withTimeout(
          fetch("/api/github-contributions").then((r) => (r.ok ? r.json() : null)),
          6000
        ),
      ]);

      if (cancelled) return;

      const leetcodeData = leetcodeResult.status === "fulfilled" ? leetcodeResult.value : null;
      const githubData   = githubResult.status  === "fulfilled" ? githubResult.value  : null;

      setProblems(leetcodeData?.leetcode ?? null);
      setContributions(githubData?.contributions ?? null);
      setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return {
    problems:      fmt(problems,      FALLBACK_PROBLEMS),
    contributions: fmt(contributions, FALLBACK_CONTRIBUTIONS),
    loading,
  };
}
