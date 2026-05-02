"use client";

/**
 * Footer — Discord-style
 * Always dark base · Multi-column: Brand | Navigate | Connect
 * Framer Motion entrance animations
 */

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

/* ── inline SVG icons (lucide-react v1 doesn't ship Github/Linkedin/X) ── */
const ICONS = {
  github:   "M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  leetcode: "M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z",
  email:    "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z",
};

const NAV_COLS: Array<{
  heading: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
}> = [
  {
    heading: "Navigate",
    links: [
      { label: "Home",          href: "/"               },
      { label: "About",         href: "/about"          },
      { label: "Projects",      href: "/projects"       },
      { label: "Certificates",  href: "/certifications" },
      { label: "Blog",          href: "/blog"           },
      { label: "Contact",       href: "/contact"        },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "GitHub",    href: "https://github.com/coderMayank69",            external: true },
      { label: "LinkedIn",  href: "https://www.linkedin.com/in/codermayank69/",  external: true },
      { label: "LeetCode",  href: "https://leetcode.com/u/coderMayank69/",       external: true },
      { label: "Email",     href: "mailto:codermayank69@gmail.com",              external: true },
    ],
  },
];

const SOCIAL = [
  { label: "GitHub",   href: "https://github.com/coderMayank69",           icon: ICONS.github   },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/codermayank69/", icon: ICONS.linkedin },
  { label: "LeetCode", href: "https://leetcode.com/u/coderMayank69/",      icon: ICONS.leetcode },
  { label: "Email",    href: "mailto:codermayank69@gmail.com",             icon: ICONS.email    },
];

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const, delay } },
});

export function Footer() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer
      ref={ref}
      /* Discord-style: always dark, even in light mode */
      className="relative mt-auto overflow-hidden bg-[oklch(0.05_0_0)] text-[oklch(0.88_0_0)]"
    >
      {/* Top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[60%] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl"
      />

      {/* Main content */}
      <div className="relative mx-auto max-w-6xl px-6 py-16 md:px-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]"
        >

          {/* ── Brand column ── */}
          <motion.div variants={fadeUp(0)}>
            <div className="flex items-center gap-3">
              <span className="btn-chai grid size-10 place-items-center bg-primary text-primary-foreground text-sm font-bold">
                M
              </span>
              <div>
                <p className="font-bold text-white">Mayank</p>
                <p className="text-xs text-[oklch(0.6_0_0)]">Full-Stack Developer</p>
              </div>
            </div>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[oklch(0.6_0_0)]">
              Building polished, production-ready web products with
              thoughtful engineering and clean design.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex gap-2">
              {SOCIAL.map(({ label, href, icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-[oklch(0.65_0_0)] transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
                    <path d={icon} />
                  </svg>
                </motion.a>
              ))}
            </div>

            {/* Status pill */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to internships & freelance
            </div>
          </motion.div>

          {/* ── Nav columns ── */}
          {NAV_COLS.map((col, ci) => (
            <motion.div key={col.heading} variants={fadeUp(0.1 + ci * 0.07)}>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[oklch(0.45_0_0)]">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map(({ label, href, external }) => (
                  <li key={label}>
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[oklch(0.6_0_0)] transition-colors hover:text-primary"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="text-sm text-[oklch(0.6_0_0)] transition-colors hover:text-primary"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom bar ── */}
        <motion.div
          variants={fadeUp(0.3)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-7 text-xs text-[oklch(0.45_0_0)] sm:flex-row"
        >
          <p>
            © {new Date().getFullYear()} Mayank · Lucknow, India
          </p>
          <p className="flex items-center gap-1.5">
            Built with
            <span className="text-primary font-semibold">Next.js 16</span>
            ·
            <span className="text-primary font-semibold">Framer Motion</span>
            ·
            <span className="text-primary font-semibold">GSAP</span>
          </p>
          <p>
            Deployed on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Vercel ↗
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
