"use client";

import { ActivityCalendar, type Activity, type ThemeInput } from "react-activity-calendar";

interface ActivityHeatmapCardProps {
  /** Data in react-activity-calendar Activity format */
  activities: Activity[] | null;
  /** Total count to show in the label (e.g. 1278) */
  totalCount: number | null;
  /** Card label shown above the calendar (e.g. "GitHub Contributions") */
  label: string;
  /** Activity label template — use {n} for the total count */
  countLabel: string;
  /** Heatmap colour theme */
  theme: ThemeInput;
  loading?: boolean;
  error?: boolean;
}

export default function ActivityHeatmapCard({
  activities,
  totalCount,
  label,
  countLabel,
  theme,
  loading = false,
  error = false,
}: ActivityHeatmapCardProps) {
  const displayTotal = totalCount ?? 0;

  return (
    <div className="rounded-xl border border-neutral-200 bg-[#F5F3F0] shadow-sm px-6 pt-5 pb-5">
      <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-4">
        {label}
      </p>

      {/* Loading skeleton */}
      {(loading || (!activities && !error)) && (
        <div className="h-[120px] w-full animate-pulse rounded-lg bg-neutral-200/60" />
      )}

      {/* Error state */}
      {error && !loading && (
        <p className="text-xs text-neutral-400 font-mono py-4">
          Data unavailable right now — check back soon.
        </p>
      )}

      {/* Calendar */}
      {activities && !loading && (
        <div className="overflow-x-auto">
          <ActivityCalendar
            data={activities}
            colorScheme="light"
            theme={theme}
            fontSize={12}
            blockSize={14}
            blockMargin={5}
            labels={{
              totalCount: countLabel.replace("{n}", String(displayTotal)),
            }}
            showWeekdayLabels={false}
          />
        </div>
      )}
    </div>
  );
}
