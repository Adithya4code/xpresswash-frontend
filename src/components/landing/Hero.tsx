import { motion } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";

// Import the image from the public/media folder (move the image there if not already)
const heroBgUrl = "/media/image.png";

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
      {/* Background image layer */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBgUrl})`,
          filter: "brightness(0.55) blur(1px)",
          transition: "filter 0.5s",
        }}
        aria-hidden="true"
      />

      {/* Mouse glow effect layer */}
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
          <span className="text-primary">Booked in Minutes!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mt-6 text-lg text-white max-w-2xl mx-auto"
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
          <Button
            variant="secondary"
            onClick={() => {
              // Scroll to the Popular Services section
              const section = document.querySelector("section[id='popular-services']");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Explore Services
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
