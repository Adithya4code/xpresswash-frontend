// components/ValueProps.tsx
"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function ValueProps() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen bg-background overflow-hidden flex items-center"
    >
      {/* Floating Abstract Elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 right-[10%] w-64 h-96 bg-accent/10 rounded-2xl blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-0 left-[5%] w-80 h-80 border border-accent/20 rounded-full"
      />

      <div className="container mx-auto px-12 grid grid-cols-1 md:grid-cols-2 gap-24 relative z-10">
        <div className="space-y-12">
          <h2 className="text-6xl font-black uppercase leading-none">
            The <span className="text-accent italic">Philosophy</span>
          </h2>
          <p className="text-xl text-muted max-w-md">
            We believe a clean car is a clear mind. Our process is a blend of
            chemical science and artistic touch.
          </p>
        </div>

        <div className="space-y-24 pt-24">
          {["Precision", "Protection", "Purity"].map((text, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="group border-b border-muted/20 pb-8"
            >
              <span className="text-accent font-mono text-sm">0{i + 1}</span>
              <h3 className="text-5xl font-bold uppercase group-hover:translate-x-4 transition-transform duration-500">
                {text}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
