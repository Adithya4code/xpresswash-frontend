import { motion, type HTMLMotionProps } from "motion/react"
import { cn } from "@/utils/cn"

// Using HTMLMotionProps<"div"> ensures all motion features and 
// standard div attributes are correctly typed for TypeScript.
type CardProps = HTMLMotionProps<"div">

export function Card({ className, ...props }: CardProps) {
  return (
    <motion.div
      // 1. Hover & Tap Gestures (replacing CSS transition classes)
      whileHover={{ 
        y: -4,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
      }}
      whileTap={{ scale: 0.99 }}
      
      // 2. Initial Animation (Optional: makes the card fade in)
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}

      className={cn(
        "rounded-xl bg-surface p-6 shadow-sm", 
        // Note: We removed "transition hover:shadow-md" because motion handles it now
        className
      )}
      {...props}
    />
  )
}