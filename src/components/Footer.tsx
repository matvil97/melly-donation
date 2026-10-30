"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Tilt from "./Tilt";
import { HELLOASSO_URL } from "@/lib/links";

const COLUMNS = [
  {
    title: "Explorer",
    links: [
      { href: "/#video", label: "Vidéo" },
      { href: "/#story", label: "Mon histoire" },
      { href: "/#projet", label: "Le projet" },
      { href: "/#donation", label: "La cagnotte" },
    ],
  },
  {
    title: "Soutenir",
    links: [
      { href: "/#donation", label: "Faire un don" },
      { href: HELLOASSO_URL, label: "Collecte HelloAsso", external: true },
    ],
  },
  {
    title: "Informations",
    links: [
      { href: "/mentions-legales", label: "Mentions légales" },
      { href: "/cgu", label: "CGU" },
      { href: "/confidentialite", label: "Confidentialité" },
    ],
  },
];

const DEPTH = 12; // couches d'extrusion du logo 3D

function FlipLink({ href, label, external }: { href: string; label: string; external?: boolean }) {
  const inner = (
    <span data-text={label}>
      {label}
      {external && <span className="sr-only"> (nouvel onglet)</span>}
    </span>
  );
  const cls = "flip text-[15px] text-bone-muted hover:text-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded";
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Le logo se redresse en 3D à l'arrivée dans l'écran
  useEffect(() => {
    const el = markRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Puis suit légèrement le pointeur
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const mark = markRef.current;
    const footer = footerRef.current;
    if (!mark || !footer || !visible || e.pointerType !== "mouse") return;
    const rect = footer.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mark.style.transform = `rotateX(${(py * -14).toFixed(2)}deg) rotateY(${(px * 22).toFixed(2)}deg)`;
  };
  const onPointerLeave = () => {
    if (markRef.current) markRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <footer
      ref={footerRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative border-t border-line overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 h-[30rem] w-[70rem] rounded-full bg-gold/10 blur-[160px]" />
      </div>

      {/* Marge basse mobile : laisse la place à la barre de don et au bouton du chatbot */}
      <div className="relative max-w-6xl mx-auto px-5 md:px-8 pt-20 md:pt-28 pb-36 sm:pb-10">
        {/* Carte HelloAsso en 3D */}
        <Tilt max={7} className="rounded-[2rem]">
          <a
            href={HELLOASSO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block rounded-[2rem] p-8 md:p-12 [transform-style:preserve-3d]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <span className="absolute inset-0 rounded-[2rem] glass overflow-hidden" aria-hidden="true">
              <span className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/25 blur-3xl transition-transform duration-700 group-hover:scale-125" />
              <span className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-ember/15 blur-3xl" />
            </span>

            <span className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center [transform-style:preserve-3d]">
              <span className="block [transform:translateZ(40px)]">
                <span className="block text-[12px] uppercase tracking-[0.3em] text-gold">Une autre façon de donner</span>
                <span className="mt-4 block font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05] text-bone">
                  Me soutenir via <span className="italic text-gradient-gold">HelloAsso</span>
                </span>
                <span className="mt-4 block max-w-xl text-bone-muted font-light leading-relaxed">
                  Vous pouvez aussi me soutenir par la collecte officielle de l&apos;Association Pierre, la structure
                  qui porte l&apos;École Pierre où je vais me former.
                </span>
              </span>
              <span
                className="relative inline-flex items-center justify-center gap-2 justify-self-start md:justify-self-end overflow-hidden rounded-full
                           bg-gradient-gold px-7 py-4 text-[15px] font-semibold text-ink shadow-[0_14px_40px_-12px_rgba(212,175,90,0.8)]
                           [transform:translateZ(70px)] transition-shadow group-hover:shadow-[0_20px_50px_-10px_rgba(212,175,90,1)]"
              >
                <span className="relative z-10">Ouvrir la collecte</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="absolute inset-0 shine animate-shimmer" />
                <span className="sr-only"> (nouvel onglet)</span>
              </span>
            </span>
          </a>
        </Tilt>

        {/* Colonnes */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-x-8 gap-y-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-display italic text-4xl text-bone leading-none">
              Melly<span className="text-gold">.</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm text-bone-muted font-light leading-relaxed">
              Une voix pour servir. Mon année de formation à l&apos;École Pierre, Lyon — 2026 / 2027.
            </p>
            <a
              href="#top"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="group mt-8 inline-flex items-center gap-3 text-sm text-bone-muted hover:text-bone transition-colors"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full glass [perspective:300px]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"
                  className="transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:[transform:rotateX(360deg)]">
                  <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Revenir en haut
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[12px] uppercase tracking-[0.25em] text-bone-faint">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <FlipLink {...l} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Logo 3D extrudé */}
        <div className="mt-20 [perspective:900px] select-none" aria-hidden="true">
          <div
            ref={markRef}
            className="wordmark-3d relative w-fit mx-auto font-display italic tracking-[-0.03em] leading-[1] pb-[0.18em]
                       text-[clamp(4.5rem,17vw,12.5rem)]"
            style={visible ? undefined : { transform: "rotateX(55deg) translateY(30px)", opacity: 0.2 }}
          >
            {Array.from({ length: DEPTH }, (_, i) => (
              <span
                key={i}
                className="wordmark-layer"
                style={{ transform: `translateZ(${-(i + 1) * 2.5}px)`, opacity: 0.6 - i * 0.04 }}
              >
                Melly.
              </span>
            ))}
            <span className="relative block text-gradient-gold" style={{ transform: "translateZ(1px)" }}>Melly.</span>
          </div>
        </div>

        <div className="mt-6 pt-8 border-t border-line flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-bone-faint">
          <span>© {new Date().getFullYear()} Melly · École Pierre, Lyon</span>
          <span className="inline-flex items-center gap-1.5">
            Merci pour votre générosité et votre soutien
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-gold animate-heartbeat" aria-hidden="true">
              <path d="M12 21s-7.5-4.6-10-9.4C.4 8.3 2.3 4 6.4 4c2.3 0 3.9 1.3 5.6 3.3C13.7 5.3 15.3 4 17.6 4 21.7 4 23.6 8.3 22 11.6 19.5 16.4 12 21 12 21z" />
            </svg>
          </span>
          <span>Paiements sécurisés par Stripe</span>
        </div>
      </div>
    </footer>
  );
}
