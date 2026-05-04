"use client";

/**
 * GitHubCalendar — client-only shim for next/dynamic.
 * react-github-calendar uses a named export, not a default export.
 */
import { GitHubCalendar as GitHubCalendarLib } from "react-github-calendar";
import type { Props as CalendarProps } from "react-github-calendar";

export default function GitHubCalendarWrapper(props: CalendarProps) {
  return <GitHubCalendarLib {...props} />;
}
