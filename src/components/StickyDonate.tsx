"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTotal } from "@/lib/useTotal";

// Barre de don flottante sur mobile : visible après le hero, masquée sur la section cagnotte.
// Elle publie sa hauteur dans --sticky-h pour que le bouton du chatbot se place au-dessus.
export default function StickyDonate() {
  const [pastHero, setPastHero] = useState(false);
  const [onDonation, setOnDonation] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const { raised, progress } = useTotal();

  useEffect(() => {
    // Basé sur des IntersectionObserver (et non sur scrollY / innerHeight, qui change quand la
    // barre de Safari se rétracte) : pas de bascule en boucle pendant le défilement
    const hero = document.getElementById("accueil");
    const donation = document.getElementById("donation");
    // Zone observée = 40 % bas de l'écran : la barre apparaît quand le bas du hero remonte au-dessus
    const heroObs = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), { rootMargin: "-60% 0px 0px 0px" });
    const donationObs = new IntersectionObserver(([e]) => setOnDonation(e.isIntersecting), { threshold: 0.1 });
    if (hero) heroObs.observe(hero);
    if (donation) donationObs.observe(donation);
    return () => {
      heroObs.disconnect();
      donationObs.disconnect();
    };
  }, []);

  const show = pastHero && !onDonation;

  // Hauteur réelle de la barre (safe area comprise) → variable CSS lue par le bouton du chatbot
  useEffect(() => {
    const root = document.documentElement;
    const el = barRef.current;
    if (!show || !el) {
      root.style.setProperty("--sticky-h", "0px");
      return;
    }
    const ro = new ResizeObserver(() => root.style.setProperty("--sticky-h", `${el.offsetHeight}px`));
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.setProperty("--sticky-h", "0px");
    };
  }, [show]);

  return (
    <AnimatePresence>
    {show && (
    <motion.div
      key="sticky-donate"
      ref={barRef}
      className="fixed-layer bottom-scrim fixed inset-x-0 bottom-0 z-40 px-3 pt-5 sm:hidden"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)" }}
      // Garde translateZ(0) même après l'animation (framer remettrait sinon « transform: none »)
      transformTemplate={(_, generated) => `${generated === "none" ? "" : generated} translateZ(0)`}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%", transition: { duration: 0.25, ease: "easeIn" } }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.a
        href="#donation"
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-3 rounded-2xl bg-night-soft ring-1 ring-white/10 p-2 pl-4 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.6)]"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between">
            <span className="font-display text-xl text-bone">
              {raised === null ? "—" : `${raised.toLocaleString("fr-FR")} €`}
            </span>
            <span className="text-xs font-medium text-gold">{Math.round(progress)}%</span>
          </div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-gold"
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(progress, 3)}%` }}
              transition={{ delay: 0.25, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
        <span className="relative overflow-hidden rounded-xl bg-gradient-gold px-4 py-3 text-sm font-semibold text-ink">
          <span className="relative z-10">Faire un don</span>
          <span className="absolute inset-0 shine animate-shimmer" />
        </span>
      </motion.a>
    </motion.div>
    )}
    </AnimatePresence>
  );
}
