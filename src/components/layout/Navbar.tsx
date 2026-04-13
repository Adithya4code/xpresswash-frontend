import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

function scrollToSection(sectionId: string) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

export function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 lg:py-3 flex items-center justify-between">

        {/* ✅ LOGO — responsive sizing */}
        <img
          src="/media/final-logo.png"
          alt="XPRESS WASH Logo"
          className="h-10 sm:h-12 md:h-14 lg:h-16 -ml-2 w-auto object-contain cursor-pointer"
          onClick={() => {
            if (window.location.pathname === "/") {
              scrollToSection("hero-section");
            } else {
              navigate("/");
              setTimeout(() => scrollToSection("hero-section"), 100);
            }
          }}
        />

        {/* NAVIGATION */}
        <nav className="hidden sm:flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          <button
            className="text-xs sm:text-sm md:text-base font-medium text-text hover:text-primary transition"
            onClick={() => {
              if (window.location.pathname === "/") {
                scrollToSection("hero-section");
              } else {
                navigate("/");
                setTimeout(() => scrollToSection("hero-section"), 100);
              }
            }}
          >
            Home
          </button>

          <button
            className="text-xs sm:text-sm md:text-base font-medium text-text hover:text-primary transition"
            onClick={() => {
              if (window.location.pathname === "/") {
                scrollToSection("popular-services");
              } else {
                navigate("/");
                setTimeout(() => scrollToSection("popular-services"), 100);
              }
            }}
          >
            Services
          </button>

          <button
            className="text-xs sm:text-sm md:text-base font-medium text-text hover:text-primary transition"
            onClick={() => navigate("/contact")}
          >
            Contact
          </button>

          <Button
            style={{ backgroundColor: "#4169E1", color: "#fff", border: "none" }}
            onClick={() => (window.location.href = "https://in.bigin.online/xpresswash/forms/book-your-car-wash-slot-now")}
            className="text-xs sm:text-sm px-3 sm:px-4 py-2"
          >
            Book Now
          </Button>
        </nav>
      </div>
    </header>
  );
}