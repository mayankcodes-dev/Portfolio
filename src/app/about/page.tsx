import type { Metadata } from "next";
import SiteNav from "@/components/layout/site-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, ExternalLink, Award, ArrowRight } from "lucide-react";
import { certificates } from "@/data/certificates";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Mayank — a full-stack developer who builds polished web products with Next.js, TypeScript, and modern tooling.",
};

const timeline = [
  {
    year: "2024–Present",
    title: "Full-Stack Developer",
    description:
      "Building production-grade web applications for clients — from landing pages to full SaaS platforms. Specialising in Next.js, TypeScript, and API integration.",
  },
  {
    year: "2023",
    title: "Diving Deep into the Stack",
    description:
      "Shifted focus from basic frontend to full-stack development. Learned Node.js, Express, PostgreSQL, MongoDB, and started shipping real products end-to-end.",
  },
  {
    year: "2022",
    title: "Started Web Development",
    description:
      "Began the journey with HTML, CSS, and vanilla JavaScript. Quickly moved to React and fell in love with component-driven architecture.",
  },
];

const values = [
  { title: "Craft over speed", desc: "I care about the details — typography, spacing, animation timing. Good enough isn't good enough." },
  { title: "Ship, then polish", desc: "Get it working first, then make it beautiful. Ship early, iterate fast." },
  { title: "Code is communication", desc: "Clear variable names and well-structured components are a form of respect for future maintainers." },
];

export default function About() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-background text-foreground">

        {/* Hero */}
        <section className="mx-auto max-w-4xl px-6 pb-12 pt-16 md:pt-24">
          <Badge variant="outline" className="mb-5">
            About me
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
            I build things for the&nbsp;web.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Hi, I'm <strong className="text-foreground">Mayank</strong> — a full-stack developer who specialises
            in building polished, production-ready web products. I care about clean code, great UX, and
            engineering that lasts.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href="/resume.pdf" download>
                <Download className="size-4" />
                Download Resume
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Let's work together</Link>
            </Button>
          </div>
        </section>

        {/* Values */}
        <section className="border-t border-border/60">
          <div className="mx-auto max-w-4xl px-6 py-14">
            <p className="mb-8 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              What I believe in
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {values.map((v) => (
                <div key={v.title} className="rounded-2xl border border-border/60 bg-card p-6">
                  <p className="font-semibold text-foreground">{v.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="border-t border-border/60">
          <div className="mx-auto max-w-4xl px-6 py-14">
            <p className="mb-8 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              My journey
            </p>
            <div className="relative space-y-10 before:absolute before:left-[5px] before:top-2 before:h-full before:w-px before:bg-border">
              {timeline.map((item) => (
                <div key={item.year} className="relative pl-8">
                  <span className="absolute left-0 top-1.5 size-2.5 rounded-full border-2 border-primary bg-background" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {item.year}
                  </p>
                  <p className="mt-1 font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications teaser */}
        <section className="border-t border-border/60">
          <div className="mx-auto max-w-4xl px-6 py-14">
            <p className="mb-8 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Certifications
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {certificates.slice(0, 4).map((cert, idx) => {
                const gradients = [
                  "from-violet-600 via-purple-600 to-indigo-700",
                  "from-indigo-600 via-blue-600 to-cyan-700",
                  "from-purple-700 via-pink-600 to-rose-600",
                  "from-cyan-600 via-teal-600 to-emerald-700",
                ];
                return (
                  <div
                    key={cert.id}
                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:scale-[1.02] hover:border-primary/40 hover:shadow-[0_0_28px_oklch(0.55_0.22_264_/_35%)]"
                  >
                    <div
                      className={`relative flex h-32 w-full items-center justify-center bg-gradient-to-br ${gradients[idx % gradients.length]} overflow-hidden`}
                    >
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                          backgroundSize: "28px 28px",
                        }}
                      />
                      <Award className="relative z-10 size-8 text-white/90" />
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{cert.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{cert.issuer} · {cert.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6">
              <Button asChild variant="outline">
                <Link href="/certifications">
                  <Award className="size-4" />
                  View all {certificates.length} certificates
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Social links */}
        <section className="border-t border-border/60">
          <div className="mx-auto max-w-4xl px-6 py-14">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Find me online
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <a href="https://github.com/coderMayank69" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4" /> GitHub
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://linkedin.com/in/codermayank69" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4" /> LinkedIn
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://hashnode.com/@coderMayank" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4" /> Hashnode
                </a>
              </Button>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
