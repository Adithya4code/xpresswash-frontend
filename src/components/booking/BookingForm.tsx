"use client";
import { motion } from "motion/react";
import { type BookingData, SERVICE_OPTIONS } from "@/types/booking";

interface Props {
  formData: BookingData;
  setFormData: (data: BookingData) => void;
  onLog: () => void;
}

export function BookingForm({ formData, setFormData, onLog }: Props) {
  const inputStyle =
    "w-full bg-surface border border-muted/20 p-5 rounded-xl outline-none focus:border-accent transition-all text-text focus:ring-1 focus:ring-accent/30";

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
          Book Your <br />
          <span className="text-accent italic">Session</span>
        </h1>
        <p className="text-muted mt-6 text-lg">
          Enter details to generate your digital booking pass.
        </p>
      </div>

      <div className="space-y-4">
        <input
          className={inputStyle}
          type="text"
          placeholder="Full Name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <input
          className={inputStyle}
          type="text"
          placeholder="Phone Number"
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        <input
          className={inputStyle}
          type="text"
          placeholder="Car Model (e.g. BMW M4)"
          onChange={(e) =>
            setFormData({ ...formData, carModel: e.target.value })
          }
        />

        <input
          className={inputStyle}
          type="text"
          placeholder="Location in Bangalore"
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />

        <select
          className={inputStyle}
          onChange={(e) =>
            setFormData({
              ...formData,
              service: e.target.value as BookingData["service"],
            })
          }
        >
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={onLog}
        className="w-full py-5 bg-text text-background rounded-xl font-black uppercase tracking-widest hover:bg-accent transition-all active:scale-[0.98]"
      >
        Prepare Booking Data
      </button>
    </motion.div>
  );
}
