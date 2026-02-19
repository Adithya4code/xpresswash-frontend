"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

const STEPS = [
  {
    id: "01",
    title: "Instant Scheduling",
    desc: "Book your slot via WhatsApp or our portal. No waiting, no complex forms—just pure speed.",
  },
  {
    id: "02",
    title: "Mobile Deployment",
    desc: "Our self-powered detailing unit dispatches to your exact GPS coordinates with zero friction.",
  },
  {
    id: "03",
    title: "Obsessive Restoration",
    desc: "We execute a surgical-grade multi-stage clean using industrial eco-tech and pH-neutral precision.",
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={containerRef}
      className="bg-background py-24 md:py-60 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 md:gap-20">
        {/* Left Side: Sticky on Desktop, Static on Mobile */}
        <div className="w-full md:w-1/2 md:sticky md:top-40 h-fit">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-mono uppercase tracking-[0.4em] text-[10px] md:text-xs">
              // Operation Workflow
            </span>
            <h2 className="text-5xl md:text-9xl font-black mt-4 md:mt-6 uppercase italic leading-[0.9] tracking-tighter">
              HOW WE <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px var(--text)" }}
              >
                EVOLVE
              </span>{" "}
              <br />
              THE SHINE
            </h2>

            {/* Tech Stats - Hidden on tiny screens, flex on others */}
            <div className="mt-10 md:mt-20 flex md:grid md:grid-cols-2 gap-8 border-t border-text/10 pt-8 md:pt-10 max-w-sm">
              <div>
                <p className="text-[10px] font-mono text-muted uppercase tracking-widest">
                  Efficiency
                </p>
                <p className="text-xl md:text-2xl font-black text-text italic">
                  100% Mobile
                </p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-muted uppercase tracking-widest">
                  Output
                </p>
                <p className="text-xl md:text-2xl font-black text-text italic">
                  Showroom Grade
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Steps */}
        <div className="w-full md:w-1/2 relative mt-10 md:mt-0">
          {/* The Progress Beam - Adjusted for mobile padding */}
          <div className="absolute left-2 md:-left-10 top-0 w-[2px] h-full bg-text/5">
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="w-full h-full bg-accent shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]"
            />
          </div>

          <div className="space-y-32 md:space-y-80">
            {STEPS.map((step, i) => (
              <StepItem key={step.id} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepItem({ step }: { step: (typeof STEPS)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: false, margin: "-10%" }}
      className="pl-10 md:pl-20 relative group"
    >
      {/* Visual Marker - Positioned over the beam */}
      <div className="absolute left-[calc(-0.5px+8px)] md:left-[-15px] top-3 w-2.5 h-2.5 bg-background border-2 border-accent rounded-full z-10" />

      {/* Background ID Number - Scaled down for mobile */}
      <span className="text-7xl md:text-9xl font-black text-text/5 absolute -top-10 md:-top-16 left-10 md:left-12 italic pointer-events-none group-hover:text-accent/10 transition-colors">
        {step.id}
      </span>

      <div className="relative z-10">
        <h3 className="text-2xl md:text-5xl font-black mb-4 md:mb-6 text-text uppercase italic tracking-tighter flex items-center gap-3 md:gap-4">
          <span className="w-6 md:w-8 h-[2px] bg-accent inline-block" />
          {step.title}
        </h3>
        <p className="text-lg md:text-2xl text-muted leading-relaxed font-medium max-w-md">
          {step.desc}
        </p>

        {/* Technical Label */}
        <div className="mt-6 md:mt-8 font-mono text-[9px] md:text-[10px] text-accent font-bold tracking-[0.2em] border border-accent/20 px-2 md:px-3 py-1 w-fit rounded">
          MODULE_INIT // SEQ_{step.id}
        </div>
      </div>
    </motion.div>
  );
}
