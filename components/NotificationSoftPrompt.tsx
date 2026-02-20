"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NotificationSoftPrompt({
  delayMs = 4000,
  cooldownDays = 4,
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!("Notification" in window)) return;

      if (Notification.permission === "granted") {
        await registerPush();
        return;
      }

      setShow(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs]);

  async function registerPush() {
    const reg = await navigator.serviceWorker.ready;

    let sub = await reg.pushManager.getSubscription();

    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      });
    }

    await supabase.from("push_subscribers").upsert({
      endpoint: sub.endpoint,
      payload: sub.toJSON(),
      created_at: new Date().toISOString(),
    });
  }

  async function allow() {
    const perm = await Notification.requestPermission();
    if (perm !== "granted") return;

    await registerPush();
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-xl bg-emerald-700 p-4 text-white shadow-xl">
      <div className="text-sm font-semibold">
        Get daily MANNA reminders
      </div>
      <div className="mt-1 text-xs opacity-90">
        Scripture. Prayer. One quiet moment each day.
      </div>

      <button
        onClick={allow}
        className="mt-3 w-full rounded-lg bg-white py-2 text-sm font-semibold text-emerald-800"
      >
        Enable reminders
      </button>
    </div>
  );
}