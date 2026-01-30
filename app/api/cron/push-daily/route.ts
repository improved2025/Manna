import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";

export async function GET(req: Request) {
  // Optional protection (recommended)
  const CRON_SECRET = process.env.CRON_SECRET;
  if (CRON_SECRET) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
  const VAPID_SUBJECT = process.env.VAPID_SUBJECT;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Missing Supabase env" }, { status: 500 });
  }
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY || !VAPID_SUBJECT) {
    return NextResponse.json({ error: "Missing VAPID env" }, { status: 500 });
  }

  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const { data: rows, error } = await supabase
    .from("push_subscriptions")
    .select("endpoint,p256dh,auth")
    .limit(2000);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!rows || rows.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, failed: 0 });
  }

  // Locked notification wording
  const payload = {
    title: "MANNA",
    body: "Today’s manna is ready.",
    url: "/today",
  };

  let sent = 0;
  let failed = 0;

  await Promise.all(
    rows.map(async (r) => {
      const subscription = {
        endpoint: r.endpoint,
        keys: { p256dh: r.p256dh, auth: r.auth },
      };

      try {
        await webpush.sendNotification(subscription as any, JSON.stringify(payload));
        sent += 1;
      } catch {
        failed += 1;
      }
    })
  );

  return NextResponse.json({ ok: true, sent, failed });
}
