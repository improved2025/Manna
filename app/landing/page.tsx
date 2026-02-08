import Header from "@/components/Header";
import Link from "next/link";
import InstallButton from "../../components/InstallButton";

export default function HomePage() {
  // Put your welcome video here (save in: /public/videos/)
  // Example path: /public/videos/landing-welcome.mp4  ->  "/videos/landing-welcome.mp4"
  const VIDEO_SRC = "/videos/landing-welcome.mp4";

  return (
    <>
      <Header />

      <main className="bg-slate-50 animate-page-in">
        <div className="mx-auto max-w-6xl px-6 py-12">
          {/* HERO */}
          <section className="relative w-full overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-sm motion-soft">
            <div className="relative h-[46vh] sm:h-[52vh]">
              {/* VIDEO (no cropping: object-contain) */}
              <video
                className="absolute inset-0 h-full w-full bg-black object-contain"
                src={VIDEO_SRC}
                playsInline
                controls
                preload="metadata"
              />

              {/* Subtle premium sheen */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />

              {/* Bottom gradient for button readability */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 sm:h-44 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

              {/* ONLY TWO BUTTONS (no text overlays) */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:max-w-[560px]">
                  <Link
                    href="/today"
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-black/20 transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-black/30"
                  >
                    Today’s Devotional
                  </Link>

                  <div className="[&>button]:w-full [&>button]:rounded-2xl [&>button]:shadow-md [&>button]:shadow-black/20 [&>button]:focus:outline-none [&>button]:focus:ring-2 [&>button]:focus:ring-white/70 [&>button]:focus:ring-offset-2 [&>button]:focus:ring-offset-black/30">
                    <InstallButton />
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
