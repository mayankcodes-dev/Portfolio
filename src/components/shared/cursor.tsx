"use client";

import { useEffect, useRef, useState } from "react";

/**
 * High-performance two-part cursor.
 * – 30px inner dot  (5× original 6px): instant snap
 * – 80px outer ring (2.5× original 32px + extra): spring-lagged trail
 * – No mix-blend-mode → zero GPU repaint cost
 * – RAF loop only — zero React state re-renders on mousemove
 * – Hover detection via event delegation
 * – Disabled automatically on touch / coarse-pointer devices
 */
export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef  = useRef<number | undefined>(undefined);
  const mouse   = useRef({ x: -200, y: -200 });
  const ring    = useRef({ x: -200, y: -200 });
  const hovered = useRef(false);
  const [enabled, setEnabled] = useState(false);

  // Dot: 30px  → half = 15  (centering offset)
  // Ring: 80px → half = 40  (centering offset)
  const DOT_SIZE  = 30;
  const RING_SIZE = 80;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const INTERACTIVE =
      'a, button, input, textarea, select, [role="button"], [data-cursor="pointer"], label';
    const onOver = (e: MouseEvent) => {
      hovered.current = !!(e.target as HTMLElement)?.closest(INTERACTIVE);
    };

    const animate = () => {
      const { x: mx, y: my } = mouse.current;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - DOT_SIZE / 2}px, ${my - DOT_SIZE / 2}px)`;
      }

      const rx = ring.current.x + (mx - ring.current.x) * 0.10;
      const ry = ring.current.y + (my - ring.current.y) * 0.10;
      ring.current = { x: rx, y: ry };

      if (ringRef.current) {
        const scale = hovered.current ? 1.4 : 1;
        ringRef.current.style.transform =
          `translate(${rx - RING_SIZE / 2}px, ${ry - RING_SIZE / 2}px) scale(${scale})`;
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Dot — 30px filled circle, instant snap */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: "50%",
          backgroundColor: "#0a0a0a",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
        }}
      />
      {/* Ring — 80px spring-lagged circle */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: RING_SIZE,
          height: RING_SIZE,
          borderRadius: "50%",
          border: "2px solid rgba(10,10,10,0.35)",
          backgroundColor: "rgba(10,10,10,0.02)",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
          transition: "transform 0.05s linear, width 0.2s, height 0.2s",
        }}
      />
    </>
  );
}
