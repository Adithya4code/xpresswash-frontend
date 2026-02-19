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
// import { CTA } from "@/components/landing/CTA";
import { AboutUs } from "@/components/landing/AboutUs";
import { FAQ } from "@/components/landing/FAQ";

export default function Landing() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        {/* Value Props & Intro Section */}
        <ValueProps />
        {/* Narrative & Process Sections */}
        <HowItWorks />
        <WhyUs /> {/* Horizontal Scroll Section */}
        {/* {services.map((service, index) => (
          <ServicesPreview
            key={index}
            title={service.title}
            desc={service.desc}
          />
        ))} */}
        <ServicesPreview />
        {/* <CTA /> */}
        <AboutUs />
        <FAQ />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
