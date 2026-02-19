"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { FAQS } from "@/utils/faq";

// 1. Extract unique categories from your FAQS
const categories = ["All", ...new Set(FAQS.map((f) => f.category))];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredFaqs =
    activeCategory === "All"
      ? FAQS
      : FAQS.filter((f) => f.category === activeCategory);

  return (
    <section id="faq" className="py-40 bg-surface">
      <div className="container mx-auto px-12 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <h2 className="text-6xl font-black uppercase leading-none">
            Common <br /> <span className="text-accent">Curiosities</span>
          </h2>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(null);
                }}
                className={`px-6 py-2 rounded-full border transition-all uppercase text-sm font-bold ${
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

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
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
                  className="w-full text-left py-6 flex justify-between items-center group"
                >
                  <span className="text-xl font-bold group-hover:text-accent transition-colors pr-4">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    className="text-2xl text-accent"
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
                      <p className="pb-8 text-muted text-base leading-relaxed">
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
