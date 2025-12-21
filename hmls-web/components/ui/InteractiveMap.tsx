"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useState } from "react";

const locations = [
  { name: "Anaheim", x: 30, y: 20 },
  { name: "Fullerton", x: 40, y: 15 },
  { name: "Santa Ana", x: 50, y: 35 },
  { name: "Costa Mesa", x: 35, y: 60 },
  { name: "Irvine", x: 60, y: 55 },
  { name: "Newport Beach", x: 40, y: 75 },
  { name: "Huntington Beach", x: 20, y: 65 },
  { name: "Mission Viejo", x: 75, y: 65 },
  { name: "Orange", x: 55, y: 25 },
];

export default function InteractiveMap({
  className = "",
}: {
  className?: string;
}) {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  return (
    <div
      className={`relative w-full h-full bg-black/40 overflow-hidden ${className}`}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Radar Pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-emerald-500/10 rounded-full animate-[ping_4s_linear_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] border border-emerald-500/10 rounded-full animate-[ping_4s_linear_infinite_1s]" />

      {/* Map Nodes */}
      {locations.map((loc) => (
        <motion.div
          key={loc.name}
          className="absolute z-20 group cursor-pointer"
          style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
          whileHover={{ scale: 1.2 }}
          onHoverStart={() => setHoveredCity(loc.name)}
          onHoverEnd={() => setHoveredCity(null)}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            {/* Node Dot */}
            <div
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${hoveredCity === loc.name ? "bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)]" : "bg-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]"}`}
            />

            {/* Pulse Ring */}
            <div className="absolute inset-0 w-full h-full rounded-full bg-emerald-500/30 animate-ping" />

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: hoveredCity === loc.name ? 1 : 0,
                y: hoveredCity === loc.name ? -35 : 10,
              }}
              className="absolute left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 border border-emerald-500/30 rounded-lg text-xs font-medium text-emerald-400 whitespace-nowrap backdrop-blur-md pointer-events-none z-30 shadow-xl"
            >
              {loc.name}
              <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-black border-b border-r border-emerald-500/30 rotate-45" />
            </motion.div>
          </div>
        </motion.div>
      ))}

      {/* Central Hub Marker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 pointer-events-none opacity-10">
        <MapPin className="w-32 h-32 text-emerald-500" />
      </div>

      <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 border border-white/10 rounded text-[10px] text-emerald-500/60 font-mono uppercase tracking-widest backdrop-blur-sm">
        Live Coverage Map
      </div>
    </div>
  );
}
