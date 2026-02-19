"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";
import { useRef } from "react";
import { FEATURES, type Feature } from "@/utils/constants";

export function WhyUs() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll progress for high-end feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate horizontal move: (Total features - 1) * card width factor
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

  // High-performance skew effect
  const skewX = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ["0deg", "-2deg", "0deg"],
  );

  return (
    <section ref={targetRef} className="relative h-[500vh] bg-background">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Cinematic Background Text */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full whitespace-nowrap pointer-events-none opacity-[0.03] select-none">
          <motion.h2
            style={{ x: useTransform(smoothProgress, [0, 1], ["5%", "-15%"]) }}
            className="text-[22vw] font-black uppercase italic text-text"
          >
            Pure Obsession Pure Obsession
          </motion.h2>
        </div>

        <div className="flex flex-col w-full relative z-10">
          <header className="px-12 mb-16 flex justify-between items-end">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-accent font-mono tracking-[0.3em] uppercase text-xs mb-4 block"
              >
                // The Xpress Standard
              </motion.span>
              <h2 className="text-5xl md:text-8xl font-black text-text uppercase italic leading-[0.8]">
                Why <br />
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "1px var(--text)" }}
                >
                  Choose Us?
                </span>
              </h2>
            </div>

            <div className="hidden md:block text-right pb-4">
              <span className="text-muted font-mono text-[10px] uppercase tracking-widest">
                Engineered Momentum
              </span>
              <div className="w-48 h-[1px] bg-muted/20 mt-3 relative overflow-hidden">
                <motion.div
                  style={{ scaleX: smoothProgress }}
                  className="absolute inset-0 bg-accent origin-left"
                />
              </div>
            </div>
          </header>

          {/* Feature Track */}
          <motion.div style={{ x, skewX }} className="flex gap-10 px-12">
            {FEATURES.map((feature, i) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={i}
                progress={smoothProgress}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
  progress: MotionValue<number>;
}

const FeatureCard = ({ feature, index, progress }: FeatureCardProps) => {
  // Parallax movement for the text inside the card
  const contentX = useTransform(progress, [0, 1], [30, -30]);

  return (
    <div className="group relative h-[480px] w-[340px] md:w-[500px] shrink-0 overflow-hidden bg-surface border border-muted/10 rounded-[2rem] p-12 transition-smooth hover:border-accent/30">
      {/* Background Number Overlay */}
      <span className="absolute -top-6 -right-6 text-[12rem] font-black text-text/[0.03] italic leading-none group-hover:text-accent/[0.05] transition-colors duration-700">
        {index + 1}
      </span>

      <div className="relative z-10 h-full flex flex-col">
        <div className="mb-12">
          <div className="w-10 h-10 rounded-xl bg-background border border-muted/10 flex items-center justify-center group-hover:border-accent/50 transition-colors">
            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          </div>
        </div>

        <motion.div style={{ x: contentX }} className="flex-1">
          <h3 className="text-3xl font-black text-text uppercase italic mb-6 tracking-tight">
            {feature.title}
          </h3>
          <p className="text-muted text-lg leading-relaxed max-w-[90%]">
            {feature.desc}
          </p>
        </motion.div>

        {/* Technical Footer */}
        <div className="pt-8 border-t border-muted/5 flex items-center justify-between">
          <div className="flex gap-2">
            {[1, 2, 3].map((b) => (
              <div
                key={b}
                className="w-1 h-1 bg-accent/30 rounded-full group-hover:bg-accent transition-colors"
              />
            ))}
          </div>
          <span className="font-mono text-[10px] uppercase text-muted tracking-tighter">
            Module_0{index + 1} // System.Active
          </span>
        </div>
      </div>

      {/* Subtle Inner Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
};
