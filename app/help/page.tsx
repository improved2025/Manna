"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EMOTIONAL_STATES } from "@/content/emotional-states";
import SurrenderCta from "@/components/SurrenderCta";

function toLabel(slug: string) {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

function chipStyle(state: string) {
  const map: Record<string, string> = {
    discouraged:
      "bg-amber-50 border-amber-200 text-amber-950 hover:bg-amber-100",
    lonely:
      "bg-indigo-50 border-indigo-200 text-indigo-950 hover:bg-indigo-100",
    angry: "bg-rose-50 border-rose-200 text-rose-950 hover:bg-rose-100",
    afraid: "bg-sky-50 border-sky-200 text-sky-950 hover:bg-sky-100",
    hurting:
      "bg-violet-50 border-violet-200 text-violet-950 hover:bg-violet-100",
    stuck: "bg-slate-50 border-slate-200 text-slate-950 hover:bg-slate-100",
    exhausted:
      "bg-emerald-50 border-emerald-200 text-emerald-950 hover:bg-emerald-100",
  };

  return (
    map[state] ??
    "bg-slate-50 border-slate-200 text-slate-950 hover:bg-slate-100"
  );
}

export default function HelpPage() {
  const pathname = usePathname();
  const states = Object.keys(EMOTIONAL_STATES);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-slate-900">
        What are you feeling right now?
      </h1>

      <p className="mt-3 text-slate-600">
        Choose what best describes where you are. You don’t have to explain it.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        {states.map((state) => {
          const href = `/help/${state}`;
          const isActive = pathname === href;

          return (
            <Link
              key={state}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={[
                "inline-flex items-center justify-center",
                "rounded-full border",
                "px-8 py-4",
                "text-lg font-semibold",
                "shadow-sm",
                "transition",
                "hover:shadow-md",
                "active:translate-y-[1px] active:shadow-sm",
                chipStyle(state),
                isActive
                  ? "ring-2 ring-slate-300 ring-offset-2 ring-offset-white"
                  : "",
              ].join(" ")}
            >
              {toLabel(state)}
            </Link>
          );
        })}
      </div>

      <SurrenderCta />

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
