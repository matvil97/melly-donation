"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-cream">
      {/* Warm gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 70% 40%, #F5E6B322 0%, transparent 65%)",
        }}
      />

      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-32">
        {/* Left — text */}
        <div
          className={`transition-all duration-1000 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-7">
            <div className="h-px w-10 bg-gold" />
            <span className="text-gold text-xs tracking-[0.4em] uppercase font-sans">
              École Pierre · Lyon
            </span>
          </div>

          {/* Name */}
          <h1 className="font-serif font-black leading-[1.05] mb-6">
            <span className="block text-gradient-gold text-[72px] md:text-[88px] leading-none">
              Melly
            </span>
            <span className="block text-ink text-4xl md:text-5xl tracking-widest mt-1 font-light">
              MALONGA
            </span>
          </h1>

          {/* Tagline */}
          <p className="font-sans font-light text-ink-muted text-lg leading-relaxed mb-10 max-w-sm">
            Chanteuse de talent, elle a besoin de vous pour
            franchir les portes de l&apos;école de ses rêves.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#donation"
              className="animate-pulse-glow inline-block px-9 py-4 bg-gold text-white font-sans
                         text-sm tracking-[0.2em] uppercase hover:bg-gold-dark transition-colors duration-300 text-center"
            >
              Soutenir Melly
            </a>
            <a
              href="#story"
              className="inline-block px-9 py-4 border border-cream-border text-ink-muted font-sans
                         text-sm tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-all duration-300 text-center"
            >
              Son histoire
            </a>
          </div>

          {/* Goal badge */}
          <div className="mt-10 inline-flex items-center gap-3 px-5 py-3 bg-cream-warm border border-cream-border">
            <span className="font-serif text-2xl text-gold">10 950€</span>
            <span className="text-ink-faint text-sm font-sans">à collecter</span>
          </div>
        </div>

        {/* Right — photo */}
        <div
          className={`relative transition-all duration-1000 delay-200 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Gold frame decoration */}
          <div className="absolute -top-3 -right-3 w-full h-full border border-gold/30 z-0" />
          <div className="relative z-10 overflow-hidden" style={{ aspectRatio: "3/4" }}>
            <Image
              src="/images/IMG_1047_edited.jpg"
              alt="Melly Malonga"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Subtle warm overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, transparent 60%, rgba(253,249,243,0.3) 100%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-ink-faint text-[10px] tracking-[0.4em] uppercase font-sans">
          Découvrir
        </span>
        <div className="animate-scroll-hint">
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="#C9A84C" strokeOpacity="0.4" strokeWidth="1" />
            <circle cx="8" cy="7" r="2" fill="#C9A84C" fillOpacity="0.5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
