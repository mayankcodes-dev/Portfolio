import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mayank Singh",
  description:
    "Browse Mayank's professional certifications in frontend, backend, TypeScript, and web security — earned from Coursera, Udemy, MongoDB University, and more.",
};

export default function CertificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
