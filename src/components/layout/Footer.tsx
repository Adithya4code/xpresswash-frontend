export function Footer() {
  return (
    <footer className="relative bg-surface text-text pt-24 pb-12 overflow-hidden">
      {/* Huge Background Text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 pointer-events-none select-none">
        <h2 className="text-[25vw] font-black leading-none opacity-[0.02] whitespace-nowrap uppercase">
          Xpress Wash
        </h2>
      </div>

      <div className="container mx-auto px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2">
            <h3 className="text-4xl font-bold mb-8 uppercase tracking-tighter">
              Ready for that <br />
              <span className="text-accent italic">Showroom Shine?</span>
            </h3>
            <p className="text-muted max-w-sm mb-8">
              Serving premium mobile detailing across selected areas in
              Bangalore.
            </p>
            <div className="text-2xl font-bold text-accent">
              +91 81239 11197
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-6">
              Navigation
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <a
                  href="#"
                  className="hover:translate-x-2 transition-transform inline-block"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:translate-x-2 transition-transform inline-block"
                >
                  Packages
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:translate-x-2 transition-transform inline-block"
                >
                  Monthly Plans
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-6">
              Social
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <a
                  href="#"
                  className="hover:translate-x-2 transition-transform inline-block"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:translate-x-2 transition-transform inline-block"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-muted/10 flex flex-col md:flex-row justify-between gap-6 text-[10px] uppercase tracking-widest text-muted">
          <div>© 2026 Xpress Wash — All Rights Reserved</div>
          <div className="flex gap-8">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
