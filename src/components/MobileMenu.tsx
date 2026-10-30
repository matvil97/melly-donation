"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { HELLOASSO_URL } from "@/lib/links";

const LINKS = [
  { href: "/#video", label: "Son message" },
  { href: "/#story", label: "Mon histoire" },
  { href: "/#projet", label: "Le projet" },
  { href: "/#donation", label: "La cagnotte" },
];

const list: Variants = {
  closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.18 } },
};
const item: Variants = {
  closed: { opacity: 0, y: 40, rotateX: -45 },
  open: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

// Cercle qui part du bouton menu (en haut à droite)
const ORIGIN = "at calc(100% - 44px) 44px";

// Menu plein écran du mobile (masqué à partir de 640px)
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        whileTap={{ scale: 0.88 }}
        className="sm:hidden relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-bone
                   hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <motion.span
          className="absolute h-[1.5px] w-5 rounded-full bg-current"
          animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 26 }}
        />
        <motion.span
          className="absolute h-[1.5px] w-5 rounded-full bg-current"
          animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
          transition={{ type: "spring", stiffness: 400, damping: 26 }}
        />
      </motion.button>

      {/* Portail : le flou de la barre de navigation piégerait un élément « fixed » enfant */}
      {mounted && createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="sm:hidden fixed inset-0 z-[48] flex flex-col bg-night/95 backdrop-blur-xl px-6 pt-28
                       pb-[calc(2rem+env(safe-area-inset-bottom))] overflow-y-auto"
            initial={{ clipPath: `circle(0% ${ORIGIN})` }}
            animate={{ clipPath: `circle(150% ${ORIGIN})` }}
            exit={{ clipPath: `circle(0% ${ORIGIN})`, transition: { duration: 0.45, ease: [0.65, 0, 0.35, 1], delay: 0.15 } }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-gold/20 blur-[100px]" aria-hidden="true" />

            <motion.ul className="relative space-y-1 [perspective:600px]" variants={list} initial="closed" animate="open" exit="closed">
              {LINKS.map((l, i) => (
                <motion.li key={l.href} variants={item} className="origin-bottom">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 py-2.5 font-display text-[clamp(2.4rem,12vw,3.4rem)] leading-tight text-bone"
                  >
                    <span className="font-sans text-xs tracking-[0.2em] text-gold">0{i + 1}</span>
                    <span className="transition-colors group-active:text-gold-light">{l.label}</span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="relative mt-auto pt-10 space-y-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5, type: "spring", stiffness: 200, damping: 24 } }}
              exit={{ opacity: 0, y: 20, transition: { duration: 0.15 } }}
            >
              <motion.a
                href="/#donation"
                onClick={() => setOpen(false)}
                whileTap={{ scale: 0.97 }}
                className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-gold py-4 text-base font-semibold text-ink
                           shadow-[0_14px_40px_-12px_rgba(212,175,90,0.8)]"
              >
                <span className="relative z-10">Faire un don à Melly</span>
                <span className="absolute inset-0 shine animate-shimmer" />
              </motion.a>
              <motion.a
                href={HELLOASSO_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.97 }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm text-bone ring-1 ring-white/15"
              >
                Donner via HelloAsso
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="sr-only"> (nouvel onglet)</span>
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </>
  );
}
