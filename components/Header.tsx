"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import InstallButton from "./InstallButton";

export default function Header() {
  const [open, setOpen] = useState(false);

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

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Install (always visible) */}
          <div className="rounded-xl bg-emerald-700 px-2 py-2 shadow-sm hover:bg-emerald-800 transition">
            <InstallButton />
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"
          >
            <div className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-slate-900" />
              <span className="block h-0.5 w-5 bg-slate-900" />
              <span className="block h-0.5 w-5 bg-slate-900" />
            </div>
          </button>
        </div>
      </div>

      {/* Dropdown menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white shadow-sm">
          <div className="mx-auto max-w-6xl px-6 py-4 space-y-3">
            <Link
              href="/today"
              onClick={() => setOpen(false)}
              className="block text-sm font-semibold text-slate-900 hover:text-emerald-700"
            >
              Today’s Devotional
            </Link>

            <Link
              href="/help"
              onClick={() => setOpen(false)}
              className="block text-sm font-semibold text-slate-900 hover:text-emerald-700"
            >
              I Need Help
            </Link>

            <Link
              href="/prayer"
              onClick={() => setOpen(false)}
              className="block text-sm font-semibold text-slate-900 hover:text-emerald-700"
            >
              Prayer Request
            </Link>

            <Link
              href="/start"
              onClick={() => setOpen(false)}
              className="block text-sm font-semibold text-slate-900 hover:text-emerald-700"
            >
              Change Season
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
