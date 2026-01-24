import Link from "next/link";
import Image from "next/image";
import AppSplash from "../../components/AppSplash";

export default function WelcomePage() {
  return (
    <AppSplash>
      <main className="min-h-screen flex items-center justify-center px-6 bg-white">
        <div className="w-full max-w-md text-center">
          {/* App Icon */}
          <div className="mx-auto mb-6">
            <Image
              src="/icons/manna-icon-v2.png"
              alt="MANNA"
              width={80}
              height={80}
              priority
              className="mx-auto rounded-2xl"
            />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
            Welcome to MANNA
          </h1>

          <p className="mt-3 text-base text-neutral-600 leading-relaxed">
            Your spiritual companion for daily bread and daily walk.
          </p>

          <Link
            href="/landing"
            className="mt-10 inline-flex w-full items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 text-white text-base font-semibold transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
          >
            ENTER
          </Link>
        </div>
      </main>
    </AppSplash>
  );
}
