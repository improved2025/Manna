import Link from "next/link";

const STATE_IMAGES: Record<string, string> = {
  discouraged: "/images/help/states/discouraged.jpg",
  lonely: "/images/help/states/lonely.jpg",
  angry: "/images/help/states/angry.jpg",
  afraid: "/images/help/states/afraid.jpg",
  hurting: "/images/help/states/hurting.jpg",
  stuck: "/images/help/states/stuck.jpg",
  exhausted: "/images/help/states/exhausted.jpg",
};

const STATE_TITLES: Record<string, string> = {
  discouraged: "When you feel discouraged",
  lonely: "When you feel lonely",
  angry: "When you feel angry",
  afraid: "When you feel afraid",
  hurting: "When you are hurting",
  stuck: "When you feel stuck",
  exhausted: "When you are exhausted",
};

export default function HelpStatePage({
  params,
}: {
  params: { state: string };
}) {
  const state = params.state?.toLowerCase();
  const image =
    STATE_IMAGES[state] || "/images/help/states/discouraged.jpg";
  const title =
    STATE_TITLES[state] || "When you need support";

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 animate-page-in">
      {/* Hero image */}
      <div className="relative mb-10 overflow-hidden rounded-3xl motion-soft">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 px-6 py-14 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            {title}
          </h1>
          <p className="mt-3 text-base text-white/85">
            You don’t need to explain. God meets you here.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm motion-soft">
        <p className="mb-8 text-base leading-relaxed text-slate-700">
          Take a breath. You’re not wrong for feeling this way. God is present,
          steady, and near — even now.
        </p>

        {/* Primary actions */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Take a moment */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <Link
              href="/meditation"
              className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-[1px]"
            >
              Take a moment
            </Link>
            <p className="mt-2 text-sm text-slate-700">
              Pause in quiet reflection.
            </p>
          </div>

          {/* Surrender */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <Link
              href="/surrender"
              className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-[1px]"
            >
              Surrender to God
            </Link>
            <p className="mt-2 text-sm text-slate-700">
              A quiet step into a victorious life.
            </p>
          </div>
        </div>
      </section>

      {/* Back */}
      <div className="mt-12">
        <Link
          href="/help"
          className="text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-800"
        >
          Back
        </Link>
      </div>
    </main>
  );
}
