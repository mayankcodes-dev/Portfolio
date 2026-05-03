"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2, ExternalLink, Pin } from "lucide-react";
import { projects } from "@/data/projects";

const GithubIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

/* Only show pinned projects on the homepage */
const pinnedProjects = projects.filter((p) => p.isPinned);

export default function ProjectsSection() {
  return (
    <section id="projects" className="border-t border-neutral-100">
      <div className="mx-auto max-w-6xl px-6 md:px-8 py-20 md:py-28">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="eyebrow mb-2">
              <Pin className="size-3" /> Pinned Projects
            </p>
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
          {pinnedProjects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="card-eng group relative flex flex-col overflow-hidden"
            >
              {/* ── Badges ── */}
              <div className="absolute right-3 top-3 z-10 flex flex-col items-end gap-1.5">
                <span className="badge badge-neutral text-[10px]">
                  <Pin className="size-2.5" /> Pinned
                </span>
                <span
                  className={[
                    "badge text-[10px]",
                    project.type === "freelance"
                      ? "badge-yellow"
                      : "badge-green",
                  ].join(" ")}
                >
                  {project.type === "freelance" ? "Freelance" : "Personal"}
                </span>
              </div>

              {/* ── Cover ── */}
              <div className="relative flex h-40 items-center justify-center bg-neutral-50 border-b border-neutral-100">
                <Code2 className="size-12 text-neutral-200 transition-transform duration-300 group-hover:scale-110 group-hover:text-neutral-300" />
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

                {/* Actions */}
                <div className="mt-auto flex gap-2 pt-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm text-[12px]"
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
                    >
                      <ExternalLink className="size-3.5" /> Live
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
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
  );
}
