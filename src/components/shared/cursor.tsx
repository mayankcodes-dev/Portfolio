"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor({ size = 60 }: { size?: number }) {
  const cursorRef  = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number | undefined>(undefined);
  const mousePos   = useRef({ x: -size * 2, y: -size * 2 });
  const currentPos = useRef({ x: -size * 2, y: -size * 2 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (cursorRef.current) {
        const cx = currentPos.current.x + (mousePos.current.x - currentPos.current.x) * 0.2;
        const cy = currentPos.current.y + (mousePos.current.y - currentPos.current.y) * 0.2;
        currentPos.current = { x: cx, y: cy };
        cursorRef.current.style.transform = `translate(${cx - size / 2}px, ${cy - size / 2}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.body.style.cursor = "none";
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.body.style.cursor = "";
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, [size]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed pointer-events-none rounded-full bg-white mix-blend-difference z-[9999]"
      style={{ width: size, height: size, top: 0, left: 0, willChange: "transform" }}
    />
  );
}
