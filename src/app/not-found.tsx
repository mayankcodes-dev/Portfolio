import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-white px-6 text-[#0a0a0a]">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" aria-hidden />

      <div className="relative w-full max-w-md text-center">
        {/* Large 404 */}
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-400 mb-4">
          Error · 404
        </p>

        <h1 className="text-[8rem] md:text-[10rem] font-extrabold leading-none tracking-tighter text-neutral-100 select-none">
          404
        </h1>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0a0a0a]">
          Page not found
        </h2>

        <p className="mt-3 text-sm text-neutral-500 leading-relaxed max-w-xs mx-auto">
          This route doesn&apos;t exist — maybe it was deleted, moved, or never shipped.
        </p>

        {/* Suggested routes */}
        <div className="mt-8 space-y-1 font-mono text-[12px] text-neutral-400">
          <p className="mb-2">Try one of these:</p>
          {[
            { label: "/  — home",      href: "/"         },
            { label: "/blog  — articles", href: "/blog"     },
            { label: "/projects  — work", href: "/projects" },
          ].map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="block text-neutral-500 hover:text-[#0a0a0a] transition-colors"
            >
              → {r.label}
            </Link>
          ))}
        </div>

        {/* Back button */}
        <div className="mt-10">
          <Link
            href="/"
            className="btn btn-primary btn-lg inline-flex"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
