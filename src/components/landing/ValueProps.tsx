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
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-5xl md:text-6xl font-extrabold text-left mb-12 tracking-tight">
          <span className="text-white text-6xl md:text-7xl leading-tight">WHY</span><br className="hidden md:block"/>
          <span className="text-primary">CHOOSE <span className="text-white">XPRESS</span>?</span>
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <Card key={item.title} className="relative p-6 bg-white">
              <h3 className="text-xl font-extrabold text-primary mb-1">{item.title}</h3>
              <p className="mt-2 text-base text-gray-800 font-medium">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
