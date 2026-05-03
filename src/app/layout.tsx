import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme-provider";
import PageLoader from "@/components/shared/page-loader";
import CustomCursor from "@/components/shared/cursor";
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
  title: {
    default: "Mayank | Software Engineer",
    template: "%s | Mayank",
  },
  description:
    "Mayank is a MERN software engineer from Lucknow who builds polished web products with Next.js, TypeScript, and modern tooling. Available for internships & freelance.",
  keywords: [
    "full-stack developer",
    "Next.js developer",
    "TypeScript",
    "MERN stack",
    "freelance developer",
    "web development",
    "React developer",
    "Lucknow developer",
    "portfolio",
  ],
  authors: [{ name: "Mayank" }],
  creator: "Mayank",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Mayank — Developer Portfolio",
    title: "Mayank | Full-Stack Developer",
    description:
      "Building polished web products with Next.js, TypeScript, and thoughtful engineering.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayank | Full-Stack Developer",
    description:
      "Building polished web products with Next.js, TypeScript, and thoughtful engineering.",
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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <PageLoader />
        <CustomCursor />
        <ThemeProvider defaultTheme="light" enableSystem={false} disableTransitionOnChange>{children}</ThemeProvider>
      </body>
    </html>
  );
}