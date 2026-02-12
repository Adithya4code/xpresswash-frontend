import { Card } from "@/components/ui/Card"

const items = [
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32" className="mx-auto mb-3 text-blue-600"><rect x="6" y="14" width="20" height="12" rx="4" fill="currentColor" opacity=".12"/><path d="M8 18h16M8 22h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    title: "Upfront, Honest Pricing",
    desc: "No surprises. No hidden fees. See the full cost before we start — always.",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32" className="mx-auto mb-3 text-blue-600"><circle cx="16" cy="12" r="6" fill="currentColor" opacity=".12"/><path d="M16 18c-4.418 0-8 2.239-8 5v1a1 1 0 001 1h14a1 1 0 001-1v-1c0-2.761-3.582-5-8-5z" stroke="currentColor" strokeWidth="2"/></svg>
    ),
    title: "Certified Repair Experts",
    desc: "Skilled professionals with proven experience and quality assurance on every service.",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32" className="mx-auto mb-3 text-blue-600"><rect x="4" y="16" width="24" height="8" rx="4" fill="currentColor" opacity=".12"/><path d="M8 20h16M8 24h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M28 12v8a4 4 0 01-4 4H8a4 4 0 01-4-4v-8" stroke="currentColor" strokeWidth="2"/></svg>
    ),
    title: "Free Doorstep Pickup & Delivery",
    desc: "We collect, repair, and return your device — safely and on time.",
  },
];

export function ValueProps() {
  return (
    <section className="py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-5xl md:text-6xl font-extrabold text-left mb-12 tracking-tight">
          <span className="text-6xl md:text-7xl leading-tight font-extrabold text-transparent" style={{ WebkitTextStroke: '2px #0b1f3b' }}>WHY</span><br className="hidden md:block"/>
          <span className="text-primary">CHOOSE <span className="font-extrabold text-transparent" style={{ WebkitTextStroke: '2px #0b1f3b' }}>XPRESS</span>?</span>
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <Card
              key={item.title}
              className="relative flex flex-col items-center justify-start p-10 bg-white border border-[#E3EAF5] rounded-[20px] shadow-[0_6px_32px_0_rgba(15,42,79,0.10)] min-h-[366px] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_0_rgba(15,42,79,0.18)] hover:border-[#0F2A4F]"
              style={{ borderRadius: 20 }}
            >
              <div className="mb-5">{item.icon}</div>
              <h3 className="text-xl font-bold text-[#0F2A4F] mb-3 text-center" style={{ fontWeight: 700 }}>
                {item.title}
              </h3>
              <p className="text-base text-[#475569] text-center" style={{ lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
