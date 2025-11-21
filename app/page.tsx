import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black text-white selection:bg-emerald-500 selection:text-black overflow-x-hidden">
      {/* Ambient Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Navigation */}
      <nav className="w-full max-w-7xl px-6 py-8 flex justify-between items-center z-50">
        <div className="text-2xl font-light tracking-tighter">
          hmls<span className="text-emerald-500">.</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-light text-gray-300">
          <Link href="#services" className="hover:text-emerald-400 transition-colors">Services</Link>
          <Link href="#area" className="hover:text-emerald-400 transition-colors">Area</Link>
          <Link href="#contact" className="hover:text-emerald-400 transition-colors">Contact</Link>
        </div>
        <Link 
          href="#contact"
          className="glass-button px-6 py-2 rounded-full text-sm font-medium text-emerald-400 hover:text-emerald-300"
        >
          Book Now
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="w-full max-w-7xl px-6 py-20 md:py-32 flex flex-col items-center text-center relative z-10">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs tracking-widest uppercase">
          Mobile Mechanic Service
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-thin tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
          Future of <br className="md:hidden" /> Auto Care
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-gray-400 font-light mb-10 leading-relaxed">
          Experience the next generation of vehicle maintenance. We bring professional mechanic services directly to your location in <span className="text-emerald-400">Orange County</span>.
        </p>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Link 
            href="#contact"
            className="glass-button px-8 py-4 rounded-lg text-emerald-400 font-medium tracking-wide min-w-[200px]"
          >
            Schedule Service
          </Link>
          <Link 
            href="#services"
            className="px-8 py-4 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-gray-300 font-light min-w-[200px]"
          >
            View Services
          </Link>
        </div>
      </section>

      {/* Stats / Features Grid */}
      <section id="services" className="w-full max-w-7xl px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Diagnostics",
              desc: "Advanced computer-aided diagnostics to pinpoint issues accurately.",
              icon: (
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              )
            },
            {
              title: "Maintenance",
              desc: "Routine oil changes, brake checks, and fluid top-ups at your driveway.",
              icon: (
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )
            },
            {
              title: "Repairs",
              desc: "Complex engine and transmission repairs handled on-site.",
              icon: (
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              )
            }
          ].map((service, i) => (
            <div key={i} className="glass-panel p-8 rounded-2xl hover:bg-white/10 transition-all group">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-light mb-3 text-white">{service.title}</h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Service Area */}
      <section id="area" className="w-full relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-emerald-950/20 to-black z-0" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-thin mb-6">
              Serving <span className="text-emerald-500">Orange County</span>
            </h2>
            <p className="text-gray-400 font-light mb-8 leading-relaxed max-w-md">
              We cover the entire Orange County area. From Irvine to Anaheim, Newport Beach to Fullerton. Our mobile units are equipped to reach you wherever you are—home, office, or roadside.
            </p>
            <ul className="grid grid-cols-2 gap-4 text-sm font-light text-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Irvine
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Newport Beach
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Anaheim
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Huntington Beach
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Costa Mesa
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Santa Ana
              </li>
            </ul>
          </div>
          <div className="flex-1 w-full h-[400px] glass-panel rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-transparent to-transparent" />
            <div className="text-center relative z-10">
              <div className="text-6xl mb-2 opacity-50">📍</div>
              <div className="text-2xl font-thin text-emerald-400">Orange County, CA</div>
              <div className="text-sm text-gray-500 mt-2">Mobile Dispatch Center</div>
            </div>
            {/* Abstract Map Elements */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <div className="absolute top-2/3 left-2/3 w-2 h-2 bg-emerald-500 rounded-full animate-ping delay-300" />
            <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-emerald-500 rounded-full animate-ping delay-700" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="w-full max-w-3xl px-6 py-24 mx-auto text-center">
        <div className="glass-panel p-12 rounded-3xl border-emerald-500/20">
          <h2 className="text-3xl md:text-4xl font-thin mb-6">Ready for Service?</h2>
          <p className="text-gray-400 font-light mb-8">
            Get a quote or schedule your mobile mechanic visit today. 
            Fast, reliable, and futuristic service at your doorstep.
          </p>
          <form className="flex flex-col gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-6 py-4 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-emerald-500/50 text-white placeholder-gray-600 transition-colors"
            />
            <button 
              type="submit"
              className="glass-button w-full py-4 rounded-lg text-emerald-400 font-medium tracking-wide"
            >
              Get Started
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-12 text-center text-gray-600 text-sm font-light">
        <p>&copy; {new Date().getFullYear()} hmls mobile mechanic. All rights reserved.</p>
        <p className="mt-2">Serving Orange County, CA</p>
      </footer>
    </main>
  );
}
