"use client";

import { motion } from "framer-motion";

export default function ContactForm() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="glass-panel p-8 md:p-10 rounded-3xl border border-emerald-500/20"
    >
      <h3 className="text-2xl font-light mb-6">Send us a Message</h3>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400 ml-1">First Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500/50 text-white transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400 ml-1">Last Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500/50 text-white transition-colors"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-400 ml-1">Email</label>
          <input 
            type="email" 
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500/50 text-white transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400 ml-1">Service Needed</label>
          <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500/50 text-white transition-colors [&>option]:bg-black">
            <option>General Diagnostics</option>
            <option>Oil Change</option>
            <option>Brakes</option>
            <option>Battery / Electrical</option>
            <option>Other Repair</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400 ml-1">Message</label>
          <textarea 
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500/50 text-white transition-colors resize-none"
          />
        </div>

        <button 
          type="submit"
          className="w-full glass-button py-4 rounded-xl text-emerald-400 font-medium tracking-wide mt-4 hover:scale-[1.02] active:scale-[0.98]"
        >
          Send Message
        </button>
      </form>
    </motion.div>
  );
}

