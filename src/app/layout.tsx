import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme-provider";
import PageLoader from "@/components/shared/page-loader";
import CustomCursor from "@/components/shared/cursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Mayank | Full-Stack Developer",
    template: "%s | Mayank",
  },
  description:
    "Mayank is a full-stack MERN developer who builds polished web products with Next.js, TypeScript, and modern tooling. Based in Lucknow. Available for internships & freelance.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <PageLoader />
        {/* Custom cursor — renders above everything, desktop only */}
        <CustomCursor />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}