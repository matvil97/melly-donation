"use client";
import { useState, useEffect, useRef } from "react";
import { GOAL, useCountUp, useTotal } from "@/lib/useTotal";
import { seeded } from "@/lib/seeded";
import { useIsMobile } from "@/lib/useIsMobile";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const PRESETS = [10, 25, 50, 100, 200, 500];
const POPULAR = 50;
const MILESTONES = [25, 50, 75];
// Coût d'une journée à Lyon : (650 € scolarité + 450 € logement) / 30 jours
const DAY_COST = 1100 / 30;

// Positions pseudo-aléatoires fixes, identiques côté serveur et client
const rndEmber = seeded(7);
const EMBERS = Array.from({ length: 18 }, () => ({
  left: (rndEmber() * 100).toFixed(2),
  size: (2 + rndEmber() * 4).toFixed(2),
  dur: (10 + rndEmber() * 10).toFixed(2),
  delay: (-rndEmber() * 20).toFixed(2),
  drift: ((rndEmber() - 0.5) * 140).toFixed(1),
  opacity: (0.25 + rndEmber() * 0.5).toFixed(2),
}));

const rndBurst = seeded(42);
const BURST = Array.from({ length: 22 }, (_, i) => {
  const angle = (i / 22) * Math.PI * 2 + rndBurst() * 0.4;
  const dist = 70 + rndBurst() * 90;
  return {
    tx: (Math.cos(angle) * dist).toFixed(1),
    ty: (Math.sin(angle) * dist * 0.7).toFixed(1),
    r: Math.round(rndBurst() * 540 - 270),
    size: (4 + rndBurst() * 5).toFixed(1),
    color: ["#F3DFA2", "#D4AF5A", "#F4EEE3", "#E07A3F"][i % 4],
    round: i % 3 === 0,
  };
});

function impactOf(amount: number) {
  const days = amount / DAY_COST;
  const pct = ((amount / GOAL) * 100).toLocaleString("fr-FR", { maximumFractionDigits: 1 });
  if (days < 0.75) return { days: "une partie d'une journée", pct };
  const n = Math.round(days);
  return { days: `≈ ${n} jour${n > 1 ? "s" : ""}`, pct };
}

