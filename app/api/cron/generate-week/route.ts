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

function confessionSeason(season: Season): string {
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
  }
}

function buildSeasonMap(fn: (season: Season) => string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const s of SEASONS) map[s] = fn(s);
  return map;
}

// ===== KJV scripture text fetch (server-side, during cron only) =====
async function fetchKjvText(scriptureRef: string) {
  const url = `https://bible-api.com/${encodeURIComponent(scriptureRef)}?translation=kjv`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch KJV text for ${scriptureRef}: ${res.status}`);
  }

  const json: any = await res.json();
  const text = (json?.text || "").trim();
  if (!text) throw new Error(`Empty KJV text for ${scriptureRef}`);

  return text.replace(/\n{3,}/g, "\n\n").trim();
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

  if (error)
    throw new Error(`Failed to fetch recent scripture refs: ${error.message}`);

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

// ===== Scripture-derived exhortation + confession =====

function detectTheme(text: string): {
  theme:
    | "peace"
    | "fear"
    | "trust"
    | "strength"
    | "wisdom"
    | "guidance"
    | "rest"
    | "love"
    | "endurance"
    | "general";
} {
  const t = (text || "").toLowerCase();

  const has = (re: RegExp) => re.test(t);

  if (has(/\b(fear|afraid|terrified)\b/)) return { theme: "fear" };
  if (has(/\bpeace\b/) || has(/\bquiet\b/)) return { theme: "peace" };
  if (has(/\btrust\b/) || has(/\bfaith\b/) || has(/\bbelieve\b/)) return { theme: "trust" };
  if (has(/\bstrength\b/) || has(/\bstrong\b/) || has(/\brenew\b/) || has(/\bendure\b/))
    return { theme: "strength" };
  if (has(/\bwisdom\b/) || has(/\bunderstanding\b/) || has(/\bguide\b/) || has(/\bdirect\b/))
    return { theme: "wisdom" };
  if (has(/\bpath\b/) || has(/\bway\b/) || has(/\blead\b/) || has(/\blight\b/))
    return { theme: "guidance" };
  if (has(/\brest\b/) || has(/\bcome unto me\b/) || has(/\byoke\b/)) return { theme: "rest" };
  if (has(/\blove\b/) || has(/\bperfect love\b/)) return { theme: "love" };
  if (has(/\bwait\b/) || has(/\bpatient\b/) || has(/\bhope\b/)) return { theme: "endurance" };

  return { theme: "general" };
}

function buildExhortationFromScripture(scriptureText: string, seed: number): string {
  const { theme } = detectTheme(scriptureText);

  const variants: Record<string, string[]> = {
    peace: [
      "This Scripture is showing you where peace is found, not asking you to manufacture it.",
      "Peace here is not avoidance. It is a guard over your mind and heart.",
      "This passage leads you into steadiness. Peace becomes your anchor, not your mood.",
    ],
    fear: [
      "This Scripture confronts fear at the root and calls you back to God’s presence.",
      "The emphasis here is not your bravery. It is God’s nearness and help.",
      "Fear weakens when you stop facing life alone. This passage invites you to trust God’s support.",
    ],
    trust: [
      "This Scripture calls you to lean the weight of your life on God’s faithfulness.",
      "Trust here is choosing God’s way over anxious shortcuts.",
      "This passage teaches you to rest your decisions in God’s character.",
    ],
    strength: [
      "This Scripture teaches that strength is received, not forced.",
      "The point is not pushing harder. It is being renewed by God.",
      "Strength here is steady endurance, not emotional intensity.",
    ],
    wisdom: [
      "This Scripture shows you that clarity comes from God, not from rushing.",
      "Wisdom here is practical. It shapes your next step, not just your thoughts.",
      "This passage teaches you to ask and receive direction without panic.",
    ],
    guidance: [
      "This Scripture is about direction. God leads step by step, not all at once.",
      "Guidance here is steady and practical. It keeps you from drifting.",
      "This passage reminds you that God can direct your steps with clarity.",
    ],
    rest: [
      "This Scripture is an invitation into rest, not a demand for performance.",
      "The point here is relief. God’s yoke is not crushing.",
      "This passage teaches you to come to God before you collapse under weight.",
    ],
    love: [
      "This Scripture anchors you in love that drives out fear, not love that flatters you.",
      "The point is freedom. Love stabilizes the heart and clears the mind.",
      "This passage teaches you that love is a foundation, not a feeling you chase.",
    ],
    endurance: [
      "This Scripture teaches you how to wait without weakening inside.",
      "The point is steady hope. Waiting is not wasted when God is leading.",
      "This passage helps you hold the line with patience and trust.",
    ],
    general: [
      "This Scripture gives you something stable to stand on today.",
      "This passage calls you back to simple obedience and trust.",
      "This Scripture points you to a steady walk with God, not a busy spiritual life.",
    ],
  };

  const list = variants[theme] || variants.general;
  const line = list[seed % list.length];

  const applications = [
    "Carry it into your day by obeying one clear step, calmly.",
    "Let it settle in you before you respond to anything urgent.",
    "Take it seriously, but take it quietly. God is leading you.",
  ];

  return `${line} ${applications[(seed + 1) % applications.length]}`;
}

function buildConfessionFromScripture(scriptureText: string, season: Season, seed: number): string {
  const { theme } = detectTheme(scriptureText);

  const themed: Record<string, string[]> = {
    peace: [
      "I receive the peace of God, and my mind is guarded today.",
      "I will not be pulled into anxiety. God’s peace rules my heart.",
    ],
    fear: [
      "I will not fear. God is with me and helps me today.",
      "Fear will not drive my decisions. God strengthens and upholds me.",
    ],
    trust: [
      "I trust God with my steps, and I will not rush ahead of Him.",
      "I lean on God’s faithfulness, and I will not drift into worry.",
    ],
    strength: [
      "I receive strength from God, and I will not collapse under pressure.",
      "God renews my strength today, and I will finish well.",
    ],
    wisdom: [
      "God gives me wisdom for today, and I will not be confused.",
      "I receive clear direction, and I will not move in panic.",
    ],
    guidance: [
      "God directs my steps, and I will not be misled.",
      "The Lord leads me clearly, and I walk forward with peace.",
    ],
    rest: [
      "I come to God for rest, and I will not carry heavy burdens alone.",
      "I receive relief from God, and my heart is settled today.",
    ],
    love: [
      "God’s love anchors me, and fear loses its hold on me.",
      "I live from God’s love, and my heart remains steady.",
    ],
    endurance: [
      "I wait with trust, and I will not grow weary.",
      "My hope stays firm. God is working even while I wait.",
    ],
    general: [
      "I walk with God today, steady and obedient.",
      "I will not be distracted. I stay aligned with God’s truth.",
    ],
  };

  const list = themed[theme] || themed.general;
  const base = list[seed % list.length];
  const seasonal = confessionSeason(season);

  return `${base} ${seasonal}`;
}

// ===== Prayer: prophetic voice (80/20) + 30-day no-repeat =====

function prayerPool80_20(): string[] {
  return [
    // Declarative
    "Today, peace settles your mind and steadies your heart.\nYou will not be driven by fear or confusion.\nIn Jesus’ name.",
    "Grace is carrying you through this day with quiet strength.\nWhat felt heavy will not crush you.\nIn Jesus’ name.",
    "The Lord is giving you clarity for the next step.\nYou will not move in panic or pressure.\nIn Jesus’ name.",
    "Strength is rising in you where you felt worn down.\nYou will finish this day with peace.\nIn Jesus’ name.",
    "God is ordering your thoughts and calming your inner life.\nYou will not be ruled by anxiety.\nIn Jesus’ name.",
    "You are being helped today, even in small moments.\nGod’s hand will steady you and guide you.\nIn Jesus’ name.",
    "Peace will guard you in conversations and decisions.\nYour words will be wise and calm.\nIn Jesus’ name.",
    "The Lord is restoring steadiness to your emotions.\nYou will not be unstable or overwhelmed.\nIn Jesus’ name.",
    "God is strengthening your obedience without strain.\nYou will do the next right thing with calm courage.\nIn Jesus’ name.",
    "You will not be pulled off course today.\nGod will keep you focused and protected.\nIn Jesus’ name.",
    "The Lord is renewing your hope quietly.\nDiscouragement will not have the final word.\nIn Jesus’ name.",
    "God is healing what has been stretched and strained.\nYou will breathe again with peace.\nIn Jesus’ name.",
    "You are not behind when God is leading.\nHe will guide your pace and keep you steady.\nIn Jesus’ name.",
    "Wisdom is being released to you for today.\nConfusion will not cling to your mind.\nIn Jesus’ name.",
    "The Lord is giving you endurance without heaviness.\nYou will not quit or drift.\nIn Jesus’ name.",
    "God is settling your heart before you decide anything heavy.\nYou will move with peace, not pressure.\nIn Jesus’ name.",

    // Intercessory (20% ish)
    "May God quiet your thoughts and steady your heart.\nMay His peace guard you through this day.\nIn Jesus’ name.",
    "May the Lord guide your decisions without confusion.\nMay wisdom come with peace, not pressure.\nIn Jesus’ name.",
    "May God steady your steps as you move forward.\nMay clarity come one step at a time.\nIn Jesus’ name.",
    "May the Lord renew your strength and refresh your focus.\nMay you finish today with peace.\nIn Jesus’ name.",
  ];
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

    // Scripture no-repeat
    const recentScriptures = await fetchRecentScriptureSet(supabase, 30);
    const usedThisRun = new Set<string>();
    const pool = scripturePool();

    // Prayer no-repeat
    const recentPrayers = await fetchRecentPrayerSet(supabase, 30);
    const usedPrayersThisRun = new Set<string>();
    const prayerPool = prayerPool80_20();

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

      // KJV text (cached per run)
      let scripture_text = kjvCache.get(scripture_ref);
      if (!scripture_text) {
        const fetched = await fetchKjvText(scripture_ref);
        kjvCache.set(scripture_ref, fetched);
        scripture_text = fetched;
      }
      const scriptureText = scripture_text as string;

      const scripture_version = "KJV";

      // Scripture-derived exhortation + confession
      const exhortation = buildExhortationFromScripture(scriptureText, seed);
      const exhortation_seasons = buildSeasonMap((s) => {
  const opener = seasonOpening(s);
  return `${opener} ${exhortation}`;
});

      const faith_confession = buildConfessionFromScripture(scriptureText, "Preparation", seed);
      const faith_confession_seasons = buildSeasonMap((s) =>
        buildConfessionFromScripture(scriptureText, s, seed)
      );

      const prayer_for_you = pickPrayerNoRepeat({
        daykey: k,
        pool: prayerPool,
        recent: recentPrayers,
        usedThisRun: usedPrayersThisRun,
      });

      const prayer = prayer_for_you;

      rows.push({
        daykey: k,
        scripture_ref,
        scripture_text: scriptureText,
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
