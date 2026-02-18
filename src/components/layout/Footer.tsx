export function Footer() {
    return (
      // Fixed: Changed bg-blueDeep to bg-blue-deep to match v4 theme naming
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
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-accent transition-colors">Car Service</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Detailing</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Pickup & Drop</a></li>
            </ul>
          </div>
  
          <div>
            <h4 className="font-medium">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-accent transition-colors">About</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
            </ul>
          </div>
  
          <div>
            <h4 className="font-medium">Get Started</h4>
            <p className="mt-4 text-sm text-white/70">
              Book your service in under 2 minutes.
            </p>
            {/* Optional: Add a small button or call to action here */}
            <button
              className="mt-4 text-xs font-bold uppercase tracking-wider text-accent hover:underline"
              onClick={() => window.location.href = '/bookings'}
            >
              Book Now →
            </button>
          </div>
        </div>
  
        <div className="border-t border-white/10 py-6 text-center text-sm text-white/60">
          © {new Date().getFullYear()} Xpress. All rights reserved.
        </div>
      </footer>
    )
  }