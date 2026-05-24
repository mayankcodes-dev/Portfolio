"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip cursor in SSR or on touch devices
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    dot.style.display  = "block";
    ring.style.display = "block";
    document.body.style.cursor = "none";

    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      gsap.set(dot, { x: mx - 4, y: my - 4 });
    };

    const tick = gsap.ticker.add(() => {
      rx += (mx - rx) * 0.084;
      ry += (my - ry) * 0.084;
      gsap.set(ring, { x: rx - 16, y: ry - 16 });
    });

    const onMouseOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.(TARGETS) as HTMLElement;
      if (!el) return;
      const tag = el.tagName.toLowerCase();
      const isBtn   = tag === "button" || el.closest("button") !== null;
      const isInput = ["input", "textarea", "select"].includes(tag);

      if (isBtn) {
        gsap.to(ring, { width: 48, height: 30, borderRadius: 8, borderColor: "#0a0a0a", backgroundColor: "rgba(10,10,10,0.06)", duration: 0.22, ease: "power2.out" });
      } else if (isInput) {
        gsap.to(ring, { width: 16, height: 2, borderRadius: 2, borderColor: "#0a0a0a", backgroundColor: "rgba(10,10,10,0.3)", duration: 0.18, ease: "power2.out" });
      } else {
        gsap.to(ring, { width: 40, height: 40, borderRadius: 9999, borderColor: "#0a0a0a", backgroundColor: "rgba(10,10,10,0.04)", duration: 0.22, ease: "power2.out" });
      }
      gsap.to(dot, { scale: 0.5, duration: 0.18 });
      el.style.cursor = "none";
    };

    const onMouseOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.(TARGETS) as HTMLElement;
      if (!el) return;
      gsap.to(ring, { width: 32, height: 32, borderRadius: 9999, borderColor: "rgba(10,10,10,0.4)", backgroundColor: "transparent", duration: 0.3, ease: "elastic.out(1,0.6)" });
      gsap.to(dot, { scale: 1, duration: 0.25, ease: "elastic.out(1,0.5)" });
    };

    const onDown = () => gsap.to([dot, ring], { scale: 0.8, duration: 0.08 });
    const onUp   = () => gsap.to([dot, ring], { scale: 1,   duration: 0.35, ease: "elastic.out(1,0.5)" });

    const TARGETS = "a, button, [role='button'], input, textarea, select, label";

    document.body.addEventListener("mouseover", onMouseOver);
    document.body.addEventListener("mouseout", onMouseOut);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    return () => {
      gsap.ticker.remove(tick);
      document.body.removeEventListener("mouseover", onMouseOver);
      document.body.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 9999,
          width: 8, height: 8, borderRadius: "50%",
          background: "#0a0a0a",
          pointerEvents: "none", willChange: "transform",
          display: "none",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 9998,
          width: 32, height: 32, borderRadius: "50%",
          border: "1.5px solid rgba(10,10,10,0.4)",
          background: "transparent",
          pointerEvents: "none", willChange: "transform",
          display: "none",
        }}
      />
    </>
  );
}

