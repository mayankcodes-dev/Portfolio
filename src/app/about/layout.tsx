import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Mayank Singh — a self-taught full-stack developer from Lucknow, India. Building web apps with Next.js, TypeScript, and MongoDB while studying Computer Science.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
