"use client";
import { motion, type Variants } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";

// Une seule valeur « transform » (et pas y/scale séparés) : framer-motion peut alors
// confier l'animation à la carte graphique, sans concurrencer le défilement
const variants: Variants = {
  hidden: { opacity: 0, transform: "translateY(40px) scale(0.96)" },
  visible: { opacity: 1, transform: "translateY(0px) scale(1)" },
};

// Apparition au scroll : léger rebond sur mobile, fondu doux sur ordinateur
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const mobile = useIsMobile();

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: mobile ? 0.08 : 0.12 }}
      transition={
        mobile
          ? { duration: 0.7, ease: [0.34, 1.4, 0.64, 1] }
          : { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }
      }
    >
      {children}
    </motion.div>
  );
}
