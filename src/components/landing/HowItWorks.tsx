// components/HowItWorks.tsx
const STEPS = [
  {
    id: "01",
    title: "Digital Booking",
    desc: "Select your package and time via our seamless app.",
  },
  {
    id: "02",
    title: "Expert Arrival",
    desc: "Our fully equipped mobile unit arrives at your GPS location.",
  },
  {
    id: "03",
    title: "Master Detailing",
    desc: "We perform a multi-stage cleaning using eco-safe tech.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-background py-40">
      <div className="container mx-auto px-12 flex flex-col md:flex-row gap-20">
        <div className="md:w-1/3 sticky top-40 h-fit">
          <span className="text-accent font-mono uppercase tracking-widest">
            Process
          </span>
          <h2 className="text-6xl font-bold mt-4">
            HOW WE <br />
            EVOLVE THE <br />
            SHINE
          </h2>
        </div>

        <div className="md:w-2/3 space-y-64">
          {STEPS.map((step) => (
            <div key={step.id} className="max-w-xl">
              <span className="text-8xl font-black text-text/5 block mb-8">
                {step.id}
              </span>
              <h3 className="text-4xl font-bold mb-6 text-accent">
                {step.title}
              </h3>
              <p className="text-2xl text-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
