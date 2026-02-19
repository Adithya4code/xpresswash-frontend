"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function CTA() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // The "fun" part: The circle grows to fill the screen
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Animated Gradient Sphere */}
      <motion.div
        style={{ scale, opacity }}
        className="absolute w-[120vw] h-[120vw] rounded-full bg-gradient-to-br from-accent via-accent-glow to-background opacity-20 blur-[100px]"
      />

      <div className="relative z-10 text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-accent font-mono tracking-widest uppercase text-sm mb-4 block"
        >
          Limited Slots Available This Week
        </motion.span>

        <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-12">
          Don’t Just <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-glow italic">
            Drive. Shine.
          </span>
        </h2>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative inline-block group"
        >
          {/* Pulsing button shadow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-accent to-accent-glow rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

          <button className="relative px-12 py-6 bg-primary text-background rounded-full font-black text-xl uppercase tracking-tighter flex items-center gap-4 transition-colors">
            Book Your Xpress Wash
            <span className="group-hover:translate-x-2 transition-transform">
              →
            </span>
          </button>
        </motion.div>

        {/* Floating WhatsApp Bubble inside CTA */}
        <p className="mt-8 text-muted font-medium">
          Or WhatsApp us at{" "}
          <span className="text-text border-b border-accent">
            +91 81239 11197
          </span>
        </p>
      </div>
    </section>
  );
}
