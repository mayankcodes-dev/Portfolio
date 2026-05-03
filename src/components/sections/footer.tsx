"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { GitBranch, AtSign, Mail } from "lucide-react";

const NAV_COLS: Array<{
  heading: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
}> = [
  {
    heading: "Navigate",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Certificates", href: "/certifications" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "GitHub", href: "https://github.com/coderMayank69", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/codermayank69/", external: true },
      { label: "Email", href: "mailto:codermayank69@gmail.com", external: true },
    ],
  },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
});

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer
      ref={ref}
      className="relative border-t border-border bg-background mt-auto"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8 py-16 md:py-24">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]"
        >
          {/* Brand Column */}
          <motion.div variants={fadeUp(0)}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
                M
              </div>
              <div>
                <p className="font-bold text-foreground">Mayank</p>
                <p className="text-xs text-muted-foreground">Full-Stack Developer</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              Crafting beautiful, performant web experiences with modern technologies and thoughtful design.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href="https://github.com/coderMayank69"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                aria-label="GitHub"
              >
                <GitBranch className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/codermayank69/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                aria-label="LinkedIn"
              >
                <AtSign className="w-4 h-4" />
              </a>
              <a
                href="mailto:codermayank69@gmail.com"
                className="w-9 h-9 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Status */}
            <div className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Available for projects
            </div>
          </motion.div>

          {/* Navigation Columns */}
          {NAV_COLS.map((col, ci) => (
            <motion.div key={col.heading} variants={fadeUp(0.1 + ci * 0.1)}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary">
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
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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

        {/* Bottom Bar */}
        <motion.div
          variants={fadeUp(0.3)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-12 pt-8 border-t border-border text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p>© {new Date().getFullYear()} Mayank · Lucknow, India</p>
          <p className="flex items-center gap-2">
            Built with <span className="text-primary font-medium">Next.js</span> & <span className="text-primary font-medium">Tailwind</span>
          </p>
          <p>
            Deployed on{" "}
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Vercel
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
