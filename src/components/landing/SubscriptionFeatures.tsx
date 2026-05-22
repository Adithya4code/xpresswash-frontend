export function SubscriptionFeatures() {
  const standardInclusions = [
    "Exterior Steam Wash",
    "Dashboard Wipe",
    "Wheel & wheel arch cleaning",
    "Tyre Shine polish",
  ];

  return (
    <div className="w-full bg-[#020617] text-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Left Column: Included in Every Wash */}
        <div className="space-y-6">
          <h3 className="text-2xl sm:text-3xl font-black tracking-wide bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent uppercase">
            Included in Every Wash
          </h3>
          <ul className="space-y-4">
            {standardInclusions.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-4 text-base sm:text-lg font-medium text-slate-200"
              >
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.2)]">
                  <svg
                    className="w-4 h-4 stroke-[3]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      pathLength="1"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Free Benefit */}
        <div className="space-y-6">
          <h3 className="text-2xl sm:text-3xl font-black tracking-wide bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent uppercase">
            Free Benefit
          </h3>
          <ul className="space-y-5">
            {/* Benefit 1 */}
            <li className="flex items-start gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0 animate-pulse" />
              <div>
                <p className="text-base sm:text-lg font-semibold text-slate-100">
                  1 Free Interior Vacuum Cleaning
                </p>
                <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
                  (Applicable for{" "}
                  <strong className="text-purple-300">
                    4 Wash & 6 Wash Plans
                  </strong>
                  )
                </p>
              </div>
            </li>

            {/* Benefit 2 */}
            <li className="flex items-start gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0 animate-pulse" />
              <div>
                <p className="text-base sm:text-lg font-semibold text-slate-100">
                  2 Free Interior Vacuum Cleaning
                </p>
                <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
                  (Applicable for{" "}
                  <strong className="text-purple-300">8 Wash Plans</strong>)
                </p>
              </div>
            </li>

            {/* Benefit 3 */}
            <li className="flex items-start gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
              <div>
                <p className="text-base sm:text-lg font-semibold text-slate-100">
                  1 Free AC Steam Sanitizing
                </p>
              </div>
            </li>

            {/* Benefit 4 */}
            <li className="flex items-start gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
              <div>
                <p className="text-base sm:text-lg font-semibold text-slate-100">
                  1 Free Interior Steam Sanitizing
                </p>
                <p className="text-xs text-slate-400 font-normal mt-1 max-w-sm leading-relaxed">
                  Steam interior sanitizing uses high-temperature, pressurized
                  vapor to eliminate bacteria, viruses, and odors.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
