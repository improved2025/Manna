"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";
import SurrenderCta from "@/components/SurrenderCta";
import NotificationSoftPrompt from "@/components/NotificationSoftPrompt";

type Season =
  | "Preparation"
  | "Restoration"
  | "Waiting"
  | "Transition"
  | "Renewal";

type DailyRow = {
  daykey: string;
  scripture_ref: string;
  scripture_text: string | null;
  scripture_version: string | null;
  exhortation: string | null;
  exhortation_seasons: Record<string, string> | null;
  faith_confession: string | null;
  faith_confession_seasons: Record<string, string> | null;
  prayer_for_you: string | null;
  created_at: string | null;
};

function safeGetLS(key: string): string | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function getLocalDayKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function normalizeSeason(raw: string | null): Season {
  const cleaned = (raw || "").trim();
  const allowed: Season[] = [
    "Preparation",
    "Restoration",
    "Waiting",
    "Transition",
    "Renewal",
  ];
  if (allowed.includes(cleaned as Season)) return cleaned as Season;
  return "Preparation";
}

function getSeasonOpeningLine(season: Season) {
  switch (season) {
    case "Preparation":
      return "Today, let God shape you quietly and clearly.";
    case "Restoration":
      return "Today, let God rebuild what has been worn down.";
    case "Waiting":
      return "Today, let patience stay anchored in trust.";
    case "Transition":
      return "Today, let God steady you between what was and what’s next.";
    case "Renewal":
      return "Today, let God refresh what needs new strength.";
    default:
      return "Today, walk with God one step at a time.";
  }
}

function makeSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  return createClient(url, anon, { auth: { persistSession: false } });
}

export default function TodayPage() {
  const [season, setSeason] = useState<Season>("Preparation");
  const [daykey, setDaykey] = useState<string>(() =>
    getLocalDayKey(new Date())
  );
  const [loading, setLoading] = useState(true);
  const [row, setRow] = useState<DailyRow | null>(null);
  const [error, setError] = useState<string | null>(null);

  const supabase = useMemo(() => makeSupabaseClient(), []);

  useEffect(() => {
    const s = safeGetLS("manna_season") || safeGetLS("season");
    setSeason(normalizeSeason(s));
    setDaykey(getLocalDayKey(new Date()));
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      setRow(null);

      if (!supabase) {
        setError("Missing Supabase environment variables.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("daily_feeds")
        .select("*")
        .eq("daykey", daykey)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setRow(data as DailyRow);
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [daykey, supabase]);

  const seasonOpening = useMemo(
    () => getSeasonOpeningLine(season),
    [season]
  );

  const reflectionText = [seasonOpening, row?.exhortation]
    .filter(Boolean)
    .join("\n\n");

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 animate-page-in">
      <section className="mt-6 space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden motion-soft">
          <div className="relative h-36 sm:h-44 w-full">
            <div
              className="absolute inset-0 bg-cover bg-center manna-hero-motion"
              style={{
                backgroundImage: "url(/images/today/today-reflection.jpg)",
              }}
            />
            <div className="absolute inset-0 bg-black/15" />
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-sm text-slate-700">Loading…</div>
            ) : error ? (
              <div className="text-sm text-slate-700">{error}</div>
            ) : row ? (
              <div className="space-y-6">
                {/* Scripture */}
                <div>
                  <div className="text-xs font-medium text-slate-500">
                    Scripture (KJV)
                  </div>
                  <div className="text-lg font-semibold text-slate-900">
                    {row.scripture_ref}
                  </div>

                  {row.scripture_text && (
                    <div className="mt-3 whitespace-pre-wrap text-base leading-relaxed text-slate-800">
                      {row.scripture_text}
                    </div>
                  )}

                  {/* Meditate — PROMINENT */}
                  <div className="mt-5">
                    <a
                      href="/meditation"
                      className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-[1px]"
                    >
                      Meditate
                    </a>
                    <div className="mt-2 text-sm text-slate-700">
                      Sit with this Scripture for a quiet moment.
                    </div>
                  </div>
                </div>

                {/* Reflection */}
                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    Reflection
                  </div>
                  <div className="whitespace-pre-wrap text-base leading-7 text-slate-800">
                    {reflectionText}
                  </div>
                </div>

                {/* Prayer for You */}
                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    Prayer for You
                  </div>
                  <div className="whitespace-pre-wrap text-base leading-7 text-slate-800">
                    {row.prayer_for_you}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Help + Surrender */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-center motion-soft">
            <a
              href="/help"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-[1px] uppercase"
            >
              I NEED HELP
            </a>
            <div className="mt-2 text-sm text-slate-700">
              Choose how you feel. Get a steady word for this moment.
            </div>
          </div>

          <SurrenderCta />
        </div>
      </section>

      <NotificationSoftPrompt delayMs={6000} cooldownDays={4} />
    </main>
  );
}
