import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

type Service = {
  id: string
  name: string
  price: number
  description: string
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    // Since our Card is now a motion.div (from our previous step),
    // we can pass motion props directly to it.
    <Card 
      className="flex flex-col gap-4 group"
      // Raise the card and slightly brighten it on hover
      whileHover={{ 
        y: -8,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">{service.name}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {service.description}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between pt-4">
        <div className="flex flex-col">
          <span className="text-xs text-muted uppercase font-bold tracking-wider">Price</span>
          <span className="text-xl font-bold text-primary">
            ₹{service.price.toLocaleString("en-IN")}
          </span>
        </div>

        <Button 
          variant="primary"
          // We can add a unique "tap" effect just for this context
          whileTap={{ scale: 0.9 }}
          className="shadow-md group-hover:shadow-primary/20 group-hover:shadow-lg transition-all"
        >
          Select
        </Button>
      </div>
    </Card>
  )
}