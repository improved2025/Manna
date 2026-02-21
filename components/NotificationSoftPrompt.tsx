"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  delayMs?: number;
  cooldownDays?: number;
};

function safeGetLS(key: string): string | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetLS(key: string, value: string) {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

function daysToMs(days: number) {
  return days * 24 * 60 * 60 * 1000;
}

function nowMs() {
  return Date.now();
}

// VAPID public key comes from your route: /api/push/public-key
async function getVapidPublicKey(): Promise<string> {
  const res = await fetch("/api/push/public-key", { cache: "no-store" });
  if (!res.ok) throw new Error(`public-key failed (${res.status})`);
  const data = await res.json();
  const key = data?.publicKey;
  if (!key || typeof key !== "string") throw new Error("publicKey missing");
  return key;
}

// Convert base64url VAPID key to Uint8Array (required by PushManager)
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

export default function NotificationSoftPrompt({
  delayMs = 6000,
  cooldownDays = 4,
}: Props) {
  const [show, setShow] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission | "na">("na");
  const [debug, setDebug] = useState<string>("");

  const cooldownMs = useMemo(() => daysToMs(cooldownDays), [cooldownDays]);

  // Init (client-only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasNotification = "Notification" in window;
    if (!hasNotification) {
      setPermission("na");
      setDebug("Init: Notifications not supported.");
      return;
    }

    setPermission(window.Notification.permission);
    setDebug(`Init: Notification.permission=${window.Notification.permission}`);
  }, []);

  // Decide whether to show prompt
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) return;

    const p = window.Notification.permission;
    setPermission(p);

    // Don’t show if granted or denied
    if (p === "granted" || p === "denied") {
      setShow(false);
      return;
    }

    const key = "manna_notif_prompt_last_shown";
    const last = safeGetLS(key);
    const lastMs = last ? Number(last) : 0;

    const withinCooldown =
      Number.isFinite(lastMs) && lastMs > 0 && nowMs() - lastMs < cooldownMs;

    if (withinCooldown) {
      setShow(false);
      return;
    }

    const t = window.setTimeout(() => {
      safeSetLS(key, String(nowMs()));
      setShow(true);
    }, delayMs);

    return () => window.clearTimeout(t);
  }, [delayMs, cooldownMs]);

  async function subscribeAndSendToServer() {
    // Preconditions
    if (typeof window === "undefined") throw new Error("Not in browser");
    if (!("serviceWorker" in navigator)) throw new Error("No serviceWorker support");
    if (!("PushManager" in window)) {
      // This is the classic case on iPhone when you’re in Safari tab, not installed PWA.
      throw new Error("PushManager not available (install app / use supported browser)");
    }

    setDebug("Step: waiting for service worker…");
    const reg = await navigator.serviceWorker.ready;

    setDebug("Step: getting VAPID key…");
    const vapidKey = await getVapidPublicKey();

    setDebug("Step: subscribing…");
    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidKey),
    });

    setDebug("Step: sending subscription to server…");
    const res = await fetch("/api/push/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscription }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`subscribe route failed (${res.status}) ${text}`);
    }

    setDebug("OK: subscription saved to Supabase.");
    safeSetLS("manna_notif_subscribed", "1");
  }

  async function handleAllow() {
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) {
      setDebug("Allow: Notifications not supported.");
      return;
    }

    try {
      setDebug("Step: requesting permission…");
      const result = await window.Notification.requestPermission();
      setPermission(result);
      setDebug(`Permission result=${result}`);

      if (result !== "granted") {
        setShow(false);
        return;
      }

      // Permission granted → create push subscription + send to Supabase
      await subscribeAndSendToServer();

      setShow(false);
    } catch (e: any) {
      setDebug(`FAIL: ${e?.message || "Unknown error"}`);
    }
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Get daily MANNA reminders
            </div>
            <div className="mt-1 text-sm text-slate-600">
              A gentle prompt for Scripture and prayer each day.
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShow(false)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              type="button"
            >
              Not now
            </button>

            <button
              onClick={handleAllow}
              className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
              type="button"
            >
              Allow
            </button>
          </div>
        </div>

        {/* Debug panel */}
        <div className="mt-3 rounded-xl bg-slate-900/90 px-3 py-2 text-[11px] text-white">
          permission: {permission} • {debug}
        </div>
      </div>
    </div>
  );
}