"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink, ArrowLeft, Code2, Layers } from "lucide-react";
import ProjectModal from "@/components/shared/project-modal";
import type { Project } from "@/data/projects";

const GithubIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

import SiteNav from "@/components/layout/site-nav";
import { Footer } from "@/components/sections/footer";
import { projects } from "@/data/projects";

const TABS = [
  { label: "All",       value: "all"      },
  { label: "Freelance", value: "freelance" },
  { label: "Personal",  value: "personal"  },
  { label: "Group",     value: "group"     },
] as const;
type TabValue = typeof TABS[number]["value"];

const TYPE_ORDER: Record<string, number> = { freelance: 0, personal: 1, group: 2 };

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const, delay } },
});

export default function ProjectsPage() {
  const [tab, setTab] = useState<TabValue>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = tab === "all" ? projects : projects.filter(p => p.type === tab);

  const sorted = [...filtered].sort((a, b) => {
    // Pinned first, then by type order, then alphabetically
    if (b.isPinned !== a.isPinned) return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
    if (tab === "all") {
      const typeOrder = TYPE_ORDER[a.type] - TYPE_ORDER[b.type];
      if (typeOrder !== 0) return typeOrder;
    }
    return a.title.localeCompare(b.title);
  });

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-white text-[#0a0a0a]">

        {/* ── Hero ── */}
        <section className="relative border-b border-neutral-100 pb-12 pt-8 md:pt-14 bg-[#fafafa]">
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" aria-hidden />
          <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            >
              <motion.div variants={fadeUp(0)}>
                <Link
                  href="/"
                  className="mb-6 inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-[#0a0a0a]"
                >
                  <ArrowLeft className="size-3.5" /> Back to Home
                </Link>
              </motion.div>

              <motion.div variants={fadeUp(0.04)}>
                <span className="eyebrow">
                  <Layers className="size-3" />
                  Projects
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp(0.08)}
                className="mt-4 font-extrabold tracking-tighter"
                style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
              >
                Things I&apos;ve <span className="text-neutral-400">built</span>
              </motion.h1>

              <motion.p
                variants={fadeUp(0.12)}
                className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-neutral-500"
              >
                A collection of projects I&apos;ve shipped — from full-stack SaaS
                platforms to developer tools. Each one taught me something new.
              </motion.p>

              {/* Filter tabs */}
              <motion.div variants={fadeUp(0.16)} className="mt-8 flex flex-wrap gap-2">
                {TABS.map(({ label, value }) => {
                  const count = value === "all"
                    ? projects.length
                    : projects.filter(p => p.type === value).length;
                  return (
                    <button
                      key={value}
                      id={`project-filter-${value}`}
                      onClick={() => setTab(value)}
                      className={[
                        "px-3.5 py-2 text-[13px] font-medium rounded-lg border transition-all",
                        tab === value
                          ? "bg-[#0a0a0a] text-white border-[#0a0a0a] shadow-sm"
                          : "bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400 hover:text-[#0a0a0a]",
                      ].join(" ")}
                    >
                      {label}
                      <span className="ml-1.5 text-[11px] opacity-60">{count}</span>
                    </button>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Project Grid ── */}
        <section className="mx-auto max-w-6xl px-6 md:px-8 py-12 md:py-16">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-wider text-neutral-400">
            {tab === "all" ? `${sorted.length} total` : `${sorted.length} project${sorted.length !== 1 ? "s" : ""}`}
          </p>

          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {sorted.map((project, idx) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="card-eng group relative flex flex-col overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedProject(project)}
                  aria-label={`View details for ${project.title}`}
                >
                  {/* Badges */}
                  <div className="absolute right-3 top-3 z-10 flex flex-col items-end gap-1.5">

                    <span className={[
                      "badge text-[10px] capitalize",
                      project.type === "freelance" ? "badge-yellow" : 
                      project.type === "group" ? "badge-blue text-blue-700 bg-blue-50 border-blue-200" : 
                      "badge-green",
                    ].join(" ")}>
                      {project.type}
                    </span>
                  </div>

                  {/* Cover */}
                  <div className="relative flex h-44 items-center justify-center bg-neutral-50 border-b border-neutral-100 overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          const img = e.currentTarget;
                          if (project.link && !img.dataset.fallback) {
                            img.dataset.fallback = "1";
                            img.src = `https://api.microlink.io?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url&waitFor=8000`;
                          } else {
                            img.style.display = "none";
                          }
                        }}
                      />
                    ) : project.link ? (
                      <img
                        src={`https://api.microlink.io?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url&waitFor=8000`}
                        alt={project.title}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <Code2 className="size-16 text-neutral-200 transition-transform duration-300 group-hover:scale-110 group-hover:text-neutral-300" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div>
                      <h2 className="font-bold text-[15px] text-[#0a0a0a] group-hover:underline underline-offset-2">
                        {project.title}
                      </h2>
                      <p className="mt-1.5 text-sm leading-relaxed text-neutral-500 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono text-neutral-500 bg-neutral-50 border border-neutral-100 rounded-md px-2 py-0.5"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="text-[11px] text-neutral-400 bg-neutral-50 border border-neutral-100 rounded-md px-2 py-0.5">
                          +{project.technologies.length - 5}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="mt-auto flex items-center gap-2 pt-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline btn-sm text-[12px]"
                          aria-label={`View ${project.title} on GitHub`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <GithubIcon className="size-3.5" /> Code
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm text-[12px]"
                          aria-label={`View live demo of ${project.title}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="size-3.5" /> Live
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {sorted.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Code2 className="mb-4 size-12 text-neutral-200" />
              <p className="text-neutral-500">No projects in this category yet.</p>
            </div>
          )}
        </section>

        {/* ── CTA ── */}
        <section className="border-t border-neutral-100">
          <div className="mx-auto max-w-6xl px-6 md:px-8 py-16 md:py-20 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold tracking-tight"
            >
              Got a project idea?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="mt-3 text-neutral-500"
            >
              Let&apos;s build something great together.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-7 flex justify-center gap-3"
            >
              <Link href="/contact" className="btn btn-primary">
                Let&apos;s Talk →
              </Link>
              <a
                href="https://github.com/coderMayank69"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <GithubIcon className="size-4" /> GitHub
              </a>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
