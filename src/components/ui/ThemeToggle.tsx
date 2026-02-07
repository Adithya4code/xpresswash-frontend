import { motion, AnimatePresence } from "motion/react"
import { useTheme } from "@/app/ThemeProvider"

export function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative flex items-center gap-2 rounded-full border border-muted/30 bg-surface px-4 py-2 text-sm font-medium text-text shadow-sm transition hover:shadow-md hover:ring-2 hover:ring-accent/30"
    >
      <AnimatePresence mode="wait">
        {theme === "light" ? (
          <motion.span
            key="light"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            🌞 <span>Light</span>
          </motion.span>
        ) : (
          <motion.span
            key="dark"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            🌙 <span>Dark</span>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
