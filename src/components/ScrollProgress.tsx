"use client";
import { useEffect, useRef } from "react";

// Fine barre dorée en haut de page indiquant la progression de lecture
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[55] h-[2px]" aria-hidden="true">
      <div ref={ref} className="h-full origin-left bg-gradient-gold shadow-[0_0_12px_rgba(212,175,90,0.8)]" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
