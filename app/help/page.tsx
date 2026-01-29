import Link from "next/link";

export default function HelpPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 animate-page-in">
      {/* Header image */}
      <div className="relative mb-10 overflow-hidden rounded-3xl motion-soft">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/images/help/help-support.jpg)",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 px-6 py-14 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            I Need Help
          </h1>
          <p className="mt-3 text-base text-white/85">
            You don’t have to explain. Just choose where you are.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm motion-soft">
        <p className="mb-6 text-base text-slate-700">
          Choose what best describes how you’re feeling right now.
        </p>

        <div className="flex flex-wrap gap-4">
          {[
            "Discouraged",
            "Lonely",
            "Angry",
            "Afraid",
            "Hurting",
            "Stuck",
            "Exhausted",
          ].map((state) => (
            <Link
              key={state}
              href={`/help/${state.toLowerCase()}`}
              className="rounded-full border border-slate-200 bg-slate-50 px-6 py-3 text-base font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:bg-slate-100 hover:-translate-y-[1px]"
            >
              {state}
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/surrender"
            className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-700 px-6 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-[1px]"
          >
            SURRENDER TO GOD
          </Link>

          <p className="mt-2 text-center text-sm text-slate-600">
            A quiet step into a victorious life.
          </p>
        </div>
      </section>

      {/* Back */}
      <div className="mt-12">
        <Link
          href="/landing"
          className="text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-800"
        >
          Back
        </Link>
      </div>
    </main>
  );
}
