"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

export default function InstallTracking() {
  useEffect(() => {
    // Track successful PWA install (supported browsers)
    function handleInstalled() {
      track("app_installed");
    }

    window.addEventListener("appinstalled", handleInstalled);

    // Track app opened in installed / standalone mode (iOS + Android)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-ignore - iOS Safari specific
      window.navigator.standalone === true;

    if (isStandalone) {
      track("open_standalone");
    }

    return () => {
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  return null;
}
