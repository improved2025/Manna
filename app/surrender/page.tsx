import Link from "next/link";

export default function SurrenderPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      {/* Header */}
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Surrender to God
        </h1>
        <p className="text-base leading-relaxed text-slate-600">
          A quiet step into a victorious life.
        </p>
      </header>

      {/* Content */}
      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-10">
          {/* Scripture */}
          <div>
            <div className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Matthew 11:28 (NKJV)
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-800">
              “Come to Me, all you who labor and are heavy laden, and I will give you rest.”
            </p>
          </div>

          {/* Reflection */}
          <div className="space-y-3 text-sm leading-relaxed text-slate-700">
            <p>You don’t have to carry this alone anymore.</p>
            <p>Surrender isn’t weakness. It’s trust.</p>
            <p>
              It’s choosing to stop striving and placing your life into God’s
              hands, just as it is.
            </p>
            <p>
              This moment isn’t about having everything figured out. It’s about
              yielding your life and letting Jesus lead from here.
            </p>
          </div>

          {/* Prayer */}
          <div>
            <div className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Prayer
            </div>
            <p className="mt-2 text-sm italic text-slate-600">
              You may pray this aloud if you’re able.
            </p>

            <div className="mt-5 whitespace-pre-line rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm leading-relaxed text-slate-800">
              God,
              {"\n"}I come to You just as I am.
              {"\n"}I’ve tried to carry life on my own, and I’m tired.
              {"\n\n"}Today, I surrender my life to You.
              {"\n"}I believe that Jesus Christ is Your Son,
              {"\n"}that He died for my sins,
              {"\n"}and that He rose again.
              {"\n\n"}Jesus, I receive You as my Lord.
              {"\n"}I place my life under Your leadership and care.
              {"\n"}Forgive me.
              {"\n"}Cleanse me.
              {"\n"}Lead me in Your truth.
              {"\n\n"}From this moment forward,
              {"\n"}my life belongs to You.
              {"\n"}I choose to walk with You.
              {"\n\n"}Jesus, be Lord over my life.
              {"\n"}Amen.
            </div>
          </div>

          {/* Affirmation */}
          <div className="space-y-3 text-sm leading-relaxed text-slate-700">
            <div className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Affirmation
            </div>
            <p>God hears you. Through Jesus, you are forgiven and not alone.</p>
            <p>
              This is not the end of a journey. It is the beginning of a life
              anchored in Him.
            </p>
          </div>

          {/* What's Next */}
          <div className="space-y-4 text-sm leading-relaxed text-slate-700">
            <div className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              What’s next
            </div>

            <ul className="list-disc space-y-2 pl-5">
              <li>Take life one day at a time.</li>
              <li>Let Scripture steady you daily.</li>
              <li>Return to prayer when the weight feels heavy.</li>
              <li>Use I NEED HELP whenever you need strength.</li>
              <li>Stay close. Jesus walks with those who surrender to Him.</li>
            </ul>

            <p>You don’t need to rush.</p>
            <p>You don’t need to prove anything.</p>
            <p>Just keep walking with Him.</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row pt-2">
            <Link
              href="/today"
              className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Continue with today’s manna
            </Link>

            <Link
              href="/help"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              I NEED HELP
            </Link>
          </div>
        </div>
      </section>

      {/* Back */}
      <div className="mt-12">
        <Link
          href="/landing"
          className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
        >
          Back
        </Link>
      </div>
    </main>
  );
}
