import Header from "@/components/Header";
import Link from "next/link";
import InstallButton from "../../components/InstallButton";

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="bg-slate-50 animate-page-in">
        <div className="mx-auto max-w-6xl px-6 py-12">

          {/* HERO VIDEO */}
          <section className="relative w-full overflow-hidden rounded-3xl border border-slate-200/60 bg-black shadow-sm motion-soft">

            <div className="relative h-[46vh] sm:h-[52vh]">

              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/videos/landing-welcome.mp4"
                poster="/images/landing/landing-poster.jpg"
                playsInline
                controls
                preload="metadata"
              />

              {/* soft bottom gradient for buttons */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <div className="max-w-xl">

                  {/* Quiet title */}
                  <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
                    A quiet daily walk with God.
                  </h1>

                  {/* ONLY TWO BUTTONS */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                    <Link
                      href="/today"
                      className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-emerald-800"
                    >
                      Today’s Devotional
                    </Link>

                    <div className="[&>button]:w-full [&>button]:rounded-2xl">
                      <InstallButton />
                    </div>

                  </div>
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
                  <div className="mt-1 text-sm text-slate-600">
                    A steady anchor for your day.
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">
                    Reflection
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    Short, practical, and grounded.
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">
                    Prayer
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    Spoken faith you can carry forward.
                  </div>
                </div>

              </div>

              <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-950">
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
