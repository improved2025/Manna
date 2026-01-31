import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* Logo */}
        <Link href="/landing" className="flex items-center gap-3">
          <Image
            src="/icons/manna-icon-v2.png"
            alt="Manna"
            width={44}
            height={44}
            priority
          />

          <div className="leading-tight">
            <div className="text-lg font-semibold tracking-tight text-slate-900">
              MANNA
            </div>

            {/* Hide tagline on mobile to prevent action buttons from wrapping */}
            <div className="hidden text-xs text-slate-600 sm:block">
              Daily Bread. Daily Walk.
            </div>
          </div>
        </Link>

        {/* Actions */}
        <div className="grid grid-cols-2 items-start gap-x-3 gap-y-1 text-center">
          <Link
            href="/meditation"
            className="rounded-md bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 whitespace-nowrap sm:bg-white sm:text-slate-900 sm:border sm:border-slate-300 sm:text-sm sm:px-4 sm:py-2 sm:hover:bg-slate-50"
          >
            Take a moment
          </Link>

          <Link
            href="/today"
            className="rounded-md bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 whitespace-nowrap sm:text-sm sm:px-4 sm:py-2"
          >
            Today
          </Link>

          {/* Descriptions: visible on mobile + desktop, aligned cleanly */}
          <div className="text-[10px] leading-tight font-medium text-slate-500 sm:text-[11px]">
            Pause in quiet reflection
          </div>
          <div className="text-[10px] leading-tight font-medium text-slate-500 sm:text-[11px]">
            Today’s Scripture and prayer
          </div>
        </div>
      </div>
    </header>
  );
}
