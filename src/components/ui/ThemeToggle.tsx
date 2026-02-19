"use client";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "@/app/ThemeContext";
import { useState } from "react";

export function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="fixed bottom-10 left-10 z-[9999]">
      {/* Label for the "Switch" feel */}
      <div className="mb-3 ml-2">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text/40 italic">
          Power Mode:{" "}
          <span className="text-accent">
            {isDark ? "Overdrive" : "Ignition"}
          </span>
        </span>
      </div>

      <motion.button
        onClick={toggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-24 h-12 bg-surface/10 backdrop-blur-md rounded-full border-2 border-text/10 p-1 flex items-center shadow-2xl overflow-hidden group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* The Track Background Shadow */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />

        {/* The Sliding "Shuttle" */}
        <motion.div
          animate={{ x: isDark ? 48 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-10 h-8 rounded-full z-10 flex items-center justify-center shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)] bg-accent"
        >
          {/* Inner Light on the shuttle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              {isDark ? (
                <div className="w-2 h-2 rounded-full bg-black shadow-[0_0_10px_#fff]" />
              ) : (
                <div className="w-4 h-0.5 bg-white rotate-90 rounded-full" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Static Icons behind the shuttle */}
        <div className="absolute inset-0 flex justify-between items-center px-4 pointer-events-none">
          <span
            className={`text-[10px] font-black italic transition-opacity duration-300 ${isDark ? "opacity-20" : "opacity-100 text-white"}`}
          >
            OFF
          </span>
          <span
            className={`text-[10px] font-black italic transition-opacity duration-300 ${isDark ? "opacity-100 text-white" : "opacity-20"}`}
          >
            ON
          </span>
        </div>

        {/* The "Scanner" Beam on Hover */}
        {isHovered && (
          <motion.div
            layoutId="glow"
            className="absolute inset-0 bg-accent/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.button>

      {/* Background Pulse Effect */}
      <div className="absolute -inset-4 bg-accent/5 rounded-full animate-pulse -z-10 blur-xl" />
    </div>
  );
}
