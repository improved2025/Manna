"use client";

import Header from "@/components/Header";
import Link from "next/link";
import InstallButton from "../../components/InstallButton";
import { useState } from "react";

export default function HomePage() {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <>
      <Header />

      <main className="bg-slate-50 animate-page-in">
        <div className="mx-auto max-w-6xl px-6 py-12">
          {/* HERO VIDEO (NO TEXT OVERLAY) */}
          <section className="w-full overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-sm motion-soft">
            <div className="relative">
              {/* Poster layer (always visible instantly) */}
              <div
                className={[
                  "absolute inset-0 bg-cover bg-center",
                  videoReady ? "opacity-0" : "opacity-100",
                  "transition-opacity duration-300",
                ].join(" ")}
                style={{ backgroundImage: "url(/images/landing/landing-poster.jpg)" }}
                aria-hidden="true"
              />

              {/* Video */}
              <video
                className={[
                  "relative block h-[46vh] w-full object-cover sm:h-[52vh]",
                  videoReady ? "opacity-100" : "opacity-0",
                  "transition-opacity duration-300",
                ].join(" ")}
                src="/videos/landing-welcome.mp4"
                poster="/images/landing/landing-poster.jpg"
                playsInline
                controls
                preload="metadata"
                // no muted, no loop
                onCanPlay={() => setVideoReady(true)}
                onLoadedData={() => setVideoReady(true)}
              />
            </div>

            {/* TITLE + BUTTONS UNDER VIDEO */}
            <div className="p-5 sm:p-7">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                A quiet daily walk with God.
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                One Scripture. One reflection. One prayer for today.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:max-w-[560px] sm:grid-cols-2">
                <Link
                  href="/today"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-[1px]"
                >
                  Today’s Devotional
                </Link>

                <div className="[&>button]:w-full [&>button]:rounded-2xl">
                  <InstallButton />
                </div>
              </div>
            </div>
          </section>

          {/* VALUE */}
          <section className="mt-10">
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-8 shadow-sm motion-soft">
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                What you’ll receive daily
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">
                    Scripture
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-slate-600">
                    A steady anchor for your day.
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">
                    Reflection
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-slate-600">
                    Short, practical, and grounded.
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">
                    Prayer
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-slate-600">
                    Spoken faith you can carry forward.
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-relaxed text-emerald-950">
                Personal. Quiet. No account required.
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="mt-10 pb-6 text-xs text-slate-500">
            MANNA • Daily Bread. Daily Walk.
          </footer>
        </div>
      </main>
    </>
  );
}
