import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";

// Layout & Sections
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { ValueProps } from "@/components/landing/ValueProps";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { WhyUs } from "@/components/landing/WhyUs";
import { ServicesPreview } from "@/components/landing/ServicePreview";
import { CTA } from "@/components/landing/CTA";
import { AboutUs } from "@/components/landing/AboutUs";
import { FAQ } from "@/components/landing/FAQ";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { motion } from "motion/react";

export default function Landing() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <ThemeToggle />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        {/* Value Props & Intro Section */}
        <ValueProps />
        {/* Narrative & Process Sections */}
        <HowItWorks />
        <WhyUs /> {/* Horizontal Scroll Section */}
        <ServicesPreview />
        <AboutUs />
        <FAQ />
        <motion.div
          whileInView={{ backgroundColor: "var(--surface)" }}
          className="transition-colors duration-10000"
        >
          <CTA />
        </motion.div>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
