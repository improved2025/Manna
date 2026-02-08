"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    function onMouseDown(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (panelRef.current?.contains(t)) return;
      if (btnRef.current?.contains(t)) return;
      setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onMouseDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [open]);

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
            <div className="text-xs text-slate-600">Daily Bread. Daily Walk.</div>
          </div>
        </Link>

        {/* Menu */}
        <div className="relative">
          <button
            ref={btnRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            aria-haspopup="menu"
            aria-expanded={open}
          >
            <span className="hidden sm:inline">Menu</span>
            <span className="sr-only">Open menu</span>

            <div className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-slate-900" />
              <span className="block h-0.5 w-5 bg-slate-900" />
              <span className="block h-0.5 w-5 bg-slate-900" />
            </div>
          </button>

          {open && (
            <div
              ref={panelRef}
              className="absolute right-0 mt-3 w-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
              role="menu"
            >
              <div className="px-4 py-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Quick actions
                </div>

                <div className="mt-3 space-y-1">
                  <MenuItem
                    href="/meditation"
                    title="Take a moment"
                    desc="Quiet reflection with God"
                    onPick={() => setOpen(false)}
                  />

                  <MenuItem
                    href="/today"
                    title="Today"
                    desc="Scripture, reflection, prayer"
                    onPick={() => setOpen(false)}
                  />

                  <div className="my-2 h-px bg-slate-200" />

                  <MenuItem
                    href="/help"
                    title="I Need Help"
                    desc="Choose how you feel right now"
                    onPick={() => setOpen(false)}
                  />

                  <MenuItem
                    href="/prayer"
                    title="Prayer Request"
                    desc="Bring it before God"
                    onPick={() => setOpen(false)}
                  />

                  <MenuItem
                    href="/start"
                    title="Change season"
                    desc="Set your season and time"
                    onPick={() => setOpen(false)}
                  />
                </div>
              </div>

              <div className="bg-slate-50 px-4 py-3">
                <div className="text-[11px] font-medium text-slate-600">
                  Scripture first. Quiet by design.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function MenuItem({
  href,
  title,
  desc,
  onPick,
}: {
  href: string;
  title: string;
  desc: string;
  onPick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onPick}
      className="block rounded-xl px-3 py-2 transition hover:bg-slate-50"
      role="menuitem"
    >
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="text-xs text-slate-600">{desc}</div>
    </Link>
  );
}
