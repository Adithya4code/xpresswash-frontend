// constants/faq.ts

export interface FAQItem {
  q: string;
  a: string;
  category: "Service" | "Logistics" | "Pricing" | "Safety";
}

export const FAQS: FAQItem[] = [
  {
    q: "How does the doorstep service work?",
    a: "We bring the showroom to you. Our fully equipped mobile units arrive at your location to perform the service in your driveway or parking bay. No queues, no waiting—just professional results while you go about your day.",
    category: "Service",
  },
  {
    q: "Do you require access to my water or electricity?",
    a: "Not at all. Our custom-built service vans are entirely self-contained, carrying their own treated water supply and power generators to ensure a seamless experience.",
    category: "Logistics",
  },
  {
    q: "How long does a typical session take?",
    a: "Service times vary by package: Basic Exterior (25 mins), Complete Care (50 mins), and Premium Deep Clean (90 mins). Times may adjust slightly based on the vehicle's condition and size.",
    category: "Service",
  },
  {
    q: "Is the cleaning process safe for high-end paintwork?",
    a: "Absolutely. We use pH-neutral chemicals, scratch-free microfiber technology, and professional-grade products designed specifically for premium automotive finishes.",
    category: "Safety",
  },
  {
    q: "Which areas of Bangalore do you cover?",
    a: "We currently service major residential and commercial hubs across Bangalore. Contact us via WhatsApp to confirm immediate availability in your specific pincode.",
    category: "Logistics",
  },
  {
    q: "Do you offer monthly maintenance subscriptions?",
    a: "Yes. We provide discounted subscription plans for individuals and luxury apartments. These plans include priority scheduling and consistent care to keep your vehicle in peak condition.",
    category: "Pricing",
  },
  {
    q: "How do I secure a booking?",
    a: "You can book instantly by calling or messaging us on WhatsApp at +91 8123911197. Our online booking portal is currently under development.",
    category: "Logistics",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept all major UPI apps, cash, and bank transfers. A formal GST invoice is provided with every service for your records.",
    category: "Pricing",
  },
  {
    q: "What is your cancellation or rescheduling policy?",
    a: "We understand plans change. We request at least a few hours' notice for cancellations or rescheduling so we can reallocate your slot to another client.",
    category: "Logistics",
  },
  {
    q: "Are there any hidden charges?",
    a: "Transparency is our core value. Standard pricing is fixed; any specialized add-ons like engine bay detailing or heavy interior stain removal will be quoted and approved by you upfront.",
    category: "Pricing",
  },
  {
    q: "Do you service SUVs and Luxury vehicles?",
    a: "Yes. Our team is trained to handle everything from compact hatchbacks to full-sized SUVs and exotic imports. Pricing is tiered based on vehicle dimensions.",
    category: "Service",
  },
  {
    q: "Is your process environmentally conscious?",
    a: "Quality doesn't have to cost the earth. We utilize water-efficient pressure systems and biodegradable cleaning agents to minimize our environmental footprint.",
    category: "Safety",
  },
];
