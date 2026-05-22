import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";

type Addon = {
  id: string;
  label: string;
  description: string;
  price: number;
};

export function AddonPreview() {
  const [addons, setAddons] = useState<Addon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from("config_addons")
          .select("*")
          .eq("is_active", true)
          .not("label", "eq", "None")
          .order("price", { ascending: true });

        if (error) throw error;
        setAddons(data || []);
      } catch (err) {
        console.error("Error fetching addons:", err);
      } finally {
        setLoading(false);
      }
    };

    load();

    const channel = supabase
      .channel("config_addons_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "config_addons" },
        () => load(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section className="py-20 bg-[#020617] relative border-t border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            Premium <span className="text-cyan-400">Add-ons</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            A la carte upgrades to perfect your detail. Available to add on
            during booking.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {addons.map((addon, index) => {
              const finalPrice = (addon.price || 0) * 1.18;

              return (
                <motion.div
                  key={addon.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="group relative p-5 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/50 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle hover gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <h3 className="text-base font-bold text-slate-200 mb-1.5 group-hover:text-cyan-300 transition-colors">
                      {addon.label}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">
                      {addon.description ||
                        "Specialized enhancement for your vehicle."}
                    </p>
                  </div>

                  <div className="relative z-10 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-black text-white">
                        ₹
                        {finalPrice.toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                        })}
                      </span>
                    </div>
                    <span className="text-[9px] text-slate-600 font-bold uppercase tracking-wider bg-slate-950 px-2 py-1 rounded-md">
                      + GST Incl
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
