"use client";

/**
 * GitHub Calendar wrapper — client-only shim for next/dynamic.
 * react-github-calendar uses a named export {GitHubCalendar}, not default.
 */

import { GitHubCalendar as GitHubCalendarLib } from "react-github-calendar";
import type { Props as CalendarProps } from "react-github-calendar";

export default function GitHubCalendarWrapper(props: CalendarProps) {
  return <GitHubCalendarLib {...props} />;
}
