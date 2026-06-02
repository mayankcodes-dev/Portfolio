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

/* ─── Git Bash exact color palette ─── */
// user  → #1eff00 (bright green)
// @host → #ffffff (white)
// MINGW64 → #5fd7ff (bright cyan-blue)
// path  → #ffff00 (yellow, bold) — but we'll use white for cleanliness
// (branch) → #00d7af (teal)
// $     → #ffffff (white)
// output → #d4d4d4 (light grey)
// error  → #ff5555 (red)
// ai reply → #e3b341 (amber)
// info   → #5fd7ff (cyan-blue)

/* ─── Built-in command responses ─── */
const HELP_TEXT = `
  COMMAND         DESCRIPTION
  ─────────────────────────────────────────────────
  help            show this help message
  about           who is Mayank?
  skills          list skills & expertise
  projects        featured projects
  contact         get in touch
  clear           clear the terminal
  ask <msg>       ask the AI assistant anything

  EXAMPLES
  ─────────────────────────────────────────────────
  ask What tech stack does Mayank use?
  ask Tell me about the QuickStay project
  ask Is Mayank available for freelance?`;

const ABOUT_TEXT = `
  Mayank Singh — Full-Stack Developer
  Location : Lucknow, India
  Email    : admin@mayankcodes.dev
  Focus    : MERN stack · Next.js · TypeScript

  Builds fast, polished web products — from e-commerce
  platforms to developer tools. Open to freelance & 
  contract work.`;

const SKILLS_TEXT = `
  CATEGORY        SKILLS
  ────────────────────────────────────────────────────
  Core          : React · JavaScript · TypeScript · Node.js
                  Next.js · Tailwind CSS
  Backend       : Express.js · REST APIs · MongoDB · JWT
                  Nodemailer · GraphQL
  Databases     : MongoDB · PostgreSQL · MySQL · Redis
                  Cloudinary · AWS S3
  DevOps        : Git · GitHub · Vercel · Docker · Firebase
                  GitHub Actions · NGINX
  Languages     : JavaScript(★★★★) TypeScript(★★★★)
                  Java(★★★★) Python(★★★) C(★★★)
  AI & Tools    : VS Code · Postman · Figma · Photoshop
                  OpenAI API · LangChain

  → Run "ask <skill>" for deeper detail`;

const PROJECTS_TEXT = `
  PROJECT              STACK                          LIVE
  ──────────────────────────────────────────────────────────────────
  QuickStay            React · Node.js · Stripe       quick-stay-chi-two.vercel.app
  YelpCamp             Node · Express · MongoDB        yelpcamp-1-wcof.onrender.com
  Reducate University  Next.js · Tailwind              college-landing-page-lemon.vercel.app
  URL Shortener        Node · Docker                   url-shortner-9amn.vercel.app
  PayPilot-CodeBlitz   Next.js · Razorpay · MongoDB    v0-invoice-copilot-zeta.vercel.app
  Synapse Code Auditor Next.js · Tailwind              synapse-code-auditor.vercel.app
  ROYSES               MERN Stack                      royses.vercel.app

  → Run "ask about <project>" for full details`;

const CONTACT_TEXT = `
  Email     : admin@mayankcodes.dev
  GitHub    : github.com/mayankcodes-dev
  LinkedIn  : linkedin.com/in/mayankcodes-dev
  WhatsApp  : wa.me/message/4BKKNWXBQUQ7G1
  Portfolio : mayank-developer.vercel.app
  Resume    : drive.google.com/file/d/1HH8bHTrCKS_YGufdW8zs5rgTZcf6xIp8/view`;

const WELCOME_LINES = [
  "Mayank's Portfolio AI Assistant  v1.0.0",
  "─────────────────────────────────────────────────",
  'Type "help" to see commands, or "ask <question>" to chat with the AI.',
];

/* ─── Helpers ─── */
let lineIdCounter = 0;
const mkLine = (type: LineType, content: string): TerminalLine => ({
  id: lineIdCounter++,
  type,
  content,
});

/* ─── Prompt component ─── */
function Prompt() {
  return (
    <span className="flex-shrink-0 select-none text-[13px] leading-relaxed">
      {/* Mayank → bright green like Git Bash username */}
      <span style={{ color: "#1eff00" }}>visitor</span>
      {/* @LAPTOP-... → white */}
      <span style={{ color: "#ffffff" }}>@</span>
      <span style={{ color: "#ffffff" }}>portfolio</span>
      {/* MINGW64 → bright blue */}
      <span style={{ color: "#5fd7ff" }}> MINGW64 </span>
      {/* path → yellow (like git bash path) */}
      <span style={{ color: "#ffff00" }}>~</span>
      {/* (branch) → teal */}
      <span style={{ color: "#00d7af" }}> (main)</span>
      {/* $ → white */}
      <span style={{ color: "#ffffff" }}>{" $"}</span>
    </span>
  );
}

