"use client";
import { MotionConfig } from "framer-motion";

// Respecte le réglage « réduire les animations » de l'appareil pour toutes les animations framer-motion
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
