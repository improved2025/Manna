import Link from "next/link";

export default function MeditationEntryPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/ocean.jpg)",
        }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center text-white">
          <p className="text-base tracking-wide text-white/85">
            You are entering a place of peace.
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Breathe. Be still.
          </h1>

          <p className="mt-3 text-base leading-relaxed text-white/85">
            Take a moment. Let your mind settle.
          </p>

          <Link
            href="/meditation/session"
            className="mt-10 inline-flex w-full items-center justify-center rounded-xl bg-white/90 px-5 py-3 text-base font-semibold text-black transition hover:bg-white"
          >
            Begin
          </Link>

          <Link
            href="/today"
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-base font-medium text-white/90 hover:bg-white/10"
          >
            Back to Today
          </Link>
        </div>
      </div>
    </main>
  );
}
