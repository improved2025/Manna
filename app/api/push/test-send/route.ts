import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";

export async function GET() {
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

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const { data: rows, error } = await supabase
    .from("push_subscriptions")
    .select("endpoint,p256dh,auth")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!rows || rows.length === 0) {
    return NextResponse.json(
      { error: "No subscriptions saved" },
      { status: 400 }
    );
  }

  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

  const subscription = {
    endpoint: rows[0].endpoint,
    keys: { p256dh: rows[0].p256dh, auth: rows[0].auth },
  };

  const payload = {
    title: "Today’s manna is ready.",
    body: "Open MANNA to read today’s Scripture and prayer.",
    url: "/today",
  };

  try {
    await webpush.sendNotification(subscription as any, JSON.stringify(payload));
    return NextResponse.json({ ok: true, sent: true });
  } catch (e: any) {
    return NextResponse.json(
      {
        ok: false,
        sent: false,
        error: e?.message || "Failed to send notification",
        statusCode: e?.statusCode,
      },
      { status: 500 }
    );
  }
}
