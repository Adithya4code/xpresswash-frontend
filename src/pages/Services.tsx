import { useEffect, useState } from "react";
import { fetchServices } from "@/api/services";
import type { Service } from "@/api/services";


export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetchServices().then(setServices);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Premium Car Wash</h1>

      {services.map(s => (
        <div key={s.id} style={{ marginTop: 20, padding: 20, border: "1px solid #ddd" }}>
          <h2>{s.name}</h2>
          <p>{s.description}</p>
          <p>₹{s.price} • {s.durationMinutes} mins</p>
          <button>Book Now</button>
        </div>
      ))}
    </div>
  );
}
