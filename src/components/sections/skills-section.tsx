"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories, LEVEL_LABELS } from "@/data/skills";

export default function SkillsSection() {
  const [active, setActive] = useState(0);
  const cat = skillCategories[active];

  return (
    <section id="skills" className="border-t border-neutral-100">
      <div className="mx-auto max-w-6xl px-6 md:px-8 py-20 md:py-28">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <p className="eyebrow mb-2">Skills</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Technologies &amp; Tools
          </h2>
          <p className="text-neutral-500 max-w-lg">
            A collection of technologies I use day-to-day to build modern, performant web applications.
          </p>
        </motion.div>

        {/* ── Category tabs ── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {skillCategories.map((c, i) => (
            <button
              key={c.category}
              onClick={() => setActive(i)}
              className={[
                "px-3.5 py-2 text-[13px] font-medium rounded-lg border transition-all",
                i === active
                  ? "bg-[#0a0a0a] text-white border-[#0a0a0a] shadow-sm"
                  : "bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400 hover:text-[#0a0a0a]",
              ].join(" ")}
            >
              <span className="mr-1.5">{c.icon}</span>
              {c.category}
            </button>
          ))}
        </div>

        {/* ── Skills grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            {cat.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="skill-card group/card relative flex flex-col items-center gap-3 p-5 rounded-xl border border-neutral-200 bg-white cursor-default overflow-visible"
                style={{ transition: "border-color 0.25s ease, box-shadow 0.25s ease" }}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "#0a0a0a";
                  el.style.boxShadow = "0 8px 20px -4px rgba(10, 10, 10, 0.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "";
                  el.style.boxShadow = "";
                }}
              >
                {/* Logo */}
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-lg transition-transform duration-200 group-hover/card:scale-110"
                  style={{ background: `${skill.color}12` }}
                >
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      t.style.display = "none";
                      const span = document.createElement("span");
                      span.className = "text-base font-bold";
                      span.style.color = skill.color;
                      span.textContent = skill.name[0];
                      t.parentElement?.appendChild(span);
                    }}
                  />
                </div>

                {/* Name & level */}
                <div className="text-center">
                  <p className="font-semibold text-[#0a0a0a] text-sm">{skill.name}</p>
                  <p className="text-[11px] text-neutral-400 font-mono mt-0.5 uppercase tracking-wider">
                    {LEVEL_LABELS[skill.level]}
                  </p>
                </div>

                {/* 5 bars */}
                <div className="flex gap-1 w-full">
                  {[1, 2, 3, 4, 5].map((dot) => {
                    let activeColor = "";
                    if (dot <= skill.level) {
                      if (skill.level === 1) activeColor = "bg-orange-400";
                      else if (skill.level === 2) activeColor = "bg-yellow-400";
                      else activeColor = "bg-green-500";
                    }
                    return (
                      <div
                        key={dot}
                        className={[
                          "h-[3px] flex-1 rounded-full transition-all duration-300",
                          dot <= skill.level ? activeColor : "bg-neutral-100",
                        ].join(" ")}
                      />
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
