"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";
import SurrenderCta from "@/components/SurrenderCta";
import NotificationSoftPrompt from "@/components/NotificationSoftPrompt";
import HeroRotator from "@/components/HeroRotator";
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
        setError(
          "Missing public Supabase environment variables on this deployment."
        );
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

        if (!data) {
          setRow(null);
          setLoading(false);
          return;
        }

        setRow(data as DailyRow);
        setLoading(false);
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message || "Failed to load today’s devotional.");
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [daykey, supabase]);

  const seasonOpening = useMemo(() => getSeasonOpeningLine(season), [season]);

  const exhortationSeasoned =
    row?.exhortation_seasons && row.exhortation_seasons[season]
      ? row.exhortation_seasons[season]
      : null;

  const confessionSeasoned =
    row?.faith_confession_seasons && row.faith_confession_seasons[season]
      ? row.faith_confession_seasons[season]
      : null;

  const reflectionText = [seasonOpening, exhortationSeasoned || row?.exhortation]
    .filter(Boolean)
    .join("\n\n");

  const confessionText = confessionSeasoned || row?.faith_confession || "";

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 animate-page-in">
      <header className="space-y-2">
        <div className="text-sm font-medium text-slate-600">MANNA • {daykey}</div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Today’s Devotional
        </h1>
        <p className="text-base text-slate-700">
          Season: <span className="font-medium text-slate-900">{season}</span>
        </p>

        <div className="pt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="/start"
            className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
          >
            Change season/time
          </a>

          {/* Install CTA (high visibility) */}
          <div className="flex items-start justify-start sm:justify-end">
            <div className="flex flex-col items-start sm:items-end">
              <InstallButton className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-[1px]" />
              <div className="mt-1 text-[11px] font-medium text-slate-600">
                Keep MANNA on your home screen
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="mt-6 space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-0 shadow-sm overflow-hidden motion-soft">
          <div className="relative h-36 sm:h-44 w-full">
            <HeroRotator
              images={[
                "/images/today/today-reflection.jpg",
                "/images/today/today-reflection-1.jpg",
                "/images/today/today-reflection-2.jpg",
                "/images/today/today-reflection-3.jpg",
              ]}
              intervalMs={5200}
              fadeMs={900}
              overlayClassName="bg-black/15"
            />
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-sm text-slate-700">Loading…</div>
            ) : error ? (
              <div className="space-y-2">
                <div className="text-sm font-medium text-slate-900">
                  Something didn’t load
                </div>
                <div className="text-sm text-slate-700">{error}</div>
              </div>
            ) : !row ? (
              <div className="space-y-2">
                <div className="text-sm font-medium text-slate-900">
                  Today’s devotional isn’t available yet.
                </div>
                <div className="text-sm text-slate-700">
                  If this is a new deployment, run the weekly generator (cron) so
                  the next 7 days exist in the database.
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-xs font-medium text-slate-500">
                    Scripture (KJV)
                  </div>
                  <div className="text-lg font-semibold text-slate-900">
                    {row.scripture_ref}
                  </div>

                  {row.scripture_text ? (
                    <div className="mt-3 whitespace-pre-wrap text-base leading-relaxed text-slate-800">
                      {row.scripture_text}
                    </div>
                  ) : (
                    <div className="mt-3 text-sm text-slate-600">
                      Scripture text will appear once today’s content is generated.
                    </div>
                  )}

                  {row.scripture_version ? (
                    <div className="mt-2 text-xs text-slate-500">
                      Text: {row.scripture_version}
                    </div>
                  ) : null}

                  {/* Meditate — PROMINENT & EMERALD */}
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

                <div className="space-y-2">
                  <div className="text-sm font-semibold text-slate-800">
                    Reflection
                  </div>
                  <div className="whitespace-pre-wrap text-base leading-7 text-slate-800">
                    {reflectionText}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-semibold text-slate-800">
                    Faith Confession
                  </div>
                  <div className="whitespace-pre-wrap text-base leading-7 text-slate-800">
                    {confessionText}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-semibold text-slate-800">
                    Prayer for You
                  </div>
                  <div className="whitespace-pre-wrap text-base leading-7 text-slate-800">
                    {row.prayer_for_you || ""}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Secondary install nudge (after devotional) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm motion-soft">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-900">
                Keep this close
              </div>
              <div className="mt-1 text-sm text-slate-700">
                Add MANNA to your home screen for daily Scripture and prayer.
              </div>
            </div>
            <InstallButton className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-[1px]" />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-slate-900 transition-all duration-200 hover:bg-slate-50 hover:-translate-y-[1px]"
          >
            Home
          </a>
          <a
            href="/today"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-3 text-base font-semibold text-white transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-[1px]"
          >
            Refresh
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="order-1 sm:order-none rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-center motion-soft">
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

          <div className="order-2 sm:order-none motion-soft">
            <SurrenderCta />
          </div>
        </div>
      </section>

      <NotificationSoftPrompt delayMs={6000} cooldownDays={4} />
    </main>
  );
}
