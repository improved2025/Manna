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
      <h1 className="text-2xl font-semibold text-slate-900">
        {toLabel(slug)}
      </h1>

      <p className="mt-6 whitespace-pre-line text-slate-800 leading-relaxed">
        {message.text}
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
