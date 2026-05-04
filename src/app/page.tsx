"use client";

import { useLayoutEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ArrowRight, Award, Mail } from "lucide-react";
import { useHeroStats } from "@/hooks/use-hero-stats";
import { type HashnodePost } from "@/lib/hashnode";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import SkillsSection from "@/components/sections/skills-section";
import ProjectsSection from "@/components/sections/projects-section";
import { certificates } from "@/data/certificates";
import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(
  () => import("@/components/shared/github-calendar-wrapper"),
  { ssr: false, loading: () => <div className="h-32 w-full animate-pulse rounded-lg bg-neutral-100" /> }
);


gsap.registerPlugin(ScrollToPlugin);

/* ─── Socials ─── */
const SOCIALS = [
  {
    href: "https://github.com/coderMayank69",
    label: "GitHub",
    path: "M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z",
  },
  {
    href: "https://www.linkedin.com/in/codermayank69/",
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    href: "https://leetcode.com/u/coderMayank69/",
    label: "LeetCode",
    path: "M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z",
  },
  {
    href: "https://codermayank69.hashnode.dev/",
    label: "Blog",
    path: "M13.205.043a13.01 13.01 0 0 0-9.23 3.816A13.038 13.038 0 0 0 .043 13.1c.066 7.18 5.984 12.998 13.162 12.998 7.117 0 13.018-5.836 13.018-13.021 0-7.228-5.877-13.077-13.018-13.034zm1.245 16.918a3.437 3.437 0 0 1-4.864 0 3.44 3.44 0 0 1 0-4.865 3.438 3.438 0 0 1 4.864 0 3.44 3.44 0 0 1 0 4.865z",
  },
  {
    href: "mailto:mayankbca96325@gmail.com",
    label: "Email",
    path: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z",
  },
  {
    href: "https://drive.google.com/file/d/1HH8bHTrCKS_YGufdW8zs5rgTZcf6xIp8/view?usp=sharing",
    label: "Resume",
    path: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6zm2-5h8v1.5H8V15zm0-3h8v1.5H8V12zm0-3h4v1.5H8V9z",
  },
];

