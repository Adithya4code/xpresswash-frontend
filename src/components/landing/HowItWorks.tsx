const steps = [
    "Choose your service",
    "Pick date & location",
    "Relax while we handle it",
  ]
  
  export function HowItWorks() {
    return (
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold">How It Works</h2>
  
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step}>
                <div className="mx-auto h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                  {i + 1}
                </div>
                <p className="mt-4 font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  