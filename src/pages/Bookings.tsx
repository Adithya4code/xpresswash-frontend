import React, { useState } from "react";

const SERVICES = [
  "Exterior Wash",
  "Interior Cleaning",
  "Full Detailing"
];

export default function Bookings() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    service: SERVICES[0],
    date: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Send WhatsApp message to owner
    const message = `New Booking!\nName: ${form.name}\nContact: ${form.contact}\nService: ${form.service}\nDate: ${form.date}`;
    const whatsappUrl = `https://wa.me/9538926581?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex flex-col items-center py-12">
      <h1 className="text-3xl font-bold mb-6">Book a Service</h1>
      {submitted ? (
        <div className="p-6 bg-green-100 rounded">Thank you! Your booking has been received.</div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded shadow">
          <div className="mb-4">
            <label className="block mb-1 font-medium">Customer Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Contact Details</label>
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
              placeholder="Phone or Email"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Booking Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-medium">Service Needed</label>
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              {SERVICES.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Book Service
          </button>
        </form>
      )}
    </div>
  );
}
