import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mayank Singh",
  description:
    "A collection of Mayank's projects — full-stack web apps, AI tools, and SaaS products built with Next.js, TypeScript, and the MERN stack.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
