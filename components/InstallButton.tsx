"use client";

import { useEffect, useMemo, useState } from "react";

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

type InstallButtonProps = {
  className?: string;
};

function isIOS() {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(ua);
}

function isStandalone() {
  if (typeof window === "undefined") return false;
  const w = window as any;
  return (
    w.matchMedia?.("(display-mode: standalone)")?.matches ||
    w.navigator?.standalone === true
  );
}

export default function InstallButton({ className = "" }: InstallButtonProps) {
  const [bip, setBip] = useState<BIPEvent | null>(null);
  const [openHelp, setOpenHelp] = useState(false);
  const [installed, setInstalled] = useState(false);

  const ios = useMemo(() => isIOS(), []);

  useEffect(() => {
    setInstalled(isStandalone());

    const onBIP = (e: Event) => {
      e.preventDefault();
      setBip(e as BIPEvent);
    };

    const onInstalled = () => setInstalled(true);

    window.addEventListener("beforeinstallprompt", onBIP);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBIP);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function handleInstall() {
    if (installed) return;

    if (bip) {
      await bip.prompt();
      try {
        await bip.userChoice;
      } finally {
        setBip(null);
      }
      return;
    }

    setOpenHelp(true);
  }

  const label = installed ? "Installed" : "Install";

  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-all duration-200";
  const state = installed
    ? "border border-slate-200 bg-slate-100 text-slate-500"
    : "bg-emerald-700 text-white hover:bg-emerald-800 hover:-translate-y-[1px]";

  return (
    <>
      <button
        type="button"
        onClick={handleInstall}
        disabled={installed}
        className={[base, state, className].filter(Boolean).join(" ")}
      >
        {label}
      </button>

      {openHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="text-lg font-semibold text-slate-900">
              Install MANNA
            </div>

            {ios ? (
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700">
                <p>On iPhone or iPad, install through Safari:</p>
                <ol className="list-decimal space-y-2 pl-5">
                  <li>Open this site in Safari.</li>
                  <li>Tap the Share icon.</li>
                  <li>Tap Add to Home Screen.</li>
                  <li>Tap Add.</li>
                </ol>
              </div>
            ) : (
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700">
                <p>Your browser is not showing the install prompt right now.</p>
                <p>Try Chrome on Android, then return and tap Install again.</p>
              </div>
            )}

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setOpenHelp(false)}
                className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
