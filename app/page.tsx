"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Wrench, 
  Car, 
  Cpu, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Award,
  ArrowRight
} from "lucide-react";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white selection:bg-emerald-500 selection:text-black overflow-x-hidden">
      <Navbar />

      {/* Ambient Background Glow - Animated */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-emerald-500/5 rounded-full blur-[100px] animate-pulse delay-500" />
      </div>

      {/* Hero Section */}
      <section ref={targetRef} className="w-full min-h-screen flex flex-col justify-center items-center relative z-10 px-6 pt-20">
        <motion.div 
          style={{ opacity, scale }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs tracking-widest uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
            Mobile Mechanic Service
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-thin tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40"
          >
            Affordable. Convenient. <br/> Reliable.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl text-lg md:text-xl text-gray-400 font-light mb-12 leading-relaxed"
          >
            Experience top-quality automotive care from a trusted local mechanic with over 20 years of expertise. We bring the shop to you.
            <span className="block mt-2 text-emerald-500/80 font-normal">Future of Auto Care.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
          >
            <Link 
              href="/contact"
              className="glass-button px-8 py-4 rounded-lg text-emerald-400 font-medium tracking-wide min-w-[200px] flex items-center justify-center gap-2 group"
            >
              Schedule Service
              <Wrench className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            </Link>
            <Link 
              href="/services"
              className="px-8 py-4 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-gray-300 font-light min-w-[200px]"
            >
              Explore Services
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
        >
          <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-3 bg-emerald-500/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="w-full border-y border-white/5 bg-white/[0.02] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "20+", label: "Years Experience" },
              { value: "50+", label: "Satisfied Customers" },
              { value: "100%", label: "Satisfaction" },
              { value: "100+", label: "Repairs Completed" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-thin text-white mb-1">{stat.value}</div>
                <div className="text-sm text-emerald-500/60 font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us (Preview) */}
      <section className="w-full max-w-7xl px-6 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-medium text-emerald-500 tracking-widest uppercase mb-4">Why Choose hmls.</h2>
            <h3 className="text-4xl md:text-5xl font-thin mb-8 leading-tight">
              Your Trusted <br/> Mobile Expert
            </h3>
            
            <div className="space-y-8">
              {[
                {
                  title: "Convenience You Can Count On",
                  desc: "From pick-up to delivery, we handle your repairs with ease and efficiency right at your driveway.",
                  icon: <Clock className="w-6 h-6 text-emerald-500" />
                },
                {
                  title: "Exceptional Care for Every Vehicle",
                  desc: "Get expert service backed by decades of automotive experience and futuristic diagnostic tech.",
                  icon: <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex gap-4"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">{item.title}</h4>
                    <p className="text-gray-400 font-light text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <Link href="/about" className="inline-flex items-center gap-2 text-emerald-400 mt-8 hover:gap-4 transition-all">
              Learn more about us <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[600px] rounded-2xl overflow-hidden glass-panel border-emerald-500/20"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="text-center">
                 <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
                   <Award className="w-12 h-12 text-emerald-500" />
                 </div>
                 <h4 className="text-2xl font-light text-white mb-2">100% Satisfaction</h4>
                 <p className="text-gray-400 text-sm">Guaranteed Quality Service</p>
               </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full max-w-7xl px-6 py-24 relative z-10 border-t border-white/5">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16 text-center"
        >
          <motion.h2 variants={fadeInUp} className="text-sm font-medium text-emerald-500 tracking-widest uppercase mb-4">The Process</motion.h2>
          <motion.h3 variants={fadeInUp} className="text-4xl md:text-5xl font-thin">Ensuring repairs are done right</motion.h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent -z-10" />
          
          {[
            {
              step: "01",
              title: "Understand the issue",
              desc: "Thoroughly diagnose the root cause of the issue to ensure accurate repairs.",
              icon: <Cpu className="w-6 h-6" />
            },
            {
              step: "02",
              title: "Execute with precision",
              desc: "Follow industry standards and manufacturer guidelines for every repair.",
              icon: <Wrench className="w-6 h-6" />
            },
            {
              step: "03",
              title: "Confirm the results",
              desc: "Test and validate every repair for peace of mind and reliability.",
              icon: <CheckCircle2 className="w-6 h-6" />
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
              <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center mb-6 text-emerald-500 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                {item.icon}
              </div>
              <div className="absolute top-8 right-8 text-4xl font-black text-white/5 select-none">
                {item.step}
              </div>
              <h4 className="text-xl font-medium mb-3">{item.title}</h4>
              <p className="text-gray-400 font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="w-full bg-white/[0.02] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:flex justify-between items-end"
          >
            <div>
              <h2 className="text-sm font-medium text-emerald-500 tracking-widest uppercase mb-4">Our Expertise</h2>
              <h3 className="text-4xl md:text-5xl font-thin">Comprehensive Services</h3>
            </div>
            <Link href="/services" className="hidden md:flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors">
              View all services <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Maintenance Services",
                desc: "Routine oil changes, tune-ups, and fluid top-ups.",
                icon: <Clock />
              },
              {
                title: "Repair Services",
                desc: "Brakes, suspension, and essential mechanical repairs.",
                icon: <Wrench />
              },
              {
                title: "Diagnostics Services",
                desc: "Advanced computer diagnostics for electrical issues.",
                icon: <Cpu />
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.02] transition-all group cursor-default"
              >
                <div className="mb-6 text-emerald-500 group-hover:text-emerald-400 transition-colors">
                  {service.icon}
                </div>
                <h4 className="text-lg font-medium mb-2 text-white group-hover:translate-x-2 transition-transform duration-300">{service.title}</h4>
                <p className="text-sm text-gray-500 font-light leading-relaxed group-hover:text-gray-400 transition-colors">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
          
          <div className="md:hidden mt-8 text-center">
            <Link href="/services" className="inline-flex items-center gap-2 text-emerald-400">
              View all services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Area Section */}
      <section className="w-full max-w-7xl px-6 py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h2 className="text-4xl md:text-5xl font-thin mb-6">
              Serving <span className="text-emerald-500">Orange County</span>
            </h2>
            <p className="text-gray-400 font-light mb-8 leading-relaxed text-lg">
              We operate a fleet of mobile units covering the entire Orange County metro area. 
              No need to tow your car to a shop—we bring the shop to you.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Irvine", "Newport Beach", "Anaheim", "Santa Ana", "Costa Mesa", "Fullerton", "Huntington Beach"].map((city) => (
                <span key={city} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                  {city}
                </span>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full aspect-video glass-panel rounded-2xl overflow-hidden relative group"
          >
            {/* Abstract Map Visual */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-black to-black" />
            
            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
              <MapPin className="w-12 h-12 text-emerald-500 mb-2 animate-bounce" />
              <span className="text-2xl font-light tracking-widest">OC, CALIFORNIA</span>
            </div>

            {/* Animated Radar Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-emerald-500/20 rounded-full animate-[ping_3s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 border border-emerald-500/20 rounded-full animate-[ping_3s_linear_infinite_1s]" />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-6 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto glass-panel p-12 md:p-20 rounded-[2rem] border-emerald-500/20 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
          
          <h2 className="text-4xl md:text-5xl font-thin mb-6 relative z-10">Ready for the Future?</h2>
          <p className="text-gray-400 font-light mb-10 text-lg max-w-xl mx-auto relative z-10">
            Get a quote or schedule your mobile mechanic visit today. 
            Fast, reliable, and futuristic service at your doorstep.
          </p>
          
          <div className="flex justify-center relative z-10">
            <Link 
              href="/contact"
              className="glass-button px-12 py-5 rounded-xl text-emerald-400 font-medium tracking-wide text-lg hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
