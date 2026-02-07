import { motion } from "motion/react"
import { Button } from "@/components/ui/Button"

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div 
        className="absolute inset-0 -z-10 bg-glow-top" 
        aria-hidden="true" 
      />
      <div className="mx-auto max-w-7xl px-6 py-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl md:text-6xl font-bold tracking-tight text-text"
        >
          Premium Car Service. <br />
          <span className="text-primary">Booked in Minutes.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mt-6 text-lg text-muted max-w-2xl mx-auto"
        >
          Hassle-free car servicing with transparent pricing, expert technicians,
          and real-time booking — all from your phone.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-10 flex justify-center gap-4"
        >
          <Button className="px-8">Book Service</Button>
          <Button variant="secondary">Explore Services</Button>
        </motion.div>
      </div>
    </section>
  )
}
