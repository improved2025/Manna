import type { Metadata, Viewport } from "next";
import "./globals.css";
import PwaRegister from "../components/PwaRegister";
import InstallTracking from "../components/InstallTracking";
import OfflineNavGuard from "../components/OfflineNavGuard";

export const metadata: Metadata = {
  title: "MANNA",
  description: "Daily Bread. Daily Walk.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
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
        <OfflineNavGuard />
        <InstallTracking />
        {children}
      </body>
    </html>
  );
}
