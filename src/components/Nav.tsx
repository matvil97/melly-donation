"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-cream-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-gold text-xl tracking-wide"
        >
          Melly
        </Link>
        <a
          href="#donation"
          className="px-6 py-2 bg-gold text-white font-sans text-xs uppercase tracking-[0.2em]
                     hover:bg-gold-dark transition-colors duration-300"
        >
          Faire un don
        </a>
      </div>
    </nav>
  );
}
