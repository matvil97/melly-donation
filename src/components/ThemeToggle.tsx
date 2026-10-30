"use client";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

// Bascule clair / sombre, mémorisée dans le navigateur (le script de layout.tsx l'applique avant l'affichage)
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.add("theme-anim");
    root.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "light" ? "#F8F3EB" : "#0A0908");
    setTheme(next);
    try { localStorage.setItem("theme", next); } catch { /* stockage indisponible */ }
    setTimeout(() => root.classList.remove("theme-anim"), 550);
  };

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Passer en mode sombre" : "Passer en mode clair"}
      title={isLight ? "Mode sombre" : "Mode clair"}
      className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full text-bone-muted cursor-pointer
                 hover:text-bone hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      {/* Soleil */}
      <svg
        width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"
        className={`absolute transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isLight ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      >
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
          stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
      {/* Lune */}
      <svg
        width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"
        className={`absolute transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isLight ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        }`}
      >
        <path d="M20.5 14.5A8.5 8.5 0 019.5 3.5a8.5 8.5 0 1011 11z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
