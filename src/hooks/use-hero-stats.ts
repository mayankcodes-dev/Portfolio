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

export function useHeroStats(): HeroStats {
  const [problems, setProblems] = useState<number | null>(null);
  const [contributions, setContributions] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [lcRes, ghRes] = await Promise.allSettled([
          fetch("/api/stats?username=coderMayank69").then((r) => r.json()),
          fetch("/api/github-contributions").then((r) => r.json()),
        ]);

        if (cancelled) return;

        if (lcRes.status === "fulfilled" && lcRes.value?.leetcode != null) {
          setProblems(lcRes.value.leetcode);
        }
        if (ghRes.status === "fulfilled" && ghRes.value?.contributions != null) {
          setContributions(ghRes.value.contributions);
        }
      } catch {
        // silent — fallback values shown
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return {
    problems: fmt(problems, "450+"),
    contributions: fmt(contributions, "1.2K+"),
    loading,
  };
}
