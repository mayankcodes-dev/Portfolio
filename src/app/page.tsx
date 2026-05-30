"use client";

import { useLayoutEffect, useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ArrowRight, Award, Mail, MapPin, ExternalLink, Copy, Check } from "lucide-react";
import { useHeroStats } from "@/hooks/use-hero-stats";
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
    href: "https://leetcode.com/u/mayankcodes-dev/",
    label: "LeetCode",
    path: "M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z",
    hoverClass: "hover:text-[#FFA116] hover:border-[#FFA116]/40",
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

/* ─── Fade-up variant helper ─── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay } },
});

/* ─── CountUp hook ─── */
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
  const footerRef = useRef<HTMLElement>(null);
  const heroRightRef = useRef<HTMLDivElement>(null);
  const heroPhotoRef = useRef<HTMLDivElement>(null);
  const stats = useHeroStats();

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  const [loaderDone, setLoaderDone] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("admin@mayankcodes.dev");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ((window as any).__loaderFinished) {
        setLoaderDone(true);
        return;
      }
      const handleLoaderFinished = () => setLoaderDone(true);
      window.addEventListener("loaderFinished", handleLoaderFinished);
      return () => window.removeEventListener("loaderFinished", handleLoaderFinished);
    }
  }, []);

  // Animated stat counters (count up from 0 when data loads, element is in view, and loader finishes)
  const problemsCount      = useCountUp(stats.loading ? 0 : Number(stats.problems)      || 0, 1400, statsInView && !stats.loading && loaderDone);
  const contributionsCount = useCountUp(stats.loading ? 0 : Number(stats.contributions) || 0, 1400, statsInView && !stats.loading && loaderDone);

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
      {/* ── White content wrapper — scales via CSS scroll-driven animation ── */}
      <div
        className="relative w-full bg-white text-[#0a0a0a] overflow-hidden footer-scale-wrapper"
        style={{ transformOrigin: "bottom center" }}
      >

      {/* ────────────────────────── HERO ────────────────────────── */}
      <main
        id="hero"
        className="relative w-full bg-white"
        style={{ minHeight: "100dvh" }}
      >
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid opacity-[0.18] pointer-events-none" aria-hidden />

        {/* Main grid: [sidebar] | content | photo */}
        <div
          className="relative mx-auto max-w-[1600px] grid grid-cols-1 lg:grid-cols-[500px_1fr] xl:grid-cols-[72px_540px_1fr]"
          style={{ minHeight: "100dvh" }}
        >

          {/* ── SIDEBAR — vertical labels & line (xl+ only) ── */}
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

          {/* ── CONTENT COLUMN ── */}
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
                    {stats.loading ? "—" : problemsCount}
                  </span>
                  <span className="text-[12.5px] font-sans text-neutral-400 uppercase tracking-[0.18em] mt-2">
                    Problems
                  </span>
                </div>
                <div className="flex flex-col group cursor-default">
                  <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0a0a0a] leading-none tabular-nums">
                    {stats.loading ? "—" : contributionsCount}
                  </span>
                  <span className="text-[12.5px] font-sans text-neutral-400 uppercase tracking-[0.18em] mt-2">
                    Contributions
                  </span>
                </div>
              </motion.div>

              {/* Mobile Hero Avatar (visible only on mobile/tablet) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="lg:hidden mb-8 flex items-center gap-4"
              >
                <div className="relative size-14 rounded-2xl border border-neutral-200 overflow-hidden bg-neutral-50 shadow-sm flex-shrink-0">
                  <Image
                    src="/images/mayank-hero-cropped.webp"
                    alt="Mayank Singh"
                    fill
                    priority
                    className="object-cover object-[center_28%] filter grayscale contrast-[1.05]"
                  />
                </div>
                <div className="flex flex-col select-none">
                  <span className="font-extrabold text-[#0a0a0a] text-[15px] leading-none tracking-tight">Mayank Singh</span>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mt-1.5 leading-none">
                    Full-Stack Developer
                  </span>
                </div>
              </motion.div>

              {/* Giant Hello */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1
                  className="font-black tracking-[-0.04em] leading-[0.88] text-[#0a0a0a] select-none text-[5rem] min-[375px]:text-[6rem] sm:text-[8.5rem] md:text-[10rem] lg:text-[12rem] xl:text-[13.5rem]"
                >
                  Hello.
                </h1>
              </motion.div>

              {/* Static subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 text-neutral-500 text-xl md:text-xl leading-relaxed font-sans font-light"
              >
                — I build, ship, and solve. Full-Stack Engineer.
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
                      className={`grid size-10 place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-500 transition-all duration-200 shadow-sm hover:shadow-md ${hoverClass}`}
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
                Scroll down ↓
              </motion.span>

              <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white/95 px-3 py-1.5 shadow-sm">
                <span className="status-dot" style={{ width: 6, height: 6 }} />
                <span className="text-[10px] font-semibold text-[#0a0a0a] whitespace-nowrap">Open to work</span>
              </div>
            </motion.div>
          </div>

          {/* ── PHOTO COLUMN — sticky, fills viewport height ── */}
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
                alt="Mayank — Base Grayscale"
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
                  alt="Mayank — Colorful Spotlight"
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

              {/* Left edge gradient — blends into white */}
              <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              {/* Bottom fade — intensified with solid white base and via color */}
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-white via-white/70 to-transparent z-10 pointer-events-none" />
              {/* Top fade — subtle */}
              <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/40 to-transparent z-10 pointer-events-none" />

              {/* Year label — top right */}
              <div className="absolute top-6 right-6 z-20 font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
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
                <a href="https://github.com/mayankcodes-dev" target="_blank" rel="noopener noreferrer"
                  className="text-[#0a0a0a] font-medium hover:underline underline-offset-2">GitHub</a>
                {" "}·{" "}
                <a href="https://leetcode.com/u/mayankcodes-dev/" target="_blank" rel="noopener noreferrer"
                  className="text-[#0a0a0a] font-medium hover:underline underline-offset-2">LeetCode</a>
              </p>
            </div>
            <a href="https://github.com/mayankcodes-dev" target="_blank" rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 btn btn-outline btn-sm">
              GitHub <ArrowRight className="size-3.5" />
            </a>
          </motion.div>

          {/* GitHub calendar — fills full card width */}
          <motion.div variants={fadeUp(0.1)} className="mb-6">
            <div className="rounded-xl border border-neutral-200 bg-white shadow-sm px-6 pt-5 pb-5">
              <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-4">GitHub Contributions</p>
              <div className="github-calendar-wrapper overflow-x-auto">
                <GitHubCalendar
                  username="mayankcodes-dev"
                  colorScheme="light"
                  fontSize={12}
                  blockSize={14}
                  blockMargin={5}
                  theme={{
                    light: ["#ebebeb", "#c6e6c8", "#74c47a", "#339a3e", "#1a6326"] as [string, string, string, string, string],
                    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"] as [string, string, string, string, string],
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* LeetCode stats card */}
          <motion.div variants={fadeUp(0.2)} className="grid sm:grid-cols-2 gap-4">
            {/* Solved count */}
            <motion.div variants={fadeUp(0.2)} whileHover={{ y: -3, transition: { duration: 0.2 } }} className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm flex items-center gap-5 transition-shadow hover:shadow-md">
              <div className="grid size-12 flex-shrink-0 place-items-center rounded-xl bg-[#FFA116]/10">
                <svg viewBox="0 0 24 24" fill="#FFA116" className="size-6">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-mono uppercase tracking-widest mb-0.5">LeetCode</p>
                <p className="text-2xl font-extrabold text-[#0a0a0a]">{stats.problems}</p>
                <p className="text-xs text-neutral-500">problems solved</p>
              </div>
              <a href="https://leetcode.com/u/mayankcodes-dev/" target="_blank" rel="noopener noreferrer"
                className="ml-auto btn btn-outline btn-sm text-xs">Profile →</a>
            </motion.div>

            {/* GitHub contributions count */}
            <motion.div variants={fadeUp(0.25)} whileHover={{ y: -3, transition: { duration: 0.2 } }} className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm flex items-center gap-5 transition-shadow hover:shadow-md">
              <div className="grid size-12 flex-shrink-0 place-items-center rounded-xl bg-[#0a0a0a]/5">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#0a0a0a]">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.56 9.56 0 0 1 12 6.84a9.56 9.56 0 0 1 2.5.34c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-mono uppercase tracking-widest mb-0.5">GitHub</p>
                <p className="text-2xl font-extrabold text-[#0a0a0a]">{stats.contributions}</p>
                <p className="text-xs text-neutral-500">total contributions</p>
              </div>
              <a href="https://github.com/mayankcodes-dev" target="_blank" rel="noopener noreferrer"
                className="ml-auto btn btn-outline btn-sm text-xs">Profile →</a>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* ══════════════════════════ PROJECTS ══════════════════════════ */}
      <ProjectsSection />


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

            {/* ── Left: copy + action buttons ── */}
            <div>
              <p className="eyebrow mb-4">Let&apos;s connect</p>
              <h2 className="font-extrabold tracking-tighter text-[#0a0a0a]" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
                Ready to build<br />something great?
              </h2>
              <p className="mt-5 text-neutral-500 text-base leading-relaxed max-w-md">
                Excited to connect with the amazing folks &amp; builders out there.
              </p>

              {/* Buttons: Email + WhatsApp */}
              <div className="mt-8 flex flex-wrap gap-3">

                {/* Email button — mailto with hover copy scroll animation */}
                <a
                  href="mailto:admin@mayankcodes.dev"
                  onClick={(e) => {
                    copyEmail();
                  }}
                  className="group relative block h-[48px] w-[260px] overflow-hidden rounded-xl border border-[#0a0a0a] bg-[#0a0a0a] text-white text-sm font-semibold shadow-sm transition-colors hover:bg-neutral-800"
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
                </a>

                {/* WhatsApp button — green like contact page */}
                <a
                  href="https://wa.me/message/4BKKNWXBQUQ7G1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-white text-sm font-semibold transition-colors shadow-sm"
                  id="cta-whatsapp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* ── Right: Google Map ── */}
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
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-200 bg-white text-xs font-semibold text-[#0a0a0a] hover:border-neutral-400 hover:shadow-sm transition-all"
                >
                  <MapPin className="size-3.5 text-neutral-500" />
                  Get Directions
                </a>
              </div>

              {/* Map card */}
              <div
                className="relative overflow-hidden rounded-2xl border border-neutral-200 shadow-sm"
                style={{ height: "340px" }}
              >
                {/* Blue glowing pulse — centered on embed location */}
                <div
                  aria-hidden
                  className="absolute z-10 pointer-events-none flex items-center justify-center size-10"
                  style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                >
                  <span className="absolute inline-flex rounded-full bg-blue-400 opacity-60 animate-ping size-9" />
                  <span className="relative inline-flex rounded-full bg-blue-500 shadow-[0_0_16px_6px_rgba(59,130,246,0.55)] size-3.5" />
                </div>

                <iframe
                  title="Mayank's location — Krishna Nagar, Lucknow"
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
                  className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-neutral-200 shadow-sm text-xs font-semibold text-[#0a0a0a] hover:shadow-md hover:border-neutral-400 transition-all"
                >
                  Open in Maps <ExternalLink className="size-3" />
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </Section>

      </div>

      <Footer ref={footerRef} />
    </div>
  );
}