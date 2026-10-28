"use client";

import { useEffect, useRef, useState } from "react";

/**
 * High-performance two-part cursor.
 * – 6px inner dot: instant snap (no lag)
 * – 32px outer ring: spring-lagged for a satisfying trail
 * – No mix-blend-mode → zero GPU repaint / compositing cost
 * – RAF loop only — zero React state re-renders on mousemove
 * – Hover detection via event delegation (no getComputedStyle per frame)
 * – Disabled automatically on touch / coarse-pointer devices
 */
export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef  = useRef<number | undefined>(undefined);
  const mouse   = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const hovered = useRef(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setEnabled(true);

    // Track raw mouse position
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    // Hover detection via delegation — NO getComputedStyle
    const INTERACTIVE =
      'a, button, input, textarea, select, [role="button"], [data-cursor="pointer"], label';
    const onOver = (e: MouseEvent) => {
      hovered.current = !!(e.target as HTMLElement)?.closest(INTERACTIVE);
    };

    // RAF animation loop
    const animate = () => {
      const { x: mx, y: my } = mouse.current;

      // Dot: instant snap to cursor position
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
      }

      // Ring: lerp toward cursor (0.12 factor = nice trailing spring feel)
      const rx = ring.current.x + (mx - ring.current.x) * 0.12;
      const ry = ring.current.y + (my - ring.current.y) * 0.12;
      ring.current = { x: rx, y: ry };

      if (ringRef.current) {
        const scale = hovered.current ? 1.55 : 1;
        ringRef.current.style.transform =
          `translate(${rx - 16}px, ${ry - 16}px) scale(${scale})`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.body.style.cursor = "none";
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.body.style.cursor = "";
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* 6px filled dot — instant */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#0a0a0a",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
        }}
      />
      {/* 32px outer ring — spring-lagged */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1.5px solid rgba(10,10,10,0.40)",
          backgroundColor: "rgba(10,10,10,0.03)",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
          transition: "transform 0.06s linear",
        }}
      />
    </>
  );
}
