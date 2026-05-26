"use client";

import { useEffect, useState, ReactNode } from "react";

// Terminal sequence simulating Next.js startup
type BootLine = {
  type: "cmd" | "out";
  text?: string;
  content?: ReactNode;
  delay: number;
};

const BOOT_LINES: BootLine[] = [
  { type: "cmd", text: "npm run dev", delay: 0 },
  { type: "out", text: "", delay: 1000 },
  { type: "out", text: "> codermayank69@0.1.0 dev", delay: 1000 },
  { type: "out", text: "> next dev", delay: 1100 },
  { type: "out", text: "", delay: 2400 }, // Slight delay after next dev
  {
    type: "out",
    content: <><span className="text-[#bc3fbc]">▲</span> Next.js 16.2.4 (Turbopack)</>,
    delay: 2500
  },
  { type: "out", text: "- Local:        http://localhost:3000", delay: 2600 },
  { type: "out", text: "- Network:      http://10.249.250.82:3000", delay: 2700 },
  {
    type: "out",
    content: <><span className="text-[#39d353]">✓</span> Ready in 3107ms</>,
    delay: 3000
  },
  { type: "out", text: "", delay: 3100 },
  {
    type: "out",
    content: <> GET /blog <span className="text-[#39d353]">200</span> in 441ms <span className="text-neutral-500">(next.js: 120ms, application-code: 280ms)</span></>,
    delay: 3400
  },
  { type: "out", text: "", delay: 3600 },
];

const TOTAL_DURATION = 4500; // ms before loader exits

export default function PageLoader() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typedCommand, setTypedCommand] = useState<string>("");
  const [exiting, setExiting] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    // Typewriter effect for "npm run dev"
    const cmdText = "npm run dev";
    let typeIndex = 0;
    const typingInterval = setInterval(() => {
      if (typeIndex <= cmdText.length) {
        setTypedCommand(cmdText.substring(0, typeIndex));
        typeIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80);

    const lineTimers = BOOT_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines(i + 1);
      }, line.delay)
    );

    const exitTimer = setTimeout(() => {
      setExiting(true);
      if (typeof window !== "undefined") {
        (window as any).__loaderFinished = true;
        window.dispatchEvent(new Event("loaderFinished"));
      }
    }, TOTAL_DURATION);
    const doneTimer = setTimeout(() => setDone(true), TOTAL_DURATION + 450);

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
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500 ${exiting ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      aria-label="Loading"
      role="status"
    >
      {/* Blueprint grid overlay for the background */}
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
        {/* Title bar */}
        <div className="flex items-center justify-between bg-[#2d2d2d] px-4 py-2.5">
          <div className="flex items-center gap-2">
            {/* Mac OS window controls */}
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#ffbd2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="text-xs text-neutral-300 font-sans flex-1 text-center pr-14">
            MINGW64: ~/OneDrive/Desktop/projects/codermayank69
          </div>
        </div>

        {/* Terminal body */}
        <div className="bg-[#0c0c0c] px-4 py-5 font-mono text-[13px] sm:text-[14px] min-h-[340px]">
          <div className="space-y-0.5">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => {
              const isLast = i === visibleLines - 1;
              return (
                <div key={i} className="py-0.5">
                  {line.type === "cmd" && (
                    <div className="mb-1 flex flex-col mt-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5 leading-none">
                        <span className="text-[#39d353]">Mayank@LAPTOP-VI7N8JMU</span>
                        <span className="text-[#bc3fbc]">MINGW64</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 leading-none">
                        <span className="text-[#e3b341]">~/OneDrive/Desktop/projects/codermayank69</span>
                        <span className="text-[#58a6ff]">(main)</span>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-white/90">
                    {line.type === "cmd" && <span className="text-white">$</span>}
                    {line.content ? (
                      <span className="leading-relaxed">{line.content}</span>
                    ) : (
                      <span className="whitespace-pre-wrap leading-relaxed">
                        {line.type === "cmd" ? typedCommand : line.text}
                      </span>
                    )}
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
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}