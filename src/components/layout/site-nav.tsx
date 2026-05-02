"use client";

/**
 * SiteNav — Sub-page navigation (About, Projects, Blog, Contact, Certifications)
 * Same floating pill aesthetic as homepage Navbar but uses real Next.js Links
 * with active route detection via usePathname()
 */

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home",          href: "/"               },
  { label: "About",         href: "/about"          },
  { label: "Projects",      href: "/projects"       },
  { label: "Certificates",  href: "/certifications" },
  { label: "Blog",          href: "/blog"           },
  { label: "Contact",       href: "/contact"        },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav
        className="fixed top-5 left-1/2 z-50 -translate-x-1/2"
        aria-label="Site navigation"
      >
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.05 }}
          className="flex items-center gap-1 rounded-2xl border border-border/50 bg-background/80 px-2 py-1.5 shadow-lg backdrop-blur-xl"
        >
          {/* Logo */}
          <Link href="/" className="mr-2 flex items-center gap-2 group px-1">
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
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-xl px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right: theme toggle + CTA */}
          <div className="ml-2 hidden items-center gap-1.5 md:flex">
            <ThemeToggle />
            <Link
              href="/contact"
              className="btn-chai btn-magnetic bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground"
            >
              Hire me →
            </Link>
          </div>

          {/* Mobile */}
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

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="sitenav-mobile"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed top-[4.5rem] left-1/2 z-40 w-[calc(100vw-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-border/60 bg-background/95 p-3 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="btn-chai btn-magnetic mt-1 block bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
              >
                Hire me →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-20" aria-hidden />
    </>
  );
}
