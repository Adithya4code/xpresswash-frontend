"use client";  //In case later shift to Next.js

import { motion, type HTMLMotionProps } from "motion/react"; 
import { cn } from "@/utils/cn";

// We use HTMLMotionProps instead of React.ButtonHTMLAttributes 
// to ensure Motion-specific props (whileHover, etc.) are correctly typed.
type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
};

export function Button({
  variant = "primary",
  loading,
  className,
  children,
  disabled, // Destructured to avoid collision in {...props}
  ...props
}: ButtonProps) {
  return (
    <motion.button
      // Interaction Props
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      
      // Accessibility & State
      disabled={loading || disabled}
      aria-disabled={loading || disabled}
      
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent",
        variant === "primary" && "bg-primary text-white shadow hover:shadow-lg",
        variant === "secondary" && "bg-surface text-text border border-muted/20",
        variant === "ghost" && "bg-transparent text-primary hover:bg-muted/10",
        loading && "opacity-70 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          {/* A simple CSS spinner that inherits the button's text color */}
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}