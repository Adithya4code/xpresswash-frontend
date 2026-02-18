
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 bg-background/0 backdrop-blur border-b border-muted/20">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-semibold text-primary">
          AutoCare
        </span>

        <div className="flex items-center gap-4">
          <Button onClick={() => navigate("/bookings")}>Book Now</Button>
        </div>
      </div>
    </header>
  );
}
