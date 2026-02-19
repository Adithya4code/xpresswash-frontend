"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// Standard Vite imports work fine
import execDetail from "@/assets/images/executive_detail.webp";
import ceramic from "@/assets/images/ceramic_coating.webp";
import interior from "@/assets/images/interior_sanitize.webp";

const SERVICES = [
  {
    name: "Executive Detail",
    img: execDetail,
    desc: "Premium exterior restoration.",
  },
  {
    name: "Ceramic Coating",
    img: ceramic,
    desc: "Ultra-hard glass protection.",
  },
  { name: "Interior Sanitize", img: interior, desc: "Deep steam cleaning." },
];

export function ServicesPreview() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive Check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="services"
      className="py-20 lg:py-40 bg-surface relative overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {SERVICES.map((service, i) => (
          <div
            key={i}
            // Logic: On Desktop use Hover, On Mobile use Click/Tap
            onMouseEnter={() => !isMobile && setHoveredIndex(i)}
            onMouseLeave={() => !isMobile && setHoveredIndex(null)}
            onClick={() =>
              isMobile && setHoveredIndex(hoveredIndex === i ? null : i)
            }
            className="group relative border-t border-muted/20 py-8 lg:py-16 flex flex-col cursor-pointer"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-baseline gap-4">
                <span className="text-accent font-mono text-[10px] lg:text-xs">
                  0{i + 1}
                </span>
                <h3 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase italic transition-all duration-500 lg:group-hover:text-accent lg:group-hover:pl-6">
                  {service.name}
                </h3>
              </div>

              <span
                className={`text-2xl lg:text-4xl transition-transform duration-500 ${hoveredIndex === i ? "rotate-45 text-accent" : "text-muted"}`}
              >
                ↗
              </span>
            </div>

            {/* MOBILE ONLY: Inline Image Reveal */}
            <AnimatePresence>
              {isMobile && hoveredIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "250px", opacity: 1, marginTop: "24px" }}
                  exit={{ height: 0, opacity: 0, marginTop: "0px" }}
                  className="overflow-hidden rounded-xl relative"
                >
                  <img
                    src={service.img}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/60 backdrop-blur-md rounded-lg">
                    <p className="text-white text-sm font-medium">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        <div className="border-b border-muted/20 w-full" />
      </div>

      {/* DESKTOP ONLY: Floating Image Follower */}
      <AnimatePresence>
        {!isMobile && hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[550px] pointer-events-none z-50 overflow-hidden rounded-2xl shadow-2xl border border-white/5"
          >
            <motion.img
              key={hoveredIndex}
              src={SERVICES[hoveredIndex].img}
              className="w-full h-full object-cover"
              initial={{ filter: "grayscale(100%)" }}
              animate={{ filter: "grayscale(0%)" }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
