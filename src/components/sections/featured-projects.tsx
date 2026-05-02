"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ─── Easing constant — cubic-bezier avoids Framer's string-type issue ── */
const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

/* ─── Animation variants ─────────────────────────────────────────────── */
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
};

/* ─── Gradient placeholders per project ──────────────────────────────── */
const GRADIENTS = [
  "from-indigo-900/60 via-violet-900/40 to-background",
  "from-emerald-900/60 via-teal-900/40 to-background",
  "from-rose-900/60 via-pink-900/40 to-background",
];

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  const featured = projects.filter((p) => p.featured);

  return (
    <section ref={sectionRef} className="py-28 lg:py-36">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">

        {/* ── Section header ── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.p
            variants={headingVariants}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
          >
            Selected Work
          </motion.p>
          <motion.h2
            variants={headingVariants}
            className="text-4xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            Projects That Matter
          </motion.h2>
          <motion.p
            variants={headingVariants}
            className="mt-4 max-w-xl text-lg text-muted-foreground"
          >
            Real-world full-stack applications built with engineering precision
            and deliberate design choices.
          </motion.p>
        </motion.div>

        {/* ── Alternating project cards ── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {featured.map((project, i) => {
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className={cn(
                  "group relative grid items-center gap-10 overflow-hidden rounded-2xl border border-border/60",
                  "bg-card/50 p-8 backdrop-blur-sm md:grid-cols-2 md:p-10",
                  "shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition-shadow duration-300",
                  "hover:shadow-[0_8px_40px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.08)]",
                )}
              >
                {/* Hover glow overlay */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.07),transparent_60%)]" />

                {/* ── Image placeholder ── */}
                <div className={cn("aspect-[4/3] overflow-hidden rounded-xl", isEven ? "order-none" : "md:order-2")}>
                  <div
                    className={cn(
                      "h-full w-full bg-gradient-to-br flex items-center justify-center",
                      GRADIENTS[i % GRADIENTS.length],
                    )}
                  >
                    <span className="select-none text-7xl font-black tracking-tighter text-primary/30">
                      {project.title.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* ── Text content ── */}
                <div className={isEven ? "" : "md:order-1"}>
                  <span className="mb-4 inline-block text-xs font-bold tracking-widest text-primary/70">
                    {String(i + 1).padStart(2, "0")} ——
                  </span>

                  <h3 className="text-2xl font-bold text-foreground md:text-3xl">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {project.longDescription ?? project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="rounded-full text-xs font-medium">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Action links */}
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    {project.link && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
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
                        whileHover={{ scale: 1.03 }}
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
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── View all CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link href="/projects">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 rounded-full px-8 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
            >
              View All Projects
              <ArrowUpRight className="size-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
