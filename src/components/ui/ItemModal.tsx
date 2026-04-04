export const ItemModal = ({
  item,
  table,
  onClose,
  onSave,
  onChange,
}: ItemModalProps) => {
  const isSub = table === "config_subscriptions";
  const isService = table === "config_services";
  const isAddon = table === "config_addons";

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0f172a] border border-white/10 p-6 rounded-3xl w-full max-w-lg shadow-2xl">
        <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-tight">
          {item.id ? "Edit" : "Add"} {table.split("_")[1]}
        </h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="col-span-2">
            <label className="text-xs text-gray-400 uppercase font-bold">
              Label
            </label>
            <input
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 mt-1"
              value={item.label || ""}
              onChange={(e) => onChange({ ...item, label: e.target.value })}
            />
          </div>

          {(isService || isSub || isAddon) && (
            <div className="col-span-2">
              <label className="text-xs text-gray-400 uppercase font-bold">
                Description
              </label>
              <textarea
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 mt-1 h-20"
                value={item.description || ""}
                onChange={(e) =>
                  onChange({ ...item, description: e.target.value })
                }
              />
            </div>
          )}

          {(isService || isSub) && (
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">
                Base Price (₹)
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 mt-1"
                value={item.base_price || 0}
                onChange={(e) =>
                  onChange({ ...item, base_price: Number(e.target.value) })
                }
              />
            </div>
          )}

          {isAddon && (
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">
                Add-on Price (₹)
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 mt-1"
                value={item.price || 0}
                onChange={(e) =>
                  onChange({ ...item, price: Number(e.target.value) })
                }
              />
            </div>
          )}

          {isSub && (
            <>
              <div>
                <label className="text-xs text-gray-400 uppercase font-bold">
                  Wash Count
                </label>
                <input
                  type="number"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 mt-1"
                  value={item.wash_count || 0}
                  onChange={(e) =>
                    onChange({ ...item, wash_count: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase font-bold">
                  Vehicle Type
                </label>
                <select
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 mt-1 text-white"
                  value={item.vehicle_type || "Sedan"}
                  onChange={(e) =>
                    onChange({ ...item, vehicle_type: e.target.value })
                  }
                >
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                </select>
              </div>
            </>
          )}

          <div className="col-span-2 flex gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/5 py-3 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 py-3 rounded-xl font-bold"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
