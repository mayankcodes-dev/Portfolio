"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ArrowRight, Download, Award, Mail, Github, Linkedin } from "lucide-react";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import SkillsSection from "@/components/sections/skills-section";
import ProjectsSection from "@/components/sections/projects-section";
import { certificates } from "@/data/certificates";

gsap.registerPlugin(ScrollToPlugin);

/* ─── Socials ─── */
const SOCIALS = [
  {
    href: "https://github.com/coderMayank69",
    label: "GitHub",
    path: "M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z",
  },
  {
    href: "https://www.linkedin.com/in/codermayank69/",
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    href: "https://leetcode.com/u/coderMayank69/",
    label: "LeetCode",
    path: "M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z",
  },
  {
    href: "https://codermayank69.hashnode.dev/",
    label: "Blog",
    path: "M13.205.043a13.01 13.01 0 0 0-9.23 3.816A13.038 13.038 0 0 0 .043 13.1c.066 7.18 5.984 12.998 13.162 12.998 7.117 0 13.018-5.836 13.018-13.021 0-7.228-5.877-13.077-13.018-13.034zm1.245 16.918a3.437 3.437 0 0 1-4.864 0 3.44 3.44 0 0 1 0-4.865 3.438 3.438 0 0 1 4.864 0 3.44 3.44 0 0 1 0 4.865z",
  },
  {
    href: "mailto:codermayank69@gmail.com",
    label: "Email",
    path: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z",
  },
];

const STATS = [
  { value: "5+", label: "Projects" },
  { value: "10+", label: "Certs" },
  { value: "6+", label: "Months" },
  { value: "∞", label: "Coffee" },
];

const STACK = ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind"];

