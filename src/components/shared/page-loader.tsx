"use client";

import { useEffect, useState, ReactNode } from "react";

// Terminal sequence — matches real `npm run dev` output exactly
type BootLine = {
  type: "cmd" | "out";
  text?: string;
  content?: ReactNode;
  delay: number;
};

const BOOT_LINES: BootLine[] = [
  // ── The command itself (typed via typewriter effect) ──
  { type: "cmd", text: "npm run dev", delay: 0 },

  // ── npm output ──
  { type: "out", text: "", delay: 950 },
  { type: "out", text: "> mayank-developer@0.1.0 dev", delay: 1000 },
  { type: "out", text: "> next dev", delay: 1100 },
  { type: "out", text: "", delay: 1250 },

  // ── Next.js startup ──
  {
    type: "out",
    content: <><span className="text-[#bc3fbc]">▲</span> Next.js 16.2.4 (Turbopack)</>,
    delay: 2000,
  },
  { type: "out", text: "- Local:        http://localhost:3000",      delay: 2150 },
  { type: "out", text: "- Network:      http://10.85.193.82:3000",   delay: 2280 },

  // ── Suspense pause → "Ready" appears late to build anticipation ──
  {
    type: "out",
    content: <><span className="text-[#39d353]">✓</span> Ready in 1047ms</>,
    delay: 4100, // long pause = anticipation 🎯
  },
  { type: "out", text: "", delay: 4300 },

  // ── Compiling... (matches screenshot) ──
  {
    type: "out",
    content: <><span className="text-white/60">○</span> Compiling / ...</>,
    delay: 4700,
  },
];

// Total time before the loader fades out (must be after last line)
const TOTAL_DURATION = 5800;

export default function PageLoader() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typedCommand, setTypedCommand]  = useState<string>("");
  const [exiting, setExiting]            = useState<boolean>(false);
  const [done, setDone]                  = useState<boolean>(false);

  useEffect(() => {
    // ── Typewriter for "npm run dev" ──
    const cmdText = "npm run dev";
    let typeIndex = 0;
    const typingInterval = setInterval(() => {
      if (typeIndex <= cmdText.length) {
        setTypedCommand(cmdText.substring(0, typeIndex));
        typeIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 75);

    // ── Reveal each line on its scheduled delay ──
    const lineTimers = BOOT_LINES.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );

    // ── Fire loaderFinished event so counters can start ──
    const exitTimer = setTimeout(() => {
      setExiting(true);
      if (typeof window !== "undefined") {
        (window as any).__loaderFinished = true;
        window.dispatchEvent(new Event("loaderFinished"));
      }
    }, TOTAL_DURATION);

    // ── Fully unmount after fade-out ──
    const doneTimer = setTimeout(() => setDone(true), TOTAL_DURATION + 500);

    return () => {
      clearInterval(typingInterval);
      lineTimers.forEach(clearTimeout);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500 ${
        exiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Loading"
      role="status"
    >
      {/* Blueprint grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Terminal window */}
      <div className="relative w-full max-w-2xl mx-4 sm:mx-6 shadow-2xl rounded-lg overflow-hidden border border-neutral-300">

        {/* ── Title bar ── */}
        <div className="flex items-center justify-between bg-[#2d2d2d] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#ffbd2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="text-xs text-neutral-300 font-mono flex-1 text-center pr-14 select-none">
            MINGW64: /d/codermayank69
          </div>
        </div>

        {/* ── Terminal body ── */}
        <div className="bg-[#0c0c0c] px-4 py-5 font-mono text-[13px] sm:text-[14px] min-h-[320px]">
          <div className="space-y-0.5">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => {
              const isLast = i === visibleLines - 1;
              return (
                <div key={i} className="py-[1px]">

                  {/* Prompt line — single row matching the screenshot */}
                  {line.type === "cmd" && (
                    <div className="flex flex-wrap items-center gap-1.5 leading-none mb-1 mt-1">
                      <span className="text-[#39d353]">Mayank@LAPTOP-VI7N8JMU</span>
                      <span className="text-[#bc3fbc]">MINGW64</span>
                      <span className="text-[#e3b341]">/d/codermayank69</span>
                      <span className="text-[#58a6ff]">(main)</span>
                    </div>
                  )}

                  {/* Output / command text */}
                  <div className="flex items-center gap-2 text-white/90">
                    {line.type === "cmd" && <span className="text-white">$</span>}
                    {line.content ? (
                      <span className="leading-relaxed">{line.content}</span>
                    ) : (
                      <span className="whitespace-pre-wrap leading-relaxed">
                        {line.type === "cmd" ? typedCommand : line.text}
                      </span>
                    )}
                    {/* Blinking cursor on the last visible line */}
                    {isLast && (
                      <span className="inline-block h-3.5 w-[7px] animate-[blink_0.9s_step-end_infinite] bg-white/80" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}