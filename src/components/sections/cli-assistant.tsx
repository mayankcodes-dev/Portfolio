"use client";

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { motion } from "framer-motion";

/* ─── Types ─── */
type LineType = "input" | "output" | "error" | "success" | "info" | "ai";

interface TerminalLine {
  id: number;
  type: LineType;
  content: string;
}

/* ─── Built-in command responses ─── */
const HELP_TEXT = `Available commands:
  help        show this help message
  about       who is Mayank?
  skills      list skills & expertise
  projects    featured projects
  contact     get in touch
  clear       clear the terminal
  ask <msg>   ask the AI assistant anything`;

const ABOUT_TEXT = `Mayank Singh — Full-Stack Developer from Lucknow, India.
Specialises in the MERN stack, Next.js, and TypeScript.
Builds fast, polished web products — from e-commerce platforms
to developer tools. Open to freelance & contract work.`;

const SKILLS_TEXT = `Core:       React, JavaScript, TypeScript, Node.js, Next.js, Tailwind CSS
Backend:    Express.js, REST APIs, MongoDB, JWT, Nodemailer
DevOps:     Git, GitHub, Vercel, Docker, GitHub Actions, Firebase
AI & Tools: VS Code, Postman, OpenAI API, LangChain, Figma
Languages:  JavaScript(4), TypeScript(4), Java(4), Python(3), C(3), SQL(3)

Run "ask <question>" for detailed info on any skill.`;

const PROJECTS_TEXT = `Featured Projects:
  QuickStay          — Hotel booking platform (React + Node + Stripe)
                       https://quick-stay-chi-two.vercel.app
  YelpCamp           — Campground review app (Node + Express + MongoDB)
                       https://yelpcamp-1-wcof.onrender.com/
  Reducate University — College landing page (Next.js + Tailwind)
                       https://college-landing-page-lemon.vercel.app/
  URL Shortener      — Analytics & URL management (Node + Docker)
                       https://url-shortner-9amn.vercel.app/

Run "ask about <project>" for full details.`;

const CONTACT_TEXT = `Email:     admin@mayankcodes.dev
GitHub:    https://github.com/mayankcodes-dev
LinkedIn:  https://www.linkedin.com/in/mayankcodes-dev/
WhatsApp:  https://wa.me/message/4BKKNWXBQUQ7G1
Resume:    https://drive.google.com/file/d/1HH8bHTrCKS_YGufdW8zs5rgTZcf6xIp8/view`;

const WELCOME_TEXT = `Mayank's Portfolio Assistant v1.0.0
Type "help" to see available commands, or "ask <question>" to chat with the AI.`;

/* ─── Helpers ─── */
let lineIdCounter = 0;
const mkLine = (type: LineType, content: string): TerminalLine => ({
  id: lineIdCounter++,
  type,
  content,
});

