import React from 'react';

/**
 * TextLogo Component
 * Custom stacked typographic logo inspired by user design:
 * Line 1: Robiul
 * Divider: Horizontal sunset gradient line
 * Line 2: Suny <//>
 * Styled with the website's dark obsidian and sunset rose-amber palette.
 */
export default function TextLogo({ size = 'default', showSubtitle = true, className = '' }) {
  const isLarge = size === 'large';
  const isCompact = size === 'compact';

  return (
    <div className={`flex items-center gap-3.5 group select-none ${className}`}>
      {/* 2-Tier Stacked Text Logo */}
      <div className="flex flex-col items-start leading-none">
        
        {/* Top: Robiul */}
        <span 
          className={`font-black tracking-tight text-white group-hover:text-rose-100 transition-colors ${
            isLarge 
              ? 'text-3xl tracking-tight' 
              : isCompact 
                ? 'text-base tracking-tight' 
                : 'text-xl sm:text-2xl tracking-tight'
          }`}
          style={{ letterSpacing: '-0.03em' }}
        >
          Robiul
        </span>

        {/* Horizontal Divider Line matching the web's sunset theme */}
        <div 
          className={`w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 group-hover:shadow-[0_0_10px_rgba(244,63,94,0.7)] transition-all duration-300 ${
            isLarge 
              ? 'h-[3px] my-1' 
              : isCompact 
                ? 'h-[2px] my-0.5' 
                : 'h-[2.5px] my-1'
          }`}
        />

        {/* Bottom: Suny <//> */}
        <div className="flex items-center gap-1.5 leading-none">
          <span 
            className={`font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-amber-400 transition-all duration-300 ${
              isLarge 
                ? 'text-2xl' 
                : isCompact 
                  ? 'text-sm' 
                  : 'text-lg sm:text-xl'
            }`}
            style={{ letterSpacing: '-0.02em' }}
          >
            Suny
          </span>

          <span 
            className={`font-mono font-black text-rose-400 group-hover:text-amber-300 transition-colors duration-200 tracking-tighter ${
              isLarge 
                ? 'text-xl' 
                : isCompact 
                  ? 'text-xs' 
                  : 'text-base sm:text-lg'
            }`}
          >
            &lt;&#47;&#47;&gt;
          </span>
        </div>

      </div>

      {/* Side Badge & Role (Optional subtitle in desktop view) */}
      {showSubtitle && (
        <div className="hidden sm:flex flex-col border-l border-slate-800/80 pl-3 text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-rose-950/80 border border-rose-500/30 text-rose-300">
              makTech
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Available for projects"></span>
          </div>
          <span className="text-[11px] text-slate-400 font-bn mt-0.5">
            Software Engineer
          </span>
        </div>
      )}
    </div>
  );
}
