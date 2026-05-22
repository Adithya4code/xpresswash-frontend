import { supabase } from "@/lib/supabaseClient";

export interface BaseItem {
  id?: string;
  label: string;
  is_active: boolean;
  description?: string;
  // Tiered Pricing fields matching your current database schema layout
  price_hatchback?: string | number;
  price_sedan?: string | number;
  price_suv?: string | number;
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

// ================= FIXED: BOOKING LINK MANAGEMENT =================

// Safe array fallback check avoiding the 406 single-coercion layout crash
export const getBookingLink = async (
  key: string = "booking_link",
): Promise<string> => {
  try {
    const { data, error } = await supabase
      .from("app_config")
      .select("value")
      .eq("key", key);

    if (error) throw error;

    if (data && data.length > 0) {
      return data[0].value || "";
    }
    return "";
  } catch (error) {
    console.error(`Fetch booking link error for key "${key}":`, error);
    return "";
  }
};

// Target and upsert database rows without causing target row collision errors
export const updateBookingLink = async (key: string, link: string) => {
  const { error } = await supabase
    .from("app_config")
    .upsert({ key: key, value: link }, { onConflict: "key" });

  if (error) {
    console.error(`Update booking link error for key "${key}":`, error);
    throw error;
  }
};
