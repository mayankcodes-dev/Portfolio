"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LogoMark } from "@/components/logo";

const NAV_LINKS = [
  { label: "Home",         href: "/"               },
  { label: "Projects",     href: "/projects"       },
  { label: "Certificates", href: "/certifications" },
  { label: "Contact",      href: "/contact"        },
];

export default function Navbar() {
  const pathname   = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // On sub-pages, always show navbar immediately
    if (pathname !== "/") {
      setScrolled(true);
      return;
    }
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.30);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => setMenuOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[90%] md:w-auto ${
          pathname !== "/" || scrolled
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-8 pointer-events-none"
        }`}
      >
        <div
          className="flex items-center justify-between md:justify-center rounded-full transition-all duration-300 bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-neutral-200 px-4 md:px-6 py-2"
        >
          {/* ── Logo — small screens only ── */}
          <Link href="/" aria-label="Home" className="md:hidden flex items-center gap-2 group">
            <span className="transition-transform duration-200 group-hover:scale-105">
              <LogoMark size={28} />
            </span>
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  isActive(href)
                    ? "text-[#0a0a0a]"
                    : "text-neutral-500 hover:text-[#0a0a0a]"
                }`}
              >
                {isActive(href) && (
                  <motion.span
                    layoutId="pill-indicator"
                    className="absolute inset-0 rounded-full bg-neutral-100"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 38 }}
                  />
                )}
                {label}
              </Link>
            ))}
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden grid size-7 place-items-center rounded-full text-neutral-600"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="size-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="size-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* ── Mobile dropdown ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mt-2 rounded-2xl bg-white/95 backdrop-blur-md border border-neutral-200 shadow-lg overflow-hidden"
            >
              <div className="flex flex-col p-2 gap-0.5">
                {NAV_LINKS.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive(href)
                        ? "bg-neutral-50 text-[#0a0a0a]"
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-[#0a0a0a]"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}