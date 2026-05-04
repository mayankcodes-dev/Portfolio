"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ── Matrix rain canvas ── */
function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const isHead = drops[i] * fontSize > canvas.height * 0.7 * Math.random();
        ctx.fillStyle = isHead ? "#00ff9d" : `rgba(0,${100 + Math.floor(Math.random() * 155)},${50 + Math.floor(Math.random() * 60)},${0.3 + Math.random() * 0.5})`;
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 45);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-30"
      aria-hidden
    />
  );
}

/* ── Glitch text ── */
function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`relative inline-block select-none ${className}`} data-text={text}>
      {text}
      <style>{`
        @keyframes glitch1 {
          0%,100%{clip-path:inset(0 0 95% 0);transform:translate(-3px,0)}
          20%{clip-path:inset(40% 0 50% 0);transform:translate(3px,0)}
          40%{clip-path:inset(70% 0 15% 0);transform:translate(-2px,0)}
          60%{clip-path:inset(10% 0 80% 0);transform:translate(2px,0)}
          80%{clip-path:inset(55% 0 30% 0);transform:translate(-3px,0)}
        }
        @keyframes glitch2 {
          0%,100%{clip-path:inset(80% 0 5% 0);transform:translate(3px,0)}
          25%{clip-path:inset(20% 0 70% 0);transform:translate(-3px,0)}
          50%{clip-path:inset(60% 0 25% 0);transform:translate(2px,0)}
          75%{clip-path:inset(5% 0 90% 0);transform:translate(-2px,0)}
        }
        .glitch-wrap{position:relative;display:inline-block}
        .glitch-wrap::before,.glitch-wrap::after{
          content:attr(data-text);position:absolute;inset:0;
          display:inline-block;
        }
        .glitch-wrap::before{
          color:#ff003c;animation:glitch1 2.5s infinite linear;
          text-shadow:-2px 0 #ff003c;
        }
        .glitch-wrap::after{
          color:#00ff9d;animation:glitch2 2s infinite linear 0.5s;
          text-shadow:2px 0 #00ff9d;
        }
      `}</style>
    </span>
  );
}

/* ── Typing terminal ── */
function TypingLine({ text, delay = 0, speed = 40, onDone }: {
  text: string; delay?: number; speed?: number; onDone?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) { onDone?.(); return; }
    const t = setTimeout(
      () => setDisplayed(text.slice(0, displayed.length + 1)),
      speed + Math.random() * 30
    );
    return () => clearTimeout(t);
  }, [started, displayed, text, speed, onDone]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && started && (
        <span className="animate-pulse text-[#00ff9d]">█</span>
      )}
    </span>
  );
}

const TERMINAL_LINES = [
  { text: "$ sudo access /target/route", color: "#00ff9d", delay: 200 },
  { text: "> Scanning entry points...", color: "#888", delay: 1200 },
  { text: "> Route not found in manifest", color: "#ff4466", delay: 2400 },
  { text: "> STATUS: 404 — ROUTE_UNDEFINED", color: "#ff003c", delay: 3600 },
  { text: "> Tracing origin... [FAILED]", color: "#888", delay: 4800 },
  { text: "$ whoami → coderMayank69", color: "#00ff9d", delay: 6000 },
];

export default function NotFound() {
  const [visibleLines, setVisibleLines] = useState(0);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#020c02] text-[#00ff9d] px-6">

      {/* Matrix rain */}
      <MatrixCanvas />

      {/* Scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        }}
        aria-hidden
      />

      {/* Green screen vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,10,0,0.85) 100%)",
        }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-20 w-full max-w-2xl">

        {/* Top status bar */}
        <div className="mb-6 flex items-center justify-between font-mono text-[10px] text-[#00ff9d]/50 border-b border-[#00ff9d]/10 pb-3">
          <span>SYSTEM: MAYANK_DEV_OS v2.6.0</span>
          <span className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ff003c] animate-pulse" />
            BREACH DETECTED
          </span>
        </div>

        {/* 404 glitch headline */}
        <div className="text-center mb-2">
          <div
            className="font-mono font-black leading-none select-none glitch-wrap"
            data-text="404"
            style={{
              fontSize: "clamp(5rem, 20vw, 12rem)",
              color: "#00ff9d",
              textShadow: "0 0 20px #00ff9d88, 0 0 60px #00ff9d44",
              letterSpacing: "-0.04em",
            }}
          >
            <GlitchText text="404" />
            <style>{`
              .glitch-wrap::before,.glitch-wrap::after{font-size:inherit;font-weight:inherit;line-height:inherit;letter-spacing:inherit;}
            `}</style>
          </div>
        </div>

        <p
          className="text-center font-mono text-sm mb-8 tracking-widest uppercase"
          style={{ color: "#ff4466", textShadow: "0 0 10px #ff446688" }}
        >
          ACCESS_DENIED :: ROUTE_NOT_FOUND
        </p>

        {/* Terminal window */}
        <div
          className="rounded-lg border border-[#00ff9d]/20 overflow-hidden"
          style={{ background: "rgba(0,20,5,0.7)", backdropFilter: "blur(12px)" }}
        >
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#00ff9d]/10"
            style={{ background: "rgba(0,255,157,0.04)" }}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-[11px] text-[#00ff9d]/50">
              root@mayank-dev — bash — 80×24
            </span>
          </div>

          {/* Terminal body */}
          <div className="px-5 py-4 space-y-1.5 min-h-[180px]">
            {TERMINAL_LINES.slice(0, visibleLines + 1).map((line, i) => (
              <p key={i} className="font-mono text-[13px] leading-relaxed">
                <TypingLine
                  text={line.text}
                  delay={i === 0 ? line.delay : 0}
                  onDone={() => {
                    if (i === visibleLines && i < TERMINAL_LINES.length - 1) {
                      setTimeout(() => setVisibleLines((v) => v + 1), 200);
                    }
                  }}
                />
              </p>
            ))}
          </div>
        </div>

        {/* Action links */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group relative font-mono text-sm px-6 py-3 rounded border border-[#00ff9d]/40 text-[#00ff9d] overflow-hidden transition-all duration-300 hover:border-[#00ff9d] hover:text-black"
            style={{ textShadow: "0 0 8px #00ff9d88" }}
          >
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"
              style={{ background: "#00ff9d" }}
              aria-hidden
            />
            <span className="relative">▶ ./return_home.sh</span>
          </Link>

          <Link
            href="/projects"
            className="font-mono text-sm px-6 py-3 rounded border border-[#00ff9d]/20 text-[#00ff9d]/60 hover:text-[#00ff9d] hover:border-[#00ff9d]/50 transition-all duration-300"
          >
            ls /projects
          </Link>

          <Link
            href="/contact"
            className="font-mono text-sm px-6 py-3 rounded border border-[#00ff9d]/20 text-[#00ff9d]/60 hover:text-[#00ff9d] hover:border-[#00ff9d]/50 transition-all duration-300"
          >
            ping ./contact
          </Link>
        </div>

        {/* Bottom meta */}
        <div className="mt-10 text-center font-mono text-[10px] text-[#00ff9d]/25 tracking-widest">
          MAYANK_DEV · {new Date().getFullYear()} · ALL SYSTEMS COMPROMISED
        </div>
      </div>

      {/* Glitch keyframes */}
      <style>{`
        @keyframes flicker {
          0%,100%{opacity:1}
          41%{opacity:1}
          42%{opacity:0.7}
          43%{opacity:1}
          75%{opacity:1}
          76%{opacity:0.85}
          77%{opacity:1}
        }
        main{animation:flicker 8s infinite}
      `}</style>
    </main>
  );
}
