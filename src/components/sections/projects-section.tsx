"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, Code2 } from "lucide-react";
import { projects } from "@/data/projects";

/* ── Pinned projects in explicit order ──────────────────────────────────── */
const PINNED_ORDER = ["quickstay", "yelp", "reducate-university", "mayank-developer", "note-keeper"];
const pinnedProjects = projects
  .filter((p) => p.isPinned)
  .sort((a, b) => {
    const ai = PINNED_ORDER.indexOf(a.id);
    const bi = PINNED_ORDER.indexOf(b.id);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

/* ── Tech colour map ──────────────────────────────────────────────────────── */
const TECH_COLOURS: Record<string, string> = {
  "React":        "#61dafb",
  "Next.js":      "#000000",
  "Vite":         "#646cff",
  "TypeScript":   "#3178c6",
  "Node.js":      "#3c873a",
  "Express":      "#404040",
  "MongoDB":      "#47a248",
  "Tailwind CSS": "#38bdf8",
  "Tailwind":     "#38bdf8",
  "JavaScript":   "#f7df1e",
  "Stripe":       "#635bff",
  "Clerk":        "#6c47ff",
  "Cloudinary":   "#3448c5",
  "Passport.js":  "#34d058",
  "Mongoose":     "#880000",
  "MapTiler":     "#3d9970",
};

function getTechColor(t: string) {
  return TECH_COLOURS[t] ?? "#6b7280";
}

/* ── GitHub icon ──────────────────────────────────────────────────────────── */
const GhIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.56 9.56 0 0 1 12 6.84a9.56 9.56 0 0 1 2.5.34c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
  </svg>
);

/* ── Project image with microlink fallback ────────────────────────────────── */
function ProjectImage({
  image, link, title, technologies,
}: {
  image: string; link?: string; title: string; technologies: string[];
}) {
  const [loaded,       setLoaded]       = useState(false);
  const [useFallback,  setUseFallback]  = useState(!image && !link);

  const mlUrl = link
    ? `https://api.microlink.io?url=${encodeURIComponent(link)}&screenshot=true&meta=false&embed=screenshot.url&waitFor=10000`
    : null;

  const topTechs = technologies.slice(0, 3);

  /* Gradient placeholder */
  const colours = topTechs.map(getTechColor);
  const gradient =
    colours.length >= 2
      ? `linear-gradient(135deg, ${colours[0]}22 0%, ${colours[1]}22 55%, ${colours[2] ?? colours[0]}22 100%)`
      : "linear-gradient(135deg, #f4f4f5 0%, #e4e4e7 100%)";

  const src = image || mlUrl || "";

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 shadow-sm">
      {/* Shimmer while loading */}
      {!loaded && !useFallback && (
        <div className="absolute inset-0 bg-neutral-100 overflow-hidden">
          <div className="shimmer absolute inset-0" />
        </div>
      )}

      {/* Image — static or microlink */}
      {!useFallback && src && (
        <img
          src={src}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setUseFallback(true)}
        />
      )}

      {/* Tech-stack gradient fallback */}
      {useFallback && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ background: gradient }}>
          <Code2 className="size-10 text-neutral-300" />
          <div className="flex flex-wrap justify-center gap-1.5 max-w-[200px]">
            {topTechs.map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono px-2 py-0.5 rounded border"
                style={{
                  color: getTechColor(t),
                  borderColor: `${getTechColor(t)}44`,
                  backgroundColor: `${getTechColor(t)}11`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Type badge ───────────────────────────────────────────────────────────── */
function TypeBadge({ type }: { type: string }) {
  const cls =
    type === "freelance" ? "badge-yellow" :
    type === "group"     ? "text-blue-700 bg-blue-50 border border-blue-200" :
    "badge-green";
  return (
    <span className={`badge text-[10px] capitalize ${cls}`}>{type}</span>
  );
}

/* ── Main section ─────────────────────────────────────────────────────────── */
export default function ProjectsSection() {
  return (
    <section id="projects" className="relative border-t border-neutral-100 bg-[#fafafa]">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-5xl px-6 md:px-8 py-20 md:py-28 z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 flex flex-wrap items-end justify-between gap-4"
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

        {/* Project rows */}
        <div className="flex flex-col divide-y divide-neutral-100">
          {pinnedProjects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
              className="flex flex-col md:flex-row gap-8 md:gap-12 py-12 first:pt-0 last:pb-0"
            >
              {/* ── Image panel ── */}
              <div className="w-full md:w-[45%] flex-shrink-0 aspect-[16/10]">
                <ProjectImage
                  image={project.image}
                  link={project.link}
                  title={project.title}
                  technologies={project.technologies}
                />
              </div>

              {/* ── Content panel ── */}
              <div className="flex flex-col justify-center gap-4 flex-1 min-w-0">
                {/* Title */}
                <h3 className="text-2xl md:text-[1.65rem] font-bold tracking-tight text-[#0a0a0a] leading-tight">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-[15px] leading-relaxed text-neutral-500">
                  {project.longDescription ?? project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono text-neutral-500 bg-white border border-neutral-200 rounded-md px-2 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-1">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm gap-1.5"
                    >
                      <ExternalLink className="size-3.5" />
                      Live
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm gap-1.5"
                    >
                      <GhIcon />
                      Github
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Fallback */}
        {pinnedProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Code2 className="mb-4 size-12 text-neutral-200" />
            <p className="text-neutral-500">No pinned projects yet.</p>
          </div>
        )}

        {/* Mobile "view all" */}
        <div className="mt-10 text-center md:hidden">
          <Link href="/projects" className="btn btn-outline btn-sm">
            View all <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
