"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SiteNav from "@/components/layout/site-nav";

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#F5F3F0] text-[#0a0a0a] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid opacity-[0.18] pointer-events-none" aria-hidden />

        <div className="relative z-10 flex flex-col items-center text-center gap-6">
          {/* Big emoji */}
          <span className="text-[8rem] leading-none select-none" role="img" aria-label="Oops">
            🥲
          </span>

          {/* 404 */}
          <h1 className="font-black tracking-[-0.04em] text-[#0a0a0a] text-[7rem] sm:text-[9rem] leading-none">
            404
          </h1>

          {/* Short message */}
          <p className="font-mono text-sm text-neutral-400 uppercase tracking-widest">
            This page doesn&apos;t exist
          </p>

          {/* Back home */}
          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-[#F5F3F0] px-5 py-2.5 text-sm font-semibold text-[#0a0a0a] shadow-sm hover:shadow-md transition-all duration-200 hover:border-neutral-300"
          >
            <ArrowLeft className="size-4" />
            Back home
          </Link>
        </div>
      </main>
    </>
  );
}
