import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "motion/react";

const services = [
  {
    id: 1,
    name: "Express Wash",
    description: "Quick exterior wash and dry for a spotless shine in minutes.",
    price: 299,
    durationMinutes: 20,
  },
  {
    id: 2,
    name: "Premium Detailing",
    description: "Full interior and exterior cleaning, vacuum, polish, and wax.",
    price: 899,
    durationMinutes: 60,
  },
  {
    id: 3,
    name: "Sanitization Package",
    description: "Deep cleaning and disinfection for a safe, hygienic ride.",
    price: 499,
    durationMinutes: 40,
  },
];

export function ServicesPreview() {
  return (
    <section id="popular-services" className="py-24 bg-blueSoft">
      <div className="mx-auto max-w-7xl px-6">
        <header className="text-center">
          <h2 className="text-3xl font-bold text-primary">Popular Services</h2>
          <p className="mt-4 text-muted">
            Carefully designed packages for every car and every need.
          </p>
        </header>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="h-full flex flex-col p-6 bg-white">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-extrabold text-primary mb-1">{service.name}</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {service.durationMinutes} mins
                  </span>
                </div>
                <p className="mt-2 text-base text-gray-800 font-medium flex-grow">
                  {service.description}
                </p>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    ₹{service.price}
                  </span>
                  <Button
                    className="text-black border-black border bg-white hover:bg-gray-100"
                    variant="outline"
                  >
                    Book
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}