import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { FEATURES, type Feature } from "@/utils/constants";

export function WhyUs() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Dynamic horizontal movement based on array length
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(FEATURES.length - 1) * (100 / FEATURES.length)}%`],
  );

  return (
    <section ref={targetRef} className="relative h-[600vh] bg-background">
      {/* Sticky Container */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Using your custom background glow utility */}
        <div className="absolute inset-0 -z-10 opacity-50 bg-mouse-glow" />

        <div className="flex flex-col w-full">
          <div className="px-12 mb-12">
            <motion.span className="text-accent font-bold tracking-widest uppercase text-sm">
              The Xpress Advantage
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-bold text-text mt-2">
              Why Choose Us?
            </h2>
          </div>

          {/* Horizontal Track */}
          <motion.div style={{ x }} className="flex gap-12 px-12">
            {FEATURES.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} />
            ))}
          </motion.div>
        </div>

        {/* Scroll Progress Bar at bottom */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-accent z-20"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />
      </div>
    </section>
  );
}

const FeatureCard = ({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) => {
  return (
    <div className="group relative h-[450px] w-[320px] md:w-[450px] shrink-0 overflow-hidden rounded-xl border border-muted/20 bg-surface p-10 flex flex-col justify-between transition-colors hover:border-accent/40">
      {/* Background Index Number */}
      <span className="absolute -top-4 -right-4 text-9xl font-black text-text/5 italic group-hover:text-accent/10 transition-colors">
        {index + 1}
      </span>

      <div className="relative z-10">
        <div className="w-12 h-1 bg-accent mb-8 group-hover:w-24 transition-all duration-500" />
        <h3 className="text-3xl font-bold text-text mb-6">{feature.title}</h3>
        <p className="text-lg text-muted leading-relaxed">{feature.desc}</p>
      </div>

      <div className="relative z-10 font-mono text-sm text-accent font-bold">
        0{index + 1} // Precision Care
      </div>

      {/* Subtle Inner Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};
