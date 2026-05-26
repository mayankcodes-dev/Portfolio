"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: ReactNode;
  footer: ReactNode;
  className?: string;
}

/**
 * Wraps <main> content + <Footer> so that:
 *  - The white content wrapper scales 1→0.9 and gets rounded bottom corners
 *    as the footer scrolls into view (exact mdsaban.com effect).
 *  - Works on every sub-page without GSAP logic in each page file.
 */
export default function FooterScrollWrapper({ children, footer, className = "" }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const footerRef  = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const footerEl = footerRef.current;
    if (!wrapper || !footerEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapper,
        { scale: 1, borderRadius: "0" },
        {
          scale: 0.9,
          borderRadius: "0 0 40px 40px",
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerEl,
            scrub: 0.5,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-black overflow-x-hidden">
      {/* White content — scales on footer scroll */}
      <div
        ref={wrapperRef}
        className={`relative w-full bg-white text-[#0a0a0a] overflow-hidden ${className}`}
        style={{ transformOrigin: "top center", willChange: "transform" }}
      >
        {children}
      </div>

      {/* Footer sits outside the scaling wrapper */}
      <div ref={footerRef}>
        {footer}
      </div>
    </div>
  );
}
