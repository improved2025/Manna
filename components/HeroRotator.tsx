"use client";

import { useEffect, useMemo, useState } from "react";

type HeroRotatorProps = {
  images: string[];
  intervalMs?: number;
  fadeMs?: number;
  overlayClassName?: string;
};

export default function HeroRotator({
  images,
  intervalMs = 10000,
  fadeMs = 1200,
  overlayClassName = "bg-black/25",
}: HeroRotatorProps) {
  const [index, setIndex] = useState(0);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!images || images.length <= 1) return;

    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(t);
  }, [images, intervalMs, prefersReducedMotion]);

  return (
    <div className="absolute inset-0">
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === index ? 1 : 0,
            transition: `opacity ${fadeMs}ms ease-in-out`,
          }}
        />
      ))}

      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}
