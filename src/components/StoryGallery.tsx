"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const photos = [
  { src: "/images/IMG_1047_edited.jpg" },
  { src: "/images/55209099528_5fe9411427_c.jpg" },
  { src: "/images/IMG_1163_edited.jpg" },
  { src: "/images/55208046837_5f29cf2680_c.jpg" },
  { src: "/images/55209099523_2383c9646b_c.jpg" },
  { src: "/images/54345753034_e5ae5d24fa_c.jpg" },
];

const SPEED = 45; // px par seconde
const SLOW_SPEED = 18; // si l'appareil demande moins d'animations
const COPIES = 3;

// Galerie en boucle infinie :
// - le défilement automatique est une animation CSS (carte graphique), fluide même pendant le scroll de la page
// - framer-motion gère seulement le glissement au doigt / à la souris, sur un conteneur parent
export default function StoryGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [loop, setLoop] = useState(0);
  const [paused, setPaused] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>();

  // Largeur d'une série de photos = écart entre la 1re photo et sa copie
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const first = track.querySelector<HTMLElement>("[data-index='0']");
      const copy = track.querySelector<HTMLElement>(`[data-index='${photos.length}']`);
      setLoop(first && copy ? copy.offsetLeft - first.offsetLeft : 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    // Hors de l'écran, l'animation est mise en pause pour ne rien coûter pendant le scroll
    const io = new IntersectionObserver(([e]) => setOffscreen(!e.isIntersecting), { rootMargin: "100px" });
    io.observe(track);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);

  useEffect(() => () => { if (resumeTimer.current) clearTimeout(resumeTimer.current); }, []);

  const pause = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setPaused(true);
  };
  const resume = (delay: number) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), delay);
  };

  return (
    <div className="overflow-hidden mask-fade-x pb-14" role="region" aria-label="Galerie photos de Melly">
      <motion.div
        className="cursor-grab active:cursor-grabbing"
        drag={loop ? "x" : false}
        dragConstraints={{ left: -loop / 2, right: loop / 2 }}
        dragElastic={0.08}
        dragTransition={{ power: 0.2, timeConstant: 220 }}
        onHoverStart={pause}
        onHoverEnd={() => resume(300)}
        onPointerDown={pause}
        onPointerUp={() => resume(2000)}
        onPointerCancel={() => resume(2000)}
        onDragEnd={() => resume(2000)}
      >
        <div
          ref={trackRef}
          className={`flex w-max gap-4 md:gap-6 px-5 md:px-8 ${loop ? "gallery-marquee" : ""} ${paused || offscreen ? "paused" : ""}`}
          style={{
            ["--loop" as string]: `${loop}px`,
            ["--dur" as string]: `${(loop / SPEED).toFixed(1)}s`,
            ["--dur-slow" as string]: `${(loop / SLOW_SPEED).toFixed(1)}s`,
          }}
        >
          {Array.from({ length: COPIES }, () => photos).flat().map((photo, i) => (
            <div
              key={i}
              data-index={i}
              aria-hidden={i >= photos.length}
              className={`group relative shrink-0 overflow-hidden rounded-[1.75rem] ring-1 ring-white/10
                          w-[72vw] sm:w-[340px] ${i % 2 ? "md:mt-12" : ""}`}
              style={{ aspectRatio: "3/4" }}
            >
              <Image
                src={photo.src}
                alt={i < photos.length ? "Melly en louange" : ""}
                fill
                draggable={false}
                loading="eager"
                className="pointer-events-none select-none object-cover transition-transform duration-[1200ms] ease-out sm:group-hover:scale-105"
                sizes="(max-width: 640px) 72vw, 340px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
