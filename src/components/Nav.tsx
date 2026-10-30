"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

// Liens absolus pour fonctionner aussi depuis les pages légales
const LINKS = [
  { href: "/#video", label: "Vidéo" },
  { href: "/#story", label: "Histoire" },
  { href: "/#projet", label: "Projet" },
];

// Hystérésis : on passe en « scrollé » au-delà de 56px et on revient en-dessous de 24px,
// pour ne jamais basculer en boucle autour d'un seuil (rebond / inertie d'iOS)
const ON = 56;
const OFF = 24;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    let current = false;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const next = current ? y > OFF : y > ON;
      if (next !== current) {
        current = next;
        setScrolled(next);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav className="fixed-layer fixed inset-x-0 top-0 z-50 pointer-events-none">
      {/* Mobile : masque pleine largeur de la barre d'état jusque sous la pilule */}
      <div
        className={`top-scrim absolute inset-x-0 top-0 sm:hidden transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      />
      <div className="relative flex justify-center px-4 pt-[calc(env(safe-area-inset-top,0px)+0.75rem)] sm:pt-4">
        <div
          className={`pointer-events-auto flex items-center gap-1 min-[340px]:gap-2 rounded-full pl-4 min-[340px]:pl-5 pr-1.5 py-1.5
                      transition-[background-color,box-shadow,border-color] duration-500 ${
            scrolled
              ? "glass nav-pill-solid bg-night/90 sm:bg-night/60 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]"
              : "border border-transparent"
          }`}
        >
          <Link href="/" className="font-display italic text-2xl text-bone mr-1 md:mr-6 leading-none py-2.5">
            Melly<span className="text-gold">.</span>
          </Link>
          <div className="hidden sm:flex items-center gap-1 mr-2">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3.5 py-2.5 rounded-full text-[13px] text-bone-muted hover:text-bone hover:bg-white/5 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
          <ThemeToggle />
          <a
            href="/#donation"
            className="group relative overflow-hidden whitespace-nowrap rounded-full bg-bone text-night px-4 min-[340px]:px-5 py-3 text-[13px] font-medium
                       hover:bg-gold-light transition-colors duration-300 max-[359px]:hidden"
          >
            Faire un don
          </a>
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
