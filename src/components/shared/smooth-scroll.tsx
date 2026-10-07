"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll — initialises Lenis for buttery smooth scrolling.
 *
 * Placed in the root layout so it runs on every page.
 * Returns null (renders nothing).
 *
 * Notes:
 * - Duration 1.2s with easeOutExpo feels natural without being sluggish
 * - touchMultiplier 1 = same speed as native on touch devices (no change in feel)
 * - Uses RAF loop instead of gsap ticker to avoid dependency coupling
 */
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      touchMultiplier: 1,
      smoothWheel: true,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
