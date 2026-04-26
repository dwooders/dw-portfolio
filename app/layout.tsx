import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Davy Woodward — Creative Strategist, Designer, Storyteller",
  description:
    "Independent creative strategist, designer, and storyteller based in New York City. Building identity systems, editorial layouts, and interfaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
