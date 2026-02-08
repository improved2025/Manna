import Header from "@/components/Header";
import Link from "next/link";
import InstallButton from "../../components/InstallButton";
import HeroRotator from "@/components/HeroRotator";

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="bg-slate-50 animate-page-in">
        <div className="mx-auto max-w-6xl px-6 py-12">
          {/* HERO */}
          <section className="relative w-full overflow-hidden rounded-3xl motion-soft">
            <div className="relative h-[46vh] sm:h-[52vh]">
              <HeroRotator
                images={[
                  "/images/landing/landing-hero.jpg",
                  "/images/landing/landing-hero-1.jpg",
                  "/images/landing/landing-hero-2.jpg",
                  "/images/landing/landing-hero-3.jpg",
                  "/images/landing/landing-hero-4.jpg",
                ]}
                intervalMs={5200}
                fadeMs={900}
                overlayClassName="bg-black/35"
              />

              {/* Readability band */}
              <div className="absolute inset-x-0 bottom-0 h-44 sm:h-48 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

              {/* Hero copy */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
                    Calm, scripture-centered daily devotional
                  </div>

                  <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
                    A quiet daily walk with God.
                  </h1>

                  <p className="mt-3 text-base leading-relaxed text-white/90 sm:text-lg">
                    One Scripture. One reflection. One prayer for today.
                  </p>

                  {/* ONLY TWO CTAs */}
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:max-w-[520px]">
                    {/* Primary */}
                    <div className="flex flex-col items-stretch">
                      <Link
                        href="/today"
                        className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-[1px]"
                      >
                        Today’s Devotional
                      </Link>
                      <div className="mt-1.5 text-center text-[12px] font-medium text-white/90">
                        Scripture, reflection, and prayer
                      </div>
                    </div>

                    {/* Install MANNA */}
                    <div className="flex flex-col items-stretch">
                      <InstallButton />
                      <div className="mt-1.5 text-center text-[12px] font-medium text-white/90">
                        Install on your phone for daily reminders
                      </div>
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
