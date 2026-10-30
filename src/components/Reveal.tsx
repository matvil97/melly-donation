"use client";
import { motion, type Variants } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";

// Translation + fondu uniquement : pas de zoom ni de flou, sinon le navigateur
// redessine le texte à la fin de l'animation (effet de « texte qui se recharge »)
const variants: Variants = {
  hidden: { opacity: 0, transform: "translateY(28px)" },
  visible: { opacity: 1, transform: "none" },
};

// Apparition au scroll : légère et anticipée sur mobile, fondu doux sur ordinateur
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
      // Mobile : déclenché un peu avant l'entrée à l'écran, pour que le texte soit déjà là quand on arrive dessus
      viewport={{ once: true, amount: 0, margin: mobile ? "0px 0px 120px 0px" : "0px 0px -60px 0px" }}
      transition={
        mobile
          ? { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
          : { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }
      }
    >
      {children}
    </motion.div>
  );
}
