"use client";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Booking Logic & Components
import { BookingForm } from "@/components/booking/BookingForm";
import { BookingVisuals } from "@/components/booking/BookingVisuals";
import { useBookingLogic } from "@/utils/useBookingLogic";

export default function Booking() {
  const { formData, setFormData, getJsonData, getWhatsAppLink } =
    useBookingLogic();

  return (
    <SmoothScroll>
      <CustomCursor />
      <ThemeToggle />
      <Navbar />

      <main className="relative z-10 min-h-screen bg-background flex items-center justify-center pt-32 pb-20">
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 bg-mouse-glow opacity-20 pointer-events-none -z-10" />

        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* 1. Logic Component: Form */}
            <BookingForm
              formData={formData}
              setFormData={setFormData}
              onLog={() => console.log(getJsonData())}
            />

            {/* 2. Visual Component: QR & WhatsApp */}
            <BookingVisuals qrValue={getWhatsAppLink()} />
          </div>
        </div>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
