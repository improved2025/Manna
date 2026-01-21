import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Season = "Preparation" | "Restoration" | "Waiting" | "Transition" | "Renewal";
const SEASONS: Season[] = [
  "Preparation",
  "Restoration",
  "Waiting",
  "Transition",
  "Renewal",
];

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function getBearer(req: Request) {
  const h = req.headers.get("authorization") || "";
  const m = h.match(/^Bearer\s+(.+)$/i);
  return m ? m[1].trim() : null;
}

function dayKeyUTC(d: Date) {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDaysUTC(d: Date, days: number) {
  const x = new Date(d);
  x.setUTCDate(x.getUTCDate() + days);
  return x;
}

// Calm, scripture-first content. No hype.
function generateScriptureRef(i: number): string {
  const refs = [
    "Psalm 23:1-3",
    "Isaiah 41:10",
    "Matthew 11:28-30",
    "Philippians 4:6-7",
    "Proverbs 3:5-6",
    "Romans 8:28",
    "2 Corinthians 5:7",
    "Psalm 46:1",
    "John 15:4-5",
    "Hebrews 10:23",
  ];
  return refs[i % refs.length];
}

function baseReflection(i: number): string {
  const lines = [
    "God does not rush you. He leads you.",
    "Peace grows when trust becomes your default response.",
    "Obedience is often quiet, but it is never small.",
    "God can strengthen you without changing the room you’re in.",
    "What God is forming in you matters as much as what He is doing for you.",
    "Grace gives you steadiness, not performance pressure.",
    "You are not carried by your feelings. You are carried by God.",
  ];
  return lines[i % lines.length];
}

function seasonOpening(season: Season): string {
  switch (season) {
    case "Preparation":
      return "Let today be a day of quiet shaping.";
    case "Restoration":
      return "Let today be a day of rebuilding and repair.";
    case "Waiting":
      return "Let today be a day of steady trust while you wait.";
    case "Transition":
      return "Let today be a day of stability while you move forward.";
    case "Renewal":
      return "Let today be a day of fresh strength and clear direction.";
  }
}

function confessionBase(i: number): string {
  const lines = [
    "I walk by faith, not by sight.",
    "I am kept by the peace of God.",
    "I choose trust over fear today.",
    "I am guided by God’s wisdom and timing.",
    "I am strengthened to obey with a willing heart.",
  ];
  return lines[i % lines.length];
}

function confessionSeason(season: Season, i: number): string {
  switch (season) {
    case "Preparation":
      return "I receive God’s shaping, and I will not resist His process.";
    case "Restoration":
      return "I receive God’s restoring work, and I will not lose heart.";
    case "Waiting":
      return "I will wait with trust, and I will not panic or drift.";
    case "Transition":
      return "I move forward with God, and I will not be unstable.";
    case "Renewal":
      return "I receive fresh strength, and I will walk in newness today.";
    default:
      return confessionBase(i);
  }
}

// 2–3 lines, second person, last line only: In Jesus’ name.
function prayerForYou(season: Season): string {
  switch (season) {
    case "Preparation":
      return "May God settle your heart and make His direction clear.\nMay He prepare you with strength and wisdom.\nIn Jesus’ name.";
    case "Restoration":
      return "May God repair what has been strained and restore what has been lost.\nMay your hope be renewed with steady peace.\nIn Jesus’ name.";
    case "Waiting":
      return "May God keep you anchored while you wait, without anxiety or strain.\nMay patience be filled with confidence in Him.\nIn Jesus’ name.";
    case "Transition":
      return "May God steady your steps as you move into what’s next.\nMay He guide you with clarity and calm courage.\nIn Jesus’ name.";
    case "Renewal":
      return "May God refresh your strength and renew your focus today.\nMay your spirit be lifted with quiet confidence.\nIn Jesus’ name.";
  }
}

function buildSeasonMap(fn: (season: Season) => string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const s of SEASONS) map[s] = fn(s);
  return map;
}

export async function GET(req: Request) {
  try {
    const secret = mustEnv("CRON_SECRET");
    const token = getBearer(req) || new URL(req.url).searchParams.get("secret");

    if (!token || token !== secret) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const url = mustEnv("NEXT_PUBLIC_SUPABASE_URL");
    const service = mustEnv("SUPABASE_SERVICE_ROLE_KEY");

    const supabase = createClient(url, service, {
      auth: { persistSession: false },
    });

    // Generate 7 days starting today (UTC daykey).
    const start = new Date();
    const daykeys: string[] = [];
    for (let i = 0; i < 7; i++) daykeys.push(dayKeyUTC(addDaysUTC(start, i)));

    // Find existing rows
    const { data: existing, error: existErr } = await supabase
      .from("daily_feeds")
      .select("daykey")
      .in("daykey", daykeys);

    if (existErr) {
      return NextResponse.json({ ok: false, error: existErr.message }, { status: 500 });
    }

    const existingSet = new Set((existing || []).map((r: any) => r.daykey));
    const missing = daykeys.filter((k) => !existingSet.has(k));

    if (missing.length === 0) {
      return NextResponse.json({ ok: true, inserted: 0, days: daykeys });
    }

    const rows = missing.map((k) => {
      const i = daykeys.indexOf(k);

      const scripture_ref = generateScriptureRef(i);
      const exhortation = baseReflection(i);

      // season-aware opening lines stored in exhortation_seasons
      const exhortation_seasons = buildSeasonMap((s) => seasonOpening(s));

      const faith_confession = confessionBase(i);
      const faith_confession_seasons = buildSeasonMap((s) => confessionSeason(s, i));

      // Store one display prayer in prayer_for_you (locked model).
      const prayer_for_you = prayerForYou("Preparation");

      // CRITICAL: prayer is NOT NULL. Copy prayer_for_you -> prayer.
      const prayer = prayer_for_you;

      return {
        daykey: k,
        scripture_ref,
        exhortation,
        exhortation_seasons,
        faith_confession,
        faith_confession_seasons,
        prayer_for_you,
        prayer,
      };
    });

    const { error: insErr } = await supabase.from("daily_feeds").insert(rows);

    if (insErr) {
      return NextResponse.json({ ok: false, error: insErr.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      inserted: rows.length,
      inserted_days: rows.map((r) => r.daykey),
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Cron failed" }, { status: 500 });
  }
}
