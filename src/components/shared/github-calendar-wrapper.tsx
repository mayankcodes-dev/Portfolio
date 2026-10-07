"use client";

import { useEffect, useState } from "react";
import { type Activity } from "react-activity-calendar";
import ActivityHeatmapCard from "./activity-heatmap-card";

const GITHUB_THEME = {
  light: ["#ebebeb", "#c6e6c8", "#74c47a", "#339a3e", "#1a6326"],
  dark:  ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

export default function GitHubCalendarWrapper() {
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [total,      setTotal]      = useState<number | null>(null);
  const [error,      setError]      = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/github-calendar")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`${r.status}`))))
      .then((json) => {
        if (cancelled) return;

        const contributions: { date: string; count: number; level: number }[] =
          json?.contributions ?? [];

        if (contributions.length === 0) {
          setError(true);
          return;
        }

        // Ensure start and end anchors exist for react-activity-calendar
        const now        = new Date();
        const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        const sorted = contributions
          .filter((a) => {
            const d = new Date(a.date);
            return d >= oneYearAgo && d <= now;
          })
          .sort((a, b) => a.date.localeCompare(b.date)) as Activity[];

        const startStr = oneYearAgo.toISOString().split("T")[0];
        const endStr   = now.toISOString().split("T")[0];
        if (sorted.length > 0 && sorted[0].date > startStr) {
          sorted.unshift({ date: startStr, count: 0, level: 0 });
        }
        if (sorted.length > 0 && sorted[sorted.length - 1].date < endStr) {
          sorted.push({ date: endStr, count: 0, level: 0 });
        }

        const yearTotal = sorted.reduce((s, a) => s + a.count, 0);
        setTotal(yearTotal);
        setActivities(sorted);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => { cancelled = true; };
  }, []);

  return (
    <ActivityHeatmapCard
      activities={activities}
      totalCount={total}
      label="GitHub Contributions"
      countLabel="{n} contributions in the last year"
      theme={GITHUB_THEME}
      error={error}
    />
  );
}
