"use client";
import { useRef, useState } from "react";
import Reveal from "./Reveal";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play();
    setPlaying(true);
  };

  return (
    <section id="video" className="relative py-28 md:py-40 px-5 md:px-8 overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-gold/10 blur-[160px]" />

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1fr_auto] gap-16 lg:gap-24 items-center">
        <Reveal>
          <span className="text-[12px] uppercase tracking-[0.3em] text-gold">01 — Mon message</span>
          <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] tracking-[-0.02em] mt-6">
            Quelques mots,
            <br />
            <span className="italic text-gradient-gold">de vive voix.</span>
          </h2>
          <p className="mt-8 max-w-md text-lg text-bone-muted font-light leading-relaxed">
            Je vous explique en moins d&apos;une minute pourquoi je pars à l&apos;École Pierre
            et comment vous pouvez m&apos;accompagner dans cette aventure.
          </p>
          <div className="mt-10 flex items-center gap-4 text-sm text-bone-faint">
            <span className="h-px w-12 bg-line" />
            Vidéo · 54 s · son activé
          </div>
        </Reveal>

        <Reveal delay={150} className="mx-auto">
          <div className="relative">
            <div className="absolute -inset-8 rounded-[3.5rem] bg-gradient-to-b from-gold/30 to-ember/10 blur-3xl opacity-70" />
            <div className="relative w-[min(78vw,340px)] rounded-[2.5rem] p-2 glass">
              <div className="relative overflow-hidden rounded-[2rem] bg-night-card" style={{ aspectRatio: "9/16" }}>
                <video
                  ref={videoRef}
                  src="/videos/presentation.mp4#t=0.5"
                  className="absolute inset-0 h-full w-full object-cover"
                  playsInline
                  preload="metadata"
                  controls={playing}
                  onEnded={() => setPlaying(false)}
                />
                {!playing && (
                  <button
                    onClick={play}
                    aria-label="Lire la vidéo"
                    className="group absolute inset-0 flex items-center justify-center bg-gradient-to-t from-night/70 via-night/10 to-night/20"
                  >
                    <span className="relative flex h-20 w-20 items-center justify-center">
                      <span className="absolute inset-0 rounded-full bg-bone/30 animate-ping" />
                      <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-bone text-night
                                       transition-transform duration-300 group-hover:scale-110">
                        <svg width="20" height="22" viewBox="0 0 12 14" fill="currentColor" className="ml-1"><path d="M0 0v14l12-7z" /></svg>
                      </span>
                    </span>
                    <span className="absolute bottom-6 left-6 right-6 text-left">
                      <span className="block font-display italic text-2xl text-bone">Mon message pour vous</span>
                      <span className="block text-xs text-bone-muted mt-1">Appuyer pour lancer</span>
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
