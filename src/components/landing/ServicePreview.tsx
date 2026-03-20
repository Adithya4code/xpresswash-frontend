import { motion } from "framer-motion";
import { useState } from "react";

const services = [
  {
    id: 1,
    name: "Express Wash",
    description: "Quick exterior wash and dry for a spotless shine in minutes.",
    image: "/media/car_wash.png",
    price: 299,
    durationMinutes: 20,
    inclusions: [
      "Exterior hand wash",
      "Drying with microfiber towels",
      "Tire shine",
      "Window cleaning",
      "Quick vacuum (front seats)",
    ],
  },
  {
    id: 2,
    name: "Premium Detailing",
    description: "Full interior and exterior cleaning, vacuum, polish, and wax.",
    image: "/media/service-slide-2.webp",
    price: 899,
    durationMinutes: 60,
    inclusions: [
      "Full exterior wash & dry",
      "Clay bar treatment",
      "Hand wax application",
      "Complete interior vacuum",
      "Dashboard & console cleaning",
      "Leather/vinyl conditioning",
      "Window cleaning (inside & out)",
      "Tire & wheel deep clean",
      "Air freshener",
    ],
  },
  {
    id: 3,
    name: "Sanitization Package",
    description: "Deep cleaning and disinfection for a safe, hygienic ride.",
    image: "/media/pexels-introspectivedsgn-4876641.jpg",
    price: 499,
    durationMinutes: 40,
    inclusions: [
      "Exterior wash & dry",
      "Interior steam cleaning",
      "AC vent disinfection",
      "Antibacterial wipe-down",
      "Seat & upholstery sanitization",
      "Door handles & high-touch areas",
      "Trunk cleaning",
      "Air purifier treatment",
    ],
  },
  {
    id: 4,
    name: "Interior Deep Clean",
    description: "Thorough cleaning of seats, carpets, dashboard, and upholstery.",
    image: "/media/i2.jpg",
    price: 699,
    durationMinutes: 50,
    inclusions: [
      "Seat shampooing",
      "Carpet vacuum",
      "Dashboard polish",
      "Door panel cleaning",
      "Interior deodorizing",
    ],
  },
  {
    id: 5,
    name: "Ceramic Protection",
    description: "Advanced coating to protect paint and enhance gloss.",
    image: "/media/xpresswashjpeg.jpeg",
    price: 1499,
    durationMinutes: 90,
    inclusions: [
      "Exterior wash",
      "Paint decontamination",
      "Ceramic coating application",
      "High gloss finish",
      "Water repellent protection",
    ],
  },
];

const serviceSteps: Record<number, string[]> = {
  1: ["Pre-rinse", "Foam wash", "Hand wash", "Drying", "Final touch"],
  2: ["Inspection", "Wash", "Clay bar", "Polish", "Wax", "Interior clean"],
  3: ["Wash", "Steam cleaning", "Disinfection", "AC vents clean", "Sanitize"],
  4: ["Vacuum", "Shampoo seats", "Dashboard clean", "Panels wipe", "Deodorize"],
  5: ["Wash", "Decontamination", "Coating", "Curing", "Final inspection"],
};

