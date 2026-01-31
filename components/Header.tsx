import Image from "next/image";
import Link from "next/link";
import InstallButton from "./InstallButton";

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
            <div className="text-xs text-slate-600">
              Daily Bread. Daily Walk.
            </div>
          </div>
        </Link>

        {/* Primary action: Install (prominent wrapper) */}
        <div className="flex flex-col items-end">
          <div className="rounded-xl bg-emerald-700 px-2 py-2 shadow-sm transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-[1px]">
            <InstallButton />
          </div>

          {/* Optional helper (mobile only) */}
          <div className="mt-1 text-[10px] font-medium text-slate-600 sm:hidden">
            Add MANNA to your home screen
          </div>
        </div>
      </div>
    </header>
  );
}
