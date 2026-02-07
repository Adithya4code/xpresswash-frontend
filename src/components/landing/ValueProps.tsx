import { Card } from "@/components/ui/Card"

const items = [
  {
    title: "Transparent Pricing",
    desc: "Know the cost upfront. No hidden charges.",
  },
  {
    title: "Expert Technicians",
    desc: "Verified professionals with years of experience.",
  },
  {
    title: "Pickup & Drop",
    desc: "We handle everything, door to door.",
  },
]

export function ValueProps() {
  return (
    <section className="py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-6 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <Card key={item.title}>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-muted">{item.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
