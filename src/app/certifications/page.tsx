"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SiteNav from "@/components/layout/site-nav";
import { Footer } from "@/components/sections/footer";
import FooterScrollWrapper from "@/components/shared/footer-scroll-wrapper";
import { certificates as staticCertificates, certCategories as staticCategories } from "@/data/certificates";
import type { StrapiCertificate } from "@/lib/strapi";
import { ExternalLink, Award, ArrowLeft, Loader2 } from "lucide-react";

/* ── Certificate shape (unified: Strapi OR static) ── */
interface CertItem {
  id:            string;
  title:         string;
  issuer:        string;
  issuerLogo:    string | null;
  date:          string;
  category:      string;
  credentialUrl: string | null;
  credentialId?: string;
  isPinned?: boolean;
}

function strapiToItem(c: StrapiCertificate): CertItem {
  return {
    id:            String(c.id),
    title:         c.title,
    issuer:        c.issuer,
    issuerLogo:    c.image?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"}${c.image.url}`
      : null,
    date:          c.date,
    category:      c.category,
    credentialUrl: c.credentialUrl ?? null,
  };
}

/* ── Individual cert card ── */
function CertCard({ cert }: { cert: CertItem }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      id={`cert-card-${cert.id}`}
      className="card-eng group relative flex flex-col overflow-hidden"
    >
      {/* Header — icon + issuer */}
      <div className="relative flex h-36 w-full items-center justify-center bg-neutral-50 border-b border-neutral-100">
        {cert.issuerLogo ? (
          <div className="flex size-14 items-center justify-center rounded-xl bg-white border border-neutral-200 p-2.5 shadow-sm">
            <Image
              src={cert.issuerLogo}
              alt={cert.issuer}
              width={48}
              height={48}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="flex size-12 items-center justify-center rounded-xl bg-white border border-neutral-200 shadow-sm">
            <Award className="size-6 text-neutral-400" />
          </div>
        )}

        {/* External link on hover */}
        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            id={`cert-link-${cert.id}`}
            aria-label={`View ${cert.title} credential`}
            className="absolute right-3 top-3 z-10 flex size-7 items-center justify-center rounded-md bg-white border border-neutral-200 text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-[#0a0a0a] hover:border-neutral-400"
          >
            <ExternalLink className="size-3.5" />
          </a>
        )}

        {/* Category badge */}
        <span className="absolute bottom-3 left-3 badge badge-neutral text-[10px]">
          {cert.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[15px] font-bold leading-snug text-[#0a0a0a] group-hover:underline underline-offset-2">
          {cert.title}
        </h3>
        <p className="mt-1.5 text-xs font-mono text-neutral-500">{cert.issuer}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-[11px] font-mono text-neutral-400">{cert.date}</span>
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm text-[11px]"
            >
              <ExternalLink className="size-3" />
              View
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

      setCerts(
        staticCertificates.map((c) => ({
          id:            c.id,
          title:         c.title,
          issuer:        c.issuer,
          issuerLogo:    c.issuerLogo ?? null,
          date:          c.date,
          category:      c.category,
          credentialUrl: c.credentialUrl ?? null,
          credentialId:  c.credentialId,
          isPinned:      c.isPinned ?? false,
        }))
      );
      setCategories(staticCategories);
    }

    load().finally(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === "All" ? certs : certs.filter((c) => c.category === activeCategory);

  const sorted = [...filtered].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  return (
    <>
      <SiteNav />
      <FooterScrollWrapper footer={<Footer />}>
        <main className="min-h-screen bg-white text-[#0a0a0a]">

        {/* ── Hero ── */}
        <section className="relative border-b border-neutral-100 px-6 md:px-8 pb-12 pt-8 md:pt-14 bg-[#fafafa]">
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" aria-hidden />
          <div className="relative z-10 mx-auto max-w-5xl">


            <div className="mt-4">
              <span className="eyebrow">
                <Award className="size-3" />
                Certifications
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4 font-extrabold tracking-tighter"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
            >
              My <span className="text-neutral-400">Certifications</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-neutral-500"
            >
              A curated collection of professional certifications and achievements
              across frontend, backend, security, and more.
            </motion.p>

            {/* Category filter pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.16 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`cert-filter-${cat.toLowerCase()}`}
                  onClick={() => setActiveCategory(cat)}
                  className={[
                    "px-3.5 py-2 text-[13px] font-medium rounded-lg border transition-all",
                    activeCategory === cat
                      ? "bg-[#0a0a0a] text-white border-[#0a0a0a] shadow-sm"
                      : "bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400 hover:text-[#0a0a0a]",
                  ].join(" ")}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Grid ── */}
        <section className="mx-auto max-w-5xl px-6 md:px-8 py-12 md:py-16">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="size-6 animate-spin text-neutral-300" />
            </div>
          ) : (
            <>
              <p className="mb-6 font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                {sorted.length} certificate{sorted.length !== 1 ? "s" : ""}
                {activeCategory !== "All" ? ` · ${activeCategory}` : ""}
              </p>

              <AnimatePresence mode="popLayout">
                <motion.div className="grid gap-4 sm:grid-cols-2" layout>
                  {sorted.map((cert) => (
                    <CertCard key={cert.id} cert={cert} />
                  ))}
                </motion.div>
              </AnimatePresence>

              {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <Award className="mb-4 size-12 text-neutral-200" />
                  <p className="text-neutral-500">
                    No certificates in this category yet.
                  </p>
                </div>
              )}
            </>
          )}
        </section>
        </main>
      </FooterScrollWrapper>
    </>
  );
}
