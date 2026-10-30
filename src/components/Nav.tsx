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

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <div
        className={`flex items-center gap-1 min-[340px]:gap-2 rounded-full pl-4 min-[340px]:pl-5 pr-1.5 py-1.5 transition-all duration-500 ${
          scrolled ? "glass bg-night/60 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]" : "border border-transparent"
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
    </nav>
  );
}
