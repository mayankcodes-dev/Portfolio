"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ExternalLink, Code2 } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  const badgeClass =
    project?.type === "freelance"
      ? "badge-yellow"
      : project?.type === "group"
      ? "text-blue-700 bg-blue-50 border border-blue-200 text-[10px] rounded-full px-2 py-0.5"
      : "badge-green";

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Overlay */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Modal panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 bottom-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[101] w-full max-w-2xl bg-white rounded-t-2xl md:rounded-2xl border border-neutral-200 shadow-2xl overflow-hidden flex flex-col max-h-[90dvh]"
          >
            {/* Image section */}
            <div className="relative h-52 md:h-60 w-full flex-shrink-0 bg-neutral-50 overflow-hidden">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
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
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`https://api.microlink.io?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url&waitFor=8000`}
                  alt={project.title}
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Code2 className="size-16 text-neutral-200" />
                </div>
              )}
              {/* Bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
            </div>

            {/* Content — scrollable */}
            <div className="overflow-y-auto flex-1 p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`badge text-[10px] capitalize ${badgeClass}`}>{project.type}</span>
                    {project.period && (
                      <span className="font-mono text-[10px] text-neutral-400">{project.period}</span>
                    )}
                  </div>
                  <h2 className="mt-2 text-xl md:text-2xl font-bold tracking-tight text-[#0a0a0a]">
                    {project.title}
                  </h2>
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="flex-shrink-0 grid size-8 place-items-center rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-500 hover:text-[#0a0a0a] hover:border-neutral-400 transition-colors"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm md:text-base text-neutral-500 leading-relaxed">
                {project.longDescription || project.description}
              </p>

              {/* Tech stack */}
              <div className="mt-6">
                <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-2">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-md text-neutral-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="mt-6 flex flex-wrap gap-3">
                {project.link && (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn btn-primary btn-sm"
                  >
                    <ExternalLink className="size-3.5" />
                    Live Demo
                  </motion.a>
                )}
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn btn-outline btn-sm"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden>
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    Source Code
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
