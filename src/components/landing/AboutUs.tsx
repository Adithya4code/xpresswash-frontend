// components/AboutUs.tsx
import { motion } from "motion/react";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import waterbeading from "@/assets/images/water_beading_on_deep_obsidianblack_car_paint.webp";

export function AboutUs() {
  return (
    <section className="py-32 container mx-auto px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        {/* Left Side: Visual Impact */}
        <div className="h-[600px]">
          <ParallaxImage src={waterbeading} alt="Macro shot of car polishing" />
        </div>

        {/* Right Side: Essential Text */}
        <div className="space-y-8">
          <motion.h2
            className="text-6xl font-black uppercase"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            Time is <span className="text-accent">Luxury.</span>
          </motion.h2>
          <p className="text-xl text-muted leading-relaxed">
            We built XPRESS WASH for the modern driver. A fully equipped mobile
            studio that comes to you. Professional grade. Eco-conscious. Zero
            hassle.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-surface border border-muted/10 rounded-xl">
              <span className="text-accent text-3xl font-bold">20m</span>
              <p className="text-xs uppercase font-mono mt-2 text-muted">
                Avg. Wash Time
              </p>
            </div>
            <div className="p-6 bg-surface border border-muted/10 rounded-xl">
              <span className="text-accent text-3xl font-bold">0L</span>
              <p className="text-xs uppercase font-mono mt-2 text-muted">
                Water Waste
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
