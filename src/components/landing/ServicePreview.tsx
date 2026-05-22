import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getBookingLink } from "@/utils/adminUtils";

type Service = {
  id: string;
  label: string;
  description: string;
  price_hatchback: number;
  price_sedan: number;
  price_suv: number;
};

const ServiceCard = ({ service }: { service: Service }) => {
  const isPremium =
    service.label.toLowerCase().includes("standard") ||
    service.label.toLowerCase().includes("gold");

  let features: string[] = [];
  let bestForText = "";

  if (service.description) {
    const parts = service.description.split(/best for:/i);
    const mainDetails = parts[0];
    if (parts[1]) {
      bestForText = "Best For: " + parts[1].trim();
    }

    const cleanDetails = mainDetails.replace(/service includes:/i, "").trim();
    features = cleanDetails
      .split(/[&•]/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  return (
    <div
      className={`group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl backdrop-blur-md h-[600px] w-[320px] sm:w-[390px] shrink-0 snap-start transition-all duration-500 hover:-translate-y-2
        ${
          isPremium
            ? "bg-gradient-to-b from-slate-900 to-[#020617] border border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_10px_30px_rgba(6,182,212,0.1)] hover:shadow-[0_20px_40px_rgba(6,182,212,0.25)]"
            : "bg-slate-900/40 hover:bg-slate-900/60 border border-slate-800 hover:border-slate-700 shadow-xl"
        }`}
    >
      {isPremium && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400 blur-md opacity-50 rounded-full" />
            <span className="relative bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-[10px] font-black px-5 py-1.5 rounded-full uppercase tracking-widest shadow-md">
              Recommended
            </span>
          </div>
        </div>
      )}

      {/* Top Body Content */}
      <div className="overflow-hidden flex flex-col flex-grow mt-2 relative">
        <div className="mb-4 shrink-0">
          <h3 className="text-xl font-black text-white mb-2 uppercase tracking-wider line-clamp-2 min-h-[56px] leading-tight">
            {service.label}
          </h3>
          <div className="flex gap-1">
            <div className="h-1 w-8 bg-cyan-400 rounded-full" />
            <div className="h-1 w-2 bg-blue-500 rounded-full" />
          </div>
        </div>

        {features.length > 0 && (
          <div className="relative flex-grow overflow-hidden mb-4">
            {/* Scrollable list area */}
            <div className="overflow-y-auto h-full pr-1 pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <ul className="space-y-3">
                {features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-start text-xs sm:text-sm text-slate-300 leading-relaxed group/item"
                  >
                    <svg
                      className="w-4 h-4 text-cyan-500 mr-2.5 mt-0.5 shrink-0 transition-transform group-hover/item:scale-110"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="first-letter:uppercase">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Visual Fade Overlay to show it has more content to scroll */}
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent pointer-events-none z-10 group-hover:from-slate-900/90" />
          </div>
        )}
      </div>

      {/* Bottom Sticky Footer */}
      <div className="shrink-0 pt-4 border-t border-slate-800/60 space-y-4">
        {bestForText && (
          <div className="bg-slate-950/40 rounded-xl p-2.5 border border-slate-800/40">
            <p className="text-[11px] text-cyan-400/90 font-medium leading-relaxed line-clamp-2">
              <span className="text-slate-500 mr-1">🎯</span> {bestForText}
            </p>
          </div>
        )}

        {/* 3 Premium Boxes with generous grid spacing */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-gradient-to-b from-slate-950/80 to-slate-950/30 rounded-xl p-2.5 border border-slate-800/80 text-center transition-colors group-hover:border-slate-700/60">
            <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">
              Hatch
            </span>
            <span className="text-sm sm:text-base font-black text-white">
              ₹{Number(service.price_hatchback).toLocaleString("en-IN")}
            </span>
          </div>
          <div className="bg-gradient-to-b from-slate-950/80 to-slate-950/30 rounded-xl p-2.5 border border-slate-800/80 text-center transition-colors group-hover:border-slate-700/60">
            <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">
              Sedan
            </span>
            <span className="text-sm sm:text-base font-black text-white">
              ₹{Number(service.price_sedan).toLocaleString("en-IN")}
            </span>
          </div>
          <div className="bg-gradient-to-b from-slate-950/80 to-slate-950/30 rounded-xl p-2.5 border border-slate-800/80 text-center transition-colors group-hover:border-slate-700/60">
            <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">
              SUV
            </span>
            <span className="text-sm sm:text-base font-black text-white">
              ₹{Number(service.price_suv).toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            Prices Incl. 18% GST
          </span>
          <button
            onClick={async () => {
              const link = await getBookingLink("services_booking_link");
              if (link) window.open(link, "_blank");
            }}
            className={`px-6 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest text-white transition-all active:scale-95
              ${
                isPremium
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                  : "bg-slate-800 hover:bg-slate-700 hover:shadow-lg"
              }`}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export function ServicesPreview() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const { data, error } = await supabase
          .from("config_services")
          .select("*")
          .eq("is_active", true)
          .order("display_order");

        if (error) throw error;
        setServices(data || []);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollContainerRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="popular-services"
      className="py-24 bg-[#020617] relative overflow-hidden border-t border-slate-900"
    >
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main outer width layout spacing */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <header className="text-center mb-16 px-4">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Tailored{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Packages
            </span>
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto font-medium leading-relaxed">
            Choose the exact level of care your vehicle needs. Swipe to explore
            our professional detailing tiers.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="relative group">
            {/* Rebalanced outer navigation arrows */}
            <button
              onClick={() => scroll("left")}
              className="absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-slate-900/95 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] opacity-0 group-hover:opacity-100 transition-all duration-300"
              aria-label="Scroll Left"
            >
              ←
            </button>

            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-10 pt-4 px-4 -mx-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            <button
              onClick={() => scroll("right")}
              className="absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-slate-900/95 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] opacity-0 group-hover:opacity-100 transition-all duration-300"
              aria-label="Scroll Right"
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
