import { supabase } from "@/lib/supabaseClient";

export interface BaseItem {
  id?: string;
  label: string;
  is_active: boolean;
  description?: string;
  base_price?: number;
  price?: number;
  vehicle_type?: string;
  wash_count?: number;
  display_order?: number;
}

export interface AdminData {
  services: BaseItem[];
  addons: BaseItem[];
  subscriptions: BaseItem[];
  locations: BaseItem[];
}

export interface AppConfig {
  booking_link: string;
}

// ---------------- FETCH ADMIN DATA ----------------
export const fetchAdminData = async (): Promise<AdminData> => {
  const [services, addons, subs, locations] = await Promise.all([
    supabase.from("config_services").select("*").order("display_order"),
    supabase.from("config_addons").select("*").order("label"),
    supabase.from("config_subscriptions").select("*").order("label"),
    supabase.from("config_locations").select("*").order("label"),
  ]);

  return {
    services: services.data || [],
    addons: addons.data || [],
    subscriptions: subs.data || [],
    locations: locations.data || [],
  };
};

// ---------------- SAVE ITEM ----------------
export const saveItem = async (table: string, item: BaseItem) => {
  if (item.id) {
    const { id, ...updateData } = item;
    return supabase.from(table).update(updateData).eq("id", id);
  }

  const { ...insertData } = item;

  const { data, error } = await supabase.from(table).insert([insertData]);

  if (error) {
    console.error("Supabase Insert Error:", error.message);
    throw error;
  }

  return data;
};

// ================= NEW: BOOKING LINK =================

// 🔹 Fetch booking link
export const getBookingLink = async (): Promise<string> => {
  const { data, error } = await supabase
    .from("app_config")
    .select("value")
    .eq("key", "booking_link")
    .single();

  if (error) {
    console.error("Fetch booking link error:", error.message);
    return "";
  }

  return data?.value || "";
};

// 🔹 Update booking link (admin only)
export const updateBookingLink = async (link: string) => {
  const { error } = await supabase
    .from("app_config")
    .update({ value: link })
    .eq("key", "booking_link");

  if (error) {
    console.error("Update booking link error:", error.message);
    throw error;
  }
};
