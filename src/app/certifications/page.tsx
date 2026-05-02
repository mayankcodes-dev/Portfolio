"use client";

/**
 * Certifications Page — Strapi-powered with static fallback
 * 2-column grid · Category filter · Framer Motion reveals
 * ChaiCode asymmetric button style
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SiteNav from "@/components/layout/site-nav";
import { Footer } from "@/components/sections/footer";
import { certificates as staticCertificates, certCategories as staticCategories } from "@/data/certificates";
import type { StrapiCertificate } from "@/lib/strapi";
import { ExternalLink, Award, ArrowLeft, Loader2 } from "lucide-react";

/* ── Certificate shape (unified: Strapi OR static) ── */
interface CertItem {
  id:            string;
  title:         string;
  issuer:        string;
  date:          string;
  category:      string;
  credentialUrl: string | null;
  imageUrl:      string | null;
}

const GRADIENT_PATTERNS = [
  "from-violet-600 via-purple-600 to-indigo-700",
  "from-indigo-600 via-blue-600 to-cyan-700",
  "from-purple-700 via-pink-600 to-rose-600",
  "from-cyan-600 via-teal-600 to-emerald-700",
  "from-orange-600 via-amber-500 to-yellow-500",
  "from-rose-600 via-red-600 to-orange-600",
];

const CATEGORY_ICONS: Record<string, string> = {
  Frontend: "⚛️",
  Backend:  "🖥️",
  Language: "💡",
  Security: "🔐",
  All:      "🏆",
};

function strapiToItem(c: StrapiCertificate): CertItem {
  return {
    id:            String(c.id),
    title:         c.title,
    issuer:        c.issuer,
    date:          c.date,
    category:      c.category,
    credentialUrl: c.credentialUrl ?? null,
    imageUrl:      c.image?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"}${c.image.url}`
      : null,
  };
}

/* ── Individual cert card ── */
function CertCard({ cert, gradient }: { cert: CertItem; gradient: string }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
      id={`cert-card-${cert.id}`}
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:border-primary/40"
    >
      {/* Header image or gradient */}
      <div className={`relative flex h-44 w-full items-center justify-center bg-gradient-to-br ${gradient} overflow-hidden`}>
        {cert.imageUrl ? (
          <img src={cert.imageUrl} alt={cert.title} className="h-full w-full object-cover" />
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="flex size-14 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 shadow-xl backdrop-blur-sm">
                <Award className="size-7 text-white" />
              </div>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
                Certificate of Completion
              </span>
            </div>
          </>
        )}

        {/* External link overlay */}
        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            id={`cert-link-${cert.id}`}
            aria-label={`View ${cert.title} credential`}
            className="absolute right-3 top-3 z-20 flex size-8 items-center justify-center rounded-full bg-black/30 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 hover:bg-black/50"
          >
            <ExternalLink className="size-4" />
          </a>
        )}

        {/* Category badge */}
        <span className="absolute bottom-3 left-3 z-10 rounded-full bg-black/30 px-2.5 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
          {cert.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-base font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
          {cert.title}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{cert.issuer}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground/70">{cert.date}</span>
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
    </motion.div>
  );
}

/* ── Page ── */
export default function CertificationsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [certs,          setCerts]          = useState<CertItem[]>([]);
  const [categories,     setCategories]     = useState<string[]>(["All"]);
  const [loading,        setLoading]        = useState(true);

  useEffect(() => {
    async function load() {
      try {
        /* Try Strapi first */
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"}/api/certificates?populate=image&sort=date:desc`,
          { next: { revalidate: 3600 } }
        );
        if (res.ok) {
          const json = await res.json();
          const items: CertItem[] = (json.data as StrapiCertificate[]).map(strapiToItem);
          if (items.length > 0) {
            setCerts(items);
            const cats = ["All", ...Array.from(new Set(items.map((i) => i.category)))];
            setCategories(cats);
            return;
          }
        }
      } catch {
        /* Strapi not available — use static fallback */
      }

      /* Static fallback */
      setCerts(
        staticCertificates.map((c) => ({
          id:            c.id,
          title:         c.title,
          issuer:        c.issuer,
          date:          c.date,
          category:      c.category,
          credentialUrl: c.credentialUrl ?? null,
          imageUrl:      c.imageUrl ?? null,
        }))
      );
      setCategories(staticCategories);
    }

    load().finally(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === "All" ? certs : certs.filter((c) => c.category === activeCategory);

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-background text-foreground">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden border-b border-border/60 px-6 pb-16 pt-8 md:pt-16">
          {/* Ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[700px] rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(ellipse, oklch(0.55 0.22 264 / 80%), transparent 70%)" }}
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

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl"
            >
              My{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Certifications
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
            >
              A curated collection of professional certifications and achievements
              across frontend, backend, security, and more.
            </motion.p>

            {/* Category filter pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  id={`cert-filter-${cat.toLowerCase()}`}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className={[
                    "btn-chai px-4 py-1.5 text-sm font-medium transition-all duration-200",
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "border border-border/60 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  ].join(" ")}
                >
                  {CATEGORY_ICONS[cat] ?? "📄"} {cat}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Grid ── */}
        <section className="mx-auto max-w-5xl px-6 py-14">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="size-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <p className="mb-8 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {filtered.length} certificate{filtered.length !== 1 ? "s" : ""}
                {activeCategory !== "All" ? ` · ${activeCategory}` : ""}
              </p>

              <AnimatePresence mode="popLayout">
                <motion.div className="grid gap-6 sm:grid-cols-2" layout>
                  {filtered.map((cert, idx) => (
                    <CertCard
                      key={cert.id}
                      cert={cert}
                      gradient={GRADIENT_PATTERNS[idx % GRADIENT_PATTERNS.length]}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>

              {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <Award className="mb-4 size-12 text-muted-foreground/40" />
                  <p className="text-lg font-semibold text-muted-foreground">
                    No certificates in this category yet.
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
