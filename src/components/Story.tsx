"use client";
import { useEffect, useRef } from "react";

export default function Story() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="story" ref={ref} className="reveal py-24 bg-cream-card px-4">
      <div className="max-w-3xl mx-auto">

        {/* ── MON HISTOIRE ── */}
        <div className="text-center mb-12">
          <div className="flex items-center gap-4 justify-center mb-4">
            <div className="h-px w-10 bg-gold/50" />
            <span className="text-gold text-xs tracking-[0.4em] uppercase font-sans">Mon histoire</span>
            <div className="h-px w-10 bg-gold/50" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-ink">
            Une voix née{" "}
            <span className="text-gradient-gold">pour la scène</span>
          </h2>
        </div>

        <div className="space-y-5 text-ink-muted font-sans font-light leading-loose text-[17px]">
          <p>
            La musique a toujours fait partie de ma vie. Depuis mon enfance, elle accompagne mes souvenirs
            les plus précieux, les moments de joie comme les temps plus difficiles. J&apos;ai grandi dans une
            famille où l&apos;on chantait naturellement, où la musique rassemblait les générations et occupait
            une place particulière dans notre foi. Voir mes parents chanter dans la chorale, mes frères et
            mes cousins jouer de leurs instruments à l&apos;église a nourri, sans que je m&apos;en rende compte,
            une passion qui n&apos;a jamais cessé de grandir.
          </p>
          <p>
            Au fil des années, le chant est devenu bien plus qu&apos;une passion : c&apos;est un moyen d&apos;adorer Dieu,
            de le servir et de partager l&apos;espérance qu&apos;Il met dans mon cœur. J&apos;ai eu la grâce de servir
            dans différents projets de louange au sein de mon église locale, puis avec{" "}
            <span className="text-ink font-normal">Pulse Mâcon</span> ainsi qu&apos;avec le groupe{" "}
            <span className="text-ink font-normal">Day and Night</span>. Chacune de ces expériences a
            confirmé une conviction profonde : Dieu m&apos;a confié ce don, et je désire le cultiver avec
            fidélité et excellence.
          </p>
          <p>
            Pendant longtemps, ce projet est resté dans un coin de mon cœur. J&apos;avais besoin de grandir,
            de me former, de gagner en expérience et en confiance avant d&apos;oser franchir cette étape.
            Aujourd&apos;hui, je ressens une réelle paix en prenant cette décision. C&apos;est avec beaucoup de
            joie, mais aussi de reconnaissance, que je choisis de répondre à cet appel et d&apos;investir
            pleinement dans ce que Dieu a déposé en moi.
          </p>
        </div>

        {/* Separator */}
        <div className="flex items-center gap-6 my-14">
          <div className="flex-1 h-px bg-cream-border" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          <div className="flex-1 h-px bg-cream-border" />
        </div>

        {/* ── MON PROJET ── */}
        <div className="text-center mb-12">
          <div className="flex items-center gap-4 justify-center mb-4">
            <div className="h-px w-10 bg-gold/50" />
            <span className="text-gold text-xs tracking-[0.4em] uppercase font-sans">Mon projet</span>
            <div className="h-px w-10 bg-gold/50" />
          </div>
          <h3 className="font-serif text-3xl md:text-4xl text-ink">
            L&apos;{" "}
            <span className="text-gradient-gold">École Pierre</span>
          </h3>
        </div>

        <div className="space-y-5 text-ink-muted font-sans font-light leading-loose text-[17px]">
          <p>
            À la rentrée prochaine, j&apos;aurai l&apos;immense privilège d&apos;intégrer l&apos;École Pierre, une école
            chrétienne dédiée à la formation musicale et au ministère de la louange. Cette année représente
            bien plus qu&apos;une formation : c&apos;est une opportunité de grandir artistiquement, humainement et
            spirituellement.
          </p>
          <p>
            J&apos;y développerai ma technique vocale, mes compétences musicales, j&apos;apprendrai la composition,
            la musique assistée par ordinateur (MAO) et approfondirai ma compréhension du ministère de la
            louange. Mon désir est de revenir équipée pour servir avec davantage de justesse, de créativité
            et d&apos;excellence, que ce soit dans mon église, auprès d&apos;autres communautés ou, si Dieu le
            permet, à travers de futurs projets musicaux.
          </p>
          <p>
            Si vous ne pouvez pas participer financièrement, vos prières, vos encouragements et le simple
            fait de partager cette cagnotte sont déjà un précieux soutien. Merci du fond du cœur de croire
            en ce projet et de choisir, peut-être, d&apos;en faire un peu partie.
          </p>
        </div>

        {/* Budget breakdown */}
        <div className="mt-12 bg-cream-warm border border-cream-border p-8">
          <div className="text-center mb-6">
            <div className="font-serif text-3xl text-gradient-gold">10 950 €</div>
            <div className="text-ink-faint text-xs uppercase tracking-widest font-sans mt-1">
              Objectif — sept. 2026 à juin 2027
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm font-sans">
            <div className="text-center border-r border-cream-border pr-4">
              <div className="font-serif text-xl text-ink mb-1">650 €<span className="text-ink-faint text-sm font-sans">/mois</span></div>
              <div className="text-ink-faint text-xs uppercase tracking-widest">Frais de scolarité</div>
            </div>
            <div className="text-center pl-4">
              <div className="font-serif text-xl text-ink mb-1">450 €<span className="text-ink-faint text-sm font-sans">/mois</span></div>
              <div className="text-ink-faint text-xs uppercase tracking-widest">Logement</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href="#donation"
            className="group inline-flex flex-col items-center gap-2 text-ink-faint hover:text-gold
                       transition-colors duration-300 text-xs tracking-widest uppercase font-sans"
          >
            <span>Soutenir maintenant</span>
            <svg className="group-hover:translate-y-1 transition-transform duration-300"
              width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4V16M10 16L5 11M10 16L15 11"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
