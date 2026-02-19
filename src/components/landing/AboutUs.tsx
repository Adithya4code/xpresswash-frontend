// components/AboutUs.tsx
import { TextReveal } from "@/components/ui/TextReveal";

export function AboutUs() {
  return (
    <section className="py-40 bg-background">
      <div className="container mx-auto px-12 flex flex-col md:flex-row gap-20">
        <div className="md:w-1/2">
          <TextReveal>
            <h2 className="text-sm font-mono text-accent uppercase tracking-widest mb-4">
              The Mission
            </h2>
            <p className="text-4xl md:text-5xl font-bold text-text leading-tight">
              We bring the showroom to your doorstep. No queues. No compromises.
              Just <span className="text-accent italic">pure perfection.</span>
            </p>
          </TextReveal>
        </div>
        <div className="md:w-1/2 text-muted text-xl space-y-6">
          <p>
            XPRESS WASH is a professional mobile doorstep service designed for
            those who value time. We don't just wash; we restore pride.
          </p>
          <div className="pt-8 grid grid-cols-2 gap-8 border-t border-muted/20">
            <div>
              <h4 className="text-text font-bold">Bangalore Based</h4>
              <p className="text-sm">Serving the heart of the city.</p>
            </div>
            <div>
              <h4 className="text-text font-bold">Eco-Certified</h4>
              <p className="text-sm">Minimal water, maximum shine.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
