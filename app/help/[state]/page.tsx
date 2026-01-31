import Link from "next/link";
import { EMOTIONAL_STATES } from "@/content/emotional-states";

function toLabel(slug: string) {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

export default async function EmotionalStatePage({
  params,
}: {
  params: any;
}) {
  const resolvedParams = await Promise.resolve(params);
  const raw = String(resolvedParams?.state ?? "");
  const slug = raw.toLowerCase().trim();

  const messages = EMOTIONAL_STATES[slug as keyof typeof EMOTIONAL_STATES];

  // Background image path (your saved structure)
  const bgImage = `/images/help/states/${slug}.jpg`;

  if (!messages || messages.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold text-slate-900">Not found</h1>
        <p className="mt-3 text-slate-600">
          That page does not exist. Choose a feeling from the list.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/help"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Go back
          </Link>

          <Link
            href="/landing"
            className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Home
          </Link>
        </div>
      </main>
    );
  }

  const index = Math.floor(Math.random() * messages.length);
  const message = messages[index];

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      {/* Background image (not plain) */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-sm motion-soft">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-black/45" />

        {/* Content */}
        <div className="relative z-10 p-8 sm:p-10">
          <h1 className="text-2xl font-semibold text-white">
            {toLabel(slug)}
          </h1>

          <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
            <p className="whitespace-pre-line text-white/90 leading-relaxed">
              {message.text}
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/help"
              className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15"
            >
              Go back
            </Link>

            <Link
              href="/landing"
              className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
