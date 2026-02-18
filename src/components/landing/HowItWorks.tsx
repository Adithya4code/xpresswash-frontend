
import React, { useRef, useEffect, useState } from "react";


const steps = [
  "Choose your service",
  "Pick date & location",
  "Relax while we handle it",
];

export function HowItWorks() {
  const [visibleStep, setVisibleStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      for (let i = 0; i < steps.length; i++) {
        const ref = stepRefs.current[i];
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.7 && visibleStep < i + 1) {
            setVisibleStep(i + 1);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleStep]);

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-2xl px-6 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
        <div className="flex flex-col gap-16 w-full">
          {steps.map((step, i) => {
            if (i === 0) {
              return (
                <div
                  key={step}
                  ref={el => (stepRefs.current[i] = el)}
                  style={{
                    opacity: visibleStep > i ? 1 : 0,
                    transform: visibleStep > i ? "translateY(0)" : "translateY(40px)",
                    transition: "opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)",
                    background: "none",
                    border: "none",
                    boxShadow: "none",
                    padding: 0,
                  }}
                  className="flex flex-col md:flex-row items-center justify-between gap-8"
                >
                  <div className="flex flex-col items-start flex-1">
                    <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-lg mb-4">
                      {i + 1}
                    </div>
                    <p className="font-medium text-lg text-left">{step}</p>
                  </div>
                  <img
                    src={"/media/service_pick.png"}
                    alt="Choose your service"
                    className="w-[420px] h-auto object-contain flex-1"
                    style={{maxWidth: 520}}
                  />
                </div>
              );
            } else if (i === 1) {
              return (
                <div
                  key={step}
                  ref={el => (stepRefs.current[i] = el)}
                  style={{
                    opacity: visibleStep > i ? 1 : 0,
                    transform: visibleStep > i ? "translateY(0)" : "translateY(40px)",
                    transition: "opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)",
                    background: "none",
                    border: "none",
                    boxShadow: "none",
                    padding: 0,
                  }}
                  className="flex flex-col md:flex-row items-center justify-between gap-8"
                >
                  <img
                    src={"/media/calender.png"}
                    alt="Pick date & location"
                    className="w-[420px] h-auto object-contain flex-1"
                    style={{maxWidth: 520}}
                  />
                  <div className="flex flex-col items-end flex-1">
                    <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-lg mb-4">
                      {i + 1}
                    </div>
                    <p className="font-medium text-lg text-right">{step}</p>
                  </div>
                </div>
              );
            } else if (i === 2) {
              return (
                <div
                  key={step}
                  ref={el => (stepRefs.current[i] = el)}
                  style={{
                    opacity: visibleStep > i ? 1 : 0,
                    transform: visibleStep > i ? "translateY(0)" : "translateY(40px)",
                    transition: "opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)",
                    background: "none",
                    border: "none",
                    boxShadow: "none",
                    padding: 0,
                  }}
                  className="flex flex-col md:flex-row items-center justify-between gap-8"
                >
                  <div className="flex flex-col items-start flex-1">
                    <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-lg mb-4">
                      {i + 1}
                    </div>
                    <p className="font-medium text-lg text-left">{step}</p>
                  </div>
                  <img
                    src={"/media/car_wash.png"}
                    alt="Relax while we handle it"
                    className="w-[420px] h-auto object-contain flex-1"
                    style={{maxWidth: 520}}
                  />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </section>
  );
}
  