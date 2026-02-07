import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/landing/Hero"
import { ValueProps } from "@/components/landing/ValueProps"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { WhyUs } from "@/components/landing/WhyUs"
import { CTA } from "@/components/landing/CTA"

export default function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <ValueProps />
      <HowItWorks />
      <WhyUs />
      <CTA />
      <Footer />
    </>
  )
}
