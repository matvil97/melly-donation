"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTotal } from "@/lib/useTotal";

// Barre de don flottante sur mobile : visible après le hero, masquée sur la section cagnotte
export default function StickyDonate() {
  const [pastHero, setPastHero] = useState(false);
  const [onDonation, setOnDonation] = useState(false);
  const { raised, progress } = useTotal();

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const target = document.getElementById("donation");
    const observer = new IntersectionObserver(([entry]) => setOnDonation(entry.isIntersecting), { threshold: 0.1 });
    if (target) observer.observe(target);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const show = pastHero && !onDonation;

  return (
    <AnimatePresence>
    {show && (
    <motion.div
      key="sticky-donate"
      className="fixed inset-x-0 bottom-0 z-40 px-3 sm:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      initial={{ y: "130%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "130%", opacity: 0, transition: { duration: 0.25, ease: "easeIn" } }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
    >
      <motion.a
        href="#donation"
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-3 rounded-2xl glass bg-night-soft/95 p-2 pl-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]"
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
