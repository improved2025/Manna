import type { Metadata, Viewport } from "next";
import "./globals.css";
import PwaRegister from "../components/PwaRegister";
import InstallTracking from "../components/InstallTracking";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "MANNA",
  description: "Daily Bread. Daily Walk.",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#047857",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PwaRegister />
        <InstallTracking />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
