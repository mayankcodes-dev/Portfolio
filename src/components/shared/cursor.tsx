"use client";

/**
 * Custom GSAP cursor — dot + trailing ring.
 * Desktop only (hidden on touch devices via pointer:coarse).
 * Mount once in layout.tsx above ThemeProvider.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    // Remove default cursor on body
    document.body.style.cursor = "none";

    let mouseX = 0;
    let mouseY = 0;
    let ringX  = 0;
    let ringY  = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows instantly
      gsap.set(dot, { x: mouseX - 3, y: mouseY - 3 });
    };

    // Lerp ring toward mouse on every frame
    const ticker = gsap.ticker.add(() => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      gsap.set(ring, { x: ringX - 14, y: ringY - 14 });
    });

    // Hoverable elements → ring expands, dot fades
    const onEnter = () => {
      gsap.to(ring, { scale: 2.4, opacity: 0.5, duration: 0.35, ease: "power2.out" });
      gsap.to(dot,  { scale: 0,   opacity: 0,   duration: 0.25, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
      gsap.to(dot,  { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
    };

    const targets = "a, button, [role='button'], input, textarea, select, label[for]";

    const bindHoverables = () => {
      document.querySelectorAll<HTMLElement>(targets).forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        el.style.cursor = "none";
      });
    };
    bindHoverables();

    // Re-bind when DOM changes (SPA navigation)
    const observer = new MutationObserver(bindHoverables);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener("mousemove", onMove);
      document.body.style.cursor = "";
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] size-[6px] rounded-full bg-primary"
        style={{ willChange: "transform" }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] size-[28px] rounded-full border-2 border-primary"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
