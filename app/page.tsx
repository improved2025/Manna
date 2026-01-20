"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LandingPage from "./landing/page";

function hasOnboarding(): boolean {
  const season = localStorage.getItem("manna_season");
  const time = localStorage.getItem("manna_time");
  return Boolean(season && time);
}

export default function Home() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (hasOnboarding()) {
      router.replace("/today");
      return;
    }
    setReady(true);
  }, [router]);

  // Prevent a flash of the home page if we’re about to redirect
  if (!ready) return null;

  return <LandingPage />;
}
