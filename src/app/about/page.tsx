"use client";

/**
 * About Page — Full build
 * GitHub contribution graph · LeetCode stats · Timeline · Values
 * Framer Motion scroll reveals · ChaiCode button style
 */

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Download, ExternalLink, Award, ArrowRight,
  Code2, Zap, Users, MapPin, GraduationCap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SiteNav from "@/components/layout/site-nav";
import { Footer } from "@/components/sections/footer";
import { certificates } from "@/data/certificates";

/* GitHub Calendar loaded only on client (no SSR) — avoids window errors */
const GitHubCalendar = dynamic(
  () => import("./github-calendar-wrapper"),
  {
    ssr: false,
    loading: () => <div className="h-32 animate-pulse rounded-xl bg-muted/50" />,
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

const CARD_GRADIENTS = [
  "from-violet-600 via-purple-600 to-indigo-700",
  "from-indigo-600 via-blue-600 to-cyan-700",
  "from-purple-700 via-pink-600 to-rose-600",
  "from-cyan-600 via-teal-600 to-emerald-700",
];

const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = (delay = 0): Variants => ({
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT, delay } },
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
      {/* Stats card via leetcard */}
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
        <img
          src="https://leetcard.jacoblin.cool/coderMayank69?theme=dark&font=Nunito&ext=activity"
          alt="LeetCode stats for coderMayank69"
          className="w-full object-cover"
          loading="lazy"
        />
      </div>
      {/* Heatmap / contest rating card */}
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
        <img
          src="https://leetcard.jacoblin.cool/coderMayank69?theme=dark&font=Nunito&ext=heatmap"
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
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-background text-foreground">

        {/* ════ HERO ════ */}
        <section className="mx-auto max-w-4xl px-6 pb-12 pt-8 md:pt-16">
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div variants={fadeUp(0)}>
              <Badge variant="outline" className="mb-5 btn-chai">
                About me
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp(0.05)}
              className="text-balance text-4xl font-bold tracking-tight md:text-6xl"
            >
              The Developer Behind&nbsp;
              <span className="text-primary">the Code</span>
            </motion.h1>

            <motion.div variants={fadeUp(0.08)} className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-primary" />
              Lucknow, Krishna Nagar, India
            </motion.div>

            <motion.p
              variants={fadeUp(0.1)}
              className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
            >
              Hi, I&apos;m <strong className="text-foreground">Mayank</strong> — a MERN stack
              developer passionate about building polished, production-ready web
              applications. Currently pursuing my CS degree and actively seeking
              software engineering internships.
            </motion.p>

            <motion.div variants={fadeUp(0.15)} className="mt-8 flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button asChild className="btn-chai btn-magnetic gap-2 bg-primary text-primary-foreground">
                  <a
                    href="https://drive.google.com/file/d/1HH8bHTrCKS_YGufdW8zs5rgTZcf6xIp8/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="size-4" />
                    Download Resume
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button variant="outline" asChild className="btn-chai gap-2">
                  <Link href="/contact">
                    Let&apos;s work together
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* ════ VALUES ════ */}
        <AnimatedSection className="border-t border-border/60">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <motion.p variants={fadeUp(0)} className="mb-10 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              What I Stand For
            </motion.p>
            <div className="grid gap-6 sm:grid-cols-3">
              {values.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  variants={fadeUp(i * 0.1)}
                  whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(0,0,0,0.18)" }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="rounded-2xl border border-border/60 bg-card p-6"
                >
                  <div className="mb-4 grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <p className="font-semibold text-foreground">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ════ TIMELINE ════ */}
        <AnimatedSection className="border-t border-border/60">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <motion.p variants={fadeUp(0)} className="mb-10 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              My Journey
            </motion.p>

            <div className="relative space-y-10 before:absolute before:left-[5px] before:top-2 before:h-full before:w-px before:bg-border">
              {timeline.map(({ year, title, icon: Icon, description }, i) => (
                <motion.div key={year} variants={fadeUp(i * 0.15)} className="relative pl-9">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 350 }}
                    className="absolute left-0 top-1 flex size-3 items-center justify-center rounded-full border-2 border-primary bg-background"
                  />
                  <div className="flex items-center gap-2">
                    <Icon className="size-4 text-primary" />
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">{year}</p>
                  </div>
                  <p className="mt-1 font-semibold text-foreground">{title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ════ GITHUB CONTRIBUTION GRAPH ════ */}
        <AnimatedSection className="border-t border-border/60">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <motion.p variants={fadeUp(0)} className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              GitHub Activity
            </motion.p>
            <motion.p variants={fadeUp(0.05)} className="mb-8 text-sm text-muted-foreground">
              Contributions from{" "}
              <a
                href="https://github.com/coderMayank69"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                @coderMayank69
              </a>
            </motion.p>
            <motion.div variants={fadeUp(0.1)} className="overflow-x-auto rounded-2xl border border-border/60 bg-card p-6">
              <GitHubCalendar
                username="coderMayank69"
                colorScheme="dark"
                fontSize={12}
                blockSize={13}
                blockMargin={4}
                theme={{
                  dark:  ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"] as [string, string, string, string, string],
                  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"] as [string, string, string, string, string],
                }}
              />
            </motion.div>
          </div>
        </AnimatedSection>

        {/* ════ LEETCODE STATS ════ */}
        <AnimatedSection className="border-t border-border/60">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <motion.p variants={fadeUp(0)} className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              LeetCode Progress
            </motion.p>
            <motion.p variants={fadeUp(0.05)} className="mb-6 text-sm text-muted-foreground">
              Problem-solving on{" "}
              <a
                href="https://leetcode.com/u/coderMayank69/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
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
        <AnimatedSection className="border-t border-border/60">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <motion.p variants={fadeUp(0)} className="mb-10 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Certifications
            </motion.p>
            <div className="grid gap-4 sm:grid-cols-2">
              {certificates.slice(0, 4).map((cert, idx) => (
                <motion.div
                  key={cert.id}
                  variants={fadeUp(idx * 0.1)}
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card transition-shadow hover:border-primary/40 hover:shadow-[0_0_28px_rgba(99,102,241,0.2)]"
                >
                  <div className={`relative flex h-24 w-full items-center justify-center bg-gradient-to-br ${CARD_GRADIENTS[idx % CARD_GRADIENTS.length]} overflow-hidden`}>
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
                    />
                    <Award className="relative z-10 size-7 text-white/90" />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">{cert.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{cert.issuer} · {cert.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp(0.4)} className="mt-6">
              <Button asChild variant="outline" className="btn-chai gap-2">
                <Link href="/certifications">
                  <Award className="size-4" />
                  View all {certificates.length} certificates
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* ════ SOCIAL LINKS ════ */}
        <AnimatedSection className="border-t border-border/60">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <motion.p variants={fadeUp(0)} className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Find Me Online
            </motion.p>
            <motion.div variants={fadeUp(0.1)} className="flex flex-wrap gap-3">
              {[
                { label: "GitHub",   href: "https://github.com/coderMayank69"             },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/codermayank69/"   },
                { label: "LeetCode", href: "https://leetcode.com/u/coderMayank69/"        },
                { label: "Hashnode", href: "https://hashnode.com/@coderMayank"            },
              ].map(({ label, href }) => (
                <motion.div key={label} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button variant="outline" asChild className="btn-chai gap-2">
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="size-4" />
                      {label}
                    </a>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

      </main>
      <Footer />
    </>
  );
}
