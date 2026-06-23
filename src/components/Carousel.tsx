"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const photos = [
  { src: "/images/IMG_1500.jpg",  alt: "Melly Malonga" },
  { src: "/images/IMG_1986.jpg",  alt: "Melly Malonga" },
  { src: "/images/IMG_6137.jpg",  alt: "Melly Malonga" },
  { src: "/images/IMG_7465.jpg",  alt: "Melly Malonga" },
  { src: "/images/IMG_7496.jpg",  alt: "Melly Malonga" },
  { src: "/images/IMG_7947.jpg",  alt: "Melly Malonga" },
  { src: "/images/IMG_7948.jpg",  alt: "Melly Malonga" },
  { src: "/images/IMG_8866.jpg",  alt: "Melly Malonga" },
  { src: "/images/IMG_9021.jpg",  alt: "Melly Malonga" },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 900);
    },
    [isTransitioning]
  );

  const next = useCallback(() => goTo((current + 1) % photos.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + photos.length) % photos.length), [current, goTo]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { next(); resetTimer(); }
      if (e.key === "ArrowLeft")  { prev(); resetTimer(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, resetTimer]);

  return (
    <section className="py-24 bg-cream-warm">
      {/* Header */}
      <div className="text-center mb-14 px-4">
        <div className="flex items-center gap-4 justify-center mb-4">
          <div className="h-px w-10 bg-gold/50" />
          <span className="text-gold text-xs tracking-[0.4em] uppercase font-sans">Galerie</span>
          <div className="h-px w-10 bg-gold/50" />
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-ink">
          Son <span className="text-gradient-gold">Univers</span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto px-4 items-start">

        {/* Main image — portrait format */}
        <div className="w-full md:flex-1 relative group">
          {/* Gold corner accents */}
          <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-gold z-20 pointer-events-none" />
          <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-gold z-20 pointer-events-none" />
          <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-gold z-20 pointer-events-none" />
          <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-gold z-20 pointer-events-none" />

          {/* Portrait container — 3:4 ratio shows the full person */}
          <div className="relative overflow-hidden shadow-xl shadow-ink/10" style={{ aspectRatio: "3/4" }}>
            {photos.map((photo, i) => (
              <div
                key={i}
                className={`absolute inset-0 carousel-slide ${i === current ? "active" : "inactive"}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover object-center"
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                {/* Subtle bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            ))}

            {/* Counter */}
            <div className="absolute bottom-4 right-4 z-20 font-sans text-white/80 text-sm tracking-widest drop-shadow">
              {String(current + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(photos.length).padStart(2, "0")}
            </div>

            {/* Arrows */}
            <button
              onClick={() => { prev(); resetTimer(); }}
              aria-label="Photo précédente"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10
                         flex items-center justify-center
                         bg-white/85 backdrop-blur-sm text-ink hover:bg-gold hover:text-white
                         transition-all duration-300 shadow-md
                         opacity-0 group-hover:opacity-100"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={() => { next(); resetTimer(); }}
              aria-label="Photo suivante"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10
                         flex items-center justify-center
                         bg-white/85 backdrop-blur-sm text-ink hover:bg-gold hover:text-white
                         transition-all duration-300 shadow-md
                         opacity-0 group-hover:opacity-100"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center items-center gap-2 mt-4">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => { goTo(i); resetTimer(); }}
                className={`transition-all duration-300 rounded-full ${
                  i === current ? "w-7 h-1.5 bg-gold" : "w-1.5 h-1.5 bg-cream-border hover:bg-gold/40"
                }`}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail grid — sidebar on desktop, strip on mobile */}
        <div className="w-full md:w-40 grid grid-cols-5 md:grid-cols-2 gap-2">
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); resetTimer(); }}
              className={`relative overflow-hidden transition-all duration-300 ${
                i === current
                  ? "ring-2 ring-gold opacity-100"
                  : "opacity-50 hover:opacity-80"
              }`}
              style={{ aspectRatio: "3/4" }}
              aria-label={`Photo ${i + 1}`}
            >
              <Image
                src={photo.src}
                alt={`Miniature ${i + 1}`}
                fill
                className="object-cover object-center"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
