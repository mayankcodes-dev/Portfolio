"use client";

import { useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/layout/site-nav";
import { certificates, certCategories } from "@/data/certificates";
import { ExternalLink, Award, ArrowLeft } from "lucide-react";

// Placeholder gradient patterns for certificates without images
const gradientPatterns = [
  "from-violet-600 via-purple-600 to-indigo-700",
  "from-indigo-600 via-blue-600 to-cyan-700",
  "from-purple-700 via-pink-600 to-rose-600",
  "from-cyan-600 via-teal-600 to-emerald-700",
  "from-orange-600 via-amber-500 to-yellow-500",
  "from-rose-600 via-red-600 to-orange-600",
];

const categoryIcons: Record<string, string> = {
  Frontend: "⚛️",
  Backend: "🖥️",
  Language: "💡",
  Security: "🔐",
  All: "🏆",
};

export default function CertificationsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? certificates
      : certificates.filter((c) => c.category === activeCategory);

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-background text-foreground">
        {/* ─── Hero / Header ─── */}
        <section className="relative overflow-hidden border-b border-border/60 px-6 pb-16 pt-24 md:pt-32">
          {/* Ambient glow blob */}
          <div
            className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[700px] rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse, oklch(0.55 0.22 264 / 80%), transparent 70%)",
            }}
            aria-hidden
          />

          <div className="relative mx-auto max-w-5xl">
            <Link
              href="/about"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 text-sm text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back to About
            </Link>

            <div className="mt-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                <Award className="size-3" />
                Certifications
              </span>
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl">
              My{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Certifications
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              A curated collection of professional certifications and achievements
              across frontend, backend, security, and more.
            </p>

            {/* ── Category Filter Pills ── */}
            <div className="mt-8 flex flex-wrap gap-2">
              {certCategories.map((cat) => (
                <button
                  key={cat}
                  id={`cert-filter-${cat.toLowerCase()}`}
                  onClick={() => setActiveCategory(cat)}
                  className={[
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "border border-border/60 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  ].join(" ")}
                >
                  {categoryIcons[cat] ?? "📄"} {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Certificate Grid ─── */}
        <section className="mx-auto max-w-5xl px-6 py-14">
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {filtered.length} certificate{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" ? ` · ${activeCategory}` : ""}
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            {filtered.map((cert, idx) => (
              <CertCard
                key={cert.id}
                cert={cert}
                gradientClass={gradientPatterns[idx % gradientPatterns.length]}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Award className="mb-4 size-12 text-muted-foreground/40" />
              <p className="text-lg font-semibold text-muted-foreground">
                No certificates in this category yet.
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   Certificate Card Component
   ───────────────────────────────────────────────────────────── */
function CertCard({
  cert,
  gradientClass,
}: {
  cert: (typeof certificates)[number];
  gradientClass: string;
}) {
  return (
    <div
      id={`cert-card-${cert.id}`}
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:scale-[1.02] hover:border-primary/40 hover:shadow-[0_0_28px_oklch(0.55_0.22_264_/_35%)]"
    >
      {/* ── Certificate Preview / Thumbnail ── */}
      <div
        className={`relative flex h-52 w-full items-center justify-center bg-gradient-to-br ${gradientClass} overflow-hidden`}
      >
        {/* Decorative grid overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Certificate seal / icon */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="flex size-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/30 shadow-xl">
            <Award className="size-8 text-white" />
          </div>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
            Certificate of Completion
          </span>
        </div>

        {/* External link button */}
        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            id={`cert-link-${cert.id}`}
            className="absolute right-3 top-3 z-20 flex size-8 items-center justify-center rounded-full bg-black/30 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 hover:bg-black/50"
            aria-label={`View ${cert.title} credential`}
          >
            <ExternalLink className="size-4" />
          </a>
        )}

        {/* Category badge */}
        <span className="absolute bottom-3 left-3 z-10 rounded-full bg-black/30 px-2.5 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
          {cert.category}
        </span>
      </div>

      {/* ── Card Body ── */}
      <div className="p-5">
        <h3 className="text-base font-bold leading-snug text-foreground group-hover:text-primary transition-colors duration-200">
          {cert.title}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{cert.issuer}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground/70">
            {cert.date}
          </span>
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary transition-all hover:bg-primary/15 hover:border-primary/60"
            >
              <ExternalLink className="size-3" />
              View Credential
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
