export default function LandingPage() {
  const seasons = ["Preparation", "Restoration", "Waiting", "Transition", "Renewal"];

  const encouragementTabs = [
    "Encouragement",
    "Strength for Hard Times",
    "Healing",
    "Peace & Calm",
    "Bereavement & Loss",
    "Guidance & Direction",
    "Breakthrough",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Top bar */}
      <header className="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-500 text-white flex items-center justify-center font-semibold shadow-sm">
            M
          </div>
          <div className="leading-tight">
            <p className="font-semibold text-slate-900">MANNA</p>
            <p className="text-xs text-slate-500">Daily Bread, Daily Walk</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/encouragement"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            Encouragement
          </a>
          <a
            href="/today"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800"
          >
            Open Today
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Calm, scripture-centered daily devotional (NKJV reference)
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900">
              A quiet daily rhythm with God.
            </h1>

            <p className="mt-3 text-lg text-slate-700">
              <span className="font-semibold">One scripture.</span>{" "}
              <span className="font-semibold">One exhortation.</span>{" "}
              <span className="font-semibold">One prayer.</span>{" "}
              Every day.
            </p>

            <p className="mt-4 text-slate-600 leading-relaxed">
              MANNA gives you one daily portion: a scripture reference, a short
              exhortation, and a prophetic spoken prayer you can pray out loud.
              No noise. No overload. Just daily consistency.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/today"
                className="rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 px-5 py-3 text-sm font-medium text-white shadow-sm hover:opacity-95"
              >
                Start Today
              </a>

              <a
                href="/encouragement"
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Browse Encouragement
              </a>

              <a
                href="#install"
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Install on phone
              </a>
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="text-sm font-medium text-emerald-900">
                Pastoral, not hype-driven
              </p>
              <p className="mt-1 text-sm text-emerald-800 leading-relaxed">
                Short. Clear. Spoken prayers. Scripture-first. Built for daily steadiness.
              </p>
            </div>
          </div>

          {/* What you receive */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="p-6">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                What you receive daily
              </p>

              <div className="mt-4 space-y-4">
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <p className="text-sm font-medium text-slate-900">
                    Scripture (NKJV reference)
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    One anchor for the day.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <p className="text-sm font-medium text-slate-900">
                    Short exhortation
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Calm, practical, and focused.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <p className="text-sm font-medium text-slate-900">
                    Prophetic spoken prayer
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Direct to God. Declarative. Sealed in Jesus’ name.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-teal-200 bg-teal-50 p-4">
                <p className="text-sm font-medium text-teal-900">
                  Personal without being invasive
                </p>
                <p className="mt-1 text-sm text-teal-800">
                  Choose a spiritual season and preferred time. No login required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Encouragement tabs */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Encouragement, when you need it
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Browse short, rotating encouragements by theme. No pressure. No schedule.
              </p>
            </div>

            <a
              href="/encouragement"
              className="inline-flex w-fit rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 px-4 py-2 text-sm font-medium text-white hover:opacity-95"
            >
              Browse encouragement
            </a>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {encouragementTabs.map((t) => (
              <div
                key={t}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-sm text-slate-700"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasons */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Your spiritual season (lens)
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Your season gently shapes how Today speaks to you. It’s a lens, not a different feed.
              </p>
            </div>

            <a
              href="/start"
              className="inline-flex w-fit rounded-xl bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800"
            >
              Set my season
            </a>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {seasons.map((s) => (
              <div
                key={s}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-sm text-slate-700"
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Install */}
      <section id="install" className="mx-auto max-w-6xl px-4 pb-14">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Install on your phone
          </h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            MANNA works like an app. Add it to your home screen for daily access.
          </p>

          <ol className="mt-4 space-y-2 text-sm text-slate-700">
            <li>
              <span className="font-medium">iPhone:</span> Share → Add to Home Screen
            </li>
            <li>
              <span className="font-medium">Android:</span> Menu → Install app
            </li>
          </ol>

          <p className="mt-4 text-xs text-slate-500">
            No account required. Preferences stay on your device.
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} MANNA • Daily Bread, Daily Walk
        </div>
      </footer>
    </main>
  );
}