/* ─── Component ─── */
export default function CliAssistant() {
  const [lines, setLines] = useState<TerminalLine[]>([mkLine("info", WELCOME_TEXT)]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  /* Auto-scroll to bottom */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, loading]);

  /* Focus input on click anywhere in terminal */
  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const pushLines = useCallback((...newLines: TerminalLine[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  /* ─── Command processor ─── */
  const handleCommand = useCallback(
    async (raw: string) => {
      const cmd = raw.trim();
      if (!cmd) return;

      /* Push input line */
      pushLines(mkLine("input", cmd));

      /* History */
      setHistory((prev) => [cmd, ...prev.slice(0, 49)]);
      setHistoryIdx(-1);
      setInput("");

      const lower = cmd.toLowerCase();

      if (lower === "clear") {
        setLines([mkLine("info", WELCOME_TEXT)]);
        return;
      }

      if (lower === "help") {
        pushLines(mkLine("output", HELP_TEXT));
        return;
      }

      if (lower === "about") {
        pushLines(mkLine("output", ABOUT_TEXT));
        return;
      }

      if (lower === "skills") {
        pushLines(mkLine("output", SKILLS_TEXT));
        return;
      }

      if (lower === "projects") {
        pushLines(mkLine("output", PROJECTS_TEXT));
        return;
      }

      if (lower === "contact") {
        pushLines(mkLine("output", CONTACT_TEXT));
        return;
      }

      if (lower.startsWith("ask ") || lower === "ask") {
        const query = cmd.slice(4).trim();
        if (!query) {
          pushLines(mkLine("error", 'Usage: ask <question>  e.g. ask What projects has Mayank built?'));
          return;
        }

        setLoading(true);
        try {
          const res = await fetch("/api/assistant", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
          });
          const data = await res.json();
          if (!res.ok) {
            pushLines(mkLine("error", data.error ?? "Request failed."));
          } else {
            pushLines(mkLine("ai", data.response));
          }
        } catch {
          pushLines(mkLine("error", "Network error. Please check your connection."));
        } finally {
          setLoading(false);
        }
        return;
      }

      /* Unknown command */
      pushLines(
        mkLine("error", `Command not found: ${cmd}. Type "help" to see available commands.`)
      );
    },
    [pushLines]
  );

  /* ─── Keyboard handler ─── */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault(); // prevent page scroll on Enter
        if (!loading) handleCommand(input);
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        const nextIdx = Math.min(historyIdx + 1, history.length - 1);
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx] ?? "");
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIdx = Math.max(historyIdx - 1, -1);
        setHistoryIdx(nextIdx);
        setInput(nextIdx === -1 ? "" : (history[nextIdx] ?? ""));
        return;
      }
    },
    [input, loading, history, historyIdx, handleCommand]
  );

  /* ─── Line color map ─── */
  const lineColor: Record<LineType, string> = {
    input: "text-white",
    output: "text-neutral-300",
    error: "text-red-400",
    success: "text-[#39d353]",
    info: "text-[#58a6ff]",
    ai: "text-[#e3b341]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full rounded-xl overflow-hidden border border-neutral-800 shadow-2xl"
      style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)" }}
      onClick={focusInput}
    >
      {/* ── Title Bar ── */}
      <div className="flex items-center justify-between bg-[#2d2d2d] px-4 py-2.5 select-none">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#ffbd2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[11px] text-neutral-400 font-mono tracking-wide">
          MINGW64: ~/assistant
        </span>
        <span className="text-[11px] text-neutral-500 font-mono">bash</span>
      </div>

      {/* ── Terminal Body ── */}
      <div
        ref={bodyRef}
        className="bg-[#0c0c0c] px-6 pt-5 pb-4 overflow-y-auto cursor-text"
        style={{ height: "500px" }}
      >
        {/* Output lines */}
        <div className="space-y-1">
          {lines.map((line) => (
            <div key={line.id}>
              {line.type === "input" && (
                <div className="flex items-start gap-2 mt-2">
                  {/* Prompt */}
                  <span className="flex-shrink-0 text-[13px] leading-relaxed">
                    <span className="text-[#39d353]">visitor</span>
                    <span className="text-neutral-500">@</span>
                    <span className="text-[#bc3fbc]">portfolio</span>
                    <span className="text-neutral-500"> ~ </span>
                    <span className="text-white">$</span>
                  </span>
                  <span className="text-white text-[13px] leading-relaxed break-all">
                    {line.content}
                  </span>
                </div>
              )}

              {line.type !== "input" && (
                <pre
                  className={`text-[13px] leading-relaxed whitespace-pre-wrap break-words ${lineColor[line.type]} mt-1`}
                >
                  {line.type === "ai" && (
                    <span className="text-[#bc3fbc] select-none">assistant › </span>
                  )}
                  {line.content}
                </pre>
              )}
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[#bc3fbc] text-[13px]">assistant</span>
              <span className="text-neutral-500 text-[13px]">›</span>
              <LoadingDots />
            </div>
          )}
        </div>

        <div ref={bottomRef} />
      </div>

      {/* ── Input Row ── */}
      <div className="bg-[#0c0c0c] border-t border-neutral-800 px-6 py-3 flex items-center gap-2">
        {/* Prompt prefix */}
        <span className="flex-shrink-0 text-[13px] whitespace-nowrap select-none">
          <span className="text-[#39d353]">visitor</span>
          <span className="text-neutral-500">@</span>
          <span className="text-[#bc3fbc]">portfolio</span>
          <span className="text-neutral-500"> ~ </span>
          <span className="text-white">$</span>
        </span>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder={loading ? "" : "type a command..."}
          className="flex-1 bg-transparent text-white text-[13px] outline-none placeholder:text-neutral-700 disabled:opacity-50 min-w-0"
        />

        {/* Blinking cursor when not typing */}
        {!loading && input === "" && (
          <span className="inline-block h-3.5 w-[7px] flex-shrink-0 animate-[blink_0.9s_step-end_infinite] bg-white/70" />
        )}
      </div>

      {/* Inline blink keyframe */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
}

/* ─── Animated loading dots ─── */
function LoadingDots() {
  const [dots, setDots] = useState(".");
  useEffect(() => {
    const t = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "." : d + "."));
    }, 380);
    return () => clearInterval(t);
  }, []);
  return <span className="text-[#e3b341] text-[13px]">{dots}</span>;
}
