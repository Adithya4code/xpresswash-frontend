// components/FAQ.tsx
"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { FAQS } from "@/utils/faq"; // Import your data here

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-40 bg-surface">
      <div className="container mx-auto px-12 max-w-4xl">
        <h2 className="text-6xl font-black uppercase mb-20">
          Common <br /> <span className="text-accent">Curiosities</span>
        </h2>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-muted/20 pb-4">
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full text-left py-6 flex justify-between items-center group focus:outline-none"
              >
                <span className="text-2xl font-bold group-hover:text-accent transition-colors">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="text-3xl text-muted group-hover:text-accent"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-muted text-lg max-w-2xl leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
