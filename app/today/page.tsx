"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";
import SurrenderCta from "@/components/SurrenderCta";
import NotificationSoftPrompt from "@/components/NotificationSoftPrompt";
import InstallButton from "@/components/InstallButton";

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
  const [daykey, setDaykey] = useState<string>(() => getLocalDayKey(new Date()));
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
        setLoading(false);
        setError("Missing Supabase env vars.");
        return;
      }

      try {
        const { data, error: qErr } = await supabase
          .from("daily_feeds")
          .select(
            "daykey, scripture_ref, scripture_text, scripture_version, exhortation, exhortation_seasons, faith_confession, faith_confession_seasons, prayer_for_you, created_at"
          )
          .eq("daykey", daykey)
          .maybeSingle();

        if (cancelled) return;

        if (qErr) {
          setError(qErr.message);
          setLoading(false);
          return;
        }

        setRow(data || null);
        setLoading(false);
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message || "Failed to load.");
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [daykey, supabase]);

  const seasonOpening = useMemo(() => getSeasonOpeningLine(season), [season]);

  const reflectionText = [seasonOpening, row?.exhortation]
    .filter(Boolean)
    .join("\n\n");

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 animate-page-in">
      <header className="space-y-2">
        <div className="text-sm font-medium text-slate-600">
          MANNA • {daykey}
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Today’s Devotional
        </h1>

        <p className="text-base text-slate-700">
          Season: <span className="font-medium text-slate-900">{season}</span>
        </p>

        <a
          href="/start"
          className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
        >
          Change season/time
        </a>
      </header>

      <section className="mt-6 space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">

          {/* VIDEO HERO – FIXED */}
          <div className="relative h-56 sm:h-64 w-full bg-black">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-contain"
            >
              <source src="/videos/today-calm.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-sm text-slate-700">Loading…</div>
            ) : error ? (
              <div className="text-sm text-slate-700">{error}</div>
            ) : !row ? (
              <div className="text-sm text-slate-700">No devotional yet.</div>
            ) : (
              <>
                <div className="text-xs font-medium text-slate-500">
                  Scripture (KJV)
                </div>

                <div className="text-lg font-semibold text-slate-900">
                  {row.scripture_ref}
                </div>

                <div className="mt-3 whitespace-pre-wrap text-base leading-relaxed text-slate-800">
                  {row.scripture_text}
                </div>

                <div className="mt-5">
                  <a
                    href="/meditation"
                    className="inline-flex rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-800"
                  >
                    Meditate
                  </a>

                  <div className="mt-2 text-sm text-slate-700">
                    Sit with this Scripture for a quiet moment.
                  </div>

                  <div className="mt-4">
                    <InstallButton />
                  </div>
                </div>

                <div className="mt-6 whitespace-pre-wrap text-base leading-7 text-slate-800">
                  {reflectionText}
                </div>

                <div className="mt-6 whitespace-pre-wrap text-base leading-7 text-slate-800">
                  {row.prayer_for_you}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <a
            href="/help"
            className="rounded-xl bg-emerald-700 px-6 py-3 text-center text-sm font-semibold text-white"
          >
            I NEED HELP
          </a>

          <SurrenderCta />
        </div>
      </section>

      <NotificationSoftPrompt delayMs={6000} cooldownDays={4} />
    </main>
  );
}
