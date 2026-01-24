"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Props = { children: React.ReactNode };

export default function AppSplash({ children }: Props) {
  // Run once per app session (tab/app lifetime)
  const shouldRun = useMemo(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("manna_splash_ran") !== "1";
  }, []);

  const [phase, setPhase] = useState<"splash" | "fadeOut" | "done">(
    shouldRun ? "splash" : "done"
  );

  useEffect(() => {
    if (!shouldRun) return;

    // Timing summary:
    // 600ms fade+rise + 900ms glow (overlaps) + 350ms hold ~= 1.25s
    // then 250ms cross-fade
    const t1 = setTimeout(() => setPhase("fadeOut"), 1250);
    const t2 = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("manna_splash_ran", "1");
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [shouldRun]);

  if (phase === "done") return <>{children}</>;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* SPLASH */}
      <div
        className={[
          "absolute inset-0 flex items-center justify-center",
          "bg-emerald-800",
          "transition-opacity duration-300",
          phase === "fadeOut" ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        {/* Glow pulse (behind logo) */}
        <div className="absolute h-56 w-56 rounded-full blur-3xl bg-emerald-200/40 animate-mannaGlow" />

        {/* Logo (fade + rise) */}
        <div className="relative animate-mannaLogoIn">
          <Image
            src="/icons/manna-icon-v2.png"
            alt="MANNA"
            width={96}
            height={96}
            priority
            className="rounded-2xl"
          />
        </div>
      </div>

      {/* WELCOME CONTENT UNDERNEATH (cross-fade in) */}
      <div
        className={[
          "relative",
          "transition-opacity duration-300",
          phase === "fadeOut" ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        {children}
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes mannaLogoIn {
          0% {
            opacity: 0;
            transform: translateY(8px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }

        /* 500–600ms ease-out */
        .animate-mannaLogoIn {
          animation: mannaLogoIn 560ms ease-out forwards;
        }

        @keyframes mannaGlow {
          0% {
            opacity: 0;
            transform: scale(0.92);
          }
          35% {
            opacity: 0.4;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.12);
          }
        }

        /* 700–900ms, once only */
        .animate-mannaGlow {
          animation: mannaGlow 880ms ease-out forwards;
        }
      `}</style>
    </div>
  );
}
