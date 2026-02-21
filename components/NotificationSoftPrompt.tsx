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

// VAPID helper
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
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

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasNotification = "Notification" in window;
    if (!hasNotification) {
      setPermission("na");
      setDebug("Notifications not supported in this browser.");
      return;
    }

    setPermission(window.Notification.permission);
    setDebug(`Init: Notification.permission=${window.Notification.permission}`);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) return;

    const p = window.Notification.permission;
    setPermission(p);

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

  async function subscribeAndSend() {
    if (typeof window === "undefined") return;

    // 1) Service worker must exist
    if (!("serviceWorker" in navigator)) {
      setDebug("FAIL: serviceWorker not supported");
      return;
    }

    // 2) Push must exist
    if (!("PushManager" in window)) {
      setDebug("FAIL: PushManager not supported (iOS requires Add to Home Screen)");
      return;
    }

    setDebug("Step: waiting for service worker ready…");
    const reg = await navigator.serviceWorker.ready;

    // 3) Fetch VAPID public key from your API
    setDebug("Step: fetching VAPID public key…");
    const pkRes = await fetch("/api/push/public-key", { cache: "no-store" });
    if (!pkRes.ok) {
      const t = await pkRes.text().catch(() => "");
      setDebug(`FAIL: /api/push/public-key ${pkRes.status} ${t}`);
      return;
    }

    const pkJson = await pkRes.json().catch(() => null);
    const publicKey = pkJson?.publicKey || pkJson?.key || pkJson?.vapidPublicKey;

    if (!publicKey || typeof publicKey !== "string") {
      setDebug("FAIL: public key response missing (expected { publicKey })");
      return;
    }

    // 4) Reuse existing subscription if present
    setDebug("Step: checking existing subscription…");
    let sub = await reg.pushManager.getSubscription();

    if (!sub) {
      setDebug("Step: creating new subscription…");
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
    } else {
      setDebug("Step: using existing subscription…");
    }

    // 5) POST to Supabase via your route
    setDebug("Step: sending subscription to server…");
    const saveRes = await fetch("/api/push/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscription: sub }),
    });

    if (!saveRes.ok) {
      const t = await saveRes.text().catch(() => "");
      setDebug(`FAIL: /api/push/subscribe ${saveRes.status} ${t}`);
      return;
    }

    const out = await saveRes.json().catch(() => ({}));
    setDebug(`OK: subscribed & saved (${out?.ok ? "ok" : "saved"})`);
  }

  async function requestPermissionAndSubscribe() {
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) {
      setDebug("FAIL: Notifications not supported.");
      return;
    }

    try {
      setDebug("Step: requesting permission…");
      const result = await window.Notification.requestPermission();
      setPermission(result);

      if (result !== "granted") {
        setDebug(`Stopped: permission=${result}`);
        setShow(false);
        return;
      }

      // Permission granted: NOW create subscription + save to Supabase
      await subscribeAndSend();
      setShow(false);
    } catch (e: any) {
      setDebug(`FAIL: permission/subscribe error: ${e?.message || "Unknown error"}`);
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
              onClick={requestPermissionAndSubscribe}
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