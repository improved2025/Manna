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

  // Only evaluate notification capability on client
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

  // Decide whether to show prompt (client-only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) return;

    const p = window.Notification.permission;
    setPermission(p);

    // If already granted or denied, don’t keep nagging
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
    if (!("Notification" in window)) {
      setDebug("Notifications not supported.");
      return;
    }

    try {
      const result = await window.Notification.requestPermission();
      setPermission(result);
      setDebug(`Permission result = ${result}`);
      setShow(false);

      // OPTIONAL: If you have install/subscription logic elsewhere, keep it there.
      // This component should ONLY ask permission and stop.
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
              onClick={requestPermission}
              className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
              type="button"
            >
              Allow
            </button>
          </div>
        </div>

        {/* Debug panel (safe client-only) */}
        <div className="mt-3 rounded-xl bg-slate-900/90 px-3 py-2 text-[11px] text-white">
          permission: {permission} • {debug}
        </div>
      </div>
    </div>
  );
}