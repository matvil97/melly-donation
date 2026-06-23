"use client";
import { useEffect, useRef } from "react";

const stats = [
  { value: "10 000€", label: "Objectif" },
  { value: "2 ans",   label: "Formation" },
  { value: "Lyon",    label: "Ville" },
];

export default function Story() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="story" ref={ref} className="reveal py-24 bg-cream-card px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading */}
        <div className="flex items-center gap-4 justify-center mb-4">
          <div className="h-px w-10 bg-gold/50" />
          <span className="text-gold text-xs tracking-[0.4em] uppercase font-sans">Sa passion</span>
          <div className="h-px w-10 bg-gold/50" />
        </div>

        <h2 className="font-serif text-4xl md:text-5xl text-ink mb-12">
          Une voix née{" "}
          <span className="text-gradient-gold">pour la scène</span>
        </h2>

        {/* Paragraphs */}
        <div className="space-y-6 text-ink-muted font-sans font-light leading-loose text-lg text-left md:text-center">
          <p>
            Melly Malonga a toujours eu cette flamme en elle. Depuis son plus jeune âge,
            la musique n&apos;est pas simplement un loisir — c&apos;est sa langue maternelle, son
            refuge, ce qui la définit profondément en tant qu&apos;artiste.
          </p>
          <p>
            Aujourd&apos;hui, elle a l&apos;opportunité d&apos;intégrer{" "}
            <span className="text-gold font-normal">l&apos;École Pierre à Lyon</span>, une
            formation vocale exigeante et reconnue qui lui donnera les clés techniques et
            artistiques pour vivre pleinement de sa passion. Un vrai tremplin vers les
            scènes qu&apos;elle mérite.
          </p>
          <p>
            Le coût de cette formation s&apos;élève à{" "}
            <span className="text-gold font-semibold text-xl">10 000 €</span>. Une barrière
            financière qui ne devrait pas éteindre un talent aussi rare. C&apos;est pourquoi
            nous vous demandons votre soutien.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-14 pt-10 border-t border-cream-border grid grid-cols-3 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-serif text-2xl md:text-3xl text-gradient-gold mb-1">{s.value}</div>
              <div className="text-ink-faint text-xs uppercase tracking-[0.3em] font-sans">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <a
            href="#donation"
            className="group inline-flex flex-col items-center gap-2 text-ink-faint hover:text-gold
                       transition-colors duration-300 text-xs tracking-widest uppercase font-sans"
          >
            <span>Soutenir maintenant</span>
            <svg
              className="group-hover:translate-y-1 transition-transform duration-300"
              width="20" height="20" viewBox="0 0 20 20" fill="none"
            >
              <path
                d="M10 4V16M10 16L5 11M10 16L15 11"
                stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
