import React, { useState, useRef } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
>>>>>>> parent of bd4000a (added basic toggle for website)

const SERVICES = [
  "Express Wash",
  "Premium Detailing",
  "Sanitization Package",
  "Interior Deep Clean",
  "Ceramic Protection"
];

const LOCATIONS = [
  "Whitefield",
  "Marathahalli",
  "Indiranagar",
  "HSR Layout",
  "Koramangala",
  "Electronic City",
  "Bellandur",
  "Sarjapur"
];

const ADDONS = [
  "None",
  "Interior Vacuum",
  "Engine Cleaning",
  "Wax Polish",
  "Ceramic Spray Coating"
];

export default function Bookings() {
<<<<<<< HEAD
  const navigate = useNavigate();
=======
>>>>>>> parent of bd4000a (added basic toggle for website)
  const [form, setForm] = useState({
    name: "",
    contact: "",
    service: SERVICES[0],
    location: LOCATIONS[0],
    addon: ADDONS[0],
    date: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const dateRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = `New Booking!
Name: ${form.name}
Contact: ${form.contact}
Service: ${form.service}
Location: ${form.location}
Add-on: ${form.addon}
Date: ${form.date}`;

    const whatsappUrl = `https://wa.me/9538926581?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
=======
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--blue-main)] via-[#1E3A8A] to-black p-6">
>>>>>>> parent of bd4000a (added basic toggle for website)

      <div className="w-full max-w-lg">

        <div style={{ position: 'fixed', top: 24, left: 24, zIndex: 50 }}>
<<<<<<< HEAD
            <button
              type="button"
              className="px-6 py-2 rounded-full font-semibold text-white bg-blue-500 hover:bg-blue-700 transition-all duration-300 shadow-lg"
              onClick={() => {
                navigate("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Go Back to Home
            </button>
=======
          <button
            type="button"
            className="px-6 py-2 rounded-full font-semibold text-white bg-blue-500 hover:bg-blue-700 transition-all duration-300 shadow-lg"
            onClick={() => window.location.href = '/'}
          >
            Go Back to Home
          </button>
>>>>>>> parent of bd4000a (added basic toggle for website)
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Book Your Car Wash</h1>
          <p className="text-gray-500 mt-2">
            Choose your service and schedule a professional car cleaning.
          </p>
        </div>

        {submitted ? (
          <div className="bg-green-100 border border-green-400 text-green-700 p-6 rounded-xl text-center shadow-md">
            🎉 Your booking request has been sent!
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-8 space-y-5 transition hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
          >

            {/* Name */}
            <div>
<<<<<<< HEAD
              <label className="block text-sm text-gray-700 mb-1">Customer Name</label>
=======
              <label className="block text-sm text-gray-200 mb-1">Customer Name</label>
>>>>>>> parent of bd4000a (added basic toggle for website)
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
<<<<<<< HEAD
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
=======
                className="w-full px-4 py-2 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
>>>>>>> parent of bd4000a (added basic toggle for website)
              />
            </div>

            {/* Contact */}
            <div>
<<<<<<< HEAD
              <label className="block text-sm text-gray-700 mb-1">Contact Details</label>
              <div className="flex">
                <span className="px-3 py-2 rounded-l-lg bg-white border border-r-0 border-gray-300 text-gray-700 font-semibold">+91</span>
=======
              <label className="block text-sm text-gray-200 mb-1">Contact Details</label>
              <div className="flex">
                <span className="px-3 py-2 rounded-l-lg bg-white/90 border border-r-0 border-gray-300 text-gray-700 font-semibold">+91</span>
>>>>>>> parent of bd4000a (added basic toggle for website)
                <input
                  type="tel"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  required
                  placeholder="Phone number"
                  pattern="[0-9]{10}"
                  maxLength={10}
<<<<<<< HEAD
                  className="w-full px-4 py-2 rounded-r-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
=======
                  className="w-full px-4 py-2 rounded-r-lg bg-white/90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
>>>>>>> parent of bd4000a (added basic toggle for website)
                />
              </div>
            </div>

            {/* Date */}
            <div>
<<<<<<< HEAD
              <label className="block text-sm text-gray-700 mb-1">Booking Date</label>
=======
              <label className="block text-sm text-gray-200 mb-1">Booking Date</label>
>>>>>>> parent of bd4000a (added basic toggle for website)
              <input
                ref={dateRef}
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
                onClick={() => dateRef.current?.showPicker()}
                onFocus={() => dateRef.current?.showPicker()}
<<<<<<< HEAD
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
=======
                className="w-full px-4 py-2 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
>>>>>>> parent of bd4000a (added basic toggle for website)
              />
            </div>

            {/* Service */}
            <div>
<<<<<<< HEAD
              <label className="block text-sm text-gray-700 mb-1">Service Needed</label>
=======
              <label className="block text-sm text-gray-200 mb-1">Service Needed</label>
>>>>>>> parent of bd4000a (added basic toggle for website)
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
<<<<<<< HEAD
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
=======
                className="w-full px-4 py-2 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
>>>>>>> parent of bd4000a (added basic toggle for website)
              >
                {SERVICES.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
<<<<<<< HEAD
              <label className="block text-sm text-gray-700 mb-1">Service Location</label>
=======
              <label className="block text-sm text-gray-200 mb-1">Service Location</label>
>>>>>>> parent of bd4000a (added basic toggle for website)
              <select
                name="location"
                value={form.location}
                onChange={handleChange}
<<<<<<< HEAD
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
=======
                className="w-full px-4 py-2 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
>>>>>>> parent of bd4000a (added basic toggle for website)
              >
                {LOCATIONS.map((location) => (
                  <option key={location} value={location}>
                    {location}, Bangalore
                  </option>
                ))}
              </select>
            </div>

            {/* Addons */}
            <div>
<<<<<<< HEAD
              <label className="block text-sm text-gray-700 mb-1">Add-ons</label>
=======
              <label className="block text-sm text-gray-200 mb-1">Add-ons</label>
>>>>>>> parent of bd4000a (added basic toggle for website)
              <select
                name="addon"
                value={form.addon}
                onChange={handleChange}
<<<<<<< HEAD
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
=======
                className="w-full px-4 py-2 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
>>>>>>> parent of bd4000a (added basic toggle for website)
              >
                {ADDONS.map((addon) => (
                  <option key={addon} value={addon}>
                    {addon}
                  </option>
                ))}
              </select>
            </div>
<<<<<<< HEAD

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 transition transform hover:scale-[1.02] shadow-lg"
            >
              {addons.map((a) => (
                <option key={a.id} value={a.label}>
                  {a.label}
                </option>
              ))}
            </select>
=======
>>>>>>> parent of bd4000a (added basic toggle for website)

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 transition transform hover:scale-[1.02] shadow-lg"
            >
              Book Service 🚗
            </button>

          </form>
        )}
      </div>
    </div>
  );
}