/* ─── Fade-up variant helper ─── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay } },
});

/* ─── Section wrapper (scroll-triggered) ─── */
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
  const heroRightRef = useRef<HTMLDivElement>(null);
  const stats = useHeroStats();

  /* ── Cursor spotlight — lerp-smoothed circular clip-path reveal ── */
  const [cursorPos, setCursorPos] = useState({ x: -400, y: -400 });
  const [imgHovering, setImgHovering] = useState(false);
  const targetPosRef = useRef({ x: -400, y: -400 });
  const currentPosRef = useRef({ x: -400, y: -400 });
  const animFrameRef = useRef<number | null>(null);
  const [latestPost, setLatestPost] = useState<HashnodePost | null>(null);

  const handleImgMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    targetPosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const handleImgEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    targetPosRef.current = { x: startX, y: startY };
    currentPosRef.current = { x: startX, y: startY };
    setImgHovering(true);

    const tick = () => {
      currentPosRef.current = {
        x: currentPosRef.current.x + (targetPosRef.current.x - currentPosRef.current.x) * 0.1,
        y: currentPosRef.current.y + (targetPosRef.current.y - currentPosRef.current.y) * 0.1,
      };
      setCursorPos({ x: currentPosRef.current.x, y: currentPosRef.current.y });
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
  }, []);

  const handleImgLeave = useCallback(() => {
    setImgHovering(false);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setCursorPos({ x: -400, y: -400 });
    targetPosRef.current = { x: -400, y: -400 };
    currentPosRef.current = { x: -400, y: -400 };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRightRef.current, { opacity: 0, y: 32, duration: 0.8, ease: "power3.out" });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  /* ── Fetch latest blog post (client-side, non-blocking) ── */
  useLayoutEffect(() => {
    fetch("https://gql.hashnode.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query { publication(host: "codermayank69.hashnode.dev") { posts(first: 1) { edges { node { title brief slug url publishedAt readTimeInMinutes coverImage { url } tags { name } } } } } }`,
      }),
    })
      .then((r) => r.json())
      .then((json) => {
        const node = json?.data?.publication?.posts?.edges?.[0]?.node;
        if (node) setLatestPost(node);
      })
      .catch(() => {});
  }, []);

  const scrollTo = (id: string) =>
    gsap.to(window, { duration: 1, ease: "power2.inOut", scrollTo: { y: `#${id}`, offsetY: 80 } });

  return (
    <div ref={rootRef} className="w-full bg-white text-[#0a0a0a]">
      <Navbar />

      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <main id="hero" className="relative w-full bg-[#f9f9f9]" style={{ minHeight: "100dvh" }}>
        {/* Dot-grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #d4d4d4 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.35,
          }}
          aria-hidden
        />

        {/* Main grid: [sidebar] | content | photo
            – sidebar is a real 56px column at xl+ so it NEVER overlaps content
            – image column is much larger (560 / 760 / 920px) for an impactful photo */}
        <div
          className="relative mx-auto max-w-[1600px] grid grid-cols-1 lg:grid-cols-[1fr_560px] xl:grid-cols-[56px_1fr_760px] 2xl:grid-cols-[56px_1fr_920px]"
          style={{ minHeight: "100dvh" }}
        >

          {/* ── SIDEBAR — vertical label (xl+ only, proper grid column) ── */}
          <div className="hidden xl:flex flex-col items-center justify-center gap-4 border-r border-neutral-100 select-none">
            <div className="w-px h-14 bg-neutral-200" />
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.25em] -rotate-90 whitespace-nowrap">
              Full-Stack Developer
            </span>
            <div className="w-px h-14 bg-neutral-200" />
          </div>

          {/* ── CONTENT COLUMN ── */}
          <div ref={heroRightRef} className="flex flex-col py-24 lg:py-0 lg:pt-[14dvh] z-10 px-8 md:px-14 lg:pl-14 lg:pr-8 xl:pl-10 xl:pr-6">

            {/* Live stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-10 mb-8"
            >
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-black tracking-tighter text-[#0a0a0a]">
                  {stats.loading
                    ? <span className="inline-block w-16 h-9 rounded bg-neutral-100 animate-pulse" />
                    : stats.problems}
                </span>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mt-0.5">Problems</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-black tracking-tighter text-[#0a0a0a]">
                  {stats.loading
                    ? <span className="inline-block w-20 h-9 rounded bg-neutral-100 animate-pulse" />
                    : stats.contributions}
                </span>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mt-0.5">Contributions</span>
              </div>
            </motion.div>

            {/* Giant Hello */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1
                className="font-black tracking-tighter leading-[0.88] text-[#0a0a0a] select-none"
                style={{ fontSize: "clamp(5.5rem, 15vw, 12rem)" }}
              >
                Hello.
              </h1>
            </motion.div>

            {/* Minimal subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-neutral-500 text-base md:text-lg leading-relaxed"
            >
              — It&apos;s Mayank, an aspiring Software Engineer.
            </motion.p>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex items-center flex-wrap gap-2"
            >
              {SOCIALS.map(({ href, label, path }) => (
                <div key={label} className="relative group/tip">
                  {/* Tooltip */}
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#0a0a0a] px-2 py-1 text-[10px] font-mono text-white opacity-0 transition-opacity duration-150 group-hover/tip:opacity-100 z-50">
                    {label}
                  </span>
                  <motion.a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    className="grid size-10 place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-500 hover:border-neutral-400 hover:text-[#0a0a0a] transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-[15px]" aria-hidden>
                      <path d={path} />
                    </svg>
                  </motion.a>
                </div>
              ))}
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-16 hidden lg:flex items-center gap-2 text-neutral-400"
            >
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="text-[11px] font-mono uppercase tracking-widest"
              >
                Scroll down ↓
              </motion.span>
            </motion.div>
          </div>

          {/* ── PHOTO COLUMN — cursor spotlight ── */}
          <div
            className="relative hidden lg:block"
            style={{ position: "sticky", top: 0, height: "100dvh", alignSelf: "start", overflow: "hidden" }}
            onMouseMove={handleImgMouseMove}
            onMouseEnter={handleImgEnter}
            onMouseLeave={handleImgLeave}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute inset-0"
            >
              {/* ── Base layer: always grayscale ── */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/mayank-hero.webp"
                alt="Mayank — Aspiring Software Engineer"
                className="absolute inset-0 w-full h-full"
                style={{
                  objectFit: "cover",
                  objectPosition: "50% 22%",
                  filter: "grayscale(100%) contrast(1.08) brightness(0.96) saturate(0)",
                }}
                loading="eager"
              />

              {/* ── Color layer: revealed only inside spotlight circle ── */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/mayank-hero.webp"
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full pointer-events-none select-none"
                style={{
                  objectFit: "cover",
                  objectPosition: "50% 22%",
                  clipPath: imgHovering
                    ? `circle(120px at ${cursorPos.x}px ${cursorPos.y}px)`
                    : "circle(0px at -400px -400px)",
                  transition: imgHovering
                    ? "clip-path 0.05s linear"
                    : "clip-path 0.4s ease",
                }}
              />

              {/* Left edge gradient — blends into page bg */}
              <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#f9f9f9] to-transparent z-10 pointer-events-none" />
              {/* Bottom fade */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f9f9f9] to-transparent z-10 pointer-events-none" />
              {/* Top fade */}
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#f9f9f9]/60 to-transparent z-10 pointer-events-none" />

              {/* Availability badge */}
              <div className="absolute bottom-10 left-8 z-20 flex items-center gap-2 rounded-xl border border-neutral-200 bg-white/90 backdrop-blur-sm px-4 py-2.5 shadow-md">
                <span className="status-dot" />
                <span className="text-xs font-semibold text-[#0a0a0a] whitespace-nowrap">Open to internships</span>
              </div>

              {/* Year label */}
              <div className="absolute top-10 right-6 z-20 font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                2026
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* ══════════════════════════ SKILLS ══════════════════════════ */}
      <SkillsSection />

      {/* ══════════════════════════ DEV ACTIVITY ══════════════════════════ */}
      <Section className="border-t border-neutral-100 bg-white" id="github-activity">
        <div className="mx-auto max-w-6xl px-6 md:px-8 py-16 md:py-20">
          <motion.div variants={fadeUp(0)} className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Activity</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Dev Activity</h2>
              <p className="mt-2 text-sm text-neutral-500">
                Coding every day —{" "}
                <a href="https://github.com/coderMayank69" target="_blank" rel="noopener noreferrer"
                  className="text-[#0a0a0a] font-medium hover:underline underline-offset-2">GitHub</a>
                {" "}·{" "}
                <a href="https://leetcode.com/u/coderMayank69/" target="_blank" rel="noopener noreferrer"
                  className="text-[#0a0a0a] font-medium hover:underline underline-offset-2">LeetCode</a>
              </p>
            </div>
            <a href="https://github.com/coderMayank69" target="_blank" rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 btn btn-outline btn-sm">
              GitHub <ArrowRight className="size-3.5" />
            </a>
          </motion.div>

          {/* GitHub calendar — fills full card width */}
          <motion.div variants={fadeUp(0.1)} className="mb-6">
            <div className="rounded-xl border border-neutral-200 bg-white shadow-sm px-6 pt-5 pb-5">
              <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-4">GitHub Contributions</p>
              <GitHubCalendar
                username="coderMayank69"
                colorScheme="light"
                fontSize={11}
                blockSize={13}
                blockMargin={4}
                style={{ width: "100%" }}
                theme={{
                  light: ["#ebebeb", "#c6e6c8", "#74c47a", "#339a3e", "#1a6326"] as [string,string,string,string,string],
                  dark:  ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"] as [string,string,string,string,string],
                }}
              />
            </div>
          </motion.div>

          {/* LeetCode stats card */}
          <motion.div variants={fadeUp(0.2)} className="grid sm:grid-cols-2 gap-4">
            {/* Solved count */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm flex items-center gap-5">
              <div className="grid size-12 flex-shrink-0 place-items-center rounded-xl bg-[#FFA116]/10">
                <svg viewBox="0 0 24 24" fill="#FFA116" className="size-6">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0z"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-mono uppercase tracking-widest mb-0.5">LeetCode</p>
                <p className="text-2xl font-extrabold text-[#0a0a0a]">{stats.problems}</p>
                <p className="text-xs text-neutral-500">problems solved</p>
              </div>
              <a href="https://leetcode.com/u/coderMayank69/" target="_blank" rel="noopener noreferrer"
                className="ml-auto btn btn-outline btn-sm text-xs">Profile →</a>
            </div>

            {/* GitHub contributions count */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm flex items-center gap-5">
              <div className="grid size-12 flex-shrink-0 place-items-center rounded-xl bg-[#0a0a0a]/5">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#0a0a0a]">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.56 9.56 0 0 1 12 6.84a9.56 9.56 0 0 1 2.5.34c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-mono uppercase tracking-widest mb-0.5">GitHub</p>
                <p className="text-2xl font-extrabold text-[#0a0a0a]">{stats.contributions}</p>
                <p className="text-xs text-neutral-500">total contributions</p>
              </div>
              <a href="https://github.com/coderMayank69" target="_blank" rel="noopener noreferrer"
                className="ml-auto btn btn-outline btn-sm text-xs">Profile →</a>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ══════════════════════════ PROJECTS ══════════════════════════ */}
      <ProjectsSection />

      {/* ══════════════════════════ LATEST BLOG ══════════════════════════ */}
      {latestPost && (
        <Section className="border-t border-neutral-100 bg-white" id="blog-preview">
          <div className="mx-auto max-w-6xl px-6 md:px-8 py-16 md:py-20">
            <motion.div variants={fadeUp(0)} className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow mb-2">Blog</p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Latest article</h2>
              </div>
              <Link
                href="/blog"
                className="hidden md:inline-flex items-center gap-1.5 btn btn-outline btn-sm"
              >
                All posts <ArrowRight className="size-3.5" />
              </Link>
            </motion.div>

            <motion.a
              variants={fadeUp(0.1)}
              href={latestPost.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-0 md:grid-cols-[auto_1fr] rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              {/* Cover image */}
              {latestPost.coverImage?.url && (
                <div className="md:w-64 lg:w-80 h-48 md:h-auto overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={latestPost.coverImage.url}
                    alt={latestPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              {/* Content */}
              <div className="flex flex-col justify-between p-6 md:p-8">
                <div>
                  {latestPost.tags?.slice(0, 2).map((t: { name: string }) => (
                    <span key={t.name} className="badge badge-neutral text-[11px] mr-1.5 mb-3">
                      {t.name}
                    </span>
                  ))}
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#0a0a0a] group-hover:underline underline-offset-2 leading-snug">
                    {latestPost.title}
                  </h3>
                  {latestPost.brief && (
                    <p className="mt-3 text-neutral-500 text-sm leading-relaxed line-clamp-2">
                      {latestPost.brief}
                    </p>
                  )}
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-4 font-mono text-[11px] text-neutral-400">
                    <span>{new Date(latestPost.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</span>
                    <span>{latestPost.readTimeInMinutes ?? 5} min read</span>
                  </div>
                  <span className="text-sm font-semibold text-[#0a0a0a] group-hover:underline underline-offset-2 flex items-center gap-1">
                    Read post <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </div>
            </motion.a>

            <div className="mt-4 text-center md:hidden">
              <Link href="/blog" className="btn btn-outline btn-sm">
                All posts <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </Section>
      )}

      {/* ══════════════════════════ CERTIFICATIONS ══════════════════════════ */}
      <Section className="relative border-t border-neutral-100 bg-[#fafafa]" id="certs">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6 md:px-8 py-20 md:py-28 z-10">
          <motion.div variants={fadeUp(0)} className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Certifications</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Proof of learning</h2>
            </div>
            <Link
              href="/certifications"
              className="hidden md:inline-flex items-center gap-1.5 btn btn-outline btn-sm"
            >
              All {certificates.length} <ArrowRight className="size-3.5" />
            </Link>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.slice(0, 3).map((cert, i) => (
              <motion.div
                key={cert.id}
                variants={fadeUp(i * 0.08)}
                whileHover={{ y: -3 }}
                className="card-eng group flex items-start gap-4 p-5"
              >
                <div className="grid size-9 flex-shrink-0 place-items-center rounded-lg bg-neutral-50 border border-neutral-200">
                  <Award className="size-4 text-neutral-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[#0a0a0a] text-sm leading-snug group-hover:underline underline-offset-2 truncate">
                    {cert.title}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500 font-mono">
                    {cert.issuer} · {cert.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Link href="/certifications" className="btn btn-outline btn-sm">
              All certs <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════ CONTACT CTA ══════════════════════════ */}
      <Section id="contact" className="border-t border-neutral-100 bg-[#fafafa]">
        <div className="mx-auto max-w-6xl px-6 md:px-8 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow mb-4">Let&apos;s connect</p>
              <h2 className="font-extrabold tracking-tighter text-[#0a0a0a]" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
                Ready to build<br />something great?
              </h2>
              <p className="mt-5 text-neutral-500 text-base leading-relaxed max-w-md">
                I&apos;m actively looking for internships and freelance projects.
                If you have an idea, let&apos;s make it happen.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-primary btn-lg" id="cta-contact">
                  <Mail className="size-4" /> Get in touch
                </Link>
                <a
                  href="https://github.com/coderMayank69"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-lg"
                  id="cta-github"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>

            <div className="card-eng p-8 space-y-4">
              {[
                { icon: "📬", label: "Email", value: "mayankbca96325@gmail.com" },
                { icon: "📍", label: "Location", value: "Lucknow, India" },
                { icon: "⚡", label: "Status", value: "Open to internships & freelance", badge: "green" },
                { icon: "🕐", label: "Response", value: "Within 24 hours" },
              ].map(({ icon, label, value, badge }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="text-base mt-0.5 flex-shrink-0">{icon}</span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">{label}</p>
                    {badge === "green" ? (
                      <span className="badge badge-green mt-1">{value}</span>
                    ) : (
                      <p className="text-sm font-medium text-[#0a0a0a] mt-0.5 truncate">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}