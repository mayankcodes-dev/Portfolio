"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Download, ExternalLink, Award, ArrowRight,
  Code2, Zap, Users, MapPin, GraduationCap,
} from "lucide-react";
import SiteNav from "@/components/layout/site-nav";
import { Footer } from "@/components/sections/footer";
import { certificates } from "@/data/certificates";

/* GitHub Calendar loaded only on client (no SSR) — avoids window errors */
const GitHubCalendar = dynamic(
  () => import("./github-calendar-wrapper"),
  {
    ssr: false,
    loading: () => <div className="h-32 animate-pulse rounded-xl bg-neutral-50 border border-neutral-100" />,
  }
);

/* ─── Static data ───────────────────────────────────────────────── */
const timeline = [
  {
    year: "2024–Present",
    title: "Full-Stack Developer",
    icon: Code2,
    description:
      "Building production-grade MERN applications for clients — from landing pages to full SaaS platforms. Specialising in Next.js, TypeScript, and API integration.",
  },
  {
    year: "2023",
    title: "Diving Deep into the Stack",
    icon: Zap,
    description:
      "Shifted from basic frontend to full-stack. Learned Node.js, Express, PostgreSQL, MongoDB, and started shipping real products end-to-end.",
  },
  {
    year: "2022",
    title: "Started Web Development",
    icon: GraduationCap,
    description:
      "Began with HTML, CSS, and vanilla JavaScript. Quickly moved to React and fell in love with component-driven architecture.",
  },
];

const values = [
  {
    icon: Code2,
    title: "Craft over speed",
    desc: "I care about the details — typography, spacing, animation timing. Good enough isn't good enough.",
  },
  {
    icon: Zap,
    title: "Ship, then polish",
    desc: "Get it working first, then make it beautiful. Ship early, iterate fast.",
  },
  {
    icon: Users,
    title: "Code is communication",
    desc: "Clear variable names and well-structured components are a form of respect for future maintainers.",
  },
];

