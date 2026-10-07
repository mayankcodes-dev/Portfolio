"use client";

import { useEffect, useState } from "react";
import { ActivityCalendar, type Activity } from "react-activity-calendar";

interface LeetCodeDay {
  date: string;
  count: number;
  level: number;
}

export default function LeetCodeCalendar({ username }: { username: string }) {
  const [data, setData] = useState<Activity[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://alfa-leetcode-api.onrender.com/${username}/calendar`, {
      signal: controller.signal,
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json) => {
        // API returns { submissionCalendar: "{\"timestamp\": count, ...}" }
        const raw: Record<string, number> =
          typeof json.submissionCalendar === "string"
            ? JSON.parse(json.submissionCalendar)
            : json.submissionCalendar ?? {};

        let yearTotal = 0;
        const now = new Date();
        const oneYearAgo = new Date(now);
        oneYearAgo.setFullYear(now.getFullYear() - 1);

        const activities: Activity[] = Object.entries(raw)
          .map(([ts, count]) => {
            const d = new Date(Number(ts) * 1000);
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

        // Fill any missing start/end days so react-activity-calendar won't throw
        if (activities.length > 0) {
          const first = new Date(activities[0].date);
          const last = new Date(activities[activities.length - 1].date);
          // Ensure we start from exactly one year ago
          if (first > oneYearAgo) {
            activities.unshift({ date: oneYearAgo.toISOString().split("T")[0], count: 0, level: 0 });
          }
          if (last < now) {
            activities.push({ date: now.toISOString().split("T")[0], count: 0, level: 0 });
          }
          yearTotal = activities.reduce((s, a) => s + a.count, 0);
        }

        setTotal(yearTotal);
        setData(activities.length > 0 ? activities : null);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      });

    return () => controller.abort();
  }, [username]);

  if (error || (data !== null && data.length === 0)) {
    return (
      <p className="text-xs text-neutral-400 font-mono py-2">
        LeetCode data unavailable right now.
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
          dark: ["#161b22", "#5a2d00", "#994500", "#d46a00", "#ff9900"],
        }}
        fontSize={12}
        blockSize={14}
        blockMargin={5}
        labels={{
          totalCount: `${total ?? 0} activities in {{year}}`,
        }}
        showWeekdayLabels={false}
      />
    </div>
  );
}
