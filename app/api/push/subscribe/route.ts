import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type AnySub = {
  endpoint?: string;
  keys?: { p256dh?: string; auth?: string };
};

export async function POST(req: Request) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY" },
      { status: 500 }
    );
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Accept BOTH:
  // 1) { subscription: PushSubscriptionLike }
  // 2) PushSubscriptionLike (direct)
  const sub: AnySub = (body?.subscription ?? body) as AnySub;

  const endpoint = sub?.endpoint;
  const p256dh = sub?.keys?.p256dh;
  const auth = sub?.keys?.auth;

  if (!endpoint || !p256dh || !auth) {
    return NextResponse.json(
      {
        error: "Invalid subscription",
        received: {
          hasEndpoint: Boolean(endpoint),
          hasP256dh: Boolean(p256dh),
          hasAuth: Boolean(auth),
        },
      },
      { status: 400 }
    );
  }

  // Write ONLY columns that definitely exist in your table:
  // endpoint, p256dh, auth
  const { error: upsertErr } = await supabase
    .from("push_subscriptions")
    .upsert({ endpoint, p256dh, auth }, { onConflict: "endpoint" });

  if (upsertErr) {
    return NextResponse.json({ error: upsertErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}