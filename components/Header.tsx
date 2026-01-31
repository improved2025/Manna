import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-start justify-between px-4 py-3 sm:items-center sm:px-6 sm:py-4">
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
            <div className="text-xs text-slate-600">
              Daily Bread. Daily Walk.
            </div>
          </div>
        </Link>

        {/* Actions */}
        <div className="flex w-[150px] flex-col items-end gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-2">
          {/* Take a moment */}
          <div className="flex w-full flex-col items-end sm:w-auto sm:items-center">
            <Link
              href="/meditation"
              className="
                w-full whitespace-nowrap rounded-md bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700
                sm:w-auto sm:border sm:border-slate-300 sm:bg-white sm:px-4 sm:py-2 sm:text-sm sm:text-slate-900 sm:hover:bg-slate-50
              "
            >
              Take a moment
            </Link>
            <div className="mt-1 text-right text-[10px] leading-tight font-medium text-slate-500 sm:hidden">
              Pause in quiet reflection
            </div>
          </div>

          {/* Today */}
          <div className="flex w-full flex-col items-end sm:w-auto sm:items-center">
            <Link
              href="/today"
              className="w-full whitespace-nowrap rounded-md bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 sm:w-auto sm:px-4 sm:py-2 sm:text-sm"
            >
              Today
            </Link>
            <div className="mt-1 text-right text-[10px] leading-tight font-medium text-slate-500 sm:hidden">
              Today’s Scripture and prayer
            </div>
          </div>

          {/* Desktop-only helper text (optional, subtle) */}
          <div className="hidden sm:flex sm:flex-col sm:items-center sm:justify-center sm:pl-2">
            {/* If you want desktop helper text too, uncomment these:
            <div className="text-[11px] font-medium text-slate-500">
              Pause in quiet reflection
            </div>
            <div className="mt-1 text-[11px] font-medium text-slate-500">
              Today’s Scripture and prayer
            </div>
            */}
          </div>
        </div>
      </div>
    </header>
  );
}
