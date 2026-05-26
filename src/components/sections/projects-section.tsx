"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectModal from "@/components/shared/project-modal";
import type { Project } from "@/data/projects";

/* Skeleton card for lazy loading */
function SkeletonCard() {
  return (
    <div className="card-eng overflow-hidden flex flex-col">
      {/* Image skeleton */}
      <div className="relative h-40 bg-neutral-100 overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        />
      </div>
      {/* Content skeleton */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="h-4 w-3/4 rounded bg-neutral-100 overflow-hidden relative">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
        </div>
        <div className="h-3 w-full rounded bg-neutral-100 overflow-hidden relative">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
        </div>
        <div className="h-3 w-2/3 rounded bg-neutral-100 overflow-hidden relative">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
        </div>
        <div className="mt-2 flex gap-1.5">
          {[1, 2, 3].map((k) => (
            <div key={k} className="h-5 w-12 rounded bg-neutral-100" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* Pinned projects in explicit order: YelpCamp → QuickStay → Reducate University */
const PINNED_ORDER = ["yelp", "quickstay", "reducate-university"];
const pinnedProjects = projects
  .filter((p) => p.isPinned)
  .sort((a, b) => {
    const ai = PINNED_ORDER.indexOf(a.id);
    const bi = PINNED_ORDER.indexOf(b.id);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const markLoaded = (id: string) =>
    setLoadedImages((prev) => new Set([...prev, id]));

  return (
    <>
      <section id="projects" className="relative border-t border-neutral-100 bg-[#fafafa]">
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" aria-hidden />

        <div className="relative mx-auto max-w-6xl px-6 md:px-8 py-20 md:py-28 z-10">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 flex flex-wrap items-end justify-between gap-4"
          >
            <div>
              <p className="eyebrow mb-2">Featured Projects</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                What I&apos;ve built
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden md:inline-flex items-center gap-1.5 btn btn-outline btn-sm"
            >
              All projects <ArrowRight className="size-3.5" />
            </Link>
          </motion.div>

          {/* ── Grid — pinned only ── */}
          <motion.div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pinnedProjects.map((project, i) => {
              const isLoaded = loadedImages.has(project.id);

              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="group relative flex flex-col overflow-hidden cursor-pointer rounded-xl border border-neutral-200 bg-white shadow-sm"
                  style={{ transition: "border-color 0.25s ease, box-shadow 0.25s ease" }}
                  whileHover={{ y: -5, transition: { duration: 0.25, ease: "easeOut" } }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={(e) => {
                    // Pick a color based on the project type
                    const colors: Record<string, string> = {
                      freelance: "#F59E0B",
                      group:     "#3B82F6",
                      personal:  "#8B5CF6",
                    };
                    const c = colors[project.type] ?? "#0a0a0a";
                    e.currentTarget.style.borderColor = c;
                    e.currentTarget.style.boxShadow = `0 0 0 1px ${c}30, 0 12px 32px -6px ${c}25`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedProject(project)}
                  aria-label={`View details for ${project.title}`}
                >
                  {/* ── Badges ── */}
                  <div className="absolute right-3 top-3 z-10 flex flex-col items-end gap-1.5">
                    <span
                      className={[
                        "badge text-[10px] capitalize",
                        project.type === "freelance" ? "badge-yellow" :
                        project.type === "group" ? "text-blue-700 bg-blue-50 border border-blue-200 text-[10px] rounded-full px-2 py-0.5" :
                        "badge-green",
                      ].join(" ")}
                    >
                      {project.type}
                    </span>
                  </div>

                  {/* ── Cover with skeleton ── */}
                  <div className="relative flex h-40 items-center justify-center bg-neutral-50 border-b border-neutral-100 overflow-hidden">
                    {/* Skeleton shown until image loads */}
                    {!isLoaded && (
                      <div className="absolute inset-0 bg-neutral-100">
                        <motion.div
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                        />
                      </div>
                    )}

                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                        loading="lazy"
                        onLoad={() => markLoaded(project.id)}
                        onError={(e) => {
                          const img = e.currentTarget;
                          if (project.link && !img.dataset.fallback) {
                            img.dataset.fallback = "1";
                            img.src = `https://api.microlink.io?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url&waitFor=8000`;
                          } else {
                            markLoaded(project.id);
                            img.style.display = "none";
                          }
                        }}
                      />
                    ) : project.link ? (
                      <img
                        src={`https://api.microlink.io?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url&waitFor=8000`}
                        alt={project.title}
                        className={`w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                        loading="lazy"
                        onLoad={() => markLoaded(project.id)}
                        onError={() => markLoaded(project.id)}
                      />
                    ) : (
                      <Code2 className="size-12 text-neutral-200 transition-transform duration-300 group-hover:scale-110" />
                    )}
                  </div>

                  {/* ── Content ── */}
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div>
                      <h3 className="font-bold text-[#0a0a0a] text-[15px] group-hover:underline underline-offset-2 transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-neutral-500 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech stack pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono text-neutral-500 bg-neutral-50 border border-neutral-100 rounded-md px-2 py-0.5"
                        >
                          {t}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-[11px] text-neutral-400 bg-neutral-50 border border-neutral-100 rounded-md px-2 py-0.5">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Actions — stop propagation so they don't open modal */}
                    <div className="mt-auto flex gap-2 pt-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline btn-sm text-[12px]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.56 9.56 0 0 1 12 6.84a9.56 9.56 0 0 1 2.5.34c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/></svg> Code
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm text-[12px]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="size-3.5" /> Live
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          {/* Fallback if no pinned projects */}
          {pinnedProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Code2 className="mb-4 size-12 text-neutral-200" />
              <p className="text-neutral-500">No pinned projects yet.</p>
            </div>
          )}

          {/* Mobile "view all" */}
          <div className="mt-8 text-center md:hidden">
            <Link href="/projects" className="btn btn-outline btn-sm">
              View all <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Project detail modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
