"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { FEATURES, type Feature } from "@/utils/constants";

export function WhyUs() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check window size for responsive logic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Desktop horizontal move: -75% move | Mobile: 0
  const x = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", isMobile ? "0%" : "-75%"],
  );

  const skewX = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ["0deg", isMobile ? "0deg" : "-2deg", "0deg"],
  );

  return (
    <section
      ref={targetRef}
      // On mobile, height is auto to fit content. On desktop, it's 500vh for scroll duration.
      className="relative h-auto md:h-[500vh] bg-background py-20 md:py-0"
    >
      <div className="md:sticky md:top-0 flex h-auto md:h-screen items-center overflow-hidden">
        {/* Background Decorative Text - Hidden or subtle on mobile */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full whitespace-nowrap pointer-events-none opacity-[0.03] select-none hidden md:block">
          <motion.h2
            style={{ x: useTransform(smoothProgress, [0, 1], ["10%", "-20%"]) }}
            className="text-[22vw] font-black uppercase italic text-text"
          >
            Obsession Obsession
          </motion.h2>
        </div>

        <div className="flex flex-col w-full relative z-10">
          <header className="px-6 md:px-12 mb-10 md:mb-16 flex justify-between items-end">
            <div>
              <motion.span className="text-accent font-mono tracking-[0.3em] uppercase text-[10px] md:text-xs mb-2 md:mb-4 block">
                // Performance Metrics
              </motion.span>
              <h2 className="text-6xl md:text-8xl font-black text-text uppercase italic leading-[0.8]">
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

          {/* Wrapper for the cards */}
          <motion.div
            style={{ x, skewX }}
            className="flex flex-col md:flex-row gap-6 md:gap-10 px-6 md:px-12"
          >
            {FEATURES.map((feature, i) => (
              <FeatureCard key={feature.title} feature={feature} index={i} />
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
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  return (
    <motion.div
      // On Mobile: Trigger animation when card enters viewport
      // On Desktop: Part of the horizontal slide
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative h-[350px] md:h-[480px] w-full md:w-[500px] shrink-0 overflow-hidden bg-surface border border-muted/10 rounded-[1.5rem] md:rounded-[2rem] p-8 md:p-12 transition-all duration-500 hover:border-accent/30"
    >
      <span className="absolute -top-4 -right-4 text-[6rem] md:text-[12rem] font-black text-text/[0.03] italic leading-none group-hover:text-accent/[0.05] transition-colors duration-700">
        {index + 1}
      </span>

      <div className="relative z-10 h-full flex flex-col">
        <div className="mb-6 md:mb-12">
          <div className="w-10 h-10 rounded-xl bg-background border border-muted/10 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-black text-text uppercase italic mb-3 md:mb-6 tracking-tight">
            {feature.title}
          </h3>
          <p className="text-muted text-sm md:text-lg leading-relaxed max-w-[90%]">
            {feature.desc}
          </p>
        </div>

        <div className="pt-6 border-t border-muted/5 flex items-center justify-between">
          <div className="flex gap-2">
            {[1, 2, 3].map((b) => (
              <div key={b} className="w-1 h-1 bg-accent/30 rounded-full" />
            ))}
          </div>
          <span className="font-mono text-[9px] uppercase text-muted">
            XP_UNIT_0{index + 1}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
