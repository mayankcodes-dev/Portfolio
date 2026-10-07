import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Mayank Singh — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Dynamic OG image generated at request time via Next.js ImageResponse.
 * Renders as a 1200×630 card — the standard social preview size.
 * No external image assets required — pure CSS layout.
 */
export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F5F3F0",
          padding: "72px 80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Grid background pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.35,
          }}
        />

        {/* Top: eyebrow label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
            }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 14,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#737373",
            }}
          >
            Open to work · mayankcodes.dev
          </span>
        </div>

        {/* Middle: name + title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 900,
              color: "#0a0a0a",
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
            }}
          >
            Mayank Singh
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#737373",
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            Full-Stack Engineer · Next.js · TypeScript · MERN
          </div>
        </div>

        {/* Bottom: tech pills */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {["Next.js", "React", "Node.js", "TypeScript", "MongoDB"].map((t) => (
            <div
              key={t}
              style={{
                padding: "8px 18px",
                borderRadius: 8,
                border: "1px solid #d4d4d4",
                backgroundColor: "#ffffff",
                fontSize: 15,
                fontFamily: "monospace",
                color: "#404040",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
