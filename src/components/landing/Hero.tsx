import { motion } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    
    // Set the CSS variables directly on the element's style
    containerRef.current.style.setProperty("--mouse-x", `${e.clientX - left}px`);
    containerRef.current.style.setProperty("--mouse-y", `${e.clientY - top}px`);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="group relative isolate overflow-hidden bg-background min-h-screen flex flex-col justify-center"
    >
      {/* 1. This calls the utility from your CSS */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-mouse-glow" 
        aria-hidden="true" 
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold tracking-tight text-text"
        >
          Premium Car Service. <br />
          <span className="text-primary">Booked in Minutes.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mt-6 text-lg text-muted max-w-2xl mx-auto"
        >
          Hassle-free car servicing with transparent pricing, expert technicians,
          and real-time booking — all from your phone.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-10 flex justify-center gap-4"
        >
          <Button className="px-8">Book Service</Button>
          <Button variant="secondary">Explore Services</Button>
        </motion.div>
      </div>
    </section>
  )
}
