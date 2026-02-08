import Header from "@/components/Header";
import Link from "next/link";
import InstallButton from "../../components/InstallButton";
import ShareButton from "../../components/ShareButton";
import HeroRotator from "@/components/HeroRotator";

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="bg-slate-50 animate-page-in">
        <div className="mx-auto max-w-6xl px-6 py-14">
          {/* Hero image (Landing) */}
          <div className="relative mb-12 h-[38vh] w-full overflow-hidden rounded-3xl motion-soft sm:h-[44vh]">
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
              overlayClassName="bg-black/25"
            />

            {/* Bottom readability band */}
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/70 via-black/35 to-transparent sm:h-40" />

            {/* Hero copy + CTAs */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-xl">
                  <div className="text-[12px] font-semibold tracking-wide text-white/85">
                    MANNA
                  </div>
                  <div className="mt-1 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                    A quiet daily walk with God.
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-white/85">
                    Scripture, reflection, and prayer, once a day. No noise. Just
                    what you need for today.
                  </div>
                </div>

                {/* Only 2 buttons */}
                <div className="grid w-full grid-cols-1 gap-3 sm:w-auto sm:grid-cols-2">
                  {/* Today */}
                  <div className="flex flex-col items-stretch">
                    <Link
                      href="/today"
                      className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-[1px]"
                    >
                      Get today’s manna
                    </Link>
                    <div className="mt-1.5 text-center text-[12px] font-medium text-white/90">
                      Today’s Scripture and prayer
                    </div>
                  </div>

                  {/* Install (kept as component, styled via wrapper to avoid prop issues) */}
                  <div className="flex flex-col items-stretch">
                    <div className="rounded-2xl bg-emerald-700 shadow-sm transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-[1px]">
                      <div className="[&>button]:w-full">
                        <InstallButton />
                      </div>
                    </div>
                    <div className="mt-1.5 text-center text-[12px] font-medium text-white/90">
                      Install on your phone
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main section */}
          <section className="grid items-start gap-12 md:grid-cols-2">
            {/* Left */}
            <div className="pt-2">
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700 shadow-sm motion-soft">
                Calm, scripture-centered daily devotional (NKJV reference)
              </span>

              <h1 className="mt-7 text-5xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl">
                A quiet daily walk with God.
              </h1>

              <p className="mt-5 text-xl leading-relaxed text-slate-800">
                One Scripture. One word for today. One prayer to carry you through.
              </p>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
                MANNA meets you once a day with what matters most: Scripture, a
                grounded word, and a spoken prayer you can carry into real life.
                No noise. No overload. Just steady truth for today.
              </p>

              {/* Reduced action row (not fighting the hero) */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/today"
                  className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Open today
                </Link>

                <div className="rounded-xl border border-slate-200 bg-white px-2 py-2 shadow-sm">
                  <ShareButton />
                </div>
              </div>

              <div className="mt-7 inline-flex max-w-xl items-start rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-950 motion-soft">
                Scripture first. Spoken prayers. Steady strength for everyday life.
              </div>
            </div>

            {/* Right */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm motion-soft">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                What meets you each day
              </h2>

              <ul className="mt-5 space-y-4">
                <li className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Scripture (NKJV reference)
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    An anchor you carry through the day.
                  </p>
                </li>

                <li className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Short exhortation
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    Grounded. Practical. For today.
                  </p>
                </li>

                <li className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Prophetic spoken prayer
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    Spoken aloud. Grounded in Scripture. Directed to God.
                  </p>
                </li>
              </ul>

              <div className="mt-7 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700">
                Personal, without intrusion. Choose your season. Choose your time.
                No account required.
              </div>
            </div>
          </section>

          {/* How it works */}
          <section className="mt-14">
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 shadow-sm motion-soft">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                    How it works
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Three small steps. One steady habit.
                  </p>
                </div>

                <div className="hidden text-sm text-slate-600 md:block">
                  Built for daily consistency, not browsing.
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Step 1
                  </div>
                  <div className="mt-2 text-base font-semibold text-slate-900">
                    Choose your season
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Preparation, Restoration, Waiting, Transition, or Renewal.
                    It shapes the opening line, not the content.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Step 2
                  </div>
                  <div className="mt-2 text-base font-semibold text-slate-900">
                    Open Today
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    One Scripture reference, one grounded word, one prayer. No
                    overload. Just what you need for now.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Step 3
                  </div>
                  <div className="mt-2 text-base font-semibold text-slate-900">
                    Carry it into real life
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Keep it simple. Read it once. Pray it once. Return tomorrow.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Help block */}
          <section className="mt-14">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 shadow-sm motion-soft">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                  Need help right now?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Choose how you feel. Get a steady word for this moment.
                </p>

                <Link
                  href="/help"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-[1px] uppercase"
                >
                  I NEED HELP
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 shadow-sm motion-soft">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                  Need prayer?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Bring what’s heavy before God.
                </p>

                <Link
                  href="/prayer"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-[1px] uppercase"
                >
                  PRAYER REQUEST
                </Link>
              </div>
            </div>
          </section>

          <footer className="mt-12 pb-6 text-xs text-slate-500">
            MANNA • Daily Bread. Daily Walk.
          </footer>
        </div>
      </main>
    </>
  );
}
