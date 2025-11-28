import { Image as ImageIcon } from "lucide-react";

interface PlaceholderImageProps {
  className?: string;
  label?: string;
}

export default function PlaceholderImage({
  className = "",
  label = "Image Placeholder",
}: PlaceholderImageProps) {
  return (
    <div
      className={`relative overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center group ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent opacity-50" />

      <div className="relative z-10 flex flex-col items-center gap-3 text-gray-500 group-hover:text-emerald-500 transition-colors duration-500">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 group-hover:border-emerald-500/20 transition-all duration-500">
          <ImageIcon className="w-6 h-6" />
        </div>
        <span className="text-xs font-medium tracking-widest uppercase opacity-60">
          {label}
        </span>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/10 group-hover:border-emerald-500/30 transition-colors" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 group-hover:border-emerald-500/30 transition-colors" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/10 group-hover:border-emerald-500/30 transition-colors" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/10 group-hover:border-emerald-500/30 transition-colors" />
    </div>
  );
}
