import { Button } from "@/components/ui/Button"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-muted/20">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-semibold text-primary">
          AutoCare
        </span>

        <Button>Book Now</Button>
      </div>
    </header>
  )
}
