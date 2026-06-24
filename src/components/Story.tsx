"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const photos = [
  { src: "/images/IMG_1047_edited.jpg" },
  { src: "/images/55209099528_5fe9411427_c.jpg" },
  { src: "/images/IMG_1163_edited.jpg" },
  { src: "/images/55208046837_5f29cf2680_c.jpg" },
  { src: "/images/55209099523_2383c9646b_c.jpg" },
  { src: "/images/54345753034_e5ae5d24fa_c.jpg" },
];

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);

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

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(c => (c + 1) % photos.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="story" ref={ref} className="reveal py-24 bg-cream-card px-4">
      <div className="max-w-6xl mx-auto space-y-20">

        {/* ── Mon histoire + slideshow droite→gauche ── */}
        <div className="grid md:grid-cols-[1fr_240px] gap-12 items-center">

          {/* Texte */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-gold/50" />
              <span className="text-gold text-xs tracking-[0.4em] uppercase font-sans">Mon histoire</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight mb-8">
              Un cœur <span className="text-gradient-gold">pour servir</span>
            </h2>

            <div className="space-y-5 font-sans font-normal leading-loose text-[17px] text-ink">
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
                <span className="text-gold-dark font-medium">Pulse Mâcon</span> ainsi qu&apos;avec le groupe{" "}
                <span className="text-gold-dark font-medium">Day and Night</span>. Chacune de ces expériences a
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
          </div>

          {/* Slideshow horizontal droite → gauche */}
          <div
            className="hidden md:block relative overflow-hidden shadow-md"
            style={{ aspectRatio: "3/4" }}
          >
            {photos.map((photo, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(${(i - current) * 100}%)` }}
              >
                <Image
                  src={photo.src}
                  alt="Melly"
                  fill
                  className="object-cover object-center"
                  sizes="240px"
                />
              </div>
            ))}
            {/* Dots de navigation */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-4 h-1.5 bg-white"
                      : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="flex items-center gap-6">
          <div className="flex-1 h-px bg-cream-border" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          <div className="flex-1 h-px bg-cream-border" />
        </div>

        {/* ── Mon projet (pleine largeur) ── */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-gold/50" />
            <span className="text-gold text-xs tracking-[0.4em] uppercase font-sans">Mon projet</span>
          </div>
          <h3 className="font-serif text-3xl md:text-4xl text-ink leading-tight mb-8">
            L&apos;École <span className="text-gradient-gold">Pierre</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-5 font-sans font-normal leading-loose text-[17px] text-ink">
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

              <div className="pt-4">
                <a
                  href="#donation"
                  className="inline-flex items-center gap-3 text-gold font-sans text-sm tracking-widest uppercase
                             hover:gap-5 transition-all duration-300"
                >
                  <span>Je veux te soutenir</span>
                  <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                    <path d="M1 6H19M19 6L14 1M19 6L14 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-cream-warm border border-cream-border p-7 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border border-gold/30 mb-4">
                  <span className="font-serif text-2xl text-gradient-gold font-bold">P</span>
                </div>
                <div className="font-serif text-2xl text-ink mb-2">École Pierre</div>
                <div className="text-ink font-sans text-sm leading-relaxed">
                  École créative, communication audiovisuelle et musique
                </div>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <div className="h-px w-6 bg-gold/40" />
                  <span className="text-ink-muted text-xs font-sans uppercase tracking-widest">Lyon, France</span>
                  <div className="h-px w-6 bg-gold/40" />
                </div>
              </div>

              <div className="overflow-hidden border border-cream-border" style={{ height: 200 }}>
                <iframe
                  title="École Pierre Lyon"
                  src="https://maps.google.com/maps?q=ecole+pierre+lyon&output=embed"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="bg-cream-warm border border-cream-border p-5">
                <div className="text-center mb-4">
                  <div className="font-serif text-2xl text-gradient-gold">10 950 €</div>
                  <div className="text-ink-muted text-xs uppercase tracking-widest font-sans mt-1">
                    Objectif · sept. 2026 – juin 2027
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 font-sans">
                  <div className="text-center border-r border-cream-border pr-4">
                    <div className="font-serif text-lg text-ink mb-0.5">
                      650 €<span className="text-ink-muted text-xs">/mois</span>
                    </div>
                    <div className="text-ink-muted text-xs uppercase tracking-widest">Scolarité</div>
                  </div>
                  <div className="text-center pl-4">
                    <div className="font-serif text-lg text-ink mb-0.5">
                      450 €<span className="text-ink-muted text-xs">/mois</span>
                    </div>
                    <div className="text-ink-muted text-xs uppercase tracking-widest">Logement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
