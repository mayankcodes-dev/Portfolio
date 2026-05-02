"use client";

/**
 * Navbar — Homepage only (GSAP scroll anchors)
 * Floating centered pill design inspired by aanchalcreates.com
 * Glassmorphism · Active link highlight · ChaiCode button CTA
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollToPlugin);

const NAV_ITEMS = [
  { label: "Work",    target: "projects" },
  { label: "Skills",  target: "skills"  },
  { label: "About",   target: "hero"    },
  { label: "Contact", target: "contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState("hero");

  /* Detect scroll for shadow intensity */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Active section via IntersectionObserver */
  useEffect(() => {
    const sections = NAV_ITEMS.map((i) => document.getElementById(i.target));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (target: string) => {
    setMenuOpen(false);
    gsap.to(window, {
      duration: 1.05,
      ease: "power2.inOut",
      scrollTo: { y: `#${target}`, offsetY: 80 },
    });
  };

  return (
    <>
      {/* ── Floating pill navbar ─────────────────────────────────────── */}
      <nav
        className={`fixed top-5 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ${
          scrolled ? "top-3" : "top-5"
        }`}
        aria-label="Main navigation"
      >
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.1 }}
          className={`flex items-center gap-1 rounded-2xl border border-border/50 bg-background/80 px-2 py-1.5 shadow-lg backdrop-blur-xl transition-shadow duration-300 ${
            scrolled ? "shadow-black/20" : "shadow-black/8"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}
            className="mr-2 flex items-center gap-2 group px-1"
          >
            <span className="btn-chai grid size-8 place-items-center bg-primary text-primary-foreground text-sm font-bold">
              M
            </span>
            <span className="hidden text-sm font-semibold tracking-wide text-foreground/90 sm:block">
              Mayank
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-0.5 md:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.target)}
                className={`relative rounded-xl px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  active === item.target
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right: theme toggle + CTA */}
          <div className="ml-2 hidden items-center gap-1.5 md:flex">
            <ThemeToggle />
            <button
              onClick={() => scrollTo("contact")}
              className="btn-chai btn-magnetic bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground"
            >
              Hire me →
            </button>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="ml-2 flex items-center gap-1.5 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="grid size-8 place-items-center rounded-xl border border-border/60 bg-muted/50 text-foreground"
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </motion.div>
      </nav>

      {/* ── Mobile drawer ────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed top-[4.5rem] left-1/2 z-40 w-[calc(100vw-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-border/60 bg-background/95 p-3 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.target)}
                  className={`rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                    active === item.target
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="btn-chai btn-magnetic mt-1 bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Hire me →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer so page content doesn't hide under fixed navbar */}
      <div className="h-20" aria-hidden />
    </>
  );
}