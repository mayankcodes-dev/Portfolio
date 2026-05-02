"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SiteNav from "@/components/layout/site-nav";
import { Footer } from "@/components/sections/footer";
import { cn } from "@/lib/utils";

/* ─── Filter categories ─────────────────────────────────────────── */
const FILTERS = ["All", "Frontend", "Full Stack", "AI/ML"] as const;
type Filter = (typeof FILTERS)[number];

/* ─── Tag → category mapping ────────────────────────────────────── */
const CATEGORY_MAP: Record<string, Filter[]> = {
  paypilot:  ["Full Stack"],
  agenthub:  ["Full Stack", "AI/ML"],
  portfolio: ["Frontend", "Full Stack"],
};

/* ─── Gradient accents per project ─────────────────────────────── */
const GRADIENTS = [
  "from-indigo-900/70 via-violet-900/50 to-background",
  "from-emerald-900/70 via-teal-900/50 to-background",
  "from-rose-900/70 via-pink-900/50 to-background",
];

/* ─── Easing constant ──────────────────────────────────────────── */
const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

/* ─── Animation variants ──────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const cardFadeUp = (i: number): Variants => ({
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT, delay: i * 0.12 } },
});

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others   = projects.filter((p) => !p.featured);

  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const heroRef     = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const othersRef   = useRef<HTMLDivElement>(null);

  const heroInView     = useInView(heroRef,     { once: true });
  const featuredInView = useInView(featuredRef, { once: true, margin: "-60px" });
  const othersInView   = useInView(othersRef,   { once: true, margin: "-60px" });

  /* Filter projects by selected category */
  const filteredOthers = others.filter((p) => {
    if (activeFilter === "All") return true;
    return CATEGORY_MAP[p.id]?.includes(activeFilter);
  });

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-background text-foreground">

        {/* ════ HERO ════ */}
        <motion.section
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="mx-auto max-w-6xl px-6 pb-10 pt-16 md:pt-24"
        >
          <motion.p
            variants={fadeUp}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
          >
            My Work
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-balance text-4xl font-bold tracking-tight md:text-6xl"
          >
            Projects built with{" "}
            <span className="text-primary">engineering</span> precision
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            From AI-powered SaaS platforms to developer tools — real projects
            shipped with real code and real users.
          </motion.p>
        </motion.section>

        {/* ════ FEATURED PROJECTS ════ */}
        <section className="border-t border-border/60">
          <div ref={featuredRef} className="mx-auto max-w-6xl px-6 py-16">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={featuredInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-12 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
            >
              Featured Work
            </motion.p>

            <div className="space-y-16">
              {featured.map((project, idx) => (
                <motion.article
                  key={project.id}
                  initial="hidden"
                  animate={featuredInView ? "visible" : "hidden"}
                  variants={cardFadeUp(idx)}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  className={cn(
                    "group grid items-center gap-10 lg:grid-cols-2",
                    "relative overflow-hidden rounded-2xl border border-border/60",
                    "bg-card/50 p-8 backdrop-blur-sm md:p-10",
                    "hover:shadow-[0_12px_40px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.06)]",
                    "transition-shadow duration-300",
                  )}
                >
                  {/* Gradient image area */}
                  <div
                    className={cn(
                      "aspect-video overflow-hidden rounded-xl",
                      idx % 2 !== 0 && "lg:order-2",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-full w-full items-center justify-center",
                        "bg-gradient-to-br",
                        GRADIENTS[idx % GRADIENTS.length],
                      )}
                    >
                      <span className="select-none text-8xl font-black text-primary/25">
                        {project.title.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={idx % 2 !== 0 ? "lg:order-1" : ""}>
                    <span className="text-xs font-bold tracking-widest text-primary/60">
                      {String(idx + 1).padStart(2, "0")} ——
                    </span>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
                      {project.title}
                    </h2>
                    <p className="mt-3 leading-relaxed text-muted-foreground">
                      {project.longDescription || project.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="rounded-full text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-7 flex flex-wrap gap-3">
                      {project.link && (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Button size="sm" className="gap-2 rounded-full">
                            <ExternalLink className="size-3.5" />
                            Live Demo
                          </Button>
                        </motion.a>
                      )}
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Button size="sm" variant="outline" className="gap-2 rounded-full">
                            <ExternalLink className="size-3.5" />
                            GitHub
                          </Button>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ════ OTHER PROJECTS ════ */}
        {others.length > 0 && (
          <section className="border-t border-border/60">
            <div ref={othersRef} className="mx-auto max-w-6xl px-6 py-16">
              <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={othersInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5 }}
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-primary"
                >
                  Other Projects
                </motion.p>

                {/* Filter tabs */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={othersInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  className="flex flex-wrap gap-2"
                >
                  {FILTERS.map((f) => (
                    <motion.button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className={cn(
                        "rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
                        activeFilter === f
                          ? "bg-primary text-primary-foreground"
                          : "border border-border/60 text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {f}
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              {/* Cards grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFilter}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {filteredOthers.map((project, i) => (
                    <motion.article
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.07, type: "spring", stiffness: 280, damping: 22 }}
                      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.18)" }}
                      className="rounded-2xl border border-border/60 bg-card p-6 transition-shadow"
                    >
                      <h3 className="font-semibold text-foreground">{project.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="outline" className="rounded-full text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-5 flex gap-4">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                          >
                            Live <ArrowUpRight className="size-3.5" />
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <ExternalLink className="size-3.5" />
                            GitHub
                          </a>
                        )}
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </section>
        )}

        {/* ════ CTA ════ */}
        <section className="border-t border-border/60">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-6xl px-6 py-20 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Have a project in mind?
            </h2>
            <p className="mt-3 text-muted-foreground text-lg">
              I&apos;m available for internships, freelance, and contract work.
            </p>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-block"
            >
              <Button size="lg" asChild className="gap-2 rounded-full px-8">
                <Link href="/contact">
                  Get in touch
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
