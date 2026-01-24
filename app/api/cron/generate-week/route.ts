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
  // deterministic hash (stable across runs)
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

// Calm, scripture-first pool.
// IMPORTANT: To enforce 30-day no-repeat, pool must be > 30.
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

// Prayer pool (2–3 lines, second person, last line only: In Jesus’ name.)
function prayerPool(): string[] {
  return [
    "May God quiet your thoughts and steady your heart.\nMay His peace guard you through this day.\nIn Jesus’ name.",
    "May the Lord strengthen you where you feel weak.\nMay His help meet you with calm clarity.\nIn Jesus’ name.",
    "May God lift the weight you have been carrying.\nMay you walk today with quiet confidence in Him.\nIn Jesus’ name.",
    "May the Lord guide your decisions without confusion.\nMay wisdom come with peace, not pressure.\nIn Jesus’ name.",
    "May God heal what feels strained inside you.\nMay hope return gently and stay.\nIn Jesus’ name.",
    "May the Lord keep you from fear-driven choices.\nMay faith lead your steps today.\nIn Jesus’ name.",
    "May God give you patience that is strong, not passive.\nMay you wait with trust and stability.\nIn Jesus’ name.",
    "May the Lord refresh your strength and renew your focus.\nMay joy rise quietly within you.\nIn Jesus’ name.",
    "May God protect your mind from anxious spirals.\nMay your heart rest in His care.\nIn Jesus’ name.",
    "May the Lord open the right doors at the right time.\nMay you remain steady and obedient.\nIn Jesus’ name.",
    "May God restore what has been worn down.\nMay you feel His nearness in practical ways today.\nIn Jesus’ name.",
    "May the Lord help you forgive without losing your peace.\nMay your heart remain clean and free.\nIn Jesus’ name.",
    "May God give you courage that is quiet and firm.\nMay you do what is right without strain.\nIn Jesus’ name.",
    "May the Lord bring order to what feels scattered.\nMay your day become simple and clear.\nIn Jesus’ name.",
    "May God strengthen your boundaries and your love.\nMay you stay kind without being pulled off course.\nIn Jesus’ name.",
    "May the Lord settle you where you feel unsettled.\nMay stability return to your thoughts.\nIn Jesus’ name.",
    "May God remind you that you are not alone.\nMay His presence steady you in every moment.\nIn Jesus’ name.",
    "May the Lord guard your words and your tone today.\nMay peace flow through your conversations.\nIn Jesus’ name.",
    "May God help you release control without losing faith.\nMay you rest in His leadership.\nIn Jesus’ name.",
    "May the Lord give you endurance without heaviness.\nMay you finish today with peace.\nIn Jesus’ name.",
    "May God renew your hope where disappointment has lingered.\nMay your heart lift again.\nIn Jesus’ name.",
    "May the Lord protect you from distraction and drift.\nMay your focus remain strong and gentle.\nIn Jesus’ name.",
    "May God bring healing to your inner life.\nMay His love quiet what is restless.\nIn Jesus’ name.",
    "May the Lord lead you step by step.\nMay clarity come without rushing.\nIn Jesus’ name.",
    "May God strengthen your faith when you don’t feel strong.\nMay you remain steady and sure in Him.\nIn Jesus’ name.",
    "May the Lord bring peace into your home and your day.\nMay you carry calm wherever you go.\nIn Jesus’ name.",
    "May God help you let go of what you cannot change.\nMay grace hold you firmly today.\nIn Jesus’ name.",
    "May the Lord revive what feels dull or tired in you.\nMay fresh strength rise quietly.\nIn Jesus’ name.",
    "May God guard you from comparison and discouragement.\nMay you walk in your own grace today.\nIn Jesus’ name.",
    "May the Lord meet you with mercy and direction.\nMay you sense His help as you move.\nIn Jesus’ name.",
    "May God steady your emotions and strengthen your spirit.\nMay peace become your anchor today.\nIn Jesus’ name.",
    "May the Lord help you do the next right thing.\nMay your steps be calm and faithful.\nIn Jesus’ name.",
    "May God bring comfort where you’ve been carrying pain.\nMay your heart breathe again.\nIn Jesus’ name.",
    "May the Lord guard your night and your rest.\nMay you sleep with peace and wake with strength.\nIn Jesus’ name.",
    "May God keep you from worry and fill you with trust.\nMay His peace stay with you today.\nIn Jesus’ name.",
  ];
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

async function fetchRecentPrayerSet(
  supabase: any,
  daysBack: number
): Promise<Set<string>> {
  const start = addDaysUTC(new Date(), -daysBack);
  const startKey = dayKeyUTC(start);

  const { data, error } = await supabase
    .from("daily_feeds")
    .select("prayer_for_you, daykey")
    .gte("daykey", startKey)
    .order("daykey", { ascending: false });

  if (error) throw new Error(`Failed to fetch recent prayers: ${error.message}`);

  const set = new Set<string>();
  for (const row of data || []) {
    if (row?.prayer_for_you) set.add((row.prayer_for_you || "").trim());
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

  throw new Error(
    `Scripture pool exhausted: cannot satisfy 30-day no-repeat. Increase the pool size or reduce the window.`
  );
}

function pickPrayerNoRepeat(params: {
  daykey: string;
  pool: string[];
  recent: Set<string>;
  usedThisRun: Set<string>;
}) {
  const { daykey, pool, recent, usedThisRun } = params;

  const seed = hashStringToInt(daykey);
  const startIndex = seed % pool.length;

  for (let offset = 0; offset < pool.length; offset++) {
    const candidate = pool[(startIndex + offset) % pool.length].trim();

    if (recent.has(candidate)) continue;
    if (usedThisRun.has(candidate)) continue;

    usedThisRun.add(candidate);
    return candidate;
  }

  throw new Error("Prayer pool exhausted: cannot satisfy 30-day no-repeat.");
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

    // Enforce 30-day no-repeat scripture + prayer
    const recentScriptures = await fetchRecentScriptureSet(supabase, 30);
    const usedScripturesThisRun = new Set<string>();
    const scriptureRefs = scripturePool();

    const recentPrayers = await fetchRecentPrayerSet(supabase, 30);
    const usedPrayersThisRun = new Set<string>();
    const prayers = prayerPool();

    const rows = missing.map((k) => {
      // Deterministic per-day variation based on daykey (not index).
      const seed = hashStringToInt(k);

      const scripture_ref = pickScriptureNoRepeat({
        daykey: k,
        pool: scriptureRefs,
        recent: recentScriptures,
        usedThisRun: usedScripturesThisRun,
      });

      const exhortation = baseReflection(seed);

      // season-aware opening lines stored in exhortation_seasons (personalized tone)
      const exhortation_seasons = buildSeasonMap((s) => seasonOpening(s));

      const faith_confession = confessionBase(seed);
      const faith_confession_seasons = buildSeasonMap((s) => confessionSeason(s, seed));

      // Prayer (shared daily content) but varied, no-repeat within 30 days
      const prayer_for_you = pickPrayerNoRepeat({
        daykey: k,
        pool: prayers,
        recent: recentPrayers,
        usedThisRun: usedPrayersThisRun,
      });

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
