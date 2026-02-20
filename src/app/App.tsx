"use client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Booking from "@/pages/Booking";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-text antialiased">
        <Routes>
          {/* Main Home/Landing Page */}
          <Route path="/" element={<Landing />} />

          {/* Booking Page */}
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </div>
    </Router>
  );
}
