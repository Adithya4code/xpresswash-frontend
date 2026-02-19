"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // The image moves slower than the scroll, creating depth
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl bg-muted/10 w-full h-full"
    >
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
        className="h-full w-full"
      >
        <motion.img
          style={{ y, scale: 1.2 }}
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
}
