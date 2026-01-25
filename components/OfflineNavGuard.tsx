"use client";

import { useEffect } from "react";

export default function OfflineNavGuard() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      // Only intervene when the device is offline
      if (navigator.onLine) return;

      // Find nearest anchor
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!a) return;

      // Ignore: new tab, download, external, hash links
      if (a.target === "_blank") return;
      if (a.hasAttribute("download")) return;
      const href = a.getAttribute("href") || "";
      if (!href || href.startsWith("#")) return;

      // Only intercept same-origin navigations
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
      } catch {
        return;
      }

      // Prevent dead-click behavior and take user to offline page
      e.preventDefault();
      window.location.href = "/offline";
    }

    // Capture phase so we catch clicks even if Next intercepts them
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
