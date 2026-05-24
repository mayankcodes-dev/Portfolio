"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip cursor in SSR or on touch devices
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot  = dotRef.current!;
    const ring = ringRef.current!;
    document.body.style.cursor = "none";

    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let clickScale = 1;
    let targetClickScale = 1;
    let hasMoved = false;
    let frameId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        rx = mx;
        ry = my;
        dot.style.display  = "block";
        ring.style.display = "block";
      }
    };

    const tick = () => {
      if (hasMoved) {
        // Smooth interpolation for the ring
        rx += (mx - rx) * 0.085;
        ry += (my - ry) * 0.085;

        // Smooth interpolation for mouse click scale
        clickScale += (targetClickScale - clickScale) * 0.25;

        dot.style.transform = `translate3d(${mx}px, ${my}px, 0) scale(${clickScale})`;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${clickScale})`;
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    const TARGETS = "a, button, [role='button'], input, textarea, select, label";

    const onMouseOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.(TARGETS) as HTMLElement;
      if (!el) return;
      const tag = el.tagName.toLowerCase();
      const isBtn   = tag === "button" || el.closest("button") !== null;
      const isInput = ["input", "textarea", "select"].includes(tag);

      const innerRing = ring.firstElementChild as HTMLElement;
      const innerDot  = dot.firstElementChild as HTMLElement;

      if (innerRing) {
        if (isBtn) {
          innerRing.style.setProperty("--width", "48px");
          innerRing.style.setProperty("--height", "30px");
          innerRing.style.setProperty("--radius", "8px");
          innerRing.style.setProperty("--border-color", "#0a0a0a");
          innerRing.style.setProperty("--bg-color", "rgba(10,10,10,0.06)");
        } else if (isInput) {
          innerRing.style.setProperty("--width", "16px");
          innerRing.style.setProperty("--height", "2px");
          innerRing.style.setProperty("--radius", "2px");
          innerRing.style.setProperty("--border-color", "#0a0a0a");
          innerRing.style.setProperty("--bg-color", "rgba(10,10,10,0.3)");
        } else {
          innerRing.style.setProperty("--width", "40px");
          innerRing.style.setProperty("--height", "40px");
          innerRing.style.setProperty("--radius", "9999px");
          innerRing.style.setProperty("--border-color", "#0a0a0a");
          innerRing.style.setProperty("--bg-color", "rgba(10,10,10,0.04)");
        }
      }

      if (innerDot) {
        innerDot.style.setProperty("--scale", "0.5");
      }
      el.style.cursor = "none";
    };

    const onMouseOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.(TARGETS) as HTMLElement;
      if (!el) return;

      const innerRing = ring.firstElementChild as HTMLElement;
      const innerDot  = dot.firstElementChild as HTMLElement;

      if (innerRing) {
        innerRing.style.setProperty("--width", "32px");
        innerRing.style.setProperty("--height", "32px");
        innerRing.style.setProperty("--radius", "50%");
        innerRing.style.setProperty("--border-color", "rgba(10,10,10,0.4)");
        innerRing.style.setProperty("--bg-color", "transparent");
      }

      if (innerDot) {
        innerDot.style.setProperty("--scale", "1");
      }
    };

    const onDown = () => {
      targetClickScale = 0.8;
    };
    
    const onUp = () => {
      targetClickScale = 1;
    };

    document.body.addEventListener("mouseover", onMouseOver);
    document.body.addEventListener("mouseout", onMouseOut);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    return () => {
      cancelAnimationFrame(frameId);
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
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: "none",
          willChange: "transform",
          display: "none",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#0a0a0a",
            transform: "translate(-50%, -50%) scale(var(--scale, 1))",
            transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        />
      </div>
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9998,
          pointerEvents: "none",
          willChange: "transform",
          display: "none",
        }}
      >
        <div
          style={{
            width: "var(--width, 32px)",
            height: "var(--height, 32px)",
            borderRadius: "var(--radius, 50%)",
            border: "1.5px solid var(--border-color, rgba(10,10,10,0.4))",
            backgroundColor: "var(--bg-color, transparent)",
            transform: "translate(-50%, -50%)",
            transition: "width 0.22s cubic-bezier(0.25, 1, 0.5, 1), height 0.22s cubic-bezier(0.25, 1, 0.5, 1), border-radius 0.22s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.22s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.22s cubic-bezier(0.25, 1, 0.5, 1)",
            boxSizing: "border-box",
          }}
        />
      </div>
    </>
  );
}


