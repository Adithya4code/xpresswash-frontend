
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Services } from "@/pages/Services";
import Landing from "@/pages/Landing";
import Bookings from "@/pages/Bookings";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-text antialiased">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}