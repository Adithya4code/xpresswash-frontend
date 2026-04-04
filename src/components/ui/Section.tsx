import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { supabase } from "../../lib/supabaseClient";

interface BaseItem {
  id: string;
  label: string;
  is_active: boolean;
  base_price?: number;
}

interface SectionProps {
  title: string;
  data: BaseItem[];
  table: string;
  onAdd: () => void;
  onEdit: (table: string, item: BaseItem) => void;
  refresh: () => void;
}

export const Section = ({
  title,
  data,
  table,
  onAdd,
  onEdit,
  refresh,
}: SectionProps) => {
  const handleToggle = async (id: string, currentStatus: boolean) => {
    await supabase
      .from(table)
      .update({ is_active: !currentStatus })
      .eq("id", id);
    refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    await supabase.from(table).delete().eq("id", id);
    refresh();
  };

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-2">
        <h2 className="text-2xl font-bold text-white/90">{title}</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition"
        >
          <FiPlus /> Add New
        </button>
      </div>

      <div className="grid gap-3">
        {data.length === 0 ? (
          <p className="text-gray-500 italic text-sm p-4">
            No records found in {title}.
          </p>
        ) : (
          data.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/[0.08] transition-all"
            >
              <div>
                <p className="font-semibold text-white">{item.label}</p>
                {item.base_price !== undefined && (
                  <p className="text-sm text-cyan-400 font-medium">
                    ₹{item.base_price}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onEdit(table, item)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"
                >
                  <FiEdit2 size={18} />
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition"
                >
                  <FiTrash2 size={18} />
                </button>

                <button
                  onClick={() => handleToggle(item.id, item.is_active)}
                  className={`min-w-[80px] px-3 py-1 rounded-full text-[10px] font-black tracking-tighter transition-all border ${
                    item.is_active
                      ? "bg-green-500/10 text-green-400 border-green-500/50"
                      : "bg-gray-800 text-gray-500 border-gray-700"
                  }`}
                >
                  {item.is_active ? "ACTIVE" : "HIDDEN"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
