import { getBookingLink } from "@/utils/adminUtils";

export function Footer() {
  // 🔹 Local smooth-scrolling utility function
  const goToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.warn(
        `Target section with id "${sectionId}" was not found in the DOM.`,
      );
    }
  };

  const handleBook = async () => {
    const link = await getBookingLink("services_booking_link");
    if (link) {
      window.open(link, "_blank");
    }
  };

  return (
    <footer className="bg-blue-deep text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div>
          <h3 className="text-lg font-semibold text-accent">Xpress</h3>
          <p className="mt-3 text-sm text-white/70">
            Premium car servicing made effortless.
          </p>
        </div>

        <div>
          <h4 className="font-medium">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70 flex flex-col items-start">
            <li>
              <button
                className="hover:text-accent transition-colors text-left"
                onClick={() => goToSection("services-section")}
              >
                Car Service
              </button>
            </li>
            <li>
              <button
                className="hover:text-accent transition-colors text-left"
                onClick={() => goToSection("detailing-section")}
              >
                Detailing
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70 flex flex-col items-start">
            <li>
              {/* Removed href, replaced with semantic button targeting its id section */}
              <button
                onClick={() => goToSection("about-section")}
                className="hover:text-accent transition-colors text-left"
              >
                About
              </button>
            </li>
            <li>
              {/* Removed href, replaced with semantic button targeting its id section */}
              <button
                onClick={() => goToSection("faq-section")}
                className="hover:text-accent transition-colors text-left"
              >
                Support / FAQ
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium">Get Started</h4>
          <p className="mt-4 text-sm text-white/70">
            Book your service in under 2 minutes.
          </p>

          <button
            className="mt-4 text-xs font-bold uppercase tracking-wider text-accent hover:underline"
            onClick={handleBook}
          >
            Book Now →
          </button>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-white/60">
        © {new Date().getFullYear()} Xpress. All rights reserved.
      </div>
    </footer>
  );
}
