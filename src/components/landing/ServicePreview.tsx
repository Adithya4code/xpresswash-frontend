// components/ServicesPreview.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import execDetail from "@/assets/images/executive_detail.webp";
import ceramic from "@/assets/images/ceramic_coating.webp";
import interior from "@/assets/images/interior_sanitize.webp";

const SERVICES = [
  { name: "Executive Detail", img: execDetail },
  { name: "Ceramic Coating", img: ceramic },
  { name: "Interior Sanitize", img: interior },
];

export function ServicesPreview() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-40 bg-surface relative">
      <div className="container mx-auto px-12">
        {SERVICES.map((service, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group relative border-t border-muted/20 py-16 flex items-center justify-between cursor-pointer overflow-hidden"
          >
            <h3 className="text-7xl font-bold uppercase transition-all duration-500 group-hover:text-accent group-hover:pl-8">
              {service.name}
            </h3>
            <span className="text-muted group-hover:rotate-45 transition-transform duration-500">
              ↗
            </span>
          </div>
        ))}
      </div>

      {/* Floating Image Follower */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-[500px] pointer-events-none z-50 overflow-hidden rounded-xl shadow-2xl"
          >
            <motion.img
              key={hoveredIndex}
              src={SERVICES[hoveredIndex].img}
              className="w-full h-full object-cover"
              layoutId="service-img"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