export default function Donation() {
  const [selected, setSelected] = useState<number>(POPULAR);
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [burst, setBurst] = useState(0);
  const [progressVisible, setProgressVisible] = useState(false);
  const { raised, progress } = useTotal();
  const shown = useCountUp(raised, progressVisible);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const mobile = useIsMobile();

  const amount = custom ? Number(custom) : selected;
  const valid = amount >= 1;
  const impact = valid ? impactOf(amount) : null;
  const barWidth = progressVisible && raised !== null ? Math.max(progress, 2) : 0;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setProgressVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Halo lumineux qui suit le pointeur sur la carte
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const handleDonate = async () => {
    if (!valid) { setError("Veuillez saisir un montant valide."); return; }
    setError("");
    setLoading(true);
    setBurst((b) => b + 1);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      if (!res.ok) throw new Error();
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setError("Une erreur est survenue. Réessayez dans quelques instants.");
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.origin;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Melly — Faire partie de l'histoire",
          text: "Soutenez Melly pour son année à l'École Pierre de Lyon !",
          url,
        });
      } catch { /* partage annulé */ }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch { /* presse-papiers indisponible */ }
  };

  return (
    <section id="donation" ref={sectionRef} className="relative py-28 md:py-40 px-5 md:px-8 border-t border-line overflow-hidden">
      {/* Fond : halos + braises qui montent */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[36rem] w-[60rem] rounded-full bg-gold/15 blur-[160px] animate-aurora" />
        <div className="absolute right-0 bottom-0 h-[24rem] w-[24rem] rounded-full bg-ember/10 blur-[140px] animate-aurora [animation-delay:-8s]" />
        {EMBERS.map((e, i) => (
          <span
            key={i}
            className="ember absolute bottom-0 rounded-full bg-gold-light"
            style={{
              left: `${e.left}%`,
              width: `${e.size}px`,
              height: `${e.size}px`,
              boxShadow: `0 0 ${(Number(e.size) * 3).toFixed(1)}px rgba(243,223,162,0.8)`,
              ["--dur" as string]: `${e.dur}s`,
              ["--delay" as string]: `${e.delay}s`,
              ["--drift" as string]: `${e.drift}px`,
              ["--o" as string]: e.opacity,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* Gauche : titre + compteur */}
        <Reveal>
          <span className="text-[12px] uppercase tracking-[0.3em] text-gold">04 — Cagnotte</span>
          <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] tracking-[-0.02em] mt-6">
            Faire partie
            <br />
            <span className="italic text-gradient-gold">de l&apos;histoire.</span>
          </h2>
          <p className="mt-6 text-lg text-bone-muted font-light">
            Chaque contribution, quelle qu&apos;elle soit, peut tout changer.
          </p>

          <div className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="font-display text-[clamp(4rem,10vw,7rem)] leading-none text-bone tabular-nums">
                  {raised === null ? (
                    <span className="inline-block w-40 h-20 rounded-2xl bg-white/5 animate-pulse" />
                  ) : (
                    <>
                      {shown.toLocaleString("fr-FR")}
                      <span className="text-gradient-gold">€</span>
                    </>
                  )}
                </div>
                <div className="mt-2 text-[12px] uppercase tracking-[0.25em] text-bone-faint">collectés</div>
              </div>
              <div className="text-right pb-2">
                <div className="font-display text-3xl text-bone-muted">{GOAL.toLocaleString("fr-FR")} €</div>
                <div className="mt-1 text-[12px] uppercase tracking-[0.25em] text-bone-faint">objectif</div>
              </div>
            </div>

            {/* Jauge avec paliers et tête lumineuse */}
            <div
              className="relative mt-7"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
              aria-label="Progression de la cagnotte"
            >
              <div className="relative h-3.5 rounded-full bg-white/[0.06] ring-1 ring-white/5 overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full overflow-hidden rounded-full bg-gradient-gold transition-[width] duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                             shadow-[0_0_24px_rgba(212,175,90,0.7)]"
                  style={{ width: `${barWidth}%` }}
                >
                  <div className="absolute inset-0 shine animate-shimmer opacity-60" />
                </div>
                {MILESTONES.map((m) => (
                  <span
                    key={m}
                    className={`absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full transition-colors duration-700 ${
                      progress >= m ? "bg-ink/40" : "bg-white/15"
                    }`}
                    style={{ left: `calc(${m}% - 3px)` }}
                  />
                ))}
              </div>
              {barWidth > 0 && (
                <span
                  className="pointer-events-none absolute top-1/2 transition-[left] duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ left: `${barWidth}%` }}
                  aria-hidden="true"
                >
                  <span className="absolute -translate-x-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-gold/40 blur-md animate-tip" />
                  <span className="absolute -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-gold-light shadow-[0_0_16px_4px_rgba(243,223,162,0.8)]" />
                </span>
              )}
            </div>

            <div className="mt-4 flex justify-between text-sm text-bone-faint">
              <span>
                <span className="text-gold-light font-medium">{Math.round(progress)}%</span> atteint
              </span>
              <span>{raised === null ? "…" : `${Math.max(GOAL - raised, 0).toLocaleString("fr-FR")} € restants`}</span>
            </div>
          </div>

          {/* Où va l'argent */}
          <div className="mt-10 grid grid-cols-2 gap-3">
            {[
              { label: "Scolarité", value: "650 €", sub: "par mois" },
              { label: "Logement", value: "450 €", sub: "par mois" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl glass px-5 py-4">
                <div className="text-[11px] uppercase tracking-[0.22em] text-bone-faint">{item.label}</div>
                <div className="mt-1.5 font-display text-3xl leading-none text-bone">{item.value}</div>
                <div className="mt-1 text-sm text-bone-muted font-light">{item.sub}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Droite : formulaire */}
        <Reveal delay={150}>
          <div ref={cardRef} onPointerMove={onPointerMove} className="group/card relative">
            {/* Bordure lumineuse animée */}
            <div className="absolute -inset-px rounded-[2.25rem] bg-gradient-to-b from-gold/40 via-white/5 to-transparent" />
            <div className="absolute -inset-px rounded-[2.25rem] border-spin opacity-70" aria-hidden="true" />
            <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-gold/10 blur-3xl" aria-hidden="true" />

            <div className="relative overflow-hidden rounded-[2.25rem] bg-night-soft/95 sm:backdrop-blur-xl p-6 sm:p-8 md:p-10">
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
                style={{ background: "radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), rgba(212,175,90,0.12), transparent 60%)" }}
                aria-hidden="true"
              />

              <div className="relative">
                <div className="flex items-center justify-between mb-5">
                  <span id="amount-label" className="text-[12px] uppercase tracking-[0.25em] text-bone-faint">Choisir un montant</span>
                  <span className="hidden min-[360px]:inline-flex items-center gap-1.5 text-[11px] text-bone-faint">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                    Cagnotte active
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5" role="group" aria-labelledby="amount-label">
                  {PRESETS.map((preset) => {
                    const active = selected === preset && !custom;
                    return (
                      <motion.button
                        key={preset}
                        whileTap={mobile ? { scale: 0.9 } : undefined}
                        transition={{ type: "spring", stiffness: 500, damping: 20 }}
                        type="button"
                        aria-pressed={active}
                        onClick={() => { setSelected(preset); setCustom(""); setError(""); }}
                        className={`relative rounded-2xl py-4 font-display text-2xl cursor-pointer transition-[background-color,color,box-shadow] sm:transition-all duration-200
                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-night-soft ${
                          active
                            ? "bg-bone text-night shadow-[0_10px_34px_-8px_rgba(244,238,227,0.55)] animate-pop"
                            : "bg-white/[0.04] text-bone-muted ring-1 ring-white/10 hover:ring-gold/50 hover:text-bone hover:-translate-y-0.5"
                        }`}
                      >
                        {preset} €
                        {preset === POPULAR && (
                          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-gradient-gold px-2 py-1
                                           font-sans text-[10px] leading-none font-semibold uppercase tracking-[0.12em] text-ink shadow-md">
                            Populaire
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="relative mt-3">
                  <label htmlFor="custom-amount" className="sr-only">Autre montant en euros</label>
                  <input
                    id="custom-amount"
                    type="number"
                    min="1"
                    inputMode="numeric"
                    value={custom}
                    onChange={(e) => { setCustom(e.target.value); setSelected(0); setError(""); }}
                    placeholder="Autre montant"
                    className="no-spin w-full rounded-2xl bg-white/[0.04] ring-1 ring-white/10 py-4 pl-5 pr-12 text-bone text-base
                               placeholder:text-bone-faint hover:ring-gold/40 focus:ring-2 focus:ring-gold focus:outline-none transition-shadow"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-bone-faint font-display text-xl">€</span>
                </div>

                {/* Impact concret du montant choisi */}
                <div className="mt-5 min-h-[64px] rounded-2xl border border-gold/20 bg-gold/[0.06] px-4 py-3.5 flex items-center gap-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-light">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </span>
                  {impact ? (
                    <p key={amount} className="text-sm leading-snug text-bone-muted animate-rise-in">
                      <span className="text-bone font-medium">{amount.toLocaleString("fr-FR")} €</span> financent{" "}
                      <span className="text-gold-light">{impact.days}</span> de l&apos;année de Melly à Lyon
                      <span className="text-bone-faint"> · {impact.pct} % de l&apos;objectif</span>
                    </p>
                  ) : (
                    <p className="text-sm text-bone-faint">Choisissez un montant pour voir son impact.</p>
                  )}
                </div>

                {error && <p role="alert" className="mt-3 text-sm text-red-400 text-center">{error}</p>}

                <div className="relative mt-6">
                  {burst > 0 && (
                    <div key={burst} className="pointer-events-none absolute left-1/2 top-1/2 z-20" aria-hidden="true">
                      {BURST.map((p, i) => (
                        <span
                          key={i}
                          className={`burst absolute ${p.round ? "rounded-full" : "rounded-[2px]"}`}
                          style={{
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            background: p.color,
                            ["--tx" as string]: `${p.tx}px`,
                            ["--ty" as string]: `${p.ty}px`,
                            ["--r" as string]: `${p.r}deg`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                  <motion.button
                    type="button"
                    onClick={handleDonate}
                    whileTap={mobile && !loading && valid ? { scale: 0.96 } : undefined}
                    disabled={loading || !valid}
                    className="group relative w-full overflow-hidden rounded-2xl bg-gradient-gold px-4 py-5 text-base min-[360px]:text-lg font-semibold text-ink cursor-pointer
                               shadow-[0_14px_50px_-12px_rgba(212,175,90,0.8)] hover:shadow-[0_18px_60px_-10px_rgba(212,175,90,1)]
                               sm:hover:-translate-y-0.5 sm:active:translate-y-0 sm:active:scale-[0.99] transition-[box-shadow,opacity] sm:transition-all duration-200
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-night-soft
                               disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    <span className="relative z-10 inline-flex items-center justify-center gap-2.5">
                      {loading ? (
                        <>
                          <span className="inline-block w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                          Redirection vers Stripe…
                        </>
                      ) : valid ? (
                        <>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="group-hover:animate-heartbeat" aria-hidden="true">
                            <path d="M12 21s-7.5-4.6-10-9.4C.4 8.3 2.3 4 6.4 4c2.3 0 3.9 1.3 5.6 3.3C13.7 5.3 15.3 4 17.6 4 21.7 4 23.6 8.3 22 11.6 19.5 16.4 12 21 12 21z" />
                          </svg>
                          <span key={amount} className="animate-rise-in">Donner {amount.toLocaleString("fr-FR")} € à Melly</span>
                        </>
                      ) : (
                        "Choisir un montant"
                      )}
                    </span>
                    <span className="absolute inset-0 shine animate-shimmer" />
                  </motion.button>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-bone-faint">
                  <span className="inline-flex items-center gap-1.5">
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
                      <path d="M6 1L1 3V7C1 10.3 3.5 13.4 6 14C8.5 13.4 11 10.3 11 7V3L6 1Z" stroke="currentColor" strokeWidth="1" />
                    </svg>
                    Paiement sécurisé par Stripe
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Sans création de compte
                  </span>
                </div>

                <div className="my-6 h-px bg-line" />

                <button
                  type="button"
                  onClick={handleShare}
                  className="group w-full inline-flex items-center justify-center gap-2.5 rounded-2xl py-3.5 text-sm text-bone-muted cursor-pointer
                             ring-1 ring-white/10 hover:ring-gold/40 hover:text-bone hover:bg-white/[0.03] transition-all duration-200
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  {copied ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-emerald-400" aria-hidden="true">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="animate-rise-in">Lien copié, merci de partager !</span>
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:-translate-y-0.5" aria-hidden="true">
                        <path d="M12 3v13M7 8l5-5 5 5M5 14v5a2 2 0 002 2h10a2 2 0 002-2v-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Pas de don possible ? Partager la cagnotte
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
