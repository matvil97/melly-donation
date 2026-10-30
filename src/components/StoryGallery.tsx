"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const photos = [
  { src: "/images/IMG_1047_edited.jpg" },
  { src: "/images/55209099528_5fe9411427_c.jpg" },
  { src: "/images/IMG_1163_edited.jpg" },
  { src: "/images/55208046837_5f29cf2680_c.jpg" },
  { src: "/images/55209099523_2383c9646b_c.jpg" },
  { src: "/images/54345753034_e5ae5d24fa_c.jpg" },
];

const SPEED = 40; // px par seconde

// Galerie en boucle infinie : défile seule, se met en pause au survol / toucher, reste glissable à la main
export default function StoryGallery() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = 0;
    let pos = el.scrollLeft;
    let paused = false;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;

    // Distance d'une boucle = écart entre la 1re photo et sa copie
    const loopWidth = () => {
      const first = el.querySelector<HTMLElement>("[data-index='0']");
      const copy = el.querySelector<HTMLElement>(`[data-index='${photos.length}']`);
      return first && copy ? copy.offsetLeft - first.offsetLeft : 0;
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 64) : 0;
      last = now;
      if (!paused) {
        const loop = loopWidth();
        pos += (SPEED * dt) / 1000;
        if (loop > 0 && pos >= loop) pos -= loop;
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(tick);
    };

    const pause = () => {
      paused = true;
      if (resumeTimer) clearTimeout(resumeTimer);
    };
    const resume = (delay = 0) => {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        const loop = loopWidth();
        pos = el.scrollLeft;
        if (loop > 0 && pos >= loop) { pos -= loop; el.scrollLeft = pos; }
        paused = false;
      }, delay);
    };

    const onEnter = () => pause();
    const onLeave = () => resume();
    const onTouchStart = () => pause();
    const onTouchEnd = () => resume(2500);
    const onWheel = () => { pause(); resume(1500); };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("wheel", onWheel, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      if (resumeTimer) clearTimeout(resumeTimer);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar mask-fade-x px-5 md:px-8 pb-14"
      role="region"
      aria-label="Galerie photos de Melly"
    >
      {[...photos, ...photos].map((photo, i) => (
        <div
          key={i}
          data-index={i}
          aria-hidden={i >= photos.length}
          className={`group relative shrink-0 overflow-hidden rounded-[1.75rem] ring-1 ring-white/10
                      w-[72vw] sm:w-[340px] ${i % 2 ? "md:mt-12" : ""}`}
          style={{ aspectRatio: "3/4" }}
        >
          <Image
            src={photo.src}
            alt={i < photos.length ? "Melly en louange" : ""}
            fill
            loading="eager"
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 72vw, 340px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      ))}
    </div>
  );
}
