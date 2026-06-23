"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Testimonial() {
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
    <section ref={ref} className="reveal py-24 bg-cream px-4 relative overflow-hidden">
      {/* Faint warm background blob */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, #F5E6B318 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-center">
          {/* Photo */}
          <div className="relative mx-auto md:mx-0" style={{ maxWidth: 280 }}>
            <div className="absolute -top-3 -left-3 w-full h-full border border-gold/40 z-0" />
            <div className="relative z-10 overflow-hidden shadow-lg" style={{ aspectRatio: "4/5" }}>
              <Image
                src="/images/IMG_1500.jpg"
                alt="Melly et Matthieu"
                fill
                className="object-cover object-center"
                sizes="280px"
              />
            </div>
          </div>

          {/* Quote */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-gold/50" />
              <span className="text-gold text-xs tracking-[0.4em] uppercase font-sans">Mon témoignage</span>
            </div>

            {/* Big quote mark */}
            <div
              className="font-serif text-[120px] leading-none text-gold/15 select-none mb-2"
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <blockquote className="font-serif text-xl md:text-2xl text-ink/80 italic leading-[1.75] mb-8 -mt-6">
              Melly est bien plus qu&apos;une chanteuse — c&apos;est une âme qui vit à travers sa
              voix. Je l&apos;ai vue travailler dur chaque jour, répéter jusqu&apos;à tard le soir,
              toujours avec ce sourire sincère et cette lumière dans les yeux.
              <br /><br />
              L&apos;École Pierre représente bien plus qu&apos;une formation : c&apos;est la porte vers
              son avenir, vers la scène qu&apos;elle mérite. Je suis son fiancé, le premier
              témoin de sa détermination et de son talent.
              <br /><br />
              Aucune barrière financière ne devrait éteindre une flamme pareille.
              Votre geste, même le plus modeste, changera sa vie.
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-10 h-px bg-gold/50" />
              <div>
                <div className="font-serif text-gold text-lg">Matthieu</div>
                <div className="text-ink-faint text-xs tracking-[0.3em] uppercase font-sans mt-0.5">
                  Son fiancé
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