export function ServicesPreview() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <section id="popular-services" className="py-12" style={{ backgroundColor: 'white' }}>
      <div className="mx-auto max-w-7xl px-6">
        <header className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight drop-shadow-lg" style={{ color: 'var(--primary)' }}>
            Popular Services
          </h2>
          <p className="mt-2 text-lg max-w-2xl mx-auto" style={{ color: 'var(--primary)' }}>
            Carefully designed packages for every car and every need.
          </p>
        </header>

        {/* First row */}
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {services.slice(0, 3).map((service) => {
            const isPremium = service.name === "Premium Detailing";

            return (
              <motion.div
                key={service.id}
                whileHover={{
                  y: -8,
                  boxShadow: isPremium
                    ? "0 0 0 4px #2563EB88, 0 12px 48px 0 #22D3EE99"
                    : "0 8px 32px 0 #2563EB44"
                }}
                transition={{ duration: 0.35 }}
                className={[
                  "relative flex flex-col items-center justify-between min-h-[260px] p-5",
                  "rounded-[24px] border border-[#1E293B]/30 backdrop-blur-xl",
                  "bg-white/10",
                  "shadow-[0_8px_40px_0_rgba(37,99,235,0.10)]",
                  "transition-all duration-300",
                  isPremium
                    ? "scale-105 border-2 border-cyan-400/80 shadow-[0_0_0_4px_#22D3EE88,0_12px_48px_0_#2563EB99] z-10"
                    : "hover:border-[#2563EB]"
                ].join(' ')}
                style={{
                  background: "#4169E1",
                  border: "1px solid var(--primary)",
                  borderRadius: 24,
                  color: "#fff",
                }}
              >

                {/* ✅ UPDATED RECOMMENDED BADGE */}
                {isPremium && (
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-[-50%] px-4 py-1 rounded-full text-xs font-bold shadow-md"
                    style={{
                      background: "linear-gradient(90deg, #facc15, #f97316)",
                      color: "#000",
                      letterSpacing: "0.5px"
                    }}
                  >
                    ⭐ RECOMMENDED
                  </div>
                )}

                <div className="w-full mb-3 overflow-hidden rounded-lg">
                  <img src={service.image} alt={service.name} className="w-full h-40 object-cover" />
                </div>

                <h3 className="text-xl font-bold text-center" style={{ color: '#fff' }}>
                  {service.name}
                </h3>

                <span className="text-xl font-bold mt-3" style={{ color: '#fff' }}>
                  ₹{service.price}
                </span>

                <div className="flex gap-3 mt-5 w-full">
                  <button
                    className="ml-auto px-7 py-2 rounded-full font-semibold text-white text-base shadow-lg transition-all duration-300 hover:opacity-90 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#0b1f3b]/60"
                    style={{
                      backgroundColor: 'var(--primary)',
                      boxShadow: '0 4px 20px rgba(11, 31, 59, 0.6)'
                    }}
                  >
                    Book Now
                  </button>

                  <button
                    onClick={() => setSelectedService(service)}
                    className="flex-1 px-4 py-2 rounded-full font-semibold text-sm"
                    style={{ backgroundColor: '#fff', color: 'var(--primary)', border: 'none' }}
                  >
                    Show Details
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Second row (unchanged) */}
        <div className="mt-6 grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
          {services.slice(3).map((service) => {
            return (
              <motion.div
                key={service.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35 }}
                className="relative flex flex-col items-center justify-between min-h-[260px] p-5 rounded-[24px] border border-[#1E293B]/30 backdrop-blur-xl bg-white/10"
                style={{
                  background: "#4169E1",
                  border: "1px solid var(--primary)",
                  borderRadius: 24,
                  color: "#fff",
                }}
              >
                <div className="w-full mb-3 overflow-hidden rounded-lg">
                  <img src={service.image} alt={service.name} className="w-full h-40 object-cover" />
                </div>

                <h3 className="text-xl font-bold text-center" style={{ color: '#fff' }}>
                  {service.name}
                </h3>

                <span className="text-xl font-bold mt-3" style={{ color: '#fff' }}>
                  ₹{service.price}
                </span>

                <div className="flex gap-3 mt-5 w-full">
                  <button
                    className="ml-auto px-7 py-2 rounded-full font-semibold text-white text-base shadow-lg transition-all duration-300 hover:opacity-90 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#0b1f3b]/60"
                    style={{
                      backgroundColor: 'var(--primary)',
                      boxShadow: '0 4px 20px rgba(11, 31, 59, 0.6)'
                    }}
                  >
                    Book Now
                  </button>

                  <button
                    onClick={() => setSelectedService(service)}
                    className="flex-1 px-4 py-2 rounded-full font-semibold text-sm"
                    style={{ backgroundColor: '#fff', color: 'var(--primary)', border: 'none' }}
                  >
                    Show Details
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal unchanged */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[90%] max-w-4xl p-6 relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-3 right-4 text-xl font-bold text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-[#204264] mb-4 text-center">
              {selectedService.name}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-[#204264] mb-2">Details</h3>
                <p className="text-sm mb-3 text-[#204264]">
                  {selectedService.description}
                </p>

                <ul className="list-disc pl-5 text-sm text-[#204264] space-y-1">
                  {selectedService.inclusions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="border-l pl-4">
                <h3 className="font-semibold text-[#204264] mb-2">Process Steps</h3>
                <ol className="list-decimal pl-5 text-sm text-[#204264] space-y-1">
                  {serviceSteps[selectedService.id].map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}