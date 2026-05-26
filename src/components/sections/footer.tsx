"use client";

import { forwardRef } from "react";

export const Footer = forwardRef<HTMLElement, {}>(function Footer(_, ref) {
  return (
    <footer ref={ref} className="w-full overflow-hidden bg-black">

      {/* ── Giant brand name ── */}
      <div className="mt-12 md:mt-16 overflow-hidden select-none w-full text-center px-4 md:px-6">
        <h2
          className="footer-brand-name font-black uppercase text-white leading-[0.8] w-full text-center select-none cursor-default"
          style={{ fontSize: "clamp(4.75rem, 21.37vw, 26.6rem)" }}
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
});