/* ─── Fade-up variant helper ─── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay } },
});

/* ─── Section wrapper (scroll-triggered) ─── */
function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroLeftRef = useRef<HTMLDivElement>(null);
  const heroRightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(heroRightRef.current, { opacity: 0, y: 32, duration: 0.8 })
        .from(heroLeftRef.current, { opacity: 0, x: -24, duration: 0.75 }, "-=0.5");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) =>
    gsap.to(window, { duration: 1, ease: "power2.inOut", scrollTo: { y: `#${id}`, offsetY: 80 } });

  return (
    <div ref={rootRef} className="w-full bg-white text-[#0a0a0a]">
      <Navbar />

      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <main id="hero" className="relative w-full">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" aria-hidden />

        <div className="relative mx-auto max-w-6xl px-6 md:px-8 grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-center py-20">

          {/* RIGHT — Photo (shows first in DOM for LG grid order) */}
          <div ref={heroLeftRef} className="order-last lg:order-last">
            <div className="relative w-full max-w-[340px] mx-auto lg:mx-0 lg:ml-auto">
              {/* Photo container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-neutral-200 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
                <Image
                  src="/hero.webp"
                  alt="Mayank — Software Engineer"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 340px, 90vw"
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/60 to-transparent" />
              </div>

              {/* Floating availability badge */}
              <div className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 shadow-md shadow-black/5 backdrop-blur-sm">
                <span className="status-dot" />
                <span className="text-xs font-semibold text-[#0a0a0a] whitespace-nowrap">
                  Open to internships
                </span>
              </div>

              {/* Small tech badge */}
              <div className="absolute -top-4 -right-4 rounded-xl border border-neutral-200 bg-white px-3 py-2 shadow-md shadow-black/5">
                <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">stack</p>
                <p className="font-semibold text-[11px] text-[#0a0a0a] mt-0.5">MERN · Next.js</p>
              </div>
            </div>
          </div>

          {/* LEFT — Text content */}
          <div ref={heroRightRef} className="flex flex-col justify-center order-first lg:order-first">

            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-6">
              <span className="eyebrow">Software Engineer</span>
              <span className="text-neutral-300">/</span>
              <span className="eyebrow">MERN Stack</span>
            </div>

            {/* Name */}
            <h1 className="font-extrabold tracking-tighter leading-none text-[#0a0a0a]" style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}>
              Mayank<br />
              <span className="text-neutral-400">Singh.</span>
            </h1>

            {/* Desc */}
            <p className="mt-6 text-base md:text-lg text-neutral-500 max-w-md leading-relaxed">
              I build <span className="text-[#0a0a0a] font-semibold">production-grade web apps</span> with React,
              Node.js &amp; MongoDB. Based in Lucknow, India.
              Currently seeking internship opportunities.
            </p>

            {/* Stack pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {STACK.map((s) => (
                <span key={s} className="skill-pill text-[12px]">{s}</span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("projects")}
                className="btn btn-primary btn-lg"
                id="hero-view-work"
              >
                View my work <ArrowRight className="size-4" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href="https://drive.google.com/file/d/1HH8bHTrCKS_YGufdW8zs5rgTZcf6xIp8/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-lg"
                id="hero-resume"
              >
                <Download className="size-4" /> Resume
              </motion.a>
            </div>

            {/* Social icons */}
            <div className="mt-8 flex items-center gap-2">
              {SOCIALS.map(({ href, label, path }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="grid size-9 place-items-center rounded-lg border border-neutral-200 bg-white text-neutral-500 hover:border-neutral-400 hover:text-[#0a0a0a] transition-colors shadow-sm"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-[15px]" aria-hidden>
                    <path d={path} />
                  </svg>
                </motion.a>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-4 gap-4 border-t border-neutral-100 pt-8">
              {STATS.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-2xl font-extrabold tracking-tight text-[#0a0a0a]">{value}</span>
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ══════════════════════════ SKILLS ══════════════════════════ */}
      <SkillsSection />

      {/* ══════════════════════════ PROJECTS ══════════════════════════ */}
      <ProjectsSection />

      {/* ══════════════════════════ CERTIFICATIONS ══════════════════════════ */}
      <Section className="border-t border-neutral-100" id="certs">
        <div className="mx-auto max-w-6xl px-6 md:px-8 py-20 md:py-28">

          <motion.div variants={fadeUp(0)} className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Certifications</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Proof of learning</h2>
            </div>
            <Link
              href="/certifications"
              className="hidden md:inline-flex items-center gap-1.5 btn btn-outline btn-sm"
            >
              All {certificates.length} <ArrowRight className="size-3.5" />
            </Link>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.slice(0, 3).map((cert, i) => (
              <motion.div
                key={cert.id}
                variants={fadeUp(i * 0.08)}
                whileHover={{ y: -3 }}
                className="card-eng group flex items-start gap-4 p-5"
              >
                {/* Icon box */}
                <div className="grid size-9 flex-shrink-0 place-items-center rounded-lg bg-neutral-50 border border-neutral-200">
                  <Award className="size-4 text-neutral-600" />
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-[#0a0a0a] text-sm leading-snug group-hover:underline underline-offset-2 truncate">
                    {cert.title}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500 font-mono">
                    {cert.issuer} · {cert.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Link href="/certifications" className="btn btn-outline btn-sm">
              All certs <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════ CONTACT CTA ══════════════════════════ */}
      <Section id="contact" className="border-t border-neutral-100 bg-[#fafafa]">
        <div className="mx-auto max-w-6xl px-6 md:px-8 py-24 md:py-32">

          {/* Large typographic CTA — inspired by mdsaban/unosend */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>
              <p className="eyebrow mb-4">Let&apos;s connect</p>
              <h2 className="font-extrabold tracking-tighter text-[#0a0a0a]" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
                Ready to build<br />something great?
              </h2>
              <p className="mt-5 text-neutral-500 text-base leading-relaxed max-w-md">
                I&apos;m actively looking for internships and freelance projects.
                If you have an idea, let&apos;s make it happen.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-primary btn-lg" id="cta-contact">
                  <Mail className="size-4" /> Get in touch
                </Link>
                <a
                  href="https://github.com/coderMayank69"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-lg"
                  id="cta-github"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>

            {/* Right — quick info card */}
            <div className="card-eng p-8 space-y-4">
              {[
                { icon: "📬", label: "Email", value: "codermayank69@gmail.com" },
                { icon: "📍", label: "Location", value: "Lucknow, India" },
                { icon: "⚡", label: "Status", value: "Open to internships & freelance", badge: "green" },
                { icon: "🕐", label: "Response", value: "Within 24 hours" },
              ].map(({ icon, label, value, badge }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="text-base mt-0.5 flex-shrink-0">{icon}</span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">{label}</p>
                    {badge === "green" ? (
                      <span className="badge badge-green mt-1">{value}</span>
                    ) : (
                      <p className="text-sm font-medium text-[#0a0a0a] mt-0.5 truncate">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}