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
  // small deterministic hash (stable across runs)
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

// Calm, scripture-first pool.
// IMPORTANT: To enforce 30-day no-repeat, you need a pool > 30.
// This pool is intentionally bigger so repeats are avoidable.
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
    "John 10:10",
    "John 16:33",
    "Romans 8:28",
    "Romans 8:31",
    "Romans 12:2",
    "Romans 15:13",
    "1 Corinthians 15:58",
    "2 Corinthians 5:7",
    "2 Corinthians 12:9",
    "Galatians 6:9",
    "Ephesians 3:20",
    "Ephesians 6:10",
    "Philippians 4:6-7",
    "Philippians 4:13",
    "Colossians 3:15",
    "Colossians 3:2",
    "1 Thessalonians 5:24",
    "2 Thessalonians 3:3",
    "Hebrews 10:23",
    "Hebrews 4:16",
    "Hebrews 12:1-2",
    "James 1:5",
    "James 1:2-4",
    "1 Peter 5:7",
    "1 Peter 2:9",
    "1 John 4:18",
    "1 John 5:14",
    "Jude 1:24",
  ];
}

// Calm, scripture-first reflection lines. Keep short and grounded.
function baseReflection(i: number): string {
  const lines = [
    "God does not rush you. He leads you.",
    "Peace grows when trust becomes your default response.",
    "Obedience is often quiet, but it is never small.",
    "God can strengthen you without changing the room you’re in.",
    "What God is forming in you matters as much as what He is doing for you.",
    "Grace gives you steadiness, not performance pressure.",
    "You are not carried by your feelings. You are carried by God.",
    "God’s presence is not a mood. It is a reality.",
    "Small steps with God still move you forward.",
    "You don’t need to force clarity. Stay faithful and stay close.",
    "God is not fragile. Bring Him the truth of your heart.",
    "Even here, God can hold you steady.",
    "Your pace can be calm and still be obedient.",
    "When you don’t know what to do next, stay with what you know is true.",
    "Peace is not the absence of trouble. It is the presence of God in trouble.",
    "God can restore without making noise.",
    "You can be calm and still be strong.",
    "Let today be simple: trust, obey, and keep moving.",
    "God’s help is not late. It arrives with purpose.",
    "You are not behind when God is leading.",
    "God’s guidance often feels like quiet confidence, not loud urgency.",
    "The Lord can carry what you cannot fix today.",
    "You can release control without losing responsibility.",
    "God’s wisdom is available without shame.",
    "God is faithful even when your strength feels small.",
    "God can give you clarity one step at a time.",
    "Let your heart settle before you decide anything heavy.",
    "You can wait without wasting your life.",
    "Trust doesn’t mean you feel nothing. It means you keep walking anyway.",
    "God can renew you without changing your personality.",
    "Your life is not held together by your effort alone.",
    "You can breathe again. God is still God.",
    "God’s peace is strong enough to guard your mind.",
    "Today is not too small for God to be present in it.",
    "You are allowed to slow down and still be faithful.",
    "God’s love does not fluctuate with your performance.",
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
    "I will not be driven by anxiety. I will be led by God.",
    "I receive grace for today’s steps.",
    "I am not alone. God is with me.",
    "I will not rush. I will remain steady.",
    "I will hold to hope with a quiet heart.",
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

async function fetchRecentScriptureSet(
  supabase: any,
  daysBack: number
): Promise<Set<string>> {
  // We store daykeys as YYYY-MM-DD, so we can query by range.
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

  // Scan the pool starting from a deterministic index until we find an allowed ref.
  for (let offset = 0; offset < pool.length; offset++) {
    const candidate = pool[(startIndex + offset) % pool.length];
    const norm = normalizeScriptureRef(candidate);

    if (recent.has(norm)) continue;       // used in last 30 days
    if (usedThisRun.has(norm)) continue;  // already chosen for another missing day in this run

    usedThisRun.add(norm);
    return candidate;
  }

  // If we get here, the pool is too small vs no-repeat window.
  // We fail loudly so you don't silently ship duplicate scripture.
  throw new Error(
    `Scripture pool exhausted: cannot satisfy 30-day no-repeat. Increase the pool size or reduce the window.`
  );
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

    // --- NEW: Enforce 30-day no-repeat scripture_ref ---
    const recentScriptures = await fetchRecentScriptureSet(supabase, 30);
    const usedThisRun = new Set<string>();
    const pool = scripturePool();

    const rows = missing.map((k) => {
      // Make per-day variation deterministic by daykey (not by index-in-window).
      const seed = hashStringToInt(k);

      const scripture_ref = pickScriptureNoRepeat({
        daykey: k,
        pool,
        recent: recentScriptures,
        usedThisRun,
      });

      // This keeps content calm + varies across days without reusing the same “slot”
      const exhortation = baseReflection(seed);

      // season-aware opening lines stored in exhortation_seasons
      const exhortation_seasons = buildSeasonMap((s) => seasonOpening(s));

      const faith_confession = confessionBase(seed);
      const faith_confession_seasons = buildSeasonMap((s) => confessionSeason(s, seed));

      // IMPORTANT: daily devotional is shared for all users.
      // We'll rotate a calm prayer per day (still second-person), not tied to user season.
      const prayerSeason = SEASONS[seed % SEASONS.length];
      const prayer_for_you = prayerForYou(prayerSeason);

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
      no_repeat_window_days: 30,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Cron failed" },
      { status: 500 }
    );
  }
}
