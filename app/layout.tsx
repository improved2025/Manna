import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MANNA — Daily Bread, Daily Walk",
  description:
    "A scripture-first daily devotional web app designed to help believers walk with God one day at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">{children}</body>
    </html>
  );
}
