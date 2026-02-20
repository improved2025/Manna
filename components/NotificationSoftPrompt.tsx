"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnon);

export default function NotificationSoftPrompt({
  delayMs = 4000,
}: {
  delayMs?: number;
  cooldownDays?: number;
}) {
  const [show, setShow] = useState(false);
  const [debug, setDebug] = useState<string>("");

  function log(msg: string) {
    console.log("[push]", msg);
    setDebug((p) => (p ? `${p}\n${msg}` : msg));
  }

  useEffect(() => {
    const t = setTimeout(async () => {
      if (!("Notification" in window)) {
        log("Notification API not available in this browser.");
        return;
      }

      log(`Notification.permission = ${Notification.permission}`);

      // If already granted, DO NOT keep prompting. Just try to register.
      if (Notification.permission === "granted") {
        await registerPush();
        return;
      }

      setShow(true);
    }, delayMs);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function registerPush() {
    try {
      if (!supabaseUrl || !supabaseAnon) {
        log("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
        return;
      }
      if (!vapidKey) {
        log("Missing NEXT_PUBLIC_VAPID_PUBLIC_KEY");
        return;
      }

      if (!("serviceWorker" in navigator)) {
        log("ServiceWorker not available.");
        return;
      }

      const reg = await navigator.serviceWorker.ready;
      log("ServiceWorker ready.");

      let sub = await reg.pushManager.getSubscription();
      log(`Existing subscription = ${sub ? "YES" : "NO"}`);

      if (!sub) {
        log("Subscribing to push…");
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: vapidKey,
        });
        log("Push subscribe OK.");
      }

      const payload = sub.toJSON();
      log("Subscription endpoint captured.");

      // IMPORTANT: If your table uses RLS, this is where it will fail.
      const { error } = await supabase.from("push_subscribers").insert({
        endpoint: sub.endpoint,
        payload,
        created_at: new Date().toISOString(),
      });

      if (error) {
        log(`Supabase INSERT error: ${error.message}`);
        return;
      }

      log("Supabase insert SUCCESS. New row should exist now.");
      setShow(false);
    } catch (e: any) {
      log(`registerPush exception: ${e?.message || String(e)}`);
    }
  }

  async function allow() {
    try {
      const perm = await Notification.requestPermission();
      log(`requestPermission result = ${perm}`);

      if (perm !== "granted") return;

      await registerPush();
      setShow(false);
    } catch (e: any) {
      log(`allow exception: ${e?.message || String(e)}`);
    }
  }

  // Debug panel (temporary). Remove after this is fixed.
  const DebugPanel = (
    <div className="mt-3 whitespace-pre-wrap rounded-lg bg-black/20 p-2 text-[11px] text-white/90">
      {debug || "…"}
    </div>
  );

  if (!show && Notification.permission !== "granted") return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-xl bg-emerald-700 p-4 text-white shadow-xl">
      <div className="text-sm font-semibold">Get daily MANNA reminders</div>
      <div className="mt-1 text-xs opacity-90">
        Scripture. Prayer. One quiet moment each day.
      </div>

      {Notification.permission === "granted" ? (
        <button
          onClick={registerPush}
          className="mt-3 w-full rounded-lg bg-white py-2 text-sm font-semibold text-emerald-800"
        >
          Register reminders
        </button>
      ) : (
        <button
          onClick={allow}
          className="mt-3 w-full rounded-lg bg-white py-2 text-sm font-semibold text-emerald-800"
        >
          Enable reminders
        </button>
      )}

      {DebugPanel}
    </div>
  );
}