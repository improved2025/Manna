import Link from "next/link";

export default function SurrenderCta() {
  return (
    <section className="mt-12">
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              A next step
            </div>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              SURRENDER TO GOD
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              A quiet step into a victorious life.
            </p>
          </div>

          <div className="sm:text-right">
            <Link
              href="/surrender"
              className="inline-flex items-center justify-center rounded-md bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Go
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
