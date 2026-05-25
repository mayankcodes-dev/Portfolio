"use client";

import Link from "next/link";
import { LogoMark } from "@/components/logo";

const NAV_COLS: Array<{
  heading: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
}> = [
  {
    heading: "Navigate",
    links: [
      { label: "Home",         href: "/"               },
      { label: "Projects",     href: "/projects"       },
      { label: "Certificates", href: "/certifications" },
      { label: "Blog",         href: "/blog"           },
      { label: "Contact",      href: "/contact"        },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "GitHub",   href: "https://github.com/coderMayank69",            external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/codermayank69/",  external: true },
      { label: "Email",    href: "mailto:mayankbca96325@gmail.com",              external: true },
    ],
  },
];

const SOCIALS = [
  {
    href:  "https://github.com/coderMayank69",
    label: "GitHub",
    path:  "M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z",
    hoverClass: "hover:text-white hover:border-white/30",
  },
  {
    href:  "https://www.linkedin.com/in/codermayank69/",
    label: "LinkedIn",
    path:  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    hoverClass: "hover:text-[#0A66C2] hover:border-[#0A66C2]/30",
  },
  {
    href:  "mailto:mayankbca96325@gmail.com",
    label: "Email",
    path:  "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z",
    hoverClass: "hover:text-red-400 hover:border-red-400/30",
  },
];

export function Footer() {
  return (
    <footer
      className="w-full overflow-hidden bg-[#0a0a0a]"
      style={{ borderRadius: "40px 40px 0 0" }}
    >
      <div className="mx-auto max-w-8xl px-6 md:px-8 pt-16 md:pt-20 pb-0">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          {/* ── Brand column ── */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* LogoMark inverted — white on dark */}
              <div className="invert">
                <LogoMark size={36} />
              </div>
              <div>
                <p className="font-semibold text-white text-[15px]">Mayank Singh</p>
                <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                  Full-Stack Developer
                </p>
              </div>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs mb-6">
              Building clean, performant web experiences with modern technologies and thoughtful engineering.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {SOCIALS.map(({ href, label, path, hoverClass }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-neutral-400 transition-colors ${hoverClass || "hover:text-white hover:border-white/30"}`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden>
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>

            {/* Status badge */}
            <div className="mt-5 inline-flex items-center gap-2 badge badge-green text-[11px]">
              <span className="status-dot" style={{ width: 5, height: 5 }} />
              Available for projects
            </div>
          </div>

          {/* ── Nav columns ── */}
          {NAV_COLS.map((col) => (
            <div key={col.heading}>
              <p className="mb-4 text-[10px] font-mono text-neutral-500 uppercase tracking-[0.18em]">{col.heading}</p>
              <ul className="space-y-2.5">
                {col.links.map(({ label, href, external }) => (
                  <li key={label}>
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-neutral-400 hover:text-white transition-colors"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="text-sm text-neutral-400 hover:text-white transition-colors"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Giant brand name ── */}
      <div className="mt-12 md:mt-16 overflow-hidden select-none w-full text-center px-4 md:px-6">
        <h2
          className="footer-brand-name font-black uppercase tracking-[-0.05em] text-white leading-[0.8] w-full text-center select-none cursor-default"
          style={{ fontSize: "clamp(4.99995rem, 22.49977vw, 27.99972rem)", letterSpacing: "-0.06em" }}
          aria-hidden
        >
          MAYANK
        </h2>
      </div>

      <div className="mx-auto max-w-8xl px-6 md:px-8 pb-10 md:pb-12 pt-4">
        {/* ── Bottom bar ── */}
        <div className="mt-4 pt-6 border-t border-white/10 text-[12px] font-mono text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Mayank · Lucknow, India</p>
          <p className="flex items-center gap-1.5">
            Built with <span className="text-white font-medium">Next.js</span>
            <span className="text-neutral-700">·</span>
            Deployed on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-medium hover:underline underline-offset-2"
            >
              Vercel
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
