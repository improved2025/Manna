"use client";

import Header from "@/components/Header";
import Link from "next/link";
import InstallButton from "../../components/InstallButton";
import { useEffect, useRef, useState } from "react";

export default function HomePage() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videoSrc = "/videos/landing-welcome.mp4";
  const posterSrc = "/images/landing/landing-poster.jpg";

  useEffect(() => {
    setPlaying(false);
  }, []);

  const startPlayback = async () => {
    setPlaying(true);

    requestAnimationFrame(async () => {
      try {
        if (videoRef.current) {
          videoRef.current.muted = false;
          videoRef.current.volume = 1;
          await videoRef.current.play();
        }
      } catch {
        // If play is blocked, controls allow user to start manually.
      }
    });
  };

  return (
    <>
      <Header />

      <main className="bg-slate-50 animate-page-in">
        <div className="mx-auto max-w-6xl px-6 py-12">
          {/* HERO */}
          <section className="relative w-full overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-sm motion-soft">
            <div className="relative">
              {/* VIDEO HERO (with poster) */}
              <div className="relative aspect-[4/5] w-full sm:aspect-[16/9]">
                {/* Poster layer (visible until play) */}
                {!playing && (
                  <button
                    type="button"
                    onClick={startPlayback}
                    className="group absolute inset-0 z-10 flex items-center justify-center"
                    aria-label="Play welcome video"
                  >
                    <img
                      src={posterSrc}
                      alt="MANNA welcome"
                      className="h-full w-full object-cover"
                      loading="eager"
                      decoding="async"
                    />

                    {/* soft wash */}
                    <div className="pointer-events-none absolute inset-0 bg-black/20" />

                    {/* play button */}
                    <div className="absolute flex items-center justify-center">
                      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-200 group-hover:scale-[1.03]">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 7.5V16.5L17 12L9 7.5Z"
                            fill="#0F172A"
                          />
                        </svg>
                      </span>
                    </div>
                  </button>
                )}

                {/* Video layer */}
                {playing && (
                  <video
                    ref={videoRef}
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                    src={videoSrc}
                    poster={posterSrc}
                    controls
                    playsInline
                    preload="metadata"
                    muted={false}
                    loop={false}
                  />
                )}

                {/* Bottom CTA overlay (ONLY place CTAs exist) */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4 sm:p-6">
                  {/* readability band */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 sm:h-40 bg-gradient-to-t from-black/75 via-black/40 to-transparent" />

                  <div className="relative mx-auto grid max-w-[560px] grid-cols-1 gap-3 sm:grid-cols-2">
                    {/* Today */}
                    <div className="pointer-events-auto flex flex-col items-stretch">
                      <Link
                        href="/today"
                        className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-black/20 transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-black/30"
                      >
                        Today’s Devotional
                      </Link>
                      <div className="mt-1.5 text-center text-[12px] font-medium text-white/90">
                        
                      </div>
                    </div>

                    {/* Install */}
                    <div className="pointer-events-auto flex flex-col items-stretch">
                      <div className="[&>button]:w-full [&>button]:rounded-2xl [&>button]:shadow-md [&>button]:shadow-black/20 [&>button]:focus:outline-none [&>button]:focus:ring-2 [&>button]:focus:ring-white/70 [&>button]:focus:ring-offset-2 [&>button]:focus:ring-offset-black/30">
                        <InstallButton />
                      </div>
                      {/* CHANGED: plain white for readability */}
                      <div className="mt-1.5 text-center text-[12px] font-medium text-white">
                        Install on your phone for daily reminders
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text under video (NO buttons here) */}
              <div className="px-6 py-7 sm:px-8 sm:py-8">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                    Calm, scripture-centered daily devotional
                  </div>

                  <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl">
                    A quiet daily walk with God.
                  </h1>

                  <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
                    One Scripture. One reflection. One prayer for today.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* VALUE */}
          <section className="mt-10">
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-8 shadow-sm motion-soft">
              <div className="flex items-end justify-between gap-6">
                <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                  What you’ll receive daily
                </h2>
                <div className="hidden text-sm font-medium text-slate-500 sm:block">
                  Quiet by design
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all duration-200 hover:bg-white hover:shadow-sm">
                  <div className="text-sm font-semibold text-slate-900">
                    Scripture
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-slate-600">
                    A steady anchor for your day.
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all duration-200 hover:bg-white hover:shadow-sm">
                  <div className="text-sm font-semibold text-slate-900">
                    Reflection
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-slate-600">
                    Short, practical, and grounded.
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all duration-200 hover:bg-white hover:shadow-sm">
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
