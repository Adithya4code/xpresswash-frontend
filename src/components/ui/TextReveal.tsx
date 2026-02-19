"use client";
import { motion } from "motion/react";
import { type ReactNode } from "react";

interface TextRevealProps {
  children: ReactNode;
  delay?: number;
}

export function TextReveal({ children, delay = 0 }: TextRevealProps) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%", rotate: 5 }}
        whileInView={{ y: 0, rotate: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          delay,
          ease: [0.33, 1, 0.68, 1], // The "Awwwards" cubic bezier
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
