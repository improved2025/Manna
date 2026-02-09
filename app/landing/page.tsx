"use client";

import Header from "@/components/Header";
import Link from "next/link";
import InstallButton from "../../components/InstallButton";
import { useEffect, useRef, useState } from "react";

export default function HomePage() {
  // ✅ your confirmed poster path
  const posterSrc = "/images/landing/landing-poster.jpg";

  // ✅ set this to your real welcome video path (you said files are saved properly; keep it here)
  // If your video is elsewhere, update ONLY this line.
  const videoSrc = "/videos/landing-welcome.mp4";

  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Make sure when we switch to video, it starts immediately (user-initiated)
  async function handlePlay() {
    setPlaying(true);
    // wait a tick so the video exists in DOM
    requestAnimationFrame(async () => {
      try {
        await videoRef.current?.play();
      } catch {
        // if autoplay is blocked, user can still hit play via controls
      }
    });
  }

  // If video ends, go back to poster (no loop)
  useEffect(() => {
    if (!playing || !videoRef.current) return;
    const v = videoRef.current;

    const onEnded = () => setPlaying(false);
    v.addEventListener("ended", onEnded);

    return () => v.removeEventListener("ended", onEnded);
  }, [playing]);

  return (
    <>
      <Header />

      <main className="bg-slate-50 animate-page-in">
        <div className="mx-auto max-w-6xl px-6 py-12">
          {/* HERO */}
          <section className="relative w-full overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-sm motion-soft">
            <div className="relative">
              {/* ✅ Always render the poster image as a REAL image layer (works on iPhone) */}
              <div className="relative h-[46vh] w-full sm:h-[52vh] bg-black">
                {/* Poster as img, always reliable */}
                {!playing && (
                  <>
                    <img
                      src={posterSrc}
                      alt="MANNA welcome"
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="eager"
                      fetchPriority="high"
                    />
                    {/* subtle overlay for depth */}
                    <div className="absolute inset-0 bg-black/10" />

                    {/* Play button layer */}
                    <button
                      type="button"
                      onClick={handlePlay}
                      className="absolute inset-0 flex items-center justify-center"
                      aria-label="Play welcome video"
                    >
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M8.5 6.8v10.4c0 .8.9 1.3 1.6.9l8.2-5.2c.7-.4.7-1.4 0-1.8L10.1 5.9c-.7-.4-1.6.1-1.6.9z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    </button>
                  </>
                )}

                {/* Video only mounts after tap */}
                {playing && (
                  <video
                    ref={videoRef}
                    className="absolute inset-0 h-full w-full object-cover"
                    src={videoSrc}
                    controls
                    playsInline
                    preload="metadata"
                    // ✅ not muted
                    // ✅ not looped
                    // ✅ no poster reliance on iOS (poster is our image layer)
                  />
                )}
              </div>
            </div>

            {/* Text UNDER the media */}
            <div className="p-5 sm:p-7">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                A quiet daily walk with God.
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                One Scripture. One reflection. One prayer for today.
              </p>

              {/* ONLY TWO CTAs */}
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

          <footer className="mt-10 pb-6 text-xs text-slate-500">
            MANNA • Daily Bread. Daily Walk.
          </footer>
        </div>
      </main>
    </>
  );
}
