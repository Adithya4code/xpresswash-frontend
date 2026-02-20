export interface BookingData {
  name: string;
  phone: string;
  carModel: string;
  service: "Basic" | "Complete" | "Premium";
  location: string;
}

export const SERVICE_OPTIONS = [
  { label: "Basic Exterior Clean (25 min)", value: "Basic" },
  { label: "Complete Care (50 min)", value: "Complete" },
  { label: "Premium Deep Clean (90 min)", value: "Premium" },
];
