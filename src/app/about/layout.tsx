import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Mayank — a MERN stack developer who builds polished web products with Next.js, TypeScript, and modern tooling. Seeking software engineering internships.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
