import Header from "@/components/Header";
import Link from "next/link";
import InstallButton from "../../components/InstallButton";

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="bg-slate-50 animate-page-in">
        <div className="mx-auto max-w-6xl px-6 py-12">
          {/* HERO (Welcome Video) */}
          <section className="relative w-full overflow-hidden rounded-3xl border border-slate-200/60 bg-black shadow-sm motion-soft">
            <div className="relative h-[46vh] sm:h-[52vh]">
              {/* Video */}
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/videos/landing-welcome.mp4"
                poster="/images/landing/landing-poster.jpg"
                playsInline
                muted
                autoPlay
                loop
                preload="metadata"
              />

              {/* Readability band (for buttons only) */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 sm:h-48 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

              {/* Buttons only (no heavy text over video) */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <div className="mx-auto max-w-[560px]">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {/* Today */}
                    <Link
                      href="/today"
                      className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-black/25 transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-black/40"
                    >
                      Today’s Devotional
                    </Link>

                    {/* Install */}
                    <div className="[&>button]:w-full [&>button]:rounded-2xl [&>button]:shadow-md [&>button]:shadow-black/25 [&>button]:transition-all [&>button]:duration-200 [&>button:hover]:-translate-y-[1px] [&>button]:focus:outline-none [&>button]:focus:ring-2 [&>button]:focus:ring-white/70 [&>button]:focus:ring-offset-2 [&>button]:focus:ring-offset-black/40">
                      <InstallButton />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Headline BELOW the video (premium, not clustered) */}
          <div className="mt-6 text-center">
            <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              A quiet daily walk with God.
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              One Scripture. One reflection. One prayer for today.
            </p>
          </div>

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
