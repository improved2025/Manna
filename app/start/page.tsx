"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Season = "Preparation" | "Restoration" | "Waiting" | "Transition" | "Renewal";
type TimePref = "Morning" | "Midday" | "Evening";

const SEASONS: Season[] = ["Preparation", "Restoration", "Waiting", "Transition", "Renewal"];
const TIMES: TimePref[] = ["Morning", "Midday", "Evening"];

export default function StartPage() {
  const router = useRouter();
  const [season, setSeason] = useState<Season>("Waiting");
  const [time, setTime] = useState<TimePref>("Morning");

  useEffect(() => {
    // If already onboarded, go straight to Today
    const s = localStorage.getItem("manna_season");
    const t = localStorage.getItem("manna_time");
    if (s && t) router.replace("/today");
  }, [router]);

  function saveAndContinue() {
    localStorage.setItem("manna_season", season);
    localStorage.setItem("manna_time", time);
    router.replace("/today");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 px-4 py-10">
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-500 text-white flex items-center justify-center font-semibold shadow-sm">
            M
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-slate-900">
            Set your rhythm
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Choose a season and a preferred time. No account. Stored on your device.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Spiritual season
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SEASONS.map((s) => {
                const active = s === season;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSeason(s)}
                    className={
                      "rounded-full px-4 py-2 text-sm border " +
                      (active
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50")
                    }
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Preferred time
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {TIMES.map((t) => {
                const active = t === time;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    className={
                      "rounded-full px-4 py-2 text-sm border " +
                      (active
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50")
                    }
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={saveAndContinue}
            className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 px-5 py-3 text-sm font-medium text-white shadow-sm hover:opacity-95"
          >
            Continue
          </button>

          <p className="text-center text-xs text-slate-500">
            You can change this later by clearing preferences.
          </p>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-slate-600 hover:text-slate-900">
            Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
