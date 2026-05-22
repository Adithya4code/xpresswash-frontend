import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { getBookingLink } from "@/utils/adminUtils";

type Subscription = {
  id: string;
  label: string;
  description: string;
  base_price: number;
  wash_count: number;
  vehicle_type: string;
};

export function SubscriptionPreview() {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("Sedan"); // Default tab

  useEffect(() => {
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from("config_subscriptions")
          .select("*")
          .eq("is_active", true)
          .order("wash_count", { ascending: true });

        if (error) throw error;
        setSubs(data || []);

        // Auto-select the first available vehicle type if Sedan isn't there
        if (
          data &&
          data.length > 0 &&
          !data.find((s) => s.vehicle_type === "Sedan")
        ) {
          setActiveTab(data[0].vehicle_type);
        }
      } catch (err) {
        console.error("Error fetching subscriptions:", err);
      } finally {
        setLoading(false);
      }
    };

    load();

    const channel = supabase
      .channel("config_subscriptions_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "config_subscriptions" },
        () => load(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Extract unique vehicle types for our tabs dynamically
  const vehicleTypes = Array.from(new Set(subs.map((s) => s.vehicle_type)));
  const filteredSubs = subs.filter((s) => s.vehicle_type === activeTab);

  return (
    <section className="py-24 bg-[#020617] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <header className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight"
          >
            Monthly{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Plans
            </span>
          </motion.h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Select your vehicle type to see specialized monthly maintenance
            packages.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-white/5 border-t-cyan-500 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* The Tab Toggles */}
            <div className="flex justify-center mb-12">
              <div className="flex p-1.5 bg-slate-900/80 border border-slate-800 rounded-2xl backdrop-blur-md">
                {vehicleTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveTab(type)}
                    className={`relative px-6 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
                      activeTab === type
                        ? "text-slate-950"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {activeTab === type && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl shadow-lg"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <span className="relative z-10 uppercase tracking-wider">
                      {type}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* The Cards Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              <AnimatePresence mode="popLayout">
                {filteredSubs.map((sub) => {
                  const basePrice = sub.base_price || 0;
                  const finalPrice = basePrice * 1.18;
                  const pricePerWash = finalPrice / sub.wash_count;

                  // Highlight the middle tier (usually 6 washes) as best value
                  const isPopular = sub.wash_count === 6;

                  return (
                    <motion.div
                      key={sub.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className={`relative p-8 rounded-[24px] border backdrop-blur-md flex flex-col transition-all duration-300
                        ${
                          isPopular
                            ? "bg-slate-900 border-cyan-500/40 shadow-[0_20px_40px_rgba(6,182,212,0.15)] md:-translate-y-4"
                            : "bg-slate-900/60 border-slate-800 shadow-xl"
                        }`}
                    >
                      {isPopular && (
                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-md">
                          Most Popular
                        </span>
                      )}

                      <div className="mb-6">
                        <h3 className="text-2xl font-black text-white tracking-tight mb-2">
                          {sub.wash_count} Washes
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed h-10">
                          {sub.description}
                        </p>
                      </div>

                      <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 mb-8">
                        <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1 text-sm">
                          <span className="text-lg">•</span>
                          <span>{sub.wash_count} Professional Washes</span>
                        </div>
                        <p className="text-[11px] text-slate-500 ml-5 font-medium">
                          Breaks down to roughly ₹{pricePerWash.toFixed(0)} /
                          wash
                        </p>
                      </div>

                      <div className="mt-auto border-t border-slate-800 pt-6">
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-black text-white">
                            ₹
                            {finalPrice.toLocaleString("en-IN", {
                              maximumFractionDigits: 0,
                            })}
                          </span>
                          <span className="text-xs text-slate-500 font-bold uppercase">
                            / mo
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-600 font-medium block mt-1">
                          (Incl. 18% GST)
                        </span>

                        <button
                          onClick={async () => {
                            const link = await getBookingLink(
                              "subscription_booking_link",
                            );
                            if (link) window.open(link, "_blank");
                          }}
                          className={`w-full mt-6 font-black py-3.5 rounded-xl uppercase tracking-wider text-xs transition-all shadow-lg
                            ${
                              isPopular
                                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:brightness-110 shadow-cyan-500/25"
                                : "bg-slate-800 text-white hover:bg-slate-700"
                            }`}
                        >
                          Subscribe Now
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
