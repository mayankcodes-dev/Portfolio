"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollProgress() {
  const [progress, setProgress]     = useState(0);
  const [showTop, setShowTop]       = useState(false);
  const [inFooter, setInFooter]     = useState(false);

  useEffect(() => {
    const update = () => {
      const el          = document.documentElement;
      const scrollTop   = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      const pct         = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      setProgress(pct);
      setShowTop(scrollTop > 300);

      // Detect when footer (black bg) is visible
      // Switch scrollbar to dark theme when within ~200px of bottom
      setInFooter(scrollHeight > 0 && scrollTop > scrollHeight - 200);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Inject scrollbar theme class onto <html>
  useEffect(() => {
    const html = document.documentElement;
    if (inFooter) {
      html.classList.add("scrollbar-dark");
      html.classList.remove("scrollbar-light");
    } else {
      html.classList.add("scrollbar-light");
      html.classList.remove("scrollbar-dark");
    }
    return () => {
      html.classList.remove("scrollbar-dark", "scrollbar-light");
    };
  }, [inFooter]);

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <div
        className="fixed top-0 left-0 right-0 z-[9999] h-[2px] bg-transparent pointer-events-none"
        aria-hidden
      >
        <div
          className="h-full bg-[#0a0a0a] origin-left"
          style={{ transform: `scaleX(${progress / 100})`, transformOrigin: "left" }}
        />
      </div>

      {/* ── Scroll-to-top button ── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-[9998] grid size-10 place-items-center rounded-full bg-[#0a0a0a] text-white shadow-lg hover:bg-neutral-700 active:scale-95 transition-colors"
            aria-label="Scroll to top"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-4">
              <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
