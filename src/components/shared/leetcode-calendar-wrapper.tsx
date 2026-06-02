"use client";

import { useState, useEffect } from "react";
import { ActivityCalendar } from "react-activity-calendar";

// ── Cache keys ──────────────────────────────────────────────────────────────
const CACHE_KEY      = "leetcode-calendar-cache-v1";
const CACHE_TIME_KEY = "leetcode-calendar-cache-time-v1";
const ONE_DAY_MS     = 24 * 60 * 60 * 1000;

interface LeetCodeCalendarProps {
  username: string;
}

interface CalendarData {
  date:  string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

/** Build a 366-day array filled with zeroes (today − 365 days … today).
 *  ActivityCalendar REQUIRES the data prop to always be non-empty and
 *  to cover a contiguous date range — passing [] throws a runtime error. */
function buildEmptyYear(): CalendarData[] {
  const list: CalendarData[] = [];
  for (let i = 365; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    list.push({ date: d.toISOString().split("T")[0], count: 0, level: 0 });
  }
  return list;
}

/** Merge real submission counts into the skeleton array. */
function applySubmissions(
  skeleton: CalendarData[],
  countsByDate: Record<string, number>
): CalendarData[] {
  return skeleton.map((entry) => {
    const count = countsByDate[entry.date] ?? 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count > 0 && count <= 2) level = 1;
    else if (count > 2 && count <= 4) level = 2;
    else if (count > 4 && count <= 8) level = 3;
    else if (count > 8) level = 4;
    return { date: entry.date, count, level };
  });
}

export default function LeetCodeCalendarWrapper({ username }: LeetCodeCalendarProps) {
  // Always pre-fill with a valid skeleton — prevents the empty-array crash
  const [data, setData] = useState<CalendarData[]>(buildEmptyYear);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      // ── 1. Try cache first ─────────────────────────────────────────────
      try {
        const cached    = localStorage.getItem(CACHE_KEY);
        const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
        if (cached && cacheTime && Date.now() - Number(cacheTime) < ONE_DAY_MS) {
          const parsed = JSON.parse(cached) as CalendarData[];
          if (!cancelled && Array.isArray(parsed) && parsed.length > 0) {
            setData(parsed);
            return;
          }
        }
      } catch {
        // cache read failure — fall through to API
      }

      // ── 2. Fetch live data from alfa-leetcode-api ──────────────────────
      try {
        const controller = new AbortController();
        const timeoutId  = setTimeout(() => controller.abort(), 5000);

        const res = await fetch(
          `https://alfa-leetcode-api.onrender.com/${username}/calendar`,
          { signal: controller.signal, cache: "no-store" }
        );
        clearTimeout(timeoutId);

        if (!res.ok) throw new Error(`API ${res.status}`);
        const raw = await res.json();

        if (cancelled) return;

        // submissionCalendar is a JSON-stringified object of { timestamp: count }
        const calObj: Record<string, number> = JSON.parse(
          raw.submissionCalendar ?? "{}"
        );

        // Convert Unix timestamps → "YYYY-MM-DD"
        const countsByDate: Record<string, number> = {};
        for (const [ts, cnt] of Object.entries(calObj)) {
          const dateStr = new Date(Number(ts) * 1000).toISOString().split("T")[0];
          countsByDate[dateStr] = (countsByDate[dateStr] ?? 0) + cnt;
        }

        const merged = applySubmissions(buildEmptyYear(), countsByDate);
        setData(merged);

        // Cache for tomorrow
        try {
          localStorage.setItem(CACHE_KEY,      JSON.stringify(merged));
          localStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
        } catch {
          // localStorage quota — not fatal
        }
      } catch {
        if (cancelled) return;

        // ── 3. Try stale cache as last resort ───────────────────────────
        try {
          const stale = localStorage.getItem(CACHE_KEY);
          if (stale) {
            const parsed = JSON.parse(stale) as CalendarData[];
            if (Array.isArray(parsed) && parsed.length > 0) {
              setData(parsed);
              return;
            }
          }
        } catch {
          // nothing more to do; skeleton data stays visible
        }
      }
    }

    loadData();
    return () => { cancelled = true; };
  }, [username]);

  return (
    <ActivityCalendar
      data={data}
      colorScheme="light"
      fontSize={12}
      blockSize={14}
      blockMargin={5}
      theme={{
        light: ["#ebebeb", "#ffe8cc", "#ffc080", "#ffa116", "#cc7a00"],
        dark:  ["#161b22", "#3d2c16", "#704f20", "#ffa116", "#ffb84d"],
      }}
    />
  );
}
