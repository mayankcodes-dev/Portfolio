import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Mayank Singh",
  description:
    "Get in touch with Mayank — available for freelance projects, contract work, and collaborations.",
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
