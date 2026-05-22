import { type BaseItem } from "@/utils/adminUtils";
import { supabase } from "@/lib/supabaseClient";

interface SectionProps {
  title: string;
  color: string;
  data: BaseItem[];
  table: string;
  onAdd: () => void;
  onEdit: (table: string, item: BaseItem) => void;
  refresh: () => Promise<void>;
}

export function Section({
  title,
  color,
  data,
  table,
  onAdd,
  onEdit,
  refresh,
}: SectionProps) {
  const handleDelete = async (id: string) => {
    if (
      !window.confirm("Are you sure you want to completely delete this entry?")
    )
      return;
    try {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
      refresh();
    } catch (err: any) {
      alert(`Delete Error: ${err.message}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden mb-10">
      {/* Title Header Grid */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-6 rounded-full ${color}`} />
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            {title}
          </h2>
          <span className="bg-slate-200/70 text-slate-700 px-2.5 py-0.5 rounded-full text-xs font-bold">
            {data.length} entries
          </span>
        </div>
        <button
          onClick={onAdd}
          className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm"
        >
          ➕ New Entry
        </button>
      </div>

      {/* Row Listings */}
      {data.length === 0 ? (
        <div className="p-12 text-center text-slate-400 text-sm font-medium italic">
          No records found in this table configuration.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50/20">
                <th className="py-3 px-6 w-[45%]">Label & Description</th>
                <th className="py-3 px-6 w-[25%]">Pricing Tiers</th>
                <th className="py-3 px-6 w-[15%]">Status</th>
                <th className="py-3 px-6 w-[15%] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/60 transition group"
                >
                  {/* Label Block */}
                  <td className="py-4 px-6 vertical-top">
                    <span className="font-bold text-slate-800 text-sm block group-hover:text-blue-600 transition">
                      {item.label}
                    </span>
                    {item.description && (
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 max-w-md font-medium">
                        {item.description}
                      </p>
                    )}
                  </td>

                  {/* Pricing Matrix Layout Rendering */}
                  <td className="py-4 px-6 text-xs font-semibold text-slate-600">
                    {table === "config_services" &&
                      (item.label?.toLowerCase().includes("platinum") ? (
                        <span className="bg-purple-100 text-purple-700 font-bold px-2 py-1 rounded">
                          Flat: ₹{item.base_price}
                        </span>
                      ) : (
                        <div className="flex flex-col gap-1 text-[11px]">
                          <span>
                            🚗 Hatch:{" "}
                            <strong className="text-slate-800">
                              ₹{item.price_hatchback}
                            </strong>
                          </span>
                          <span>
                            🚙 Sedan:{" "}
                            <strong className="text-slate-800">
                              ₹{item.price_sedan}
                            </strong>
                          </span>
                          <span>
                            🛻 SUV:{" "}
                            <strong className="text-slate-800">
                              ₹{item.price_suv}
                            </strong>
                          </span>
                        </div>
                      ))}
                    {table === "config_addons" && (
                      <span className="text-sm font-bold text-slate-800">
                        ₹{item.price}
                      </span>
                    )}
                    {table === "config_subscriptions" && (
                      <span>
                        ₹{item.base_price}{" "}
                        <span className="text-slate-400 font-normal">
                          ({item.wash_count} Washes)
                        </span>
                      </span>
                    )}
                    {table === "config_locations" && (
                      <span className="text-slate-400 font-normal italic">
                        Fixed Base Region
                      </span>
                    )}
                  </td>

                  {/* Live Visibility Status */}
                  <td className="py-4 px-6">
                    {item.is_active ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide bg-emerald-100 text-emerald-800">
                        Live
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide bg-slate-100 text-slate-400">
                        Hidden
                      </span>
                    )}
                  </td>

                  {/* ⚡ THE BIG FIX: Wired Action buttons right into the table layout row ⚡ */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(table, item)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wider transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => item.id && handleDelete(item.id)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-400 rounded-lg text-xs font-bold uppercase tracking-wider transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
