import Link from "next/link";

export default function SurrenderCta() {
  return (
    <section className="mt-14 text-center">
      <Link
        href="/surrender"
        className="inline-flex items-center justify-center rounded-md bg-emerald-700 px-10 py-4 text-sm font-semibold text-white hover:bg-emerald-800"
      >
        SURRENDER TO GOD
      </Link>

      <p className="mt-3 text-sm text-slate-600">
        A quiet step into a victorious life.
      </p>
    </section>
  );
}
