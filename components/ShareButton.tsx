"use client";

import { useMemo, useState } from "react";

type Props = {
  className?: string;
};

export default function ShareButton({ className }: Props) {
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/welcome`;
  }, []);

  async function onShare() {
    if (!shareUrl) return;

    const data = {
      title: "MANNA",
      text: "A quiet daily walk with God.",
      url: shareUrl,
    };

    try {
      // Native share sheet (best on mobile)
      if (navigator.share) {
        await navigator.share(data);
        return;
      }

      // Fallback: copy link
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Older fallback
        const ta = document.createElement("textarea");
        ta.value = shareUrl;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }

      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // user cancelled share; do nothing
    }
  }

  return (
    <button
      type="button"
      onClick={onShare}
      className={
        className ??
        "rounded-md border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
      }
      aria-label="Share MANNA"
    >
      {copied ? "COPIED" : "SHARE"}
    </button>
  );
}
