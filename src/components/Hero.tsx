"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GOAL, useTotal } from "@/lib/useTotal";
import Tilt from "./Tilt";

const MARQUEE = ["Louange", "Chant", "Composition", "MAO", "Technique vocale", "École Pierre", "Lyon", "2026 — 2027"];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [marqueeOff, setMarqueeOff] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const { raised, progress } = useTotal();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    const el = marqueeRef.current;
    const io = new IntersectionObserver(([e]) => setMarqueeOff(!e.isIntersecting));
    if (el) io.observe(el);
    return () => { clearTimeout(t); io.disconnect(); };
  }, []);

  // Le délai de chaque bloc est passé en style inline (transitionDelay)
  const show = () =>
    `transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
      mounted ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"
    }`;

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* Aurora */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-10%] h-[38rem] w-[38rem] rounded-full bg-gold/25 blur-[140px] animate-aurora" />
        <div className="absolute top-1/3 -left-40 h-[30rem] w-[30rem] rounded-full bg-ember/15 blur-[140px] animate-aurora [animation-delay:-6s]" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(var(--c-bone) / 0.12) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--c-bone) / 0.12) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative flex-1 max-w-7xl mx-auto w-full px-5 md:px-8 pt-32 md:pt-36 pb-16 grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-10 items-center">
        {/* Left — text */}
        <div>
          <div className={show()}>
            <span className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 text-[12px] text-bone-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              Cagnotte ouverte · École Pierre, Lyon
            </span>
          </div>

          <h1
            className={`font-display tracking-[-0.03em] mt-8 ${show()}`}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="block text-[clamp(4.5rem,14vw,10.5rem)] leading-[1] text-bone">Melly</span>
            <span className="block italic text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.1] text-gradient-gold mt-1 md:pl-2">
              une voix pour servir.
            </span>
          </h1>

          <p
            className={`mt-8 max-w-md text-lg md:text-xl leading-relaxed text-bone-muted font-light ${show()}`}
            style={{ transitionDelay: "220ms" }}
          >
            Ce n&apos;est pas seulement une histoire de musique.{" "}
            <span className="text-bone">Aujourd&apos;hui, je réponds à l&apos;appel.</span>
          </p>

          <div className={`mt-10 flex flex-wrap items-center gap-3 ${show()}`} style={{ transitionDelay: "320ms" }}>
            <a
              href="#donation"
              className="group relative overflow-hidden rounded-full bg-gradient-gold px-7 py-4 text-[15px] font-semibold text-ink
                         shadow-[0_10px_40px_-10px_rgba(212,175,90,0.7)] hover:shadow-[0_14px_50px_-8px_rgba(212,175,90,0.9)]
                         transition-shadow duration-300"
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                Soutenir Melly
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
                  <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="absolute inset-0 shine animate-shimmer" />
            </a>
            <a
              href="#video"
              className="group inline-flex items-center gap-3 rounded-full glass pl-2 pr-6 py-2 text-[15px] text-bone hover:bg-white/10 transition-colors"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bone text-night transition-transform group-hover:scale-110">
                <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor"><path d="M0 0v14l12-7z" /></svg>
              </span>
              Voir son message
            </a>
          </div>
        </div>

        {/* Right — photo */}
        <div
          className={`relative mx-auto w-full max-w-[440px] ${show()}`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="absolute -inset-6 rounded-[3rem] bg-gold/20 blur-3xl opacity-60" />
          <Tilt max={9} glare={false} className="rounded-[2.25rem]">
          <div className="relative overflow-hidden rounded-[2.25rem] ring-1 ring-white/10" style={{ aspectRatio: "4/5" }}>
            <Image
              src="/images/IMG_3215.JPG"
              alt="Melly"
              fill
              className="object-cover object-[center_35%] scale-[1.02]"
              priority
              sizes="(max-width: 1024px) 90vw, 440px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
              style={{ background: "radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.2), transparent 55%)" }}
              aria-hidden="true"
            />
          </div>

          {/* Pastille de progression, détachée en avant (profondeur 3D) */}
          <div className="absolute -bottom-6 left-4 right-4 sm:left-auto sm:-left-10 sm:right-auto sm:w-72 [transform:translateZ(70px)]">
          <a
            href="#donation"
            className="block glass bg-night/40 rounded-2xl p-4 animate-float
                       shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-display text-3xl text-bone">
                {raised === null ? "—" : `${raised.toLocaleString("fr-FR")} €`}
              </span>
              <span className="text-xs text-gold font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="mt-2.5 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-gold transition-all duration-[1600ms] ease-out"
                style={{ width: `${raised === null ? 0 : Math.max(progress, 3)}%` }}
              />
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-bone-faint">
              collectés sur {GOAL.toLocaleString("fr-FR")} €
            </div>
          </a>
          </div>
          </Tilt>
        </div>
      </div>

      {/* Marquee (mis en pause hors de l'écran) */}
      <div ref={marqueeRef} className={`relative border-y border-line py-5 overflow-hidden mask-fade-x ${marqueeOff ? "marquee-offscreen" : ""}`}>
        <div className="flex w-max animate-marquee">
          {[...MARQUEE, ...MARQUEE].map((word, i) => (
            <span key={i} className="flex items-center font-display italic text-3xl md:text-4xl text-bone/80 whitespace-nowrap">
              <span className="px-8">{word}</span>
              <span className="text-gold text-xl">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
