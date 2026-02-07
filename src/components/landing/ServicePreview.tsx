import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "motion/react";

// Define the type based on your API response
export type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
};

export function ServicesPreview() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        // Replace with your actual endpoint URL
        const response = await fetch("http://localhost:8080/services"); 
        if (!response.ok) throw new Error("Failed to fetch services");
        
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (isLoading) {
    return <div className="py-24 text-center">Loading services...</div>;
  }

  if (error) {
    return <div className="py-24 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <section className="py-24 bg-blueSoft">
      <div className="mx-auto max-w-7xl px-6">
        <header className="text-center">
          <h2 className="text-3xl font-bold">Popular Services</h2>
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
              <Card className="h-full flex flex-col p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{service.name}</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {service.durationMinutes} mins
                  </span>
                </div>

                <p className="mt-2 text-muted text-sm flex-grow">
                  {service.description}
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    {/* Formatting numeric price to Currency */}
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    }).format(service.price)}
                  </span>
                  <Button variant="ghost">View Details</Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}