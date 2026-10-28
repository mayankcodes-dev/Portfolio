import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const alt = "Mayank Singh — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * OG preview image.
 *
 * Uses the real portfolio screenshot (public/images/Portfolio.webp) as the
 * social share preview — so when someone shares the link on WhatsApp, Twitter,
 * LinkedIn etc. they see an actual screenshot of the site, not a generic card.
 *
 * Falls back to the generated card if the image file can't be read.
 */
export default async function OGImage() {
  // Read the portfolio screenshot from disk and embed it as a data URI.
  // next/og's ImageResponse only accepts data URIs or ArrayBuffer for local images.
  let imgSrc: string | null = null;
  try {
    const imgPath = path.join(process.cwd(), "public", "images", "Portfolio.webp");
    const buf = fs.readFileSync(imgPath);
    imgSrc = `data:image/webp;base64,${buf.toString("base64")}`;
  } catch {
    imgSrc = null;
  }

  // ── Screenshot preview (primary) ──────────────────────────────────────────
  if (imgSrc) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            position: "relative",
          }}
        >
          {/* Full-bleed portfolio screenshot */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt="Mayank Singh Portfolio"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Subtle bottom gradient overlay so the name stands out */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40%",
              background:
                "linear-gradient(to top, rgba(10,10,10,0.72) 0%, transparent 100%)",
              display: "flex",
              alignItems: "flex-end",
              padding: "40px 56px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <span
                style={{
                  fontSize: 42,
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                Mayank Singh
              </span>
              <span
                style={{
                  fontSize: 18,
                  color: "rgba(255,255,255,0.72)",
                  fontFamily: "monospace",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                mayankcodes.dev · Full-Stack Developer
              </span>
            </div>
          </div>
        </div>
      ),
      { ...size }
    );
  }

  // ── Fallback card (if screenshot unreadable) ───────────────────────────────
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
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              backgroundColor: "#0a0a0a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 20,
              fontWeight: 900,
            }}
          >
            M
          </div>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 14,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#737373",
            }}
          >
            mayankcodes.dev
          </span>
        </div>
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
            Full-Stack Developer · Next.js · TypeScript · MERN
          </div>
        </div>
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
