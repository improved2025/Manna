import Header from "@/components/Header";
import Link from "next/link";
import InstallButton from "../../components/InstallButton";
import { useRef, useState } from "react";

export default function HomePage() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = () => {
    setPlaying(true);

    // iOS Safari needs the play() call after the element exists.
    // This runs right after state updates and the video is mounted.
    setTimeout(() => {
      try {
        videoRef.current?.play();
      } catch {
        // ignore; controls are visible so user can tap play
      }
    }, 0);
  };

  return (
    <>
      <Header />

      <main className="bg-slate-50 animate-page-in">
        <div className="mx-auto max-w-6xl px-6 py-12">
          {/* HERO */}
          <section className="relative w-full overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-sm motion-soft">
            {/* Media (poster always visible on mobile) */}
            <div
              className="relative h-[46vh] sm:h-[52vh]"
              style={{
                backgroundImage: "url(/images/landing/landing-poster.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* subtle top sheen (premium depth) */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />

              {!playing ? (
                <>
                  {/* Poster image layer (crisp) */}
                  <img
                    src="/images/landing/landing-poster.jpg"
                    alt="MANNA welcome"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />

                  {/* Play overlay */}
                  <button
                    type="button"
                    onClick={handlePlay}
                    aria-label="Play welcome video"
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg">
                      <span className="text-xl leading-none text-slate-900">
                        ▶
                      </span>
                    </span>
                  </button>
                </>
              ) : (
                <video
                  ref={videoRef}
                  src="/videos/landing-welcome.mp4"
                  className="absolute inset-0 h-full w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                />
              )}
            </div>

            {/* Text UNDER the video (not over it) */}
            <div className="p-5 sm:p-7">
              <div className="max-w-2xl">
                <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                  Calm, scripture-centered daily devotional
                </div>

                <h1 className="mt-4 text-3xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
                  A quiet daily walk with God.
                </h1>

                <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
                  One Scripture. One reflection. One prayer for today.
                </p>

                {/* ONLY TWO CTAs */}
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:max-w-[560px]">
                  {/* Primary */}
                  <div className="flex flex-col items-stretch">
                    <Link
                      href="/today"
                      className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                    >
                      Today’s Devotional
                    </Link>
                    <div className="mt-1.5 text-center text-[12px] font-medium text-slate-600">
                      Scripture, reflection, and prayer
                    </div>
                  </div>

                  {/* Install MANNA */}
                  <div className="flex flex-col items-stretch">
                    <div className="[&>button]:w-full [&>button]:rounded-2xl [&>button]:shadow-sm [&>button]:focus:outline-none [&>button]:focus:ring-2 [&>button]:focus:ring-emerald-400/60">
                      <InstallButton />
                    </div>
                    <div className="mt-1.5 text-center text-[12px] font-medium text-slate-600">
                      Install on your phone for daily reminders
                    </div>
                  </div>
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
