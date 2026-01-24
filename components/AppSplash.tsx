"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AppSplash({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (showSplash) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-white">
        <div className="text-center">
          <Image
            src="/icons/manna-icon-v2.png"
            alt="MANNA"
            width={80}
            height={80}
            priority
            className="mx-auto rounded-2xl"
          />
          <p className="mt-4 text-sm text-neutral-600">Daily Bread. Daily Walk.</p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
