"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

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

// Galerie en boucle infinie animée par transform (framer-motion) :
// défile seule sur tous les appareils, se glisse au doigt, pause au survol / pendant le glissement
export default function StoryGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [loop, setLoop] = useState(0);
  const paused = useRef(false);
  const visible = useRef(true);
  const speed = useRef(SPEED);
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>();

  // Largeur d'une série de photos = écart entre la 1re photo et sa copie
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const first = track.querySelector<HTMLElement>("[data-index='0']");
      const copy = track.querySelector<HTMLElement>(`[data-index='${photos.length}']`);
      const width = first && copy ? copy.offsetLeft - first.offsetLeft : 0;
      setLoop(width);
      if (width) x.set(-width); // on démarre sur la copie du milieu pour pouvoir glisser dans les deux sens
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) speed.current = SLOW_SPEED;

    // Pas d'animation quand la galerie est hors écran
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; });
    io.observe(track);

    return () => { ro.disconnect(); io.disconnect(); };
  }, [x]);

  // Garde la position dans la série du milieu : ]-2·loop, -loop]
  const wrap = (v: number) => {
    if (!loop) return v;
    let w = v;
    while (w > -loop) w -= loop;
    while (w <= -2 * loop) w += loop;
    return w;
  };

  useAnimationFrame((_, delta) => {
    if (!loop || paused.current || !visible.current) return;
    x.set(wrap(x.get() - (speed.current * Math.min(delta, 64)) / 1000));
  });

  const pause = () => {
    paused.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };
  const resume = (delay: number) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      x.stop();
      x.set(wrap(x.get()));
      paused.current = false;
    }, delay);
  };

  useEffect(() => () => { if (resumeTimer.current) clearTimeout(resumeTimer.current); }, []);

  return (
    <div className="overflow-hidden mask-fade-x pb-14" role="region" aria-label="Galerie photos de Melly">
      <motion.div
        ref={trackRef}
        className="flex w-max gap-4 md:gap-6 px-5 md:px-8 cursor-grab active:cursor-grabbing touch-pan-y"
        style={{ x }}
        drag="x"
        dragElastic={0.05}
        dragTransition={{ power: 0.25, timeConstant: 250 }}
        onHoverStart={pause}
        onHoverEnd={() => resume(300)}
        onDragStart={pause}
        onDragEnd={() => resume(1800)}
      >
        {Array.from({ length: COPIES }, () => photos).flat().map((photo, i) => (
          <motion.div
            key={i}
            data-index={i}
            aria-hidden={i >= photos.length}
            className={`group relative shrink-0 overflow-hidden rounded-[1.75rem] ring-1 ring-white/10
                        w-[72vw] sm:w-[340px] ${i % 2 ? "md:mt-12" : ""}`}
            style={{ aspectRatio: "3/4" }}
            whileTap={{ scale: 0.97 }}
          >
            <Image
              src={photo.src}
              alt={i < photos.length ? "Melly en louange" : ""}
              fill
              draggable={false}
              loading="eager"
              className="pointer-events-none select-none object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 72vw, 340px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
