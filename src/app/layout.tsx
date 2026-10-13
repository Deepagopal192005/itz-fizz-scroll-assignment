import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ITZ FIZZ — Scroll Experience",
  description:
    "A scroll-driven ITZ FIZZ campaign landing page built with Next.js, Tailwind CSS, and GSAP ScrollTrigger."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
