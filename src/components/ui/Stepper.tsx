"use client";

import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/utils/cn";

type StepperProps = {
  steps: string[];
  current: number;
};

export function Stepper({ steps, current }: StepperProps) {
  return (
    <div className="flex items-center gap-4">
      {steps.map((step, index) => {
        const isActive = index === current;
        const isCompleted = index < current;

        return (
          <div key={step} className="flex items-center gap-2">
            <motion.div
              layout
              initial={false}
              animate={{
                // Fixed: Ensure your CSS variables are wrapped correctly
                backgroundColor: isActive || isCompleted ? "var(--primary)" : "rgba(150, 150, 150, 0.2)",
                color: isActive || isCompleted ? "#fff" : "var(--muted)",
                scale: isActive ? 1.1 : 1,
              }}
              // Fixed: Removed the extra ")" after damping: 30
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium relative"
            >
              <AnimatePresence mode="wait">
                {isCompleted ? (
                  <motion.span
                    key="check"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    ✓
                  </motion.span>
                ) : (
                  <motion.span
                    key="number"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {index + 1}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            <span
              className={cn(
                "hidden sm:block text-sm transition-colors duration-300",
                isActive ? "text-foreground font-semibold" : "text-muted-foreground"
              )}
            >
              {step}
            </span>

            {index < steps.length - 1 && (
              <div className="h-[2px] w-8 bg-muted/20 overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: isCompleted ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}