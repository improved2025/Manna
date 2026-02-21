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

export default function NotificationSoftPrompt({
  delayMs = 6000,
  cooldownDays = 4,
}: Props) {
  const [show, setShow] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission | "na">(
    "na"
  );
  const [debug, setDebug] = useState<string>("");

  const cooldownMs = useMemo(() => daysToMs(cooldownDays), [cooldownDays]);

  // Debug only when URL has ?debug=1
  const debugEnabled = useMemo(() => {
    if (typeof window === "undefined") return false;
    const p = new URLSearchParams(window.location.search);
    return p.get("debug") === "1";
  }, []);

  // Capability + initial permission (client-only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasNotification = "Notification" in window;
    if (!hasNotification) {
      setPermission("na");
      setDebug("Notifications not supported in this browser.");
      return;
    }

    const p = window.Notification.permission;
    setPermission(p);
    setDebug(`Init: Notification.permission=${p}`);
  }, []);

  // Decide whether to show prompt (client-only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) return;

    const p = window.Notification.permission;
    setPermission(p);

    // If already granted or denied, do not show prompt
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

  async function requestPermission() {
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) return;

    try {
      const result = await window.Notification.requestPermission();
      setPermission(result);
      setDebug((prev) => `${prev} • Permission result=${result}`);

      // Close prompt once user decides
      setShow(false);

      // Optional: extend cooldown after a decision so it never feels naggy
      safeSetLS("manna_notif_prompt_last_shown", String(nowMs()));
    } catch (e: any) {
      setDebug(`Permission request error: ${e?.message || "Unknown error"}`);
      // Keep prompt open only if they want to try again
    }
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-lg backdrop-blur">
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-slate-900">
              Get daily MANNA reminders
            </div>
            <div className="mt-1 text-sm text-slate-600">
              A gentle prompt for Scripture and prayer each day.
            </div>
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              onClick={() => setShow(false)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              type="button"
            >
              Not now
            </button>

            <button
              onClick={requestPermission}
              className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
              type="button"
            >
              Allow
            </button>
          </div>
        </div>

        {/* Debug (hidden unless ?debug=1) */}
        {debugEnabled ? (
          <div className="border-t border-slate-200 bg-slate-50 px-4 py-2 text-[11px] text-slate-600">
            permission: {permission} • {debug}
          </div>
        ) : null}
      </div>
    </div>
  );
}