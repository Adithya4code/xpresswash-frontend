"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
      className="fixed top-0 left-0 w-12 h-12 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
    >
      {/* Small dot inside */}
      <div className="w-1 h-1 bg-background rounded-full" />
    </motion.div>
  );
}
