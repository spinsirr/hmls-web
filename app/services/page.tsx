"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Battery, Car, Cog, Gauge, ShieldCheck, Thermometer, Wrench } from "lucide-react";

export default function Services() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white selection:bg-emerald-500 selection:text-black overflow-x-hidden">
      <Navbar />

      {/* Background Effects */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <section className="w-full max-w-7xl px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-20"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs tracking-widest uppercase">
            Our Services
          </div>
          <h1 className="text-5xl md:text-7xl font-thin mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Comprehensive Care for <br />
            <span className="text-emerald-500">Your Vehicle.</span>
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl">
            From routine maintenance to complex engine work, we handle it all with laboratory precision right at your location.
          </p>
        </motion.div>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            {
              step: "01",
              title: "Lower Overhead, Lower Costs",
              desc: "Our streamlined mobile approach minimizes operational expenses, passing the savings directly to you."
            },
            {
              step: "02",
              title: "Customized Part Solutions",
              desc: "We collaborate with multiple suppliers to find the perfect part for your budget and specific needs."
            },
            {
              step: "03",
              title: "Proactive Care Saves Money",
              desc: "Regular maintenance prevents costly future repairs, keeping your car in top condition for longer."
            }
          ].map((item, i) => (
             <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-panel p-8 rounded-2xl relative group hover:border-emerald-500/30 transition-colors"
            >
              <div className="text-sm text-emerald-500 font-medium mb-4">{item.step}</div>
              <h4 className="text-xl font-medium mb-3">{item.title}</h4>
              <p className="text-gray-400 font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Detailed Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Oil Change",
                desc: "Replace engine oil and filter while topping off all fluids for smooth performance.",
                icon: <Gauge className="w-6 h-6" />
              },
              {
                title: "Brakes",
                desc: "Inspect brake pads, rotors, and fluid to ensure safety and stopping power.",
                icon: <ShieldCheck className="w-6 h-6" />
              },
              {
                title: "HVAC Service",
                desc: "Comprehensive air conditioning inspection and servicing for your comfort.",
                icon: <Thermometer className="w-6 h-6" />
              },
              {
                title: "Suspension",
                desc: "Diagnose and repair suspension for a smooth, noise-free ride.",
                icon: <Cog className="w-6 h-6" />
              },
              {
                title: "Battery & Electrical",
                desc: "Full diagnostics for starting and charging systems, including alternator and battery replacement.",
                icon: <Battery className="w-6 h-6" />
              },
              {
                title: "Engine Diagnostics",
                desc: "Advanced tools to diagnose and resolve complex engine issues efficiently.",
                icon: <Car className="w-6 h-6" />
              },
              // Added to fill grid
              {
                title: "Pre-Purchase Inspection",
                desc: "Thorough assessment of a used vehicle's condition before you buy.",
                icon: <Wrench className="w-6 h-6" />
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.02] transition-all group cursor-default flex flex-col"
              >
                <div className="mb-6 w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:text-emerald-400 transition-colors">
                  {service.icon}
                </div>
                <h4 className="text-lg font-medium mb-3 text-white group-hover:translate-x-2 transition-transform duration-300">{service.title}</h4>
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
      </section>

      <Footer />
    </main>
  );
}

