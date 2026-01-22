"use client";

import { useEffect, useMemo, useState } from "react";

type Season = "Preparation" | "Restoration" | "Waiting" | "Transition" | "Renewal";
type TimePref = "Morning" | "Afternoon" | "Evening" | "Anytime";

const SEASONS: Season[] = [
  "Preparation",
  "Restoration",
  "Waiting",
  "Transition",
  "Renewal",
];

const TIMES: TimePref[] = ["Morning", "Afternoon", "Evening", "Anytime"];

function safeGetLS(key: string): string | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetLS(key: string, value: string) {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

export default function StartPage() {
  const [season, setSeason] = useState<Season>("Preparation");
  const [time, setTime] = useState<TimePref>("Morning");
  const [ready, setReady] = useState(false);

  const existingSeason = useMemo(() => {
    return safeGetLS("manna_season") || safeGetLS("season");
  }, []);

  const existingTime = useMemo(() => {
    return safeGetLS("manna_time") || safeGetLS("time");
  }, []);

  useEffect(() => {
    // Hydrate from localStorage (client-only).
    if (existingSeason && SEASONS.includes(existingSeason as Season)) {
      setSeason(existingSeason as Season);
    }
    if (existingTime && TIMES.includes(existingTime as TimePref)) {
      setTime(existingTime as TimePref);
    }
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSave() {
    // Store both key variants for compatibility with existing logic.
    safeSetLS("manna_season", season);
    safeSetLS("season", season);

    safeSetLS("manna_time", time);
    safeSetLS("time", time);

    // Navigate without using next/navigation to keep this dead simple/stable.
    window.location.href = "/today";
  }

  if (!ready) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-14">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm text-slate-700">Loading…</div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-14">
      <header className="space-y-2">
        <div className="text-xs text-slate-500">MANNA</div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Choose your season and preferred time
        </h1>
        <p className="text-sm leading-relaxed text-slate-700">
          This helps frame today’s devotional without making anything invasive.
        </p>
      </header>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-900">Season</div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SEASONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSeason(s)}
                  className={[
                    "rounded-xl border px-4 py-3 text-left text-sm",
                    s === season
                      ? "border-emerald-700 bg-emerald-50 text-slate-900"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-900">Time</div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {TIMES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  className={[
                    "rounded-xl border px-4 py-3 text-center text-sm",
                    t === time
                      ? "border-emerald-700 bg-emerald-50 text-slate-900"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onSave}
              className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
            >
              Save & Continue
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
            >
              Back
            </a>
          </div>

          <div className="text-xs text-slate-500">
            Stored only on this device (localStorage). No sign-in.
          </div>
        </div>
      </section>
    </main>
  );
}
