import { supabase } from "@/lib/supabaseClient";

export interface BaseItem {
  id?: string;
  label: string;
  is_active: boolean;
  description?: string; // For Services, Add-ons, Subs
  base_price?: number; // For Services, Subs
  price?: number; // For Add-ons (SQL uses 'price')
  vehicle_type?: string; // For Subscriptions
  wash_count?: number; // For Subscriptions
  display_order?: number;
}

export interface AdminData {
  services: BaseItem[];
  addons: BaseItem[];
  subscriptions: BaseItem[];
  locations: BaseItem[];
}

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

export const saveItem = async (table: string, item: BaseItem) => {
  if (item.id) {
    return supabase.from(table).update(item).eq("id", item.id);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...newItem } = item;
  return supabase.from(table).insert([newItem]);
};