/* ─── Component ─── */
export default function CliAssistant() {
  const [lines, setLines] = useState<TerminalLine[]>(
    WELCOME_LINES.map((l) => mkLine("info", l))
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef  = useRef<HTMLDivElement>(null);

  /* ─── Scroll ONLY the terminal body, never the page ─── */
  const scrollToBottom = useCallback(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, loading, scrollToBottom]);

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

      pushLines(mkLine("input", cmd));
      setHistory((prev) => [cmd, ...prev.slice(0, 49)]);
      setHistoryIdx(-1);
      setInput("");

      const lower = cmd.toLowerCase();

      if (lower === "clear") {
        setLines(WELCOME_LINES.map((l) => mkLine("info", l)));
        return;
      }
      if (lower === "help")     { pushLines(mkLine("output",  HELP_TEXT));     return; }
      if (lower === "about")    { pushLines(mkLine("output",  ABOUT_TEXT));    return; }
      if (lower === "skills")   { pushLines(mkLine("output",  SKILLS_TEXT));   return; }
      if (lower === "projects") { pushLines(mkLine("output",  PROJECTS_TEXT)); return; }
      if (lower === "contact")  { pushLines(mkLine("output",  CONTACT_TEXT));  return; }

      if (lower.startsWith("ask ") || lower === "ask") {
        const query = cmd.slice(4).trim();
        if (!query) {
          pushLines(mkLine("error", "Usage: ask <question>  e.g.  ask What projects has Mayank built?"));
          return;
        }
        setLoading(true);
        try {
          const res  = await fetch("/api/assistant", {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({ query }),
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

      pushLines(mkLine("error", `bash: ${cmd}: command not found`));
    },
    [pushLines]
  );

  /* ─── Keyboard handler — e.preventDefault() stops page scroll ─── */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (!loading) handleCommand(input);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const next = Math.min(historyIdx + 1, history.length - 1);
        setHistoryIdx(next);
        setInput(history[next] ?? "");
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.max(historyIdx - 1, -1);
        setHistoryIdx(next);
        setInput(next === -1 ? "" : (history[next] ?? ""));
        return;
      }
    },
    [input, loading, history, historyIdx, handleCommand]
  );

  /* ─── Output line colors (matching real terminal palette) ─── */
  const lineStyle: Record<LineType, React.CSSProperties> = {
    input:   { color: "#ffffff" },
    output:  { color: "#d4d4d4" },
    error:   { color: "#ff5555" },
    success: { color: "#1eff00" },
    info:    { color: "#5fd7ff" },
    ai:      { color: "#e3b341" },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full rounded-xl overflow-hidden shadow-2xl"
      style={{
        fontFamily: "var(--font-mono, 'JetBrains Mono', 'Cascadia Code', 'Consolas', monospace)",
        border: "1px solid #3a3a3a",
        boxShadow: "0 0 0 1px #222, 0 25px 50px rgba(0,0,0,0.7)",
      }}
      onClick={focusInput}
    >
      {/* ── Title Bar ── */}
      <div
        className="flex items-center justify-between px-4 py-2.5 select-none"
        style={{ background: "#2d2d2d", borderBottom: "1px solid #444" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <span className="text-[11px] font-mono tracking-wide" style={{ color: "#9e9e9e" }}>
          MINGW64:~/assistant — bash
        </span>
        <span className="text-[11px] font-mono" style={{ color: "#616161" }}>bash</span>
      </div>

      {/* ── Terminal Body ── */}
      <div
        ref={bodyRef}
        className="overflow-y-auto cursor-text"
        style={{
          height: "500px",
          background: "#0c0c0c",
          padding: "20px 24px 16px",
        }}
      >
        <div className="space-y-0.5">
          {lines.map((line) => (
            <div key={line.id}>

              {/* ── Input line (with prompt) ── */}
              {line.type === "input" && (
                <div className="flex items-start gap-2 mt-3">
                  <Prompt />
                  <span
                    className="text-[13px] leading-relaxed break-all"
                    style={{ color: "#ffffff" }}
                  >
                    {line.content}
                  </span>
                </div>
              )}

              {/* ── Output / ai / info / error lines ── */}
              {line.type !== "input" && (
                <pre
                  className="text-[13px] leading-relaxed whitespace-pre-wrap break-words"
                  style={{
                    ...lineStyle[line.type],
                    marginTop: line.type === "info" ? 0 : "4px",
                  }}
                >
                  {/* AI prefix badge */}
                  {line.type === "ai" && (
                    <span style={{ color: "#00d7af" }}>assistant › </span>
                  )}
                  {/* Error prefix */}
                  {line.type === "error" && (
                    <span style={{ color: "#ff5555" }}></span>
                  )}
                  {line.content}
                </pre>
              )}

            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex items-center gap-2 mt-3">
              <span style={{ color: "#00d7af", fontSize: 13 }}>assistant</span>
              <span style={{ color: "#616161", fontSize: 13 }}>›</span>
              <LoadingDots />
            </div>
          )}
        </div>
      </div>

      {/* ── Input Row ── */}
      <div
        className="flex items-center gap-2 px-6 py-3"
        style={{
          background: "#0c0c0c",
          borderTop: "1px solid #2a2a2a",
        }}
      >
        <Prompt />

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
          className="flex-1 bg-transparent outline-none min-w-0"
          style={{
            color: "#ffffff",
            fontSize: 13,
            caretColor: "#1eff00",
          }}
        />

        {/* Blinking block cursor */}
        {!loading && input === "" && (
          <span
            className="inline-block flex-shrink-0"
            style={{
              width: 8,
              height: 15,
              background: "#1eff00",
              animation: "termCaret 0.9s step-end infinite",
              opacity: 0.85,
            }}
          />
        )}
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes termCaret {
          0%, 100% { opacity: 0.85; }
          50%       { opacity: 0; }
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
  return <span style={{ color: "#e3b341", fontSize: 13 }}>{dots}</span>;
}
