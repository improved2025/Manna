"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function MeditationSessionPage() {
  const router = useRouter();

  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const [started, setStarted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopAudio = () => {
    const el = audioRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  // Start the 15-minute countdown after user taps Begin
  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [started]);

  // Start audio after user taps Begin (iOS-safe: user gesture triggers this state)
  useEffect(() => {
    if (!started) return;

    const el = audioRef.current;
    if (!el) return;

    el.currentTime = 0;

    const playPromise = el.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.catch(() => {
        // iOS can still block play in rare cases (low-power mode, etc).
        // We keep the UI calm; user can tap Begin again or use device controls.
      });
    }
  }, [started]);

  // When timer hits 0, fade out audio gently, then return to /today
  useEffect(() => {
    if (secondsLeft !== 0) return;

    const el = audioRef.current;

    // Gentle fade-out (2.5s) if possible
    let fadeInterval: any = null;
    if (el) {
      const startVolume = typeof el.volume === "number" ? el.volume : 1;
      const steps = 25;
      const stepTimeMs = 100; // 25 * 100ms = 2.5s
      let currentStep = 0;

      fadeInterval = setInterval(() => {
        currentStep += 1;
        const nextVol = Math.max(0, startVolume * (1 - currentStep / steps));
        el.volume = nextVol;

        if (currentStep >= steps) {
          clearInterval(fadeInterval);
          stopAudio();
          // reset volume for next time
          el.volume = startVolume;
        }
      }, stepTimeMs);
    }

    const t = setTimeout(() => {
      if (fadeInterval) clearInterval(fadeInterval);
      stopAudio();
      router.push("/today");
    }, 2000);

    return () => {
      if (fadeInterval) clearInterval(fadeInterval);
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, router]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeLabel = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Audio element (served from /public/audio/meditation-15.mp3) */}
      <audio ref={audioRef} src="/audio/meditation-15.mp3" preload="auto" />

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
         backgroundImage: "url(/images/ocean.jpg)",

        }}
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center text-white">
          {!started ? (
            <>
              <p className="text-sm text-white/80">Settle in.</p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight">
                Breathe. Be still.
              </h1>

              <p className="mt-3 text-base text-white/80 leading-relaxed">
                When you’re ready, begin the 15-minute session.
              </p>

              <button
                onClick={() => setStarted(true)}
                className="mt-10 inline-flex w-full items-center justify-center rounded-xl bg-white/90 px-5 py-3 text-base font-semibold text-black transition hover:bg-white"
              >
                Begin
              </button>

              <button
                onClick={() => {
                  stopAudio();
                  router.push("/today");
                }}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-base font-medium text-white/90 hover:bg-white/10"
              >
                Exit to Today
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-white/80">Stay here.</p>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Breathe. Be still.
              </h2>

              {/* Tiny countdown (subtle) */}
              <p className="mt-6 text-sm text-white/70">{timeLabel}</p>

              <button
                onClick={() => {
                  stopAudio();
                  router.push("/today");
                }}
                className="mt-10 inline-flex w-full items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-base font-medium text-white/90 hover:bg-white/10"
              >
                End early and return
              </button>

              {secondsLeft === 0 && (
                <p className="mt-6 text-sm text-white/80">
                  Take a moment… returning to Today.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
