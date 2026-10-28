﻿"use client";

import { useLayoutEffect, useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ArrowRight, Award, Mail, MapPin, ExternalLink, Copy, Check, Terminal, VolumeX } from "lucide-react";
import { useHeroStats } from "@/hooks/use-hero-stats";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import SkillsSection from "@/components/sections/skills-section";
import ProjectsSection from "@/components/sections/projects-section";
import CliAssistant from "@/components/sections/cli-assistant";
import { certificates } from "@/data/certificates";
import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(
  () => import("@/components/shared/github-calendar-wrapper"),
  { ssr: false, loading: () => <div className="rounded-xl border border-neutral-200 bg-[#F5F3F0] shadow-sm h-[172px] animate-pulse mb-6" /> }
);

const LeetCodeCalendar = dynamic(
  () => import("@/components/shared/leetcode-calendar-wrapper"),
  { ssr: false, loading: () => <div className="rounded-xl border border-neutral-200 bg-[#F5F3F0] shadow-sm h-[172px] animate-pulse mb-6" /> }
);




gsap.registerPlugin(ScrollToPlugin);

/* â”€â”€â”€ Socials â”€â”€â”€ */
const SOCIALS = [
  {
    href: "https://github.com/mayankcodes-dev",
    label: "GitHub",
    path: "M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z",
    hoverClass: "hover:text-[#24292e] hover:border-[#24292e]/40",
  },
  {
    href: "https://www.linkedin.com/in/mayankcodes-dev/",
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    hoverClass: "hover:text-[#0A66C2] hover:border-[#0A66C2]/40",
  },
  {
    href: "https://codolio.com/profile/mayankcodes-dev",
    label: "DSA",
    path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z",
    hoverClass: "hover:text-[#f57c00] hover:border-[#f57c00]/40",
  },
  {
    href: "https://mayankcodes-dev.hashnode.dev/",
    label: "Blog",
    path: "M13.205.043a13.01 13.01 0 0 0-9.23 3.816A13.038 13.038 0 0 0 .043 13.1c.066 7.18 5.984 12.998 13.162 12.998 7.117 0 13.018-5.836 13.018-13.021 0-7.228-5.877-13.077-13.018-13.034zm1.245 16.918a3.437 3.437 0 0 1-4.864 0 3.44 3.44 0 0 1 0-4.865 3.438 3.438 0 0 1 4.864 0 3.44 3.44 0 0 1 0 4.865z",
    hoverClass: "hover:text-[#2962FF] hover:border-[#2962FF]/40",
  },
  {
    href: "mailto:admin@mayankcodes.dev",
    label: "Email",
    path: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z",
    hoverClass: "hover:text-[#EA4335] hover:border-[#EA4335]/40",
  },
  {
    href: "https://drive.google.com/file/d/1HH8bHTrCKS_YGufdW8zs5rgTZcf6xIp8/view?usp=sharing",
    label: "Resume",
    path: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6zm2-5h8v1.5H8V15zm0-3h8v1.5H8V12zm0-3h4v1.5H8V9z",
    hoverClass: "hover:text-[#0F9D58] hover:border-[#0F9D58]/40",
  },
];

/* â”€â”€â”€ Fade-up variant helper â”€â”€â”€ */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay } },
});

/* â”€â”€â”€ CountUp hook â”€â”€â”€ */
function useCountUp(target: number, duration = 1400, trigger = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!target || !trigger) {
      if (!trigger) setCount(0);
      return;
    }
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, trigger]);
  return count;
}

