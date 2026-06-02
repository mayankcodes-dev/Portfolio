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
  QuickStay            React · Node.js · Stripe       https://quick-stay-chi-two.vercel.app
  YelpCamp             Node · Express · MongoDB        https://yelpcamp-1-wcof.onrender.com
  Reducate University  Next.js · Tailwind              https://college-landing-page-lemon.vercel.app
  URL Shortener        Node · Docker                   https://url-shortner-9amn.vercel.app
  PayPilot-CodeBlitz   Next.js · Razorpay · MongoDB    https://v0-invoice-copilot-zeta.vercel.app
  Synapse Code Auditor Next.js · Tailwind              https://synapse-code-auditor.vercel.app
  ROYSES               MERN Stack                      https://royses.vercel.app

  → Run "ask about <project>" for full details`;

const CONTACT_TEXT = `
  Email     : admin@mayankcodes.dev
  GitHub    : https://github.com/mayankcodes-dev
  LinkedIn  : https://www.linkedin.com/in/mayankcodes-dev
  WhatsApp  : https://wa.me/message/4BKKNWXBQUQ7G1
  Portfolio : https://mayankcodes.dev
  Resume    : https://drive.google.com/file/d/1HH8bHTrCKS_YGufdW8zs5rgTZcf6xIp8/view`;

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

/* ─── URL detection regex ─── */
const URL_REGEX = /https?:\/\/[^\s,)\]>"'`]+/g;

/* ─── Clickable terminal link (Ctrl+click to open) ─── */
function TerminalLink({ href }: { href: string }) {
  const [hovered, setHovered] = useState(false);
  const [ctrlHeld, setCtrlHeld] = useState(false);

  useEffect(() => {
    const sync = (e: globalThis.KeyboardEvent) => setCtrlHeld(e.ctrlKey || e.metaKey);
    window.addEventListener("keydown", sync);
    window.addEventListener("keyup", sync);
    return () => {
      window.removeEventListener("keydown", sync);
      window.removeEventListener("keyup", sync);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      e.stopPropagation();
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {/* Tooltip */}
      {hovered && (
        <span
          style={{
            position: "absolute",
            bottom: "calc(100% + 5px)",
            left: 0,
            whiteSpace: "nowrap",
            background: "#1e1e1e",
            border: "1px solid #3a3a3a",
            borderRadius: 4,
            padding: "3px 8px",
            fontSize: 11,
            fontFamily: "inherit",
            color: ctrlHeld ? "#1eff00" : "#9e9e9e",
            pointerEvents: "none",
            zIndex: 50,
            lineHeight: 1.4,
          }}
        >
          {ctrlHeld ? "↗ open link" : "Ctrl+click to open link"}
        </span>
      )}
      {/* Link text */}
      <span
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          color: hovered && ctrlHeld ? "#79c0ff" : "#58a6ff",
          textDecoration: hovered ? "underline" : "none",
          textDecorationColor: "#58a6ff",
          textUnderlineOffset: "3px",
          cursor: ctrlHeld ? "pointer" : "text",
          transition: "color 0.1s ease",
        }}
      >
        {href}
      </span>
    </span>
  );
}

/** Parse plain text, wrapping http(s) URLs in <TerminalLink> */
function renderContent(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  URL_REGEX.lastIndex = 0;

  while ((match = URL_REGEX.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(<TerminalLink key={match.index} href={match[0]} />);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
}

/* ─── Prompt component ─── */
function Prompt() {
  return (
    <span className="flex-shrink-0 select-none text-[14px] leading-relaxed">
      <span style={{ color: "#1eff00" }}>visitor</span>
      <span style={{ color: "#ffffff" }}>@</span>
      <span style={{ color: "#ffffff" }}>portfolio</span>
      <span style={{ color: "#5fd7ff" }}> Home </span>
      <span style={{ color: "#ffff00" }}>~</span>
      <span style={{ color: "#00d7af" }}> (main)</span>
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
      className="w-full rounded-xl overflow-hidden"
      style={{
        fontFamily: "var(--font-mono, 'JetBrains Mono', 'Cascadia Code', 'Consolas', monospace)",
        border: "1px solid #2a2a2a",
        boxShadow: "0 0 0 1px #1a1a1a, 0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(0, 215, 175, 0.04)",
      }}
      onClick={focusInput}
    >
      {/* ── Title Bar ── */}
      <div
        className="flex items-center justify-between px-4 py-3 select-none"
        style={{ background: "#1e1e1e", borderBottom: "1px solid #333" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        </div>
        {/* Center title */}
        <div className="flex flex-col items-center">
          <span className="text-[11px] font-mono tracking-wide" style={{ color: "#9e9e9e" }}>
            <span style={{ color: "#1eff00" }}>visitor</span>
            <span style={{ color: "#ffffff" }}>@portfolio</span>
            <span style={{ color: "#5fd7ff" }}> Home </span>
            <span style={{ color: "#ffff00" }}>~/assistant</span>
            <span style={{ color: "#00d7af" }}> (main)</span>
          </span>
        </div>
        <span className="text-[11px] font-mono" style={{ color: "#4a4a4a" }}>bash — 120×40</span>
      </div>

      {/* ── Terminal Body ── */}
      <div
        ref={bodyRef}
        className="overflow-y-auto cursor-text"
        style={{
          height: "600px",
          background: "#0c0c0c",
          padding: "20px 28px 16px",
          /* Subtle scanline feel */
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.03) 1px, rgba(0,0,0,0.03) 2px)",
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
                    className="text-[14px] leading-relaxed break-all"
                    style={{ color: "#ffffff" }}
                  >
                    {line.content}
                  </span>
                </div>
              )}

              {/* ── Output / ai / info / error lines ── */}
              {line.type !== "input" && (
                <pre
                  className="text-[14px] leading-relaxed whitespace-pre-wrap break-words"
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
                  {renderContent(line.content)}
                </pre>
              )}

            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex items-center gap-2 mt-3">
              <span style={{ color: "#00d7af", fontSize: 14 }}>assistant</span>
              <span style={{ color: "#616161", fontSize: 14 }}>›</span>
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
            fontSize: 14,
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
  return <span style={{ color: "#e3b341", fontSize: 14 }}>{dots}</span>;
}
