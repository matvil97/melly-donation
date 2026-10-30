"use client";
import { motion, type Variants } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";

const variants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

// Apparition au scroll : ressort rebondissant sur mobile, fondu doux sur ordinateur
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
          ? { type: "spring", stiffness: 140, damping: 16, mass: 0.7 }
          : { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }
      }
    >
      {children}
    </motion.div>
  );
}
