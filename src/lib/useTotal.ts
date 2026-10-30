"use client";
import { useEffect, useState } from "react";

export const GOAL = 10950;

// Total collecté : chargé au montage, puis toutes les 30s et dès que la page redevient visible
export function useTotal() {
  const [raised, setRaised] = useState<number | null>(null);

  useEffect(() => {
    const fetchTotal = () => {
      fetch("/api/total")
        .then((r) => r.json())
        .then(({ total }) => setRaised(total))
        .catch(() => setRaised(0));
    };
    fetchTotal();
    const interval = setInterval(fetchTotal, 30_000);
    const onVisible = () => { if (document.visibilityState === "visible") fetchTotal(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const progress = Math.min(((raised ?? 0) / GOAL) * 100, 100);
  return { raised, progress };
}

export function useCountUp(target: number | null, active: boolean, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target === null || !active) return;
    let raf = 0;
    const start = performance.now();
    const from = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(Math.round(from + (target - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);

  return value;
}
