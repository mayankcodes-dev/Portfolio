"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { skills } from "@/data/skills";

/* ─── Animation variants ─────────────────────────────────────────── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ─── Category accent colours ────────────────────────────────────── */
const CATEGORY_COLOURS: Record<string, string> = {
  Frontend: "border-blue-500/40   text-blue-400   bg-blue-500/10",
  Backend:  "border-green-500/40  text-green-400  bg-green-500/10",
  Tools:    "border-orange-500/40 text-orange-400 bg-orange-500/10",
  Design:   "border-pink-500/40   text-pink-400   bg-pink-500/10",
};
const DEFAULT_COLOUR = "border-primary/40 text-primary bg-primary/10";

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="relative py-28 lg:py-36">
      {/* Subtle background tint */}
      <div className="pointer-events-none absolute inset-0 bg-muted/30" />

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">

        {/* ── Section header ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="mb-16 text-center"
        >
          <motion.p
            variants={headingVariants}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
          >
            Tech Stack
          </motion.p>
          <motion.h2
            variants={headingVariants}
            className="text-4xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            Tools I Use Daily
          </motion.h2>
          <motion.p
            variants={headingVariants}
            className="mt-4 mx-auto max-w-xl text-lg text-muted-foreground"
          >
            A carefully chosen stack optimised for shipping production-ready
            MERN applications fast.
          </motion.p>
        </motion.div>

        {/* ── Skill categories ── */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group) => {
            const colour = CATEGORY_COLOURS[group.category] ?? DEFAULT_COLOUR;

            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                transition={{ duration: 0.55 }}
                className="rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm"
              >
                {/* Category label */}
                <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  {group.category}
                </h3>

                {/* Skill pills */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="flex flex-wrap gap-2"
                >
                  {group.items.map((item) => (
                    <motion.span
                      key={item}
                      variants={itemVariants}
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 400, damping: 18 }}
                      className={`cursor-default rounded-full border px-3 py-1 text-xs font-medium transition-colors ${colour}`}
                    >
                      {item}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
