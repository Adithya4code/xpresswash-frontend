"use client";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) setHidden(true);
    else setHidden(false);
  });

  return (
    <motion.nav
      variants={{ visible: { y: 0 }, hidden: { y: -100 } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-6 inset-x-0 z-[100] flex justify-center px-6"
    >
      <div className="flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-full border border-muted/10 bg-surface/40 backdrop-blur-md shadow-2xl">
        <div className="text-xl font-black tracking-tighter uppercase">
          Xpress<span className="text-accent">Wash</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-muted">
          <a href="#services" className="hover:text-accent transition-colors">
            Services
          </a>
          <a href="#why-us" className="hover:text-accent transition-colors">
            Why us
          </a>
          <a href="#faq" className="hover:text-accent transition-colors">
            FAQ
          </a>
        </div>

        <button className="px-6 py-2 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform">
          Book Now
        </button>
      </div>
    </motion.nav>
  );
}
