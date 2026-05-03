"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",         href: "/"               },
  { label: "About",        href: "/about"          },
  { label: "Projects",     href: "/projects"       },
  { label: "Certificates", href: "/certifications" },
  { label: "Blog",         href: "/blog"           },
  { label: "Contact",      href: "/contact"        },
];

export default function Navbar() {
  const pathname   = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-[0_1px_20px_rgba(0,0,0,0.04)]"
            : "bg-transparent",
        ].join(" ")}
      >
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8"
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Mayank — Home"
          >
            {/* Monogram box */}
            <div className="w-8 h-8 bg-[#0a0a0a] text-white rounded-md flex items-center justify-center font-bold text-sm font-mono tracking-tighter transition-transform group-hover:scale-95">
              M
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-[#0a0a0a]">
              mayank<span className="text-neutral-400">.</span>dev
            </span>
          </Link>

          {/* ── Desktop Links ── */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={[
                  "relative px-3.5 py-2 text-[13.5px] font-medium rounded-md transition-colors",
                  isActive(href)
                    ? "text-[#0a0a0a]"
                    : "text-neutral-500 hover:text-[#0a0a0a] hover:bg-neutral-50",
                ].join(" ")}
              >
                {label}
                {isActive(href) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-1 left-3.5 right-3.5 h-[1.5px] bg-[#0a0a0a] rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="btn btn-primary btn-sm"
              id="nav-cta"
            >
              Get in touch
            </Link>
          </div>

          {/* ── Hamburger ── */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-md border border-neutral-200 bg-white text-[#0a0a0a] hover:bg-neutral-50 transition-colors"
            id="mobile-menu-toggle"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </motion.div>
      </nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="fixed inset-x-4 top-[68px] z-40 rounded-xl border border-neutral-200 bg-white shadow-xl shadow-black/5 md:hidden overflow-hidden"
          >
            <div className="p-2">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    "flex items-center px-4 py-2.5 rounded-lg text-[14px] font-medium transition-colors",
                    isActive(href)
                      ? "bg-neutral-50 text-[#0a0a0a]"
                      : "text-neutral-500 hover:bg-neutral-50 hover:text-[#0a0a0a]",
                  ].join(" ")}
                >
                  {isActive(href) && (
                    <span className="mr-2.5 size-1.5 rounded-full bg-[#0a0a0a] flex-shrink-0" />
                  )}
                  {label}
                </Link>
              ))}

              {/* Divider */}
              <div className="h-px bg-neutral-100 my-2" />

              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center w-full py-2.5 rounded-lg bg-[#0a0a0a] text-white text-[14px] font-semibold hover:bg-neutral-800 transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" aria-hidden />
    </>
  );
}