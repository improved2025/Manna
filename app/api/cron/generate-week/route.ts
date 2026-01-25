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

function normalizeScriptureRef(s: string) {
  return (s || "").trim().replace(/\s+/g, " ").toLowerCase();
}

function hashStringToInt(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

// 30+ refs so 30-day no-repeat is possible
function scripturePool(): string[] {
  return [
    "Psalm 23:1-3",
    "Psalm 46:1",
    "Psalm 27:1",
    "Psalm 121:1-2",
    "Psalm 62:5-6",
    "Psalm 91:1-2",
    "Psalm 16:8",
    "Psalm 34:17-18",
    "Psalm 37:23-24",
    "Psalm 55:22",
    "Psalm 103:1-5",
    "Psalm 119:105",
    "Proverbs 3:5-6",
    "Proverbs 4:23",
    "Proverbs 16:3",
    "Isaiah 26:3",
    "Isaiah 41:10",
    "Isaiah 40:31",
    "Isaiah 43:2",
    "Isaiah 30:15",
    "Lamentations 3:22-23",
    "Matthew 6:33",
    "Matthew 11:28-30",
    "Matthew 7:7",
    "John 14:27",
    "John 15:4-5",
    "John 16:33",
    "Romans 8:28",
    "Romans 8:31",
    "Romans 12:2",
    "Romans 15:13",
    "1 Corinthians 15:58",
    "2 Corinthians 5:7",
    "2 Corinthians 12:9",
    "Galatians 6:9",
    "Ephesians 6:10",
    "Philippians 4:6-7",
    "Colossians 3:15",
    "Hebrews 10:23",
    "Hebrews 12:1-2",
    "James 1:5",
    "1 Peter 5:7",
    "1 John 4:18",
  ];
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
    "Your pace can be calm and still be obedient.",
    "Let your heart settle before you decide anything heavy.",
    "God’s peace is strong enough to guard your mind.",
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

function buildSeasonMap(fn: (season: Season) => string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const s of SEASONS) map[s] = fn(s);
  return map;
}

// ===== KJV scripture text fetch (server-side, during cron only) =====
async function fetchKjvText(scriptureRef: string) {
  // bible-api expects URL encoded passage and supports translation=kjv
  const url = `https://bible-api.com/${encodeURIComponent(scriptureRef)}?translation=kjv`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch KJV text for ${scriptureRef}: ${res.status}`);
  }

  const json: any = await res.json();

  // Many responses include "text" with verse numbers/newlines.
  const text = (json?.text || "").trim();
  if (!text) throw new Error(`Empty KJV text for ${scriptureRef}`);

  // Clean up excessive whitespace
  return text.replace(/\n{3,}/g, "\n\n").trim();
}

async function fetchRecentScriptureSet(supabase: any, daysBack: number): Promise<Set<string>> {
  const start = addDaysUTC(new Date(), -daysBack);
  const startKey = dayKeyUTC(start);

  const { data, error } = await supabase
    .from("daily_feeds")
    .select("scripture_ref, daykey")
    .gte("daykey", startKey)
    .order("daykey", { ascending: false });

  if (error) throw new Error(`Failed to fetch recent scripture refs: ${error.message}`);

  const set = new Set<string>();
  for (const row of data || []) {
    if (row?.scripture_ref) set.add(normalizeScriptureRef(row.scripture_ref));
  }
  return set;
}

function pickScriptureNoRepeat(params: {
  daykey: string;
  pool: string[];
  recent: Set<string>;
  usedThisRun: Set<string>;
}) {
  const { daykey, pool, recent, usedThisRun } = params;

  const seed = hashStringToInt(daykey);
  const startIndex = seed % pool.length;

  for (let offset = 0; offset < pool.length; offset++) {
    const candidate = pool[(startIndex + offset) % pool.length];
    const norm = normalizeScriptureRef(candidate);

    if (recent.has(norm)) continue;
    if (usedThisRun.has(norm)) continue;

    usedThisRun.add(norm);
    return candidate;
  }

  throw new Error("Scripture pool exhausted for 30-day no-repeat.");
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

    const supabase = createClient(url, service, { auth: { persistSession: false } });

    // Rolling 7-day window
    const start = new Date();
    const daykeys: string[] = [];
    for (let i = 0; i < 7; i++) daykeys.push(dayKeyUTC(addDaysUTC(start, i)));

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

    // 30-day no-repeat scripture
    const recentScriptures = await fetchRecentScriptureSet(supabase, 30);
    const usedThisRun = new Set<string>();
    const pool = scripturePool();

    // Cache bible-api lookups within this cron run
    const kjvCache = new Map<string, string>();

    const rows: any[] = [];

    for (const k of missing) {
      const seed = hashStringToInt(k);

      const scripture_ref = pickScriptureNoRepeat({
        daykey: k,
        pool,
        recent: recentScriptures,
        usedThisRun,
      });

      // Fetch KJV text once per scripture_ref (cached per run)
      let scripture_text = kjvCache.get(scripture_ref);

if (!scripture_text) {
  const fetched = await fetchKjvText(scripture_ref);
  kjvCache.set(scripture_ref, fetched);
  scripture_text = fetched;
}


      const scripture_version = "KJV";

      const exhortation = baseReflection(seed);
      const exhortation_seasons = buildSeasonMap((s) => seasonOpening(s));

      const faith_confession = confessionBase(seed);
      const faith_confession_seasons = buildSeasonMap((s) => confessionSeason(s, seed));

      // Keep your existing prayer model for now (we’ll upgrade voice next)
      const prayer_for_you =
        "May God settle your heart and make His direction clear.\nMay He strengthen you for today.\nIn Jesus’ name.";
      const prayer = prayer_for_you;

      rows.push({
        daykey: k,
        scripture_ref,
        scripture_text,
        scripture_version,
        exhortation,
        exhortation_seasons,
        faith_confession,
        faith_confession_seasons,
        prayer_for_you,
        prayer,
      });
    }

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
