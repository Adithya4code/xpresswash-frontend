import { useState } from "react";
import { type BookingData } from "@/types/booking";

export function useBookingLogic() {
  const [formData, setFormData] = useState<BookingData>({
    name: "",
    phone: "",
    carModel: "",
    service: "Basic",
    location: "",
  });

  // 1. Generate JSON for backend
  const getJsonData = () => JSON.stringify(formData, null, 2);

  // 2. Generate WhatsApp URL
  const getWhatsAppLink = () => {
    const phoneNum = "9535443799"; // International format no +
    const message = `*New Booking Request*%n%n*Name:* ${formData.name}%n*Car:* ${formData.carModel}%n*Service:* ${formData.service}%n*Location:* ${formData.location}`;

    // Replace spaces and newlines with URL safe characters
    const encodedMsg = encodeURIComponent(message.replace(/%n/g, "\n"));
    return `https://wa.me/${phoneNum}?text=${encodedMsg}`;
  };

  return { formData, setFormData, getJsonData, getWhatsAppLink };
}
