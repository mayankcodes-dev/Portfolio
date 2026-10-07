import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme-provider";
import PageLoader from "@/components/shared/page-loader";
import CustomCursor from "@/components/shared/cursor";
import ScrollProgress from "@/components/shared/scroll-progress";
import SmoothScroll from "@/components/shared/smooth-scroll";
import "./globals.css";

/* Self-hosted via next/font — no external CSS imports needed */
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mayankcodes.dev"),
  title: {
    default: "Mayank Singh — Full-Stack Developer",
    template: "%s | Mayank Singh",
  },
  description:
    "Mayank Singh — Full-Stack Developer from Lucknow, India. I build fast, polished web products with Next.js, TypeScript, and the MERN stack. Open to freelance & contract work.",
  keywords: [
    "Mayank Singh",
    "full-stack developer",
    "Next.js developer",
    "TypeScript",
    "MERN stack",
    "software engineer",
    "web developer India",
    "React developer",
    "freelance developer",
    "Lucknow developer",
  ],
  authors: [{ name: "Mayank Singh", url: "https://mayankcodes.dev" }],
  creator: "Mayank Singh",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://mayankcodes.dev",
    siteName: "Mayank Singh — Developer Portfolio",
    title: "Mayank Singh — Full-Stack Developer",
    description:
      "Full-Stack Developer from Lucknow. I build web products with Next.js, TypeScript, and the MERN stack.",
    // opengraph-image.tsx in the /app directory is auto-discovered by Next.js
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayank Singh — Full-Stack Developer",
    description:
      "Full-Stack Developer from Lucknow. Next.js, TypeScript, MERN stack.",
    creator: "@mayankcodes_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external image/data CDNs for faster resource loading */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://api.microlink.io" />
        <link rel="dns-prefetch" href="https://cdn.worldvectorlogo.com" />
        <link rel="dns-prefetch" href="https://leetcard.jacoblin.cool" />

        {/* JSON-LD: Person schema — helps Google & LLMs understand who this is */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mayank Singh",
              url: "https://mayankcodes.dev",
              jobTitle: "Full-Stack Developer",
              description:
                "Full-Stack Developer from Lucknow, India. Builds web products with Next.js, TypeScript, and the MERN stack.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lucknow",
                addressRegion: "Uttar Pradesh",
                addressCountry: "IN",
              },
              sameAs: [
                "https://github.com/mayankcodes-dev",
                "https://www.linkedin.com/in/mayankcodes-dev/",
                "https://codolio.com/profile/mayankcodes-dev",
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "MongoDB",
                "Full-Stack Web Development",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SmoothScroll />
        <PageLoader />
        <CustomCursor />
        <ScrollProgress />
        <ThemeProvider defaultTheme="light" enableSystem={false} disableTransitionOnChange>{children}</ThemeProvider>
      </body>
    </html>
  );
}