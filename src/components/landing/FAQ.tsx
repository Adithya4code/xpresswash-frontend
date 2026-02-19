"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { FAQS } from "@/utils/faq";

const categories = ["All", ...new Set(FAQS.map((f) => f.category))];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredFaqs =
    activeCategory === "All"
      ? FAQS
      : FAQS.filter((f) => f.category === activeCategory);

  return (
    <section id="faq" className="py-20 md:py-40 bg-surface">
      {/* 1. Adjusted padding: px-6 for mobile, px-12 for desktop */}
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        {/* 2. Header Layout: Swapped items-end for items-start on mobile */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-12 md:mb-20 gap-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.9]">
            Common <br />
            <span className="text-accent">Curiosities</span>
          </h2>

          {/* 3. Category Tabs: Reduced text size and padding for mobile */}
          <div className="flex flex-wrap gap-2 md:gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(null);
                }}
                className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full border transition-all uppercase text-[10px] md:text-sm font-bold ${
                  activeCategory === cat
                    ? "bg-accent border-accent text-background"
                    : "border-muted/30 text-muted hover:border-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Grid: Ensuring single column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2 md:gap-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.map((faq, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={faq.q}
                className="border-b border-muted/20 h-fit"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full text-left py-5 md:py-6 flex justify-between items-center group"
                >
                  {/* 5. Font size adjustment for questions */}
                  <span className="text-lg md:text-xl font-bold group-hover:text-accent transition-colors pr-4">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    className="text-xl md:text-2xl text-accent shrink-0"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 md:pb-8 text-muted text-sm md:text-base leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
