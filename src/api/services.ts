export type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
};

export async function fetchServices(): Promise<Service[]> {
  const res = await fetch("http://localhost:8080/services");
  return res.json();
}
