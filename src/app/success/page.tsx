import Link from "next/link";
import type { Metadata } from "next";
import Confetti from "@/components/Confetti";

export const metadata: Metadata = { title: "Merci — Melly" };

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[36rem] w-[36rem] rounded-full bg-gold/20 blur-[160px] animate-aurora" />
      <Confetti />

      <div className="relative z-10 max-w-lg animate-fade-in">
        <div className="relative mx-auto mb-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-gold shadow-[0_0_60px_rgba(212,175,90,0.6)] animate-pop">
          <span className="absolute inset-0 rounded-full bg-gold/40 animate-ping" aria-hidden="true" />
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="relative">
            <path d="M6 16L12 22L26 8" stroke="#0A0908" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <span className="text-[12px] uppercase tracking-[0.3em] text-gold">Don confirmé</span>
        <h1 className="font-display text-[clamp(4rem,14vw,8rem)] leading-none mt-4">
          <span className="italic text-gradient-gold">Merci&nbsp;!</span>
        </h1>

        <p className="mt-8 text-lg text-bone-muted font-light leading-relaxed">
          Votre générosité touche mon cœur. Chaque euro me rapproche de l&apos;École Pierre et de l&apos;appel
          que j&apos;ai reçu. Merci de croire en moi — et en la magie de la musique.
        </p>
        <p className="mt-6 font-display italic text-3xl text-gradient-gold">Melly</p>

        <Link
          href="/"
          className="mt-12 inline-block rounded-full bg-bone px-8 py-4 text-sm font-medium text-night hover:bg-gold-light transition-colors duration-300"
        >
          Retour au site
        </Link>
      </div>
    </div>
  );
}
