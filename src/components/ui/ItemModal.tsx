import React, { useState } from "react";
import { type BaseItem } from "@/utils/adminUtils";

interface ItemModalProps {
  table: string;
  item: BaseItem;
  onClose: () => void;
  onChange: (updatedItem: BaseItem) => void;
  onSave: () => Promise<void>;
}

export function ItemModal({
  table,
  item,
  onClose,
  onChange,
  onSave,
}: ItemModalProps) {
  const [activeTab, setActiveTab] = useState<"info" | "pricing">("info");
  const [isSaving, setIsSaving] = useState(false);

  const isServiceTable = table === "config_services";
  const isAddonTable = table === "config_addons";
  const isSubscriptionTable = table === "config_subscriptions";

  // Check if this item uses fixed standalone single pricing (like Platinum)
  const isPlatinumStyle = item.label?.toLowerCase().includes("platinum");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">
              Database Management
            </span>
            <h3 className="text-lg font-black text-slate-800 mt-0.5">
              {item.id
                ? `✏️ Edit ${item.label || "Record"}`
                : "✨ Create New Entry"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200/50 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition"
          >
            &times;
          </button>
        </div>

        {/* Tab Selection Navigation (Only for Services to make it simple!) */}
        {isServiceTable && (
          <div className="flex border-b border-slate-100 bg-slate-50/50 px-3">
            <button
              type="button"
              onClick={() => setActiveTab("info")}
              className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
                activeTab === "info"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              📝 Package Details
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("pricing")}
              className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
                activeTab === "pricing"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              💰 Tier Pricing Setup
            </button>
          </div>
        )}

        {/* Form Entry Area */}
        <form
          onSubmit={handleSubmit}
          className="p-6 flex-1 overflow-y-auto max-h-[70vh] flex flex-col gap-4"
        >
          {/* TAB 1: General Info Block */}
          {(activeTab === "info" || !isServiceTable) && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Package Title Name
                </label>
                <input
                  type="text"
                  value={item.label || ""}
                  onChange={(e) => onChange({ ...item, label: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition"
                  placeholder="e.g., Gold Package (Complete Detailing)"
                  required
                />
              </div>

              {table !== "config_locations" && (
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                      Features / Descriptions
                    </label>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Separate items with • bullet marks
                    </span>
                  </div>
                  <textarea
                    value={item.description || ""}
                    onChange={(e) =>
                      onChange({ ...item, description: e.target.value })
                    }
                    rows={5}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition font-sans leading-relaxed"
                    placeholder="Exterior Steam Wash • Front grille & bumper cleaning • Wheel & Wheel Arch cleaning..."
                  />
                </div>
              )}

              {isServiceTable && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Layout Order Position
                  </label>
                  <input
                    type="number"
                    value={item.display_order ?? ""}
                    onChange={(e) =>
                      onChange({
                        ...item,
                        display_order: Number(e.target.value),
                      })
                    }
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm"
                    placeholder="e.g. 1 (Appears First)"
                  />
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Clean Pricing Fields */}
          {(activeTab === "pricing" || !isServiceTable) && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
              {/* Wash Services Fields Logic */}
              {isServiceTable && (
                <div className="flex flex-col gap-4">
                  {isPlatinumStyle ? (
                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-200/60 flex flex-col gap-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-purple-700">
                        Fixed Premium Car Price ($)
                      </label>
                      <input
                        type="number"
                        value={item.base_price ?? ""}
                        onChange={(e) =>
                          onChange({
                            ...item,
                            base_price: Number(e.target.value),
                          })
                        }
                        className="w-full border border-purple-200 bg-white rounded-lg px-4 py-2 text-sm font-bold text-purple-900"
                        placeholder="5999"
                      />
                      <p className="text-[10px] text-purple-600 font-medium mt-1">
                        This product targets flat custom layout models like the
                        Platinum Tier.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col gap-4">
                      <span className="text-xs font-black text-slate-700 uppercase tracking-wide">
                        Multi-Tier Pricing Matrix
                      </span>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            🚗 Hatchback
                          </span>
                          <input
                            type="number"
                            value={item.price_hatchback ?? ""}
                            onChange={(e) =>
                              onChange({
                                ...item,
                                price_hatchback: Number(e.target.value),
                              })
                            }
                            className="w-full border border-slate-200 bg-white rounded-xl px-3 py-2 text-sm font-black text-slate-800"
                            placeholder="699"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            🚙 Sedan
                          </span>
                          <input
                            type="number"
                            value={item.price_sedan ?? ""}
                            onChange={(e) =>
                              onChange({
                                ...item,
                                price_sedan: Number(e.target.value),
                              })
                            }
                            className="w-full border border-slate-200 bg-white rounded-xl px-3 py-2 text-sm font-black text-slate-800"
                            placeholder="799"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            🛻 SUV / Luxury
                          </span>
                          <input
                            type="number"
                            value={item.price_suv ?? ""}
                            onChange={(e) =>
                              onChange({
                                ...item,
                                price_suv: Number(e.target.value),
                              })
                            }
                            className="w-full border border-slate-200 bg-white rounded-xl px-3 py-2 text-sm font-black text-slate-800"
                            placeholder="899"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Addons Pricing Column */}
              {isAddonTable && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Addon Service Charge ($)
                  </label>
                  <input
                    type="number"
                    value={item.price ?? ""}
                    onChange={(e) =>
                      onChange({ ...item, price: Number(e.target.value) })
                    }
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800"
                    placeholder="0"
                    required
                  />
                </div>
              )}

              {isSubscriptionTable && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                      Monthly Package Price ($)
                    </label>
                    <input
                      type="number"
                      value={item.base_price ?? ""}
                      onChange={(e) =>
                        onChange({
                          ...item,
                          base_price: Number(e.target.value),
                        })
                      }
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800"
                      placeholder="0"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                      Included Wash Count
                    </label>
                    <input
                      type="number"
                      value={item.wash_count ?? ""}
                      onChange={(e) =>
                        onChange({
                          ...item,
                          wash_count: Number(e.target.value),
                        })
                      }
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800"
                      placeholder="4"
                      required
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Active Status Row */}
          <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 mt-2">
            <input
              type="checkbox"
              id="modal_is_active"
              checked={item.is_active ?? true}
              onChange={(e) =>
                onChange({ ...item, is_active: e.target.checked })
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
            />
            <label
              htmlFor="modal_is_active"
              className="text-xs font-bold text-slate-700 cursor-pointer select-none uppercase tracking-wide"
            >
              Show live on booking layout forms
            </label>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-wider text-slate-500 hover:bg-slate-50 transition"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white text-xs font-black uppercase tracking-wider transition shadow-md shadow-blue-600/10"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
