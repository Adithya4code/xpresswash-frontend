import { useEffect, useState, useCallback } from "react";
import {
  fetchAdminData,
  saveItem,
  type AdminData,
  type BaseItem,
} from "@/utils/adminUtils";
import { ItemModal } from "@/components/ui/ItemModal";
import { Section } from "@/components/ui/Section";

interface ModalState {
  open: boolean;
  table: string;
  item: BaseItem | null;
}

export default function Admin() {
  const [data, setData] = useState<AdminData>({
    services: [],
    addons: [],
    subscriptions: [],
    locations: [],
  });

  const [loading, setLoading] = useState<boolean>(true);

  const [modal, setModal] = useState<ModalState>({
    open: false,
    table: "",
    item: null,
  });

  const refresh = useCallback(async () => {
    const res = await fetchAdminData();
    setData(res);
    setLoading(false);
  }, []);

  // Standard async pattern to avoid cascading render warnings
  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      const res = await fetchAdminData();
      if (isMounted) {
        setData(res);
        setLoading(false);
      }
    };
    init();
    return () => {
      isMounted = false;
    };
  }, [refresh]);

  const handleOpenModal = (
    table: string,
    item: BaseItem = { label: "", is_active: true },
  ) => {
    setModal({ open: true, table, item });
  };

  // --- ADDED THESE MISSING FUNCTIONS ---
  const closeModal = () => {
    setModal({ open: false, table: "", item: null });
  };

  const updateModalItem = (newItem: BaseItem) => {
    setModal((prev) => ({ ...prev, item: newItem }));
  };
  // -------------------------------------

  const handleSave = async () => {
    if (!modal.item || !modal.table) return;
    await saveItem(modal.table, modal.item);
    closeModal();
    refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white italic">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Xpress <span className="text-blue-500">Admin</span>
          </h1>
        </header>

        <div className="space-y-12">
          {/* Blue Section */}
          <div className="border-l-4 border-blue-500 pl-6">
            <Section
              title="Main Services"
              data={data.services}
              table="config_services"
              onAdd={() =>
                handleOpenModal("config_services", {
                  label: "",
                  is_active: true,
                  base_price: 0,
                  description: "",
                })
              }
              onEdit={handleOpenModal}
              refresh={refresh}
            />
          </div>

          {/* Emerald Section */}
          <div className="border-l-4 border-emerald-500 pl-6">
            <Section
              title="Add-Ons"
              data={data.addons}
              table="config_addons"
              onAdd={() =>
                handleOpenModal("config_addons", {
                  label: "",
                  is_active: true,
                  price: 0,
                  description: "",
                })
              }
              onEdit={handleOpenModal}
              refresh={refresh}
            />
          </div>

          {/* Purple Section */}
          <div className="border-l-4 border-purple-500 pl-6">
            <Section
              title="Subscription Plans"
              data={data.subscriptions}
              table="config_subscriptions"
              onAdd={() =>
                handleOpenModal("config_subscriptions", {
                  label: "",
                  is_active: true,
                  base_price: 0,
                  wash_count: 4,
                  vehicle_type: "Sedan",
                  description: "",
                })
              }
              onEdit={handleOpenModal}
              refresh={refresh}
            />
          </div>

          {/* Amber Section */}
          <div className="border-l-4 border-amber-500 pl-6">
            <Section
              title="Service Locations"
              data={data.locations}
              table="config_locations"
              onAdd={() =>
                handleOpenModal("config_locations", {
                  label: "",
                  is_active: true,
                })
              }
              onEdit={handleOpenModal}
              refresh={refresh}
            />
          </div>
        </div>
      </div>

      {modal.open && modal.item && (
        <ItemModal
          table={modal.table}
          item={modal.item}
          onClose={closeModal}
          onChange={updateModalItem}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
