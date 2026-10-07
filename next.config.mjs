import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* React Compiler disabled — causes 404 on client components with GSAP */
  // reactCompiler: true,
  /* Turbopack: explicitly set workspace root to silence multi-lockfile warning */
  turbopack: {
    root: __dirname,
  },

  images: {
    /* Serve AVIF first, fall back to WebP — both are far smaller than PNG/JPEG */
    formats: ["image/avif", "image/webp"],

    /* Aggressive CDN cache — images never change without a new URL */
    minimumCacheTTL: 31536000, // 1 year

    /* Responsive breakpoints matching Tailwind defaults */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],

    remotePatterns: [
      {
        // Hashnode CDN — cover images
        protocol: "https",
        hostname: "cdn.hashnode.com",
      },
      {
        // Hashnode media uploads
        protocol: "https",
        hostname: "**.hashnode.com",
      },
      {
        // Microlink.io — project screenshot previews (used in project-modal.tsx)
        protocol: "https",
        hostname: "api.microlink.io",
      },
      {
        // jsDelivr CDN — skill logos (devicons)
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        // Coursera — certificate issuer assets (DeepLearning.AI logo)
        protocol: "https",
        hostname: "*.cloudfront.net",
      },
      {
        // World Vector Logo — Udemy logo used in certificates
        protocol: "https",
        hostname: "cdn.worldvectorlogo.com",
      },
    ],
  },
  /* ── Security headers on every route ── */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking — portfolio has no legitimate embedding use
          { key: "X-Frame-Options",        value: "DENY" },
          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Send only origin on cross-origin requests
          { key: "Referrer-Policy",        value: "strict-origin-when-cross-origin" },
          // Disable sensors not used by this site
          { key: "Permissions-Policy",     value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
