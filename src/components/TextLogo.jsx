import React from 'react';

/**
 * TextLogo Component
 * A modern, high-contrast typographic logo for "Robiul Suny"
 * styled with the sunset rose-coral gradient and developer accents.
 */
export default function TextLogo({ size = 'default', showSubtitle = true, className = '' }) {
  const isLarge = size === 'large';
  const isCompact = size === 'compact';

  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Brand Icon / Code Monogram Badge */}
      <div className="relative shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#151c2e] to-[#0c1220] border border-rose-500/30 group-hover:border-rose-400/60 shadow-lg shadow-rose-950/40 transition-all duration-300 group-hover:scale-105">
        <div className="flex items-center font-mono font-black text-sm tracking-tighter">
          <span className="text-white/80">&lt;</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">
            RS
          </span>
          <span className="text-rose-400/90">&#47;&gt;</span>
        </div>
        {/* Glowing pulse indicator */}
        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-rose-500 to-amber-400 border border-[#080c16]"></span>
        </span>
      </div>

      {/* Typographic Text Logo */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black tracking-tight text-white transition-colors duration-200 ${
            isLarge ? 'text-2xl' : isCompact ? 'text-base' : 'text-xl'
          }`}>
            Robiul
          </span>

          <span className={`font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-amber-400 transition-all duration-300 ${
            isLarge ? 'text-2xl' : isCompact ? 'text-base' : 'text-xl'
          }`}>
            Suny
          </span>

          {/* Accent Dot */}
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-400 shadow-[0_0_8px_rgba(244,63,94,0.7)] group-hover:scale-125 transition-transform duration-300"></span>

          {/* Workplace / Title Pill */}
          <span className="ml-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-rose-950/70 border border-rose-500/30 text-rose-300 group-hover:border-rose-400/50 transition-colors">
            makTech
          </span>
        </div>

        {showSubtitle && (
          <p className="text-[11px] text-slate-400 font-bn tracking-normal mt-1 leading-tight flex items-center gap-1.5">
            <span>রবিউল সানি</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Software Engineer</span>
          </p>
        )}
      </div>
    </div>
  );
}
