// components/Hero.tsx
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function Hero() {
  const container = useRef<HTMLDivElement>(null);

  // High-end parallax: Title moves slower than the background
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const rotate = useTransform(scrollY, [0, 500], [0, 5]);

  return (
    <section
      ref={container}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background Decorative Element: The "Aura" */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/20 blur-[120px] rounded-full"
        />
      </div>

      <motion.div
        style={{ y, rotate }}
        className="relative z-10 text-center px-6"
      >
        <div className="overflow-hidden mb-4">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="block text-accent font-mono tracking-[0.3em] uppercase text-sm"
          >
            Est. 2026 — Precision Care
          </motion.span>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className="text-[12vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase"
          >
            Showroom
            <br />
            <span className="text-accent italic font-light lowercase pr-4">
              Quality
            </span>
            Finish
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 text-muted max-w-md mx-auto text-lg md:text-xl font-medium"
        >
          We don’t just wash cars. We restore the pride of ownership through
          obsessive attention to detail.
        </motion.p>
      </motion.div>

      {/* Modern Perspective Grid */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-background to-transparent z-20" />
      <div
        className="absolute bottom-[-10%] left-0 w-full h-[50vh] opacity-20 z-10"
        style={{
          backgroundImage: `linear-gradient(var(--muted) 1px, transparent 1px), linear-gradient(90deg, var(--muted) 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
          transform: "perspective(500px) rotateX(60deg)",
        }}
      />
    </section>
  );
}
