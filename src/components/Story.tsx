"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const sidePhotos = [
  { src: "/images/IMG_1047_edited.jpg",          alt: "Melly chante" },
  { src: "/images/55208046837_5f29cf2680_c.jpg",  alt: "Melly sur scène" },
  { src: "/images/IMG_1163_edited.jpg",           alt: "Melly chante" },
];

export default function Story() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="story" ref={ref} className="reveal py-24 bg-cream-card px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[3fr_2fr] gap-14 items-start">

          {/* ─── LEFT : texte ─── */}
          <div>

            {/* ── MON HISTOIRE ── */}
            <div className="mb-3">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-gold/50" />
                <span className="text-gold text-xs tracking-[0.4em] uppercase font-sans">Mon histoire</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight mb-2">
                Un cœur <span className="text-gradient-gold">pour servir</span>
              </h2>
            </div>

            <div className="space-y-5 text-ink-muted font-sans font-light leading-loose text-[17px] mb-14">
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
            <div className="flex items-center gap-6 mb-14">
              <div className="flex-1 h-px bg-cream-border" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <div className="flex-1 h-px bg-cream-border" />
            </div>

            {/* ── MON PROJET ── */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-gold/50" />
                <span className="text-gold text-xs tracking-[0.4em] uppercase font-sans">Mon projet</span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-ink leading-tight">
                L&apos;École <span className="text-gradient-gold">Pierre</span>
              </h3>
            </div>

            <div className="space-y-5 text-ink-muted font-sans font-light leading-loose text-[17px] mb-10">
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

            {/* Logo + Carte */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {/* Logo École Pierre */}
              <div className="bg-cream-warm border border-cream-border p-6 flex flex-col items-center justify-center gap-3 text-center">
                <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="font-serif text-lg text-ink">École Pierre</div>
                  <div className="text-ink-faint text-xs font-sans mt-1">Formation musicale chrétienne</div>
                  <div className="text-ink-faint text-xs font-sans">Lyon, France</div>
                </div>
              </div>

              {/* Carte Google Maps */}
              <div className="overflow-hidden border border-cream-border" style={{ minHeight: 180 }}>
                <iframe
                  title="École Pierre Lyon"
                  src="https://maps.google.com/maps?q=ecole+pierre+lyon&output=embed"
                  width="100%"
                  height="100%"
                  style={{ minHeight: 180, border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Budget */}
            <div className="bg-cream-warm border border-cream-border p-6 mb-10">
              <div className="text-center mb-5">
                <div className="font-serif text-3xl text-gradient-gold">10 950 €</div>
                <div className="text-ink-faint text-xs uppercase tracking-widest font-sans mt-1">
                  Objectif — sept. 2026 à juin 2027
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm font-sans">
                <div className="text-center border-r border-cream-border pr-4">
                  <div className="font-serif text-xl text-ink mb-1">
                    650 €<span className="text-ink-faint text-sm font-sans">/mois</span>
                  </div>
                  <div className="text-ink-faint text-xs uppercase tracking-widest">Frais de scolarité</div>
                </div>
                <div className="text-center pl-4">
                  <div className="font-serif text-xl text-ink mb-1">
                    450 €<span className="text-ink-faint text-sm font-sans">/mois</span>
                  </div>
                  <div className="text-ink-faint text-xs uppercase tracking-widest">Logement</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#donation"
              className="group inline-flex items-center gap-3 text-gold font-sans text-sm tracking-widest uppercase
                         hover:gap-5 transition-all duration-300"
            >
              <span>Je veux te soutenir</span>
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                <path d="M1 6H19M19 6L14 1M19 6L14 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* ─── RIGHT : photos ─── */}
          <div className="hidden md:flex flex-col gap-4 sticky top-24">
            {sidePhotos.map((photo, i) => (
              <div
                key={i}
                className="relative overflow-hidden shadow-md"
                style={{ aspectRatio: "4/5" }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover object-center"
                  sizes="35vw"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
