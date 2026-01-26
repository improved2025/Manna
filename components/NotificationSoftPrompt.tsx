"use client";

import { useEffect, useMemo, useState } from "react";

const LS = {
  enabled: "manna_notif_enabled", // "true"
  denied: "manna_notif_denied", // "true"
  cooldownUntil: "manna_notif_cooldown_until", // number (ms)
};

type Props = {
  delayMs?: number; // default 6000
  cooldownDays?: number; // default 4 (your 3–5 day window)
  onAllow?: () => void; // optional callback after successful enable
  onNotNow?: () => void; // optional
};

export default function NotificationSoftPrompt({
  delayMs = 6000,
  cooldownDays = 4,
  onAllow,
  onNotNow,
}: Props) {
  const [open, setOpen] = useState(false);

  const shouldEvenConsider = useMemo(() => {
    if (typeof window === "undefined") return false;

    // If already enabled, never prompt
    if (localStorage.getItem(LS.enabled) === "true") return false;

    // If previously denied at system level, never prompt again
    if (localStorage.getItem(LS.denied) === "true") return false;

    // If browser permission already denied, never prompt again
    if ("Notification" in window && Notification.permission === "denied") {
      localStorage.setItem(LS.denied, "true");
      return false;
    }

    // Cooldown
    const cooldownUntilRaw = localStorage.getItem(LS.cooldownUntil);
    const cooldownUntil = cooldownUntilRaw ? Number(cooldownUntilRaw) : 0;
    if (cooldownUntil && Date.now() < cooldownUntil) return false;

    return true;
  }, []);

  useEffect(() => {
    if (!shouldEvenConsider) return;

    const t = window.setTimeout(() => setOpen(true), delayMs);
    return () => window.clearTimeout(t);
  }, [shouldEvenConsider, delayMs]);

  const close = () => setOpen(false);

  const handleNotNow = () => {
    const daysMs = cooldownDays * 24 * 60 * 60 * 1000;
    localStorage.setItem(LS.cooldownUntil, String(Date.now() + daysMs));
    onNotNow?.();
    close();
  };

  const handleAllow = async () => {
    try {
      // If notifications are not supported, do nothing (silence > breaking trust)
      if (!("Notification" in window)) return;

      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        localStorage.setItem(LS.denied, "true");
        return;
      }

      if (!("serviceWorker" in navigator)) return;

      const reg = await navigator.serviceWorker.ready;

      const pkRes = await fetch("/api/push/public-key");
      const pkJson = await pkRes.json();
      const publicKey: string | undefined = pkJson?.publicKey;

      if (!publicKey) return;

      const urlBase64ToUint8Array = (base64String: string) => {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
          .replace(/-/g, "+")
          .replace(/_/g, "/");
        const raw = atob(base64);
        const output = new Uint8Array(raw.length);
        for (let i = 0; i < raw.length; ++i) output[i] = raw.charCodeAt(i);
        return output;
      };

      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });

      const saveRes = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription }),
      });

      const saved = await saveRes.json();

      if (saved?.ok === true) {
        localStorage.setItem(LS.enabled, "true");
        localStorage.removeItem(LS.denied);
        localStorage.removeItem(LS.cooldownUntil);
        onAllow?.();
      }
    } catch {
      // silence > breaking trust
    } finally {
      close();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      {/* backdrop */}
      <button
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 bg-black/40"
      />

      {/* sheet */}
      <div className="relative w-full max-w-md rounded-2xl bg-white p-4 shadow-xl">
        <p className="text-base font-medium text-gray-900">
          Remind you when today’s manna is ready?
        </p>

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleAllow}
            className="flex-1 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"
          >
            ALLOW
          </button>

          <button
            onClick={handleNotNow}
            className="flex-1 rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-900"
          >
            NOT NOW
          </button>
        </div>
      </div>
    </div>
  );
}
