"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function PrayerPage() {
  const [prayer, setPrayer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);

  const canSubmit = useMemo(() => prayer.trim().length >= 3, [prayer]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);

    if (!canSubmit) return;

    // Intentionally quiet: no network, no promises, no fanfare.
    setSubmitted(true);
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 animate-page-in">
      <header className="space-y-2">
        <div className="text-sm font-medium text-slate-600">MANNA</div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Bring This Before God
        </h1>
        <p className="text-base leading-relaxed text-slate-700">
          You don’t need perfect words. You don’t need to explain everything.
          God already knows your heart. This is simply a place to place the
          burden down.
        </p>
      </header>

      <section className="mt-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm motion-soft">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="prayer"
                  className="block text-sm font-semibold text-slate-900"
                >
                  Your prayer
                </label>
                <textarea
                  id="prayer"
                  name="prayer"
                  value={prayer}
                  onChange={(e) => setPrayer(e.target.value)}
                  onBlur={() => setTouched(true)}
                  rows={8}
                  placeholder="Write freely. This is between you and God."
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base leading-relaxed text-slate-900 shadow-sm outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
                />
                {touched && !canSubmit ? (
                  <p className="mt-2 text-sm text-slate-600">
                    Write a few words, even if it’s short.
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-[1px] disabled:opacity-60 disabled:hover:translate-y-0"
                disabled={!canSubmit}
              >
                Submit prayer
              </button>

              <div className="pt-1 text-xs text-slate-500">
                This page is quiet by design. No account required.
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4">
                <div className="text-base font-semibold text-emerald-950">
                  You are not alone.
                </div>
                <div className="mt-2 text-sm leading-relaxed text-emerald-950">
                  God has heard you. You are seen, and you are held in His care.
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/today"
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-[1px]"
                >
                  Return to today’s manna
                </Link>

                <Link
                  href="/meditation"
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-200 hover:bg-slate-50 hover:-translate-y-[1px]"
                >
                  Sit in stillness
                </Link>
              </div>

              <button
                type="button"
                onClick={() => {
                  setPrayer("");
                  setTouched(false);
                  setSubmitted(false);
                }}
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Write another prayer
              </button>
            </div>
          )}
        </div>

        <footer className="mt-10 text-xs text-slate-500">
          MANNA • Daily Bread. Daily Walk.
        </footer>
      </section>
    </main>
  );
}
