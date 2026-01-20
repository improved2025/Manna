"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

type DailyFeed = {
  id: string;
  daykey: string;
  scripture_ref: string;
  exhortation: string;
  prayer: string;
};

function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function readPrefs() {
  const season = localStorage.getItem("manna_season");
  const time = localStorage.getItem("manna_time");
  return { season, time };
}

export default function TodayPage() {
  const router = useRouter();
  const todayKey = useMemo(() => getTodayKey(), []);

  const [data, setData] = useState<DailyFeed | null>(null);
  const [loading, setLoading] = useState(true);

  const [season, setSeason] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    // Enforce onboarding
    const prefs = readPrefs();
    if (!prefs.season || !prefs.time) {
      router.replace("/start");
      return;
    }
    setSeason(prefs.season);
    setTime(prefs.time);
  }, [router]);

  useEffect(() => {
    async function fetchToday() {
      setLoading(true);

      const { data, error } = await supabaseBrowser
        .from("daily_feeds")
        .select("*")
        .eq("daykey", todayKey)
        .limit(1);

      if (error) {
        console.error("Supabase error:", error.message);
        setData(null);
      } else {
        setData(data && data.length > 0 ? data[0] : null);
      }

      setLoading(false);
    }

    fetchToday();
  }, [todayKey]);

  return (
    <main className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto max-w-xl space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Today</h1>
          <p className="text-sm text-gray-500">{todayKey}</p>

          {season && time && (
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-600">
              <span className="font-medium">{season}</span>
              <span className="text-gray-400">·</span>
              <span>{time}</span>
            </div>
          )}
        </header>

        {loading && (
          <div className="rounded-xl border bg-gray-50 p-6 text-center text-sm text-gray-600">
            Preparing today’s portion…
          </div>
        )}

        {!loading && !data && (
          <div className="rounded-xl border bg-gray-50 p-6 text-center space-y-2">
            <p className="font-medium text-gray-800">
              Today’s portion isn’t available yet.
            </p>
            <p className="text-sm text-gray-600">
              This usually means today’s devotional hasn’t been generated yet.
            </p>
            <p className="text-xs text-gray-400">Looking for: {todayKey}</p>
          </div>
        )}

        {!loading && data && (
          <div className="rounded-xl border p-7 space-y-6">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Scripture (NKJV reference)
              </p>
              <p className="text-lg font-semibold leading-snug text-gray-900">
                {data.scripture_ref}
              </p>
            </div>

            <div className="border-t" />

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Reflection
              </p>
              <p className="leading-relaxed text-gray-800 whitespace-pre-line">
                {data.exhortation}
              </p>
            </div>

            <div className="border-t" />

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Prayer
              </p>
              <p className="leading-relaxed italic text-gray-800 whitespace-pre-line">
                {data.prayer}
              </p>
              <p className="text-xs text-gray-400">
                Keep it simple. Return tomorrow.
              </p>
            </div>
          </div>
        )}

        <div className="text-center">
          <a href="/" className="text-sm text-gray-600 hover:text-gray-900">
            Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
