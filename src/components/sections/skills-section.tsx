"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories, LEVEL_LABELS } from "@/data/skills";

export default function SkillsSection() {
  const [active, setActive] = useState(0);
  const cat = skillCategories[active];

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 md:px-8 py-24 lg:py-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Skills</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Technologies & Tools
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A collection of technologies and tools I've mastered throughout my development journey.
        </p>
      </motion.div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 mb-12">
        {skillCategories.map((c, i) => (
          <motion.button
            key={c.category}
            onClick={() => setActive(i)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={[
              "px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
              i === active
                ? "bg-primary text-primary-foreground shadow-md"
                : "border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50",
            ].join(" ")}
          >
            <span className="mr-2">{c.icon}</span>
            {c.category}
          </motion.button>
        ))}
      </div>

      {/* Skills Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cat.category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {cat.skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center gap-3 p-4 rounded-lg border border-border bg-card/50 hover:border-primary/30 hover:bg-card transition-all"
            >
              {/* Logo */}
              <div
                className="flex items-center justify-center w-12 h-12 rounded-lg p-2"
                style={{ background: `${skill.color}15` }}
              >
                <img
                  src={skill.logo}
                  alt={skill.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = "none";
                    const span = document.createElement("span");
                    span.className = "text-lg font-bold";
                    span.style.color = skill.color;
                    span.textContent = skill.name[0];
                    t.parentElement?.appendChild(span);
                  }}
                />
              </div>

              {/* Name & Level */}
              <div className="text-center">
                <p className="font-semibold text-foreground text-sm">{skill.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{LEVEL_LABELS[skill.level]}</p>
              </div>

              {/* Level Bar */}
              <div className="flex gap-1 w-full">
                {[1, 2, 3, 4, 5].map((dot) => (
                  <div
                    key={dot}
                    className={[
                      "h-1 flex-1 rounded-full transition-all duration-300",
                      dot <= skill.level ? "bg-primary" : "bg-border/30",
                    ].join(" ")}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