/* â”€â”€â”€ Section wrapper (scroll-triggered) â”€â”€â”€ */
function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const heroRightRef = useRef<HTMLDivElement>(null);
  const heroPhotoRef = useRef<HTMLDivElement>(null);
  const stats = useHeroStats();

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  const [loaderDone, setLoaderDone] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [isTerminalFullScreen, setIsTerminalFullScreen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText("admin@mayankcodes.dev");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ((window as Window & { __loaderFinished?: boolean }).__loaderFinished) {
        setLoaderDone(true);
        return;
      }
      const handleLoaderFinished = () => setLoaderDone(true);
      window.addEventListener("loaderFinished", handleLoaderFinished);
      return () => window.removeEventListener("loaderFinished", handleLoaderFinished);
    }
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent;
      setIsTerminalFullScreen(ce.detail === true ? true : (prev: boolean) => !prev);
    };
    window.addEventListener('toggle-terminal-fullscreen', handler);
    return () => window.removeEventListener('toggle-terminal-fullscreen', handler);
  }, []);

  useEffect(() => {
    if (!loaderDone) return;
    const audio = new Audio('/music.mp3');
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;
    audio.play().then(() => setMusicPlaying(true)).catch(() => setMusicPlaying(false));
    return () => { audio.pause(); audio.src = ''; };
  }, [loaderDone]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) { audioRef.current.pause(); setMusicPlaying(false); }
    else { audioRef.current.play().catch(() => {}); setMusicPlaying(true); }
  };

  // Animated stat counters (count up from 0 when data loads, element is in view, and loader finishes)
  const problemsCount      = useCountUp(stats.loading ? 0 : stats.problemsRaw,      1400, statsInView && !stats.loading && loaderDone);
  const contributionsCount = useCountUp(stats.loading ? 0 : stats.contributionsRaw, 1400, statsInView && !stats.loading && loaderDone);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
    e.currentTarget.style.setProperty("--spotlight-opacity", "1");
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--spotlight-opacity", "0");
  };

  useLayoutEffect(() => {
    // Hero entrance animation
    if (heroRightRef.current) {
      gsap.from(heroRightRef.current, { opacity: 0, y: 32, duration: 0.8, ease: "power3.out" });
    }
  }, []);

  const scrollTo = (id: string) =>
    gsap.to(window, { duration: 1, ease: "power2.inOut", scrollTo: { y: `#${id}`, offsetY: 80 } });

  return (
    <div ref={rootRef} className="w-full bg-black overflow-x-hidden">
      <Navbar />
      {/* â”€â”€ White content wrapper â€” scales via CSS scroll-driven animation â”€â”€ */}
      <div
        className="relative w-full bg-[#F5F3F0] text-[#0a0a0a] overflow-hidden footer-scale-wrapper"
        style={{ transformOrigin: "bottom center" }}
      >

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ HERO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <main
        id="hero"
        className="relative w-full bg-[#F5F3F0]"
        style={{ minHeight: "100dvh" }}
      >
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid opacity-[0.18] pointer-events-none" aria-hidden />

        {/* Main grid: [sidebar] | content | photo */}
        <div
          className="relative mx-auto max-w-[1600px] grid grid-cols-1 lg:grid-cols-[500px_1fr] xl:grid-cols-[72px_540px_1fr]"
          style={{ minHeight: "100dvh" }}
        >

          {/* â”€â”€ SIDEBAR â€” vertical labels & line (xl+ only) â”€â”€ */}
          <div className="hidden xl:flex flex-col items-center justify-center border-r border-neutral-100 select-none font-mono relative" style={{ height: "100dvh", position: "sticky", top: 0 }}>
            <div className="flex flex-col items-center gap-24">
              {/* Static label */}
              <span className="uppercase tracking-[0.22em] -rotate-90 whitespace-nowrap origin-center text-neutral-400 text-[9px]">
                Full-Stack Developer
              </span>

              {/* Vertical line below */}
              <div className="w-px h-24 bg-neutral-300" />
            </div>
          </div>

          {/* â”€â”€ CONTENT COLUMN â”€â”€ */}
          <div ref={heroRightRef} className="flex flex-col justify-between pt-32 pb-12 lg:pt-40 lg:pb-16 z-10 px-8 md:px-14 lg:pl-14 lg:pr-8 xl:pl-16 xl:pr-10 relative h-full">
            <div className="flex-1 flex flex-col justify-center">
              {/* Live stats row */}
              <motion.div
                ref={statsRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex justify-between gap-4 mb-12 lg:mb-16 max-w-[180px] sm:max-w-[210px]"
              >
                <div className="flex flex-col group cursor-default">
                  <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0a0a0a] leading-none tabular-nums">
                    {stats.loading ? "â€”" : problemsCount}
                  </span>
                  <span className="text-[12.5px] font-sans text-neutral-400 uppercase tracking-[0.18em] mt-2">
                    DSA Solved
                  </span>
                </div>
                <div className="flex flex-col group cursor-default">
                  <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0a0a0a] leading-none tabular-nums">
                    {stats.loading ? "â€”" : contributionsCount}
                  </span>
                  <span className="text-[12.5px] font-sans text-neutral-400 uppercase tracking-[0.18em] mt-2">
                    Contributions
                  </span>
                </div>
              </motion.div>

              {/* Giant Hello + wave */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1
                  className="font-black tracking-[-0.04em] leading-[0.88] text-[#0a0a0a] select-none text-[8.5rem] sm:text-[10rem] md:text-[11rem] lg:text-[12rem] xl:text-[13.5rem]"
                >
                  Hello.{" "}
                  {/* Show wave only when photo column is hidden (< lg) */}
                  <span
                    className="inline-block wave-once lg:hidden"
                    aria-hidden="true"
                    style={{
                      transformOrigin: "70% 80%",
                      verticalAlign: "middle",
                      marginBottom: "0.06em",
                    }}
                  >
                    ðŸ‘‹
                  </span>
                </h1>
              </motion.div>

              {/* Static subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 text-neutral-500 text-base md:text-lg leading-relaxed font-sans font-light whitespace-nowrap"
              >
                I&apos;m Mayank, a software tinkerer obsessed with the craft.
              </motion.p>

              {/* Social icons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex items-center flex-wrap gap-2.5"
              >
                {SOCIALS.map(({ href, label, path, hoverClass }) => (
                  <div key={label} className="relative group/tip">
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#0a0a0a] px-2 py-1 text-[10px] font-mono text-white opacity-0 transition-opacity duration-150 group-hover/tip:opacity-100 z-50 font-sans">
                      {label}
                    </span>
                    <motion.a
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      aria-label={label}
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.92 }}
                      className={`grid size-10 place-items-center rounded-xl border border-neutral-200 bg-[#F5F3F0] text-neutral-500 transition-all duration-200 shadow-sm hover:shadow-md ${hoverClass}`}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="size-[15px]" aria-hidden>
                        <path d={path} />
                      </svg>
                    </motion.a>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Scroll hint at the bottom & availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="mt-16 flex items-center gap-5 text-neutral-400"
            >
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="text-[11px] font-mono uppercase tracking-widest cursor-pointer hover:text-black transition-colors flex-shrink-0"
                onClick={() => scrollTo("skills")}
              >
                Scroll down â†“
              </motion.span>
            </motion.div>
          </div>

          {/* â”€â”€ PHOTO COLUMN â€” sticky, fills viewport height â”€â”€ */}
          <div
            ref={heroPhotoRef}
            className="relative hidden lg:block group/hero cursor-none"
            style={{ position: "sticky", top: 0, height: "100dvh", alignSelf: "end", overflow: "hidden" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              {/* Layer 1: Base Grayscale Image */}
              <Image
                src="/images/mayank-hero-cropped.webp"
                alt="Mayank â€” Base Grayscale"
                fill
                priority
                sizes="(max-width: 1024px) 0px, 60vw"
                className="absolute inset-0 w-full h-full object-contain object-[right_bottom] scale-[1.08] translate-y-[100px] origin-bottom-right filter grayscale contrast-[1.05] brightness-[0.98]"
              />

              {/* Layer 2: Colorful Foreground Image with vertical cylindrical spotlight mask */}
              <div
                className="absolute inset-0"
                style={{
                  opacity: "var(--spotlight-opacity, 0)",
                  transition: "opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <Image
                  src="/images/mayank-hero-cropped.webp"
                  alt="Mayank â€” Colorful Spotlight"
                  fill
                  priority
                  sizes="(max-width: 1024px) 0px, 60vw"
                  className="absolute inset-0 w-full h-full object-contain object-[right_bottom] scale-[1.08] translate-y-[100px] origin-bottom-right filter contrast-[1.05] brightness-[0.98]"
                  style={{
                    maskImage: "linear-gradient(to right, transparent calc(var(--mouse-x, 50%) - 160px), black calc(var(--mouse-x, 50%) - 40px), black calc(var(--mouse-x, 50%) + 40px), transparent calc(var(--mouse-x, 50%) + 160px))",
                    WebkitMaskImage: "linear-gradient(to right, transparent calc(var(--mouse-x, 50%) - 160px), black calc(var(--mouse-x, 50%) - 40px), black calc(var(--mouse-x, 50%) + 40px), transparent calc(var(--mouse-x, 50%) + 160px))",
                  }}
                />
              </div>

              {/* Left edge gradient â€” blends into warm white (matches page bg #F5F3F0) */}
              <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#F5F3F0] to-transparent z-10 pointer-events-none" />
              {/* Bottom fade */}
              <div className="absolute inset-x-0 bottom-0 h-44 z-10 pointer-events-none" style={{ background: "linear-gradient(to top, #F5F3F0 0%, rgba(245,243,240,0.7) 60%, transparent 100%)" }} />
              {/* Top fade â€” subtle */}
              <div className="absolute inset-x-0 top-0 h-12 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(245,243,240,0.4) 0%, transparent 100%)" }} />

              {/* Year label â€” top right */}
              <div className="absolute top-6 right-6 z-20 font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                2026
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• SKILLS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <SkillsSection />

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• DEV ACTIVITY â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <Section className="border-t border-neutral-100 bg-[#F5F3F0]" id="github-activity">
        <div className="mx-auto max-w-6xl px-6 md:px-8 py-16 md:py-20">
          <motion.div variants={fadeUp(0)} className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Activity</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Dev Activity</h2>
              <p className="mt-2 text-sm text-neutral-500">
                Coding every day &mdash;{" "}
                <a href="https://github.com/mayankcodes-dev" target="_blank" rel="noopener noreferrer"
                  className="text-[#0a0a0a] font-medium hover:underline underline-offset-2">GitHub</a>
                {" "}&middot;{" "}
                <a href="https://codolio.com/profile/mayankcodes-dev" target="_blank" rel="noopener noreferrer"
                  className="text-[#0a0a0a] font-medium hover:underline underline-offset-2">Codolio</a>
              </p>
            </div>
            
          </motion.div>

          {/* GitHub heatmap */}
          <motion.div variants={fadeUp(0.1)} className="mb-6">
            <GitHubCalendar />
          </motion.div>

          {/* LeetCode heatmap â€” same card, same renderer, different theme */}
          <motion.div variants={fadeUp(0.15)} className="mb-6">
            <LeetCodeCalendar />
          </motion.div>

          {/* LeetCode stats card */}
          <motion.div variants={fadeUp(0.2)} className="grid sm:grid-cols-2 gap-4">
            {/* Solved count */}
            <motion.div variants={fadeUp(0.2)} whileHover={{ y: -3, transition: { duration: 0.2 } }} className="rounded-xl border border-neutral-200 bg-[#F5F3F0] p-5 shadow-sm flex items-center gap-5 transition-shadow hover:shadow-md">

              <div>
                <p className="text-xs text-neutral-400 font-mono uppercase tracking-widest mb-0.5">DSA Solved</p>
                <p className="text-2xl font-extrabold text-[#0a0a0a]">{stats.problems}</p>
                <p className="text-xs text-neutral-500">problems across 6 platforms</p>
              </div>
              <a href="https://codolio.com/profile/mayankcodes-dev" target="_blank" rel="noopener noreferrer"
                className="ml-auto btn btn-outline btn-sm text-xs">Profile</a>
            </motion.div>

            {/* GitHub contributions count */}
            <motion.div variants={fadeUp(0.25)} whileHover={{ y: -3, transition: { duration: 0.2 } }} className="rounded-xl border border-neutral-200 bg-[#F5F3F0] p-5 shadow-sm flex items-center gap-5 transition-shadow hover:shadow-md">

              <div>
                <p className="text-xs text-neutral-400 font-mono uppercase tracking-widest mb-0.5">GitHub</p>
                <p className="text-2xl font-extrabold text-[#0a0a0a]">{stats.contributions}</p>
                <p className="text-xs text-neutral-500">total contributions</p>
              </div>
              <a href="https://github.com/mayankcodes-dev" target="_blank" rel="noopener noreferrer"
                className="ml-auto btn btn-outline btn-sm text-xs">Profile</a>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• PROJECTS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <ProjectsSection />

      

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• CERTIFICATIONS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <Section className="relative border-t border-neutral-100 bg-[#EFECE7]" id="certs">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6 md:px-8 py-20 md:py-28 z-10">
          <motion.div variants={fadeUp(0)} className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Certifications</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Proof of learning</h2>
            </div>
            <a
              href="https://www.linkedin.com/in/mayankcodes-dev/details/certifications/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 btn btn-outline btn-sm"
            >
              View all certificates <ArrowRight className="size-3.5" />
            </a>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert, i) => (
              <motion.a
                key={cert.id}
                href={cert.credentialUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp(i * 0.06)}
                whileHover={{ y: -3 }}
                className="card-eng group flex items-start gap-4 p-5 transition-shadow hover:shadow-md"
              >
                <div className="grid size-10 flex-shrink-0 place-items-center rounded-lg bg-white border border-neutral-200 overflow-hidden">
                  {cert.issuerLogo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cert.issuerLogo}
                      alt={cert.issuer}
                      className="size-6 object-contain"
                    />
                  ) : (
                    <Award className="size-4 text-neutral-600" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[#0a0a0a] text-sm leading-snug group-hover:underline underline-offset-2 line-clamp-2">
                    {cert.title}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500 font-mono">
                    {cert.issuer} Â· {cert.date}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <a
              href="https://www.linkedin.com/in/mayankcodes-dev/details/certifications/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
            >
              View all certificates <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>
      </Section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• CONTACT CTA â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <Section id="contact" className="border-t border-neutral-100 bg-[#EFECE7]">
        <div className="mx-auto max-w-6xl px-6 md:px-8 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* â”€â”€ Left: copy + action buttons inside matching Bento Card â”€â”€ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <p className="eyebrow mb-4">Let&apos;s connect</p>
              <h2 className="font-extrabold tracking-tighter text-[#0a0a0a]" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
                Ready to build<br />something great?
              </h2>
              <p className="mt-5 text-neutral-500 text-base leading-relaxed max-w-md">
                Excited to connect with the amazing folks &amp; builders out there.
              </p>

              {/* Buttons: Email Copy + WhatsApp Chat */}
              <div className="mt-8 flex flex-wrap gap-3">
                {/* Email button â€” hover copy scroll animation, no default mailto launch */}
                <button
                  onClick={copyEmail}
                  className="group relative block h-[48px] w-[260px] overflow-hidden rounded-xl border border-[#0a0a0a] bg-[#0a0a0a] text-white text-sm font-semibold shadow-sm transition-colors hover:bg-neutral-800 text-left cursor-pointer"
                  id="cta-email"
                >
                  <div
                    className={`flex flex-col w-full transition-transform duration-300 ease-in-out ${
                      emailCopied ? "-translate-y-2/3" : "group-hover:-translate-y-1/3"
                    }`}
                    style={{ height: "144px" }}
                  >
                    {/* State 1: Default (Email Address) */}
                    <div className="h-[48px] flex items-center justify-center gap-2 px-4">
                      <Mail className="size-4 text-white/90" />
                      <span className="font-mono text-xs sm:text-sm">admin@mayankcodes.dev</span>
                    </div>
                    {/* State 2: Hover (Copy Action) */}
                    <div className="h-[48px] flex items-center justify-center gap-2 px-4 text-neutral-300">
                      <Copy className="size-4" />
                      <span>Copy to clipboard</span>
                    </div>
                    {/* State 3: Clicked (Copied Success) */}
                    <div className="h-[48px] flex items-center justify-center gap-2 px-4 text-emerald-400">
                      <Check className="size-4 text-emerald-400" />
                      <span>Copied email!</span>
                    </div>
                  </div>
                </button>

                {/* WhatsApp button â€” green */}
                <a
                  href="https://wa.me/message/4BKKNWXBQUQ7G1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-white text-sm font-semibold transition-colors shadow-sm h-[48px]"
                  id="cta-whatsapp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>

            {/* â”€â”€ Right: Google Map â”€â”€ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col gap-3"
            >
              {/* Header row: LOCATION label + city + Get Directions */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-0.5">Location</p>
                  <p className="text-base font-bold text-[#0a0a0a]">Based in Lucknow, India</p>
                </div>
                <a
                  href="https://www.google.com/maps/dir//Krishna+Nagar,+Lucknow,+Uttar+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-200 bg-[#F5F3F0] text-xs font-semibold text-[#0a0a0a] hover:border-neutral-400 hover:shadow-sm transition-all"
                >
                  <MapPin className="size-3.5 text-neutral-500" />
                  Get Directions
                </a>
              </div>

              {/* Map card */}
              <div
                className="relative overflow-hidden rounded-2xl border border-neutral-200 shadow-sm"
                style={{ height: "380px" }}
              >
                {/* Blue glowing pulse â€” centered on embed location */}
                <div
                  aria-hidden
                  className="absolute z-10 pointer-events-none flex items-center justify-center size-10"
                  style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                >
                  <span className="absolute inline-flex rounded-full bg-blue-400 opacity-60 animate-ping size-9" />
                  <span className="relative inline-flex rounded-full bg-blue-500 shadow-[0_0_16px_6px_rgba(59,130,246,0.55)] size-3.5" />
                </div>

                <iframe
                  title="Mayank's location â€” Krishna Nagar, Lucknow"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14245.368439659092!2d80.88758535!3d26.797233399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1777930972403!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.1) contrast(1.05) saturate(0.9)", pointerEvents: "none" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Bottom-left "Open in Maps" overlay button */}
                <a
                  href="https://maps.app.goo.gl/WHHrY1Vy3UARDXgC8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F3F0] border border-neutral-200 shadow-sm text-xs font-semibold text-[#0a0a0a] hover:shadow-md hover:border-neutral-400 transition-all"
                >
                  Open in Maps <ExternalLink className="size-3" />
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </Section>

      </div>

      {/* Music toggle button - above terminal launcher */}
      <button
        className="hidden md:flex fixed bottom-[4.75rem] right-6 z-40 items-center justify-center h-12 w-12 rounded-full bg-[#0a0a0a] text-white shadow-lg hover:bg-neutral-800 hover:scale-105 transition-all duration-200 border border-neutral-700/60"
        title={musicPlaying ? 'Pause music' : 'Play music'}
        aria-label={musicPlaying ? 'Pause background music' : 'Play background music'}
        onClick={toggleMusic}
      >
        {musicPlaying ? (
          <span className="flex items-end gap-[2px] h-5">
            <span className="w-[3px] bg-white rounded-sm" style={{height:'60%',animation:'musicBar1 0.8s ease-in-out infinite'}} />
            <span className="w-[3px] bg-white rounded-sm" style={{height:'100%',animation:'musicBar2 0.8s ease-in-out 0.15s infinite'}} />
            <span className="w-[3px] bg-white rounded-sm" style={{height:'75%',animation:'musicBar1 0.8s ease-in-out 0.3s infinite'}} />
            <span className="w-[3px] bg-white rounded-sm" style={{height:'50%',animation:'musicBar2 0.8s ease-in-out 0.45s infinite'}} />
          </span>
        ) : (
          <span className="flex items-end gap-[2px] h-5">
            <span className="w-[3px] bg-white rounded-sm" style={{height:'60%'}} />
            <span className="w-[3px] bg-white rounded-sm" style={{height:'100%'}} />
            <span className="w-[3px] bg-white rounded-sm" style={{height:'75%'}} />
            <span className="w-[3px] bg-white rounded-sm" style={{height:'50%'}} />
          </span>
        )}
      </button>

      {/* Desktop-only Terminal launcher - bottom-right */}
      <button
        className="hidden md:flex fixed bottom-6 right-6 z-40 items-center justify-center h-12 w-12 rounded-full bg-[#0a0a0a] text-white shadow-lg hover:bg-neutral-800 hover:scale-105 transition-all duration-200 border border-neutral-700/60"
        title="Open AI Terminal"
        aria-label="Open AI Terminal fullscreen"
        onClick={() => window.dispatchEvent(new CustomEvent('toggle-terminal-fullscreen', { detail: true }))}
      >
        <Terminal className="size-5" />
      </button>

      {/* Fullscreen Terminal Overlay */}
      <AnimatePresence>
        {isTerminalFullScreen && (
          <CliAssistant isFullScreen={isTerminalFullScreen} onExitFullScreen={() => setIsTerminalFullScreen(false)} />
        )}
      </AnimatePresence>

      <Footer ref={footerRef} />

    </div>
  );
}