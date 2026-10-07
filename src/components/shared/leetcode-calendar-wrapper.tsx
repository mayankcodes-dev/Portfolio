"use client";

import { useEffect, useState } from "react";
import { ActivityCalendar, type Activity } from "react-activity-calendar";

export default function LeetCodeCalendar({ username: _username }: { username: string }) {
  const [data,  setData]  = useState<Activity[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // Fetch via our own Next.js API route (ISR-cached, no cold-start issues)
    fetch("/api/leetcode-calendar")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`${r.status}`))))
      .then((json) => {
        if (cancelled) return;

        // API returns { submissionCalendar: "{\"timestamp\": count, ...}" }
        const raw: Record<string, number> =
          typeof json.submissionCalendar === "string"
            ? JSON.parse(json.submissionCalendar)
            : json.submissionCalendar ?? {};

        if (Object.keys(raw).length === 0) {
          setError(true);
          return;
        }

        const now        = new Date();
        const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

        const activities: Activity[] = Object.entries(raw)
          .map(([ts, count]) => {
            const d       = new Date(Number(ts) * 1000);
            const dateStr = d.toISOString().split("T")[0];
            const level: 0 | 1 | 2 | 3 | 4 =
              count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 8 ? 3 : 4;
            return { date: dateStr, count, level } satisfies Activity;
          })
          .filter((a) => {
            const d = new Date(a.date);
            return d >= oneYearAgo && d <= now;
          })
          .sort((a, b) => a.date.localeCompare(b.date));

        // Pad start and end so react-activity-calendar renders the full year
        if (activities.length > 0) {
          const startStr = oneYearAgo.toISOString().split("T")[0];
          const endStr   = now.toISOString().split("T")[0];
          if (activities[0].date > startStr) {
            activities.unshift({ date: startStr, count: 0, level: 0 });
          }
          if (activities[activities.length - 1].date < endStr) {
            activities.push({ date: endStr, count: 0, level: 0 });
          }
        }

        const yearTotal = activities.reduce((s, a) => s + a.count, 0);
        setTotal(yearTotal);
        setData(activities.length > 0 ? activities : null);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => { cancelled = true; };
  }, []);

  if (error) {
    return (
      <p className="text-xs text-neutral-400 font-mono py-4">
        LeetCode data unavailable right now — check back soon.
      </p>
    );
  }

  if (!data) {
    return <div className="h-32 w-full animate-pulse rounded-lg bg-neutral-100" />;
  }

  return (
    <div className="overflow-x-auto">
      <ActivityCalendar
        data={data}
        colorScheme="light"
        theme={{
          light: ["#fafafa", "#fde8c8", "#f9b870", "#e07b20", "#b35a00"],
          dark:  ["#161b22", "#5a2d00", "#994500", "#d46a00", "#ff9900"],
        }}
        fontSize={12}
        blockSize={14}
        blockMargin={5}
        labels={{
          totalCount: `${total ?? 0} submissions in {{year}}`,
        }}
        showWeekdayLabels={false}
      />
    </div>
  );
}
