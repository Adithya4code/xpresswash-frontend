import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Bookings from "@/pages/Bookings";
import Admin from "@/pages/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-text antialiased">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
