"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

async function getSwRegistration() {
  if (typeof window === "undefined") return null;
  if (!("serviceWorker" in navigator)) return null;

  // Ensure SW is ready (your PwaRegister registers /sw.js)
  try {
    return await navigator.serviceWorker.ready;
  } catch {
    return null;
  }
}

async function ensureSubscriptionSaved(setDebug?: (s: string) => void) {
  if (typeof window === "undefined") return { ok: false, reason: "no-window" as const };
  if (!("Notification" in window)) return { ok: false, reason: "no-notification" as const };
  if (!("serviceWorker" in navigator)) return { ok: false, reason: "no-sw" as const };

  // Must be granted to subscribe
  if (window.Notification.permission !== "granted") {
    setDebug?.(`permission != granted (${window.Notification.permission})`);
    return { ok: false, reason: "not-granted" as const };
  }

  const reg = await getSwRegistration();
  if (!reg) {
    setDebug?.("service worker not ready");
    return { ok: false, reason: "sw-not-ready" as const };
  }

  // Reuse existing subscription if present
  let sub = await reg.pushManager.getSubscription();

  // Create new subscription if missing
  if (!sub) {
    setDebug?.("no subscription yet; fetching public key…");
    const keyRes = await fetch("/api/push/public-key", { cache: "no-store" });
    const keyJson = await keyRes.json().catch(() => ({}));
    const publicKey = String(keyJson?.publicKey || "");

    if (!publicKey) {
      setDebug?.("missing public key from /api/push/public-key");
      return { ok: false, reason: "missing-public-key" as const };
    }

    try {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
      setDebug?.("subscription created");
    } catch (e: any) {
      setDebug?.(`subscribe() failed: ${e?.message || "unknown"}`);
      return { ok: false, reason: "subscribe-failed" as const };
    }
  } else {
    setDebug?.("subscription exists");
  }

  // Save to your server (which writes to Supabase)
  setDebug?.("saving subscription to server…");
  const saveRes = await fetch("/api/push/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sub),
  });

  const saveJson = await saveRes.json().catch(() => ({}));
  if (!saveRes.ok || !saveJson?.ok) {
    setDebug?.(`save failed (${saveRes.status}): ${saveJson?.error || "unknown"}`);
    return { ok: false, reason: "save-failed" as const };
  }

  // Mark as saved so we never nag again on this device
  safeSetLS("manna_push_saved", "1");
  setDebug?.("saved ✅ (manna_push_saved=1)");
  return { ok: true, reason: "ok" as const };
}

export default function NotificationSoftPrompt({
  delayMs = 6000,
  cooldownDays = 4,
}: Props) {
  const [show, setShow] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission | "na">("na");
  const [debug, setDebug] = useState<string>("");

  const cooldownMs = useMemo(() => daysToMs(cooldownDays), [cooldownDays]);
  const attemptedAutoFix = useRef(false);

  // Client-only capability check
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasNotification = "Notification" in window;
    if (!hasNotification) {
      setPermission("na");
      setDebug("Notifications not supported in this browser.");
      return;
    }

    setPermission(window.Notification.permission);
    setDebug(`Notification.permission = ${window.Notification.permission}`);
  }, []);

  // If permission is already granted, but Supabase isn't recording,
  // silently try to create/reuse subscription and save it once.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) return;

    const p = window.Notification.permission;
    setPermission(p);

    // If we've already confirmed saved on this device, never show prompt.
    const alreadySaved = safeGetLS("manna_push_saved") === "1";
    if (alreadySaved) {
      setShow(false);
      return;
    }

    if (p === "granted" && !attemptedAutoFix.current) {
      attemptedAutoFix.current = true;
      (async () => {
        const res = await ensureSubscriptionSaved(setDebug);
        if (res.ok) setShow(false);
      })();
    }
  }, []);

  // Decide whether to show prompt
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) return;

    const p = window.Notification.permission;
    setPermission(p);

    // If already saved, don’t show
    const alreadySaved = safeGetLS("manna_push_saved") === "1";
    if (alreadySaved) {
      setShow(false);
      return;
    }

    // If denied, don’t nag (user must change in browser settings)
    if (p === "denied") {
      setShow(false);
      return;
    }

    // If granted, we also shouldn't nag; auto-fix above will attempt save.
    if (p === "granted") {
      setShow(false);
      return;
    }

    // Only prompt if permission is "default"
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

  async function onAllow() {
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) {
      setDebug("Notifications not supported.");
      return;
    }

    try {
      const result = await window.Notification.requestPermission();
      setPermission(result);
      setDebug(`Permission result = ${result}`);

      if (result !== "granted") {
        setShow(false);
        return;
      }

      // Now actually subscribe + save to Supabase via your API route
      const saved = await ensureSubscriptionSaved(setDebug);
      setShow(false);

      // If save failed, we still hide the prompt to avoid annoying loops.
      // (You can choose to re-show later, but that caused your current pain.)
      if (!saved.ok) {
        // Keep debug text for your testing; you can remove later.
        return;
      }
    } catch (e: any) {
      setDebug(`Permission request error: ${e?.message || "Unknown error"}`);
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
              onClick={onAllow}
              className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
              type="button"
            >
              Allow
            </button>
          </div>
        </div>

        {/* Debug panel (keep for now while we verify Supabase writes) */}
        <div className="mt-3 rounded-xl bg-slate-900/90 px-3 py-2 text-[11px] text-white">
          permission: {permission} • {debug}
        </div>
      </div>
    </div>
  );
}