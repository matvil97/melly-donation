"use client";
import { useState, useEffect, useRef } from "react";

const GOAL = 10950;
const PRESETS = [10, 25, 50, 100, 200, 500];

export default function Donation() {
  const [selected, setSelected] = useState<number>(50);
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progressVisible, setProgressVisible] = useState(false);
  const [raised, setRaised] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const amount = custom ? Number(custom) : selected;
  const progress = Math.min(((raised ?? 0) / GOAL) * 100, 100);

  // Charge le vrai total depuis Stripe à l'affichage
  useEffect(() => {
    fetch("/api/total")
      .then((r) => r.json())
      .then(({ total }) => setRaised(total))
      .catch(() => setRaised(0));
  }, []);

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

  const handleDonate = async () => {
    if (!amount || amount < 1) { setError("Veuillez saisir un montant valide."); return; }
    setError("");
    setLoading(true);

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

  return (
    <section id="donation" ref={sectionRef} className="py-24 bg-cream-warm px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center gap-4 justify-center mb-4">
            <div className="h-px w-10 bg-gold/50" />
            <span className="text-gold text-xs tracking-[0.4em] uppercase font-sans">Cagnotte</span>
            <div className="h-px w-10 bg-gold/50" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-ink mb-3">
            Faire partie{" "}
            <span className="text-gradient-gold">de l&apos;histoire</span>
          </h2>
          <p className="text-ink-muted font-sans font-light text-base">
            Chaque contribution, quelle qu&apos;elle soit, peut tout changer
          </p>
        </div>

        {/* Progress card */}
        <div className="bg-white border border-cream-border p-8 mb-6 shadow-sm">
          <div className="flex justify-between items-end mb-4">
            <div>
              <div className="font-serif text-3xl text-gold leading-none">
                {raised === null ? (
                  <span className="inline-block w-16 h-7 bg-cream-border rounded animate-pulse" />
                ) : (
                  `${raised.toLocaleString("fr-FR")}€`
                )}
              </div>
              <div className="text-ink-faint text-xs uppercase tracking-widest mt-1 font-sans">
                collectés
              </div>
            </div>
            <div className="text-right">
              <div className="text-ink-faint text-xs uppercase tracking-widest font-sans">objectif</div>
              <div className="font-serif text-xl text-ink mt-1">
                {GOAL.toLocaleString("fr-FR")}€
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative h-1.5 bg-cream-border rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light
                         transition-all duration-[2000ms] ease-out"
              style={{ width: progressVisible ? `${Math.max(progress, 2)}%` : "0%" }}
            />
          </div>

          <div className="flex justify-between mt-2">
            <span className="text-ink-faint text-xs font-sans">{Math.round(progress)}% atteint</span>
            <span className="text-ink-faint text-xs font-sans">
              {raised === null ? "…" : `${(GOAL - raised).toLocaleString("fr-FR")}€ restants`}
            </span>
          </div>
        </div>

        {/* Preset amounts */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              onClick={() => { setSelected(preset); setCustom(""); setError(""); }}
              className={`py-4 font-serif text-xl border transition-all duration-200 ${
                selected === preset && !custom
                  ? "border-gold bg-gold text-white"
                  : "border-cream-border text-ink-muted bg-white hover:border-gold hover:text-gold"
              }`}
            >
              {preset}€
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <div className="relative mb-4">
          <input
            type="number"
            min="1"
            value={custom}
            onChange={(e) => { setCustom(e.target.value); setSelected(0); setError(""); }}
            placeholder="Autre montant (€)"
            className="w-full py-4 px-5 bg-white border border-cream-border text-ink
                       placeholder-ink-faint font-sans text-base
                       focus:border-gold focus:outline-none transition-colors duration-200"
          />
          {custom && (
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gold font-serif text-xl">€</span>
          )}
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm font-sans mb-3 text-center">{error}</p>}

        {/* CTA */}
        <button
          onClick={handleDonate}
          disabled={loading || !amount || amount < 1}
          className="w-full py-5 font-serif text-xl tracking-wide text-white
                     bg-gold hover:bg-gold-dark
                     active:scale-[0.99] transition-all duration-200
                     disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="inline-flex items-center gap-3">
              <span className="inline-block w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Redirection vers Stripe…
            </span>
          ) : amount >= 1 ? (
            `Donner ${amount.toLocaleString("fr-FR")}€ à Melly`
          ) : (
            "Choisir un montant"
          )}
        </button>

        {/* Security note */}
        <div className="flex items-center justify-center gap-2 mt-5 text-ink-faint text-xs font-sans">
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
            <path d="M6 1L1 3V7C1 10.3 3.5 13.4 6 14C8.5 13.4 11 10.3 11 7V3L6 1Z"
              stroke="currentColor" strokeWidth="1" fill="none"/>
          </svg>
          <span>Paiement 100% sécurisé par Stripe</span>
        </div>
      </div>
    </section>
  );
}
