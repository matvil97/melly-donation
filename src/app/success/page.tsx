import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Merci — Melly" };

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 text-center relative">
      {/* Warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, #F5E6B320 0%, transparent 70%)",
        }}
      />

      {/* Gold corner decorations */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-gold/40" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-gold/40" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-gold/40" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-gold/40" />

      <div className="relative z-10 max-w-md animate-fade-in">
        {/* Check icon */}
        <div className="w-20 h-20 mx-auto mb-8 bg-gold/10 border border-gold/30 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M6 16L12 22L26 8"
              stroke="#C9A84C" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="font-serif text-5xl text-gradient-gold mb-4">Merci&nbsp;!</h1>

        <div className="flex items-center gap-3 justify-center mb-8">
          <div className="h-px w-10 bg-gold/40" />
          <span className="text-gold/70 text-xs tracking-widest uppercase font-sans">Don confirmé</span>
          <div className="h-px w-10 bg-gold/40" />
        </div>

        <p className="text-ink-muted font-sans font-light text-lg leading-relaxed mb-10">
          Votre générosité touche notre cœur. Chaque euro rapproche Melly de la scène
          qu&apos;elle mérite. Merci de croire en elle — et en la magie de la musique.
        </p>

        <Link
          href="/"
          className="inline-block px-10 py-4 bg-gold text-white font-sans text-sm
                     tracking-[0.2em] uppercase hover:bg-gold-dark transition-colors duration-300"
        >
          Retour au site
        </Link>
      </div>
    </div>
  );
}