const fadeUp = (delay = 0): Variants => ({
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay } },
});

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─── LeetCode Stats Card ───────────────────────────────────────── */
function LeetCodeStats() {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <img
          src="https://leetcard.jacoblin.cool/coderMayank69?theme=light&font=Inter&ext=activity"
          alt="LeetCode stats for coderMayank69"
          className="w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <img
          src="https://leetcard.jacoblin.cool/coderMayank69?theme=light&font=Inter&ext=heatmap"
          alt="LeetCode heatmap for coderMayank69"
          className="w-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function About() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-white text-[#0a0a0a]">

        {/* ════ HERO ════ */}
        <section className="mx-auto max-w-4xl px-6 md:px-8 pb-12 pt-8 md:pt-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp(0)}>
              <span className="eyebrow">About me</span>
            </motion.div>

            <motion.h1
              variants={fadeUp(0.05)}
              className="mt-4 text-balance font-extrabold tracking-tighter"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
            >
              The Developer Behind
              <span className="text-neutral-400"> the Code</span>
            </motion.h1>

            <motion.div variants={fadeUp(0.08)} className="mt-3 flex items-center gap-2 text-sm text-neutral-500">
              <MapPin className="size-4 text-neutral-400" />
              Lucknow, Krishna Nagar, India
            </motion.div>

            <motion.p
              variants={fadeUp(0.1)}
              className="mt-5 max-w-2xl text-pretty text-base md:text-lg leading-relaxed text-neutral-500"
            >
              Hi, I&apos;m <strong className="text-[#0a0a0a] font-semibold">Mayank</strong> — a MERN stack
              developer passionate about building polished, production-ready web
              applications. Currently pursuing my CS degree and actively seeking
              software engineering internships.
            </motion.p>

            <motion.div variants={fadeUp(0.15)} className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://drive.google.com/file/d/1HH8bHTrCKS_YGufdW8zs5rgTZcf6xIp8/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <Download className="size-4" />
                Download Resume
              </a>
              <Link href="/contact" className="btn btn-outline">
                Let&apos;s work together
                <ArrowRight className="size-4" />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ════ VALUES ════ */}
        <AnimatedSection className="border-t border-neutral-100">
          <div className="mx-auto max-w-4xl px-6 md:px-8 py-16 md:py-20">
            <motion.p variants={fadeUp(0)} className="eyebrow mb-8">
              What I Stand For
            </motion.p>
            <div className="grid gap-4 sm:grid-cols-3">
              {values.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  variants={fadeUp(i * 0.08)}
                  className="card-eng p-6"
                >
                  <div className="mb-4 grid size-9 place-items-center rounded-lg bg-neutral-50 border border-neutral-200">
                    <Icon className="size-4 text-neutral-600" />
                  </div>
                  <p className="font-semibold text-[#0a0a0a] text-[15px]">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ════ TIMELINE ════ */}
        <AnimatedSection className="border-t border-neutral-100">
          <div className="mx-auto max-w-4xl px-6 md:px-8 py-16 md:py-20">
            <motion.p variants={fadeUp(0)} className="eyebrow mb-8">
              My Journey
            </motion.p>

            <div className="relative space-y-10 before:absolute before:left-[5px] before:top-2 before:h-full before:w-px before:bg-neutral-200">
              {timeline.map(({ year, title, icon: Icon, description }, i) => (
                <motion.div key={year} variants={fadeUp(i * 0.12)} className="relative pl-9">
                  <span className="absolute left-0 top-1.5 flex size-3 items-center justify-center rounded-full border-2 border-[#0a0a0a] bg-white" />
                  <div className="flex items-center gap-2">
                    <Icon className="size-4 text-neutral-400" />
                    <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">{year}</p>
                  </div>
                  <p className="mt-1 font-semibold text-[#0a0a0a]">{title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ════ GITHUB CONTRIBUTION GRAPH ════ */}
        <AnimatedSection className="border-t border-neutral-100">
          <div className="mx-auto max-w-4xl px-6 md:px-8 py-16 md:py-20">
            <motion.p variants={fadeUp(0)} className="eyebrow mb-2">
              GitHub Activity
            </motion.p>
            <motion.p variants={fadeUp(0.05)} className="mb-8 text-sm text-neutral-500">
              Contributions from{" "}
              <a
                href="https://github.com/coderMayank69"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0a0a0a] font-medium hover:underline underline-offset-2"
              >
                @coderMayank69
              </a>
            </motion.p>
            <motion.div variants={fadeUp(0.1)} className="overflow-x-auto card-eng p-6">
              <GitHubCalendar
                username="coderMayank69"
                colorScheme="light"
                fontSize={12}
                blockSize={13}
                blockMargin={4}
                theme={{
                  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"] as [string, string, string, string, string],
                  dark:  ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"] as [string, string, string, string, string],
                }}
              />
            </motion.div>
          </div>
        </AnimatedSection>

        {/* ════ LEETCODE STATS ════ */}
        <AnimatedSection className="border-t border-neutral-100">
          <div className="mx-auto max-w-4xl px-6 md:px-8 py-16 md:py-20">
            <motion.p variants={fadeUp(0)} className="eyebrow mb-2">
              LeetCode Progress
            </motion.p>
            <motion.p variants={fadeUp(0.05)} className="mb-6 text-sm text-neutral-500">
              Problem-solving on{" "}
              <a
                href="https://leetcode.com/u/coderMayank69/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0a0a0a] font-medium hover:underline underline-offset-2"
              >
                LeetCode @coderMayank69
              </a>
            </motion.p>
            <motion.div variants={fadeUp(0.1)}>
              <LeetCodeStats />
            </motion.div>
          </div>
        </AnimatedSection>

        {/* ════ CERTIFICATIONS TEASER ════ */}
        <AnimatedSection className="border-t border-neutral-100">
          <div className="mx-auto max-w-4xl px-6 md:px-8 py-16 md:py-20">
            <motion.p variants={fadeUp(0)} className="eyebrow mb-8">
              Certifications
            </motion.p>
            <div className="grid gap-3 sm:grid-cols-2">
              {certificates.slice(0, 4).map((cert, idx) => (
                <motion.div
                  key={cert.id}
                  variants={fadeUp(idx * 0.08)}
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

            <motion.div variants={fadeUp(0.3)} className="mt-6">
              <Link href="/certifications" className="btn btn-outline btn-sm">
                <Award className="size-4" />
                View all {certificates.length} certificates
                <ArrowRight className="size-4" />
              </Link>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* ════ SOCIAL LINKS ════ */}
        <AnimatedSection className="border-t border-neutral-100">
          <div className="mx-auto max-w-4xl px-6 md:px-8 py-16 md:py-20">
            <motion.p variants={fadeUp(0)} className="eyebrow mb-6">
              Find Me Online
            </motion.p>
            <motion.div variants={fadeUp(0.1)} className="flex flex-wrap gap-2">
              {[
                { label: "GitHub",   href: "https://github.com/coderMayank69"             },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/codermayank69/"   },
                { label: "LeetCode", href: "https://leetcode.com/u/coderMayank69/"        },
                { label: "Hashnode", href: "https://hashnode.com/@coderMayank"            },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                  <ExternalLink className="size-3.5" />
                  {label}
                </a>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

      </main>
      <Footer />
    </>
  );
}
