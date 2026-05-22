import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getBookingLink } from "@/utils/adminUtils";
import { motion, AnimatePresence } from "framer-motion";

function scrollToSection(sectionId: string) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

export function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Smart Scroll: Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false); // Scrolling Down -> Hide
      } else {
        setIsVisible(true); // Scrolling Up -> Show
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBook = async () => {
    setMenuOpen(false);
    const link = await getBookingLink("services_booking_link");
    if (link) {
      window.open(link, "_blank");
    } else {
      alert("Booking link not configured");
    }
  };

  const goToSection = (section: string) => {
    setMenuOpen(false);
    if (window.location.pathname === "/") {
      scrollToSection(section);
    } else {
      navigate("/");
      setTimeout(() => scrollToSection(section), 100);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200/80 shadow-md py-3 transition-transform duration-500 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        {/* LOGO CONTAINER */}
        <div className="relative py-1 shrink-0">
          <img
            src="/media/final-logo.png"
            alt="XPRESS WASH Logo"
            className="h-9 md:h-11 w-auto object-contain cursor-pointer transition-transform hover:scale-105"
            onClick={() => goToSection("hero-section")}
          />
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8">
          {["Home", "Services", "FAQ"].map((item) => (
            <button
              key={item}
              className="text-xs font-bold uppercase tracking-widest text-slate-700 hover:text-blue-600 transition-colors duration-200"
              onClick={() =>
                goToSection(
                  item === "Home"
                    ? "hero-section"
                    : item === "Services"
                      ? "popular-services"
                      : "faq-section",
                )
              }
            >
              {item}
            </button>
          ))}

          <button
            onClick={handleBook}
            className="px-6 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95 duration-300"
          >
            Book Now
          </button>
        </nav>

        {/* MOBILE MENU TRIGGER BUTTON */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-900 hover:bg-slate-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE FULL-SCREEN OVERLAY MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl md:hidden overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              {["Home", "Services", "FAQ"].map((item) => (
                <button
                  key={item}
                  className="text-left text-base font-extrabold text-slate-800 hover:text-blue-600 border-b border-slate-100 pb-3 uppercase tracking-wider"
                  onClick={() =>
                    goToSection(
                      item === "Home"
                        ? "hero-section"
                        : item === "Services"
                          ? "popular-services"
                          : "faq-section",
                    )
                  }
                >
                  {item}
                </button>
              ))}

              <button
                onClick={handleBook}
                className="w-full mt-2 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md shadow-blue-500/20 active:scale-98"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
