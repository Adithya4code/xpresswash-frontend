import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";

import {
  fetchAdminData,
  saveItem,
  getBookingLink,
  updateBookingLink,
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
  // ---------------- AUTH STATE ----------------
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // ---------------- DATA STATE ----------------
  const [data, setData] = useState<AdminData>({
    services: [],
    addons: [],
    subscriptions: [],
    locations: [],
  });

  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState<ModalState>({
    open: false,
    table: "",
    item: null,
  });

  const [servicesLink, setServicesLink] = useState("");
  const [subscriptionLink, setSubscriptionLink] = useState("");

  // ---------------- AUTH CHECK ----------------
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data?.user) {
        const role = data.user.user_metadata?.role;
        setIsAuthenticated(true);
        setIsAdmin(role === "admin");
      }
      setCheckingAuth(false);
    };

    checkUser();
  }, []);

  // ---------------- LOGIN ----------------
  const handleLogin = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const { data } = await supabase.auth.getUser();
    if (!data.user) return;

    const role = data.user.user_metadata?.role;
    if (role !== "admin") {
      alert("Not authorized");
      return;
    }

    setIsAuthenticated(true);
    setIsAdmin(true);
  };

  // ---------------- DATA FETCH ----------------
  const refresh = useCallback(async () => {
    const res = await fetchAdminData();
    setData(res);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    refresh();
  }, [isAdmin, refresh]);

  // Pull individual config fields explicitly from your database layout
  useEffect(() => {
    const loadBookingLinks = async () => {
      const srvLink = await getBookingLink("services_booking_link");
      const subLink = await getBookingLink("subscription_booking_link");

      setServicesLink(srvLink);
      setSubscriptionLink(subLink);
    };

    loadBookingLinks();
  }, []);

  // ---------------- MODAL HANDLERS ----------------
  const handleOpenModal = (
    table: string,
    item: BaseItem = { label: "", is_active: true },
  ) => {
    setModal({ open: true, table, item });
  };

  const closeModal = () => {
    setModal({ open: false, table: "", item: null });
  };

  const updateModalItem = (newItem: BaseItem) => {
    setModal((prev) => ({ ...prev, item: newItem }));
  };

  const handleSave = async () => {
    if (!modal.item || !modal.table) return;
    try {
      await saveItem(modal.table, modal.item);
      closeModal();
      refresh();
    } catch (err) {
      alert(`Save Error: ${err}`);
    }
  };

  if (checkingAuth) return null;

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-[350px] text-white shadow-2xl">
          <h2 className="text-xl font-bold mb-6 text-center">Admin Login</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin(e.target.email.value, e.target.password.value);
            }}
            className="flex flex-col gap-4"
          >
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 outline-none text-white"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 outline-none text-white"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 transition rounded-lg py-2 font-semibold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white italic">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/50 text-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              Admin Dashboard
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              Manage service pricing, locations, and subscriptions.
            </p>
          </div>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              setIsAuthenticated(false);
              setIsAdmin(false);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm"
          >
            Logout
          </button>
        </header>

        {/* ---------------- BOOKING LINKS SECTION ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-lg font-bold mb-4">
              Services Booking Form Link
            </h2>
            <input
              type="text"
              value={servicesLink}
              onChange={(e) => setServicesLink(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mb-4"
              placeholder="Enter services booking form URL"
            />
            <button
              onClick={async () => {
                await updateBookingLink("services_booking_link", servicesLink);
                alert("Services booking link updated!");
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Save Services Link
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-lg font-bold mb-4">
              Subscription Booking Form Link
            </h2>
            <input
              type="text"
              value={subscriptionLink}
              onChange={(e) => setSubscriptionLink(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mb-4"
              placeholder="Enter subscription booking form URL"
            />
            <button
              onClick={async () => {
                await updateBookingLink(
                  "subscription_booking_link",
                  subscriptionLink,
                );
                alert("Subscription booking link updated!");
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Save Subscription Link
            </button>
          </div>
        </div>

        {/* ---------------- SECTIONS ---------------- */}
        {/* Updated key structures to ensure new inputs submit correctly */}
        <Section
          title="Wash Services"
          color="bg-blue-500"
          data={data.services}
          table="config_services"
          onAdd={() =>
            handleOpenModal("config_services", {
              label: "",
              description: "",
              price_hatchback: 0,
              price_sedan: 0,
              price_suv: 0,
              display_order: data.services.length + 1,
              is_active: true,
            })
          }
          onEdit={handleOpenModal}
          refresh={refresh}
        />

        <Section
          title="Add-Ons"
          color="bg-indigo-500"
          data={data.addons}
          table="config_addons"
          onAdd={() =>
            handleOpenModal("config_addons", {
              label: "",
              description: "",
              price: 0,
              is_active: true,
            })
          }
          onEdit={handleOpenModal}
          refresh={refresh}
        />

        <Section
          title="Subscription Packages"
          color="bg-emerald-500"
          data={data.subscriptions}
          table="config_subscriptions"
          onAdd={() =>
            handleOpenModal("config_subscriptions", {
              label: "",
              description: "",
              base_price: 0,
              wash_count: 4,
              vehicle_type: "Sedan",
              is_active: true,
            })
          }
          onEdit={handleOpenModal}
          refresh={refresh}
        />

        <Section
          title="Active Locations"
          color="bg-amber-500"
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
