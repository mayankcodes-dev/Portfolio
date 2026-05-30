"use client";

import { forwardRef } from "react";

export const Footer = forwardRef<HTMLElement, {}>(function Footer(_, ref) {
  return (
    <footer ref={ref} className="w-full overflow-hidden bg-black">

      {/* ── Giant brand name ── */}
      <div
        className="overflow-hidden select-none w-full text-center px-4 md:px-6"
        style={{ paddingTop: "clamp(6.2rem, 27.8vw, 34.6rem)" }}
      >
        <h2
          className="footer-brand-name font-black uppercase text-white leading-[0.8] w-full text-center select-none cursor-default"
          style={{ fontSize: "clamp(4.75rem, 21.37vw, 26.6rem)" }}
          aria-hidden
        >
          MAYANK
        </h2>
      </div>


    </footer>
  );
});
