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
          <div className="relative w-full h-[38vh] sm:h-[44vh] rounded-3xl overflow-hidden mb-12 motion-soft">
            <HeroRotator
              images={[
                "/images/landing/landing-hero.jpg",
                "/images/landing/landing-hero-1.jpg",
                "/images/landing/landing-hero-2.jpg",
                "/images/landing/landing-hero-3.jpg",
                "/images/landing/landing-hero-4.jpg",
              ]}
              intervalMs={5200} // tighter cadence
              fadeMs={900}
              overlayClassName="bg-black/25"
            />

            {/* Bottom readability band */}
            <div className="absolute inset-x-0 bottom-0 h-32 sm:h-36 bg-gradient-to-t from-black/65 via-black/30 to-transparent" />

            {/* Overlay CTAs (uniform + readable) */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:justify-end sm:gap-4 sm:max-w-[520px] sm:ml-auto">
                {/* Primary: Get Today */}
                <div className="flex flex-col items-stretch">
                  <Link
                    href="/today"
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-[1px]"
                  >
                    Get today’s manna
                  </Link>
                  <div className="mt-1.5 text-center text-[12px] font-medium text-white/90">
                    Today’s Scripture, reflection, and prayer
                  </div>
                </div>

                {/* Secondary: Take a moment */}
                <div className="flex flex-col items-stretch">
                  <Link
                    href="/meditation"
                    className="inline-flex w-full items-center justify-center rounded-2xl border border-white/70 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white/15 hover:-translate-y-[1px]"
                  >
                    Take a moment
                  </Link>
                  <div className="mt-1.5 text-center text-[12px] font-medium text-white/90">
                    Pause. Breathe. Sit quietly with God.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero */}
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
                One Scripture. One word for today. One prayer to carry you
                through.
              </p>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
                MANNA meets you once a day with what matters most: Scripture, a
                grounded word, and a spoken prayer you can carry into real life.
                No noise. No overload. Just steady truth for today.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                {/* Primary CTA: route to Today (higher conversion than /start) */}
                <Link
                  href="/today"
                  className="rounded-md bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-[1px]"
                >
                  Get today’s manna
                </Link>

                <InstallButton />

                <ShareButton />
              </div>

              {/* subtle helper line */}
              <div className="mt-7 inline-flex max-w-xl items-start rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-950 motion-soft">
                Scripture first. Spoken prayers. Steady strength for everyday
                life.
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
                Personal, without intrusion. Choose your season. Choose your
                time. No account required.
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
              {/* Help */}
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

              {/* Prayer Request */}
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

          {/* Footer */}
          <footer className="mt-12 pb-6 text-xs text-slate-500">
            MANNA • Daily Bread. Daily Walk.
          </footer>
        </div>
      </main>
    </>
  );
}
