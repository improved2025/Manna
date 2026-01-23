import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
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
            <div className="text-sm font-semibold tracking-tight text-slate-900">
              MANNA
            </div>
            <div className="text-xs text-slate-600">
              Daily Bread. Daily Walk.
            </div>
          </div>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/help"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Help
          </Link>

          <Link
            href="/today"
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Today
          </Link>
        </div>
      </div>
    </header>
  );
}
