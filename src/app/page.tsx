"use client";

import { useLayoutEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, Download, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import { FeaturedProjects, Skills } from "@/components/sections";
import { Footer } from "@/components/sections/footer";

/* ─── Code snippet shown in the hero terminal card ─────────────── */
const CODE_LINES = [
  { text: "const mayank = {",             colour: "text-foreground/90" },
  { text: "  role:     'MERN Developer',", colour: "text-emerald-400" },
  { text: "  seeking:  'Internship',",     colour: "text-sky-400" },
  { text: "  stack:    ['React', 'Node',", colour: "text-violet-400" },
  { text: "              'MongoDB'],",      colour: "text-violet-400" },
  { text: "  ships:    'clean code',",     colour: "text-amber-400" },
  { text: "};",                            colour: "text-foreground/90" },
  { text: "",                             colour: "" },
  { text: "mayank.build('your idea') 🚀", colour: "text-primary font-semibold" },
];

/* ─── Social links ──────────────────────────────────────────────── */
const SOCIAL = [
  { href: "https://github.com/coderMayank69",            label: "GitHub",   svg: "M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" },
  { href: "https://linkedin.com/in/codermayank69",       label: "LinkedIn", svg: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { href: "mailto:codermayank69@gmail.com",              label: "Email",    svg: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" },
];

export default function Home() {
  const rootRef        = useRef<HTMLDivElement | null>(null);
  const subtitleRef    = useRef<HTMLParagraphElement | null>(null);
  const titleRef       = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef         = useRef<HTMLDivElement | null>(null);
  const socialRef      = useRef<HTMLDivElement | null>(null);
  const terminalRef    = useRef<HTMLDivElement | null>(null);

  /* GSAP entrance animation — hero text + terminal card */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(
        [subtitleRef.current, titleRef.current, descriptionRef.current, ctaRef.current, socialRef.current],
        { y: 40, opacity: 0, duration: 0.85, stagger: 0.11 },
      ).from(
        terminalRef.current,
        { x: 56, opacity: 0, scale: 0.95, duration: 1.1 },
        "-=0.65",
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) =>
    gsap.to(window, {
      duration: 1.1, ease: "power2.inOut",
      scrollTo: { y: `#${id}`, offsetY: 88 },
    });

  return (
    <div ref={rootRef} className="w-full bg-background text-foreground">
      <Navbar />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <main
        id="hero"
        className="relative flex min-h-[calc(100vh-5rem)] w-full items-center overflow-hidden px-6 py-16 md:px-10"
      >
        {/* Atmospheric background glows (dark mode only visible) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-48 left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full
                     bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.18)_0%,transparent_70%)]
                     dark:block hidden"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[600px]
                     bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,255,0,0.06)_0%,transparent_70%)]
                     dark:block hidden"
        />

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.1fr]">

          {/* ── Left: copy ── */}
          <div>
            {/* Availability badge */}
            <p
              ref={subtitleRef}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10
                         px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary"
            >
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              Full Stack Developer · Available for Internships
            </p>

            <h1
              ref={titleRef}
              className="mt-6 text-balance text-5xl font-extrabold tracking-tight text-foreground
                         md:text-6xl lg:text-7xl"
            >
              Building&nbsp;
              <span className="text-primary">polished</span>
              <br />web products
            </h1>

            <p
              ref={descriptionRef}
              className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
            >
              I design and build modern MERN stack applications with strong UX,
              thoughtful engineering, and production-ready architecture.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="mt-9 flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  className="btn-chai btn-magnetic gap-2 px-7"
                  onClick={() => scrollToSection("projects")}
                >
                  View My Work
                  <ArrowRight className="size-4" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="https://drive.google.com/file/d/1HH8bHTrCKS_YGufdW8zs5rgTZcf6xIp8/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="outline" className="btn-chai gap-2 px-7">
                    <Download className="size-4" />
                    Download Resume
                  </Button>
                </a>
              </motion.div>
            </div>

            {/* Social links */}
            <div ref={socialRef} className="mt-9 flex items-center gap-4">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Find me on
              </span>
              <div className="flex gap-3">
                {SOCIAL.map(({ svg, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    className="grid size-9 place-items-center rounded-xl border border-border/60 bg-card/60
                               text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
                      <path d={svg} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Terminal card ── */}
          <div ref={terminalRef}>
            <motion.div
              className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-2xl backdrop-blur-sm"
              whileHover={{ y: -4, boxShadow: "0 30px 60px rgba(0,0,0,0.3)" }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-5 py-3">
                <span className="size-3 rounded-full bg-red-500/80" />
                <span className="size-3 rounded-full bg-yellow-500/80" />
                <span className="size-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-muted-foreground font-mono">
                  mayank.ts
                </span>
              </div>

              {/* Code content */}
              <div className="px-6 py-5 font-mono text-sm leading-7">
                {CODE_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.07, duration: 0.3 }}
                    className={line.colour || "text-foreground/50"}
                  >
                    {line.text || "\u00A0"}
                  </motion.div>
                ))}

                {/* Blinking cursor */}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="inline-block h-4 w-0.5 bg-primary align-middle"
                />
              </div>

              {/* Ambient glow on card */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-8 -right-8 size-40 rounded-full
                           bg-primary/20 blur-3xl dark:bg-primary/15"
              />
            </motion.div>
          </div>
        </div>
      </main>

      {/* ════════════════════════════════════════
          PROJECTS
      ════════════════════════════════════════ */}
      <section id="projects">
        <FeaturedProjects />
      </section>

      {/* ════════════════════════════════════════
          SKILLS
      ════════════════════════════════════════ */}
      <section id="skills">
        <Skills />
      </section>

      {/* ════════════════════════════════════════
          CONTACT CTA
      ════════════════════════════════════════ */}
      <section id="contact">
        <ContactCTA scrollToTop={() => scrollToSection("hero")} />
      </section>

      <Footer />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   CONTACT CTA — inline section component
───────────────────────────────────────────────────────────────── */
function ContactCTA({ scrollToTop }: { scrollToTop: () => void }) {
  const ref      = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="relative overflow-hidden bg-primary px-6 py-28 text-primary-foreground md:px-10"
    >
      {/* Background accent shapes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full
                   bg-primary-foreground/5 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-20 size-80 rounded-full
                   bg-primary-foreground/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] opacity-70"
        >
          Ready to collaborate
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold tracking-tight md:text-6xl"
        >
          Let&apos;s Build Something&nbsp;
          <span className="underline decoration-primary-foreground/40 underline-offset-4">
            Great
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mt-5 text-lg opacity-80"
        >
          Have a project in mind or an internship role to fill? I&apos;d love to
          hear from you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-9 flex flex-wrap justify-center gap-3"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link href="/contact">
              <Button
                className="gap-2 rounded-full bg-primary-foreground px-8 text-primary hover:opacity-90"
              >
                Send a message
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="ghost"
              onClick={scrollToTop}
              className="rounded-full border border-primary-foreground/30 px-8 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Back to Top
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}