"use client";

import { useEffect, useState } from "react";

// The lines that "type out" in the loader terminal
const BOOT_LINES = [
  { text: "$ initializing portfolio...", delay: 0 },
  { text: "→ loading projects", delay: 320 },
  { text: "→ compiling skills", delay: 580 },
  { text: "→ fetching blog posts", delay: 840 },
  { text: "✓ ready", delay: 1100 },
];

const TOTAL_DURATION = 1900; // ms before loader exits

export default function PageLoader() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [exiting, setExiting] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    // Reveal terminal lines one by one — collect IDs for cleanup
    const lineTimers = BOOT_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines(i + 1);
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
      }, line.delay)
    );

    // Start exit animation
    const exitTimer = setTimeout(() => setExiting(true), TOTAL_DURATION);
    // Fully unmount after fade-out
    const doneTimer = setTimeout(() => setDone(true), TOTAL_DURATION + 450);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[oklch(0.03_0_0)] transition-opacity duration-500 ${exiting ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      aria-label="Loading"
      role="status"
    >
      {/* Blueprint grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 3%) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 3%) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.55 0.22 264 / 14%) 0%, transparent 70%)",
        }}
      />

      {/* Terminal card */}
      <div className="relative w-full max-w-md mx-6">
        {/* Window chrome */}
        <div className="flex items-center gap-2 rounded-t-xl border border-b-0 border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#ffbd2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs text-white/30 font-mono tracking-wider">
            mayank@portfolio ~ zsh
          </span>
        </div>

        {/* Terminal body */}
        <div className="rounded-b-xl border border-white/10 bg-black/60 px-5 py-5 backdrop-blur-sm">
          <div className="space-y-2 font-mono text-sm">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => {
              const isLast = i === visibleLines - 1;
              const isSuccess = line.text.startsWith("✓");
              return (
                <div
                  key={i}
                  className={`flex items-center gap-2 transition-all duration-200 ${isSuccess
                      ? "text-[oklch(0.93_0.22_122)]"
                      : isLast
                        ? "text-white/90"
                        : "text-white/45"
                    }`}
                >
                  <span>{line.text}</span>
                  {/* Blinking cursor only on the last visible line */}
                  {isLast && !isSuccess && (
                    <span className="inline-block h-4 w-[2px] animate-[blink_0.9s_step-end_infinite] bg-[oklch(0.93_0.22_122)]" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="mt-5 h-[2px] w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-[oklch(0.93_0.22_122)] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Bottom meta row */}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] font-mono text-white/25 tracking-widest uppercase">
              mayank · full-stack dev
            </span>
            <span className="text-[10px] font-mono text-[oklch(0.93_0.22_122)/70]">
              {progress}%
            </span>
          </div>
        </div>

        {/* Subtle glow under the card */}
        <div
          className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 h-10 w-3/4 blur-2xl rounded-full opacity-40"
          style={{ background: "oklch(0.93 0.22 122 / 30%)" }}
        />
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}