import React from 'react';
import { workExperience, personalInfo } from '../data/portfolioData';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Building2, 
  Award,
  ExternalLink
} from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-slate-900/30 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" /> Career & Contributions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work <span className="glow-gradient-text">Experience & Journey</span>
          </h2>
          <p className="text-base text-slate-400">
            Professional track record engineering mission-critical mobile apps, backend systems, and open-source contributions.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:-ml-px before:bg-gradient-to-b before:from-rose-500 before:via-pink-500 before:to-transparent">
          {workExperience.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={idx} 
                className={`relative flex items-center justify-between md:justify-normal ${
                  isEven ? 'md:flex-row-reverse' : ''
                } group`}
              >
                {/* Center Timeline Icon Indicator */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-slate-950 border-2 border-rose-400 flex items-center justify-center z-10 shadow-lg shadow-rose-950/40 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-4 h-4 text-rose-400" />
                </div>

                {/* Content Card */}
                <div className="ml-12 sm:ml-0 w-full sm:w-[calc(50%-2rem)]">
                  <div className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-800 hover:border-rose-500/30 text-left transition-all duration-300">
                    
                    {/* Period and Role */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-500/30">
                        {item.period}
                      </span>
                      {item.current && (
                        <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          Current Position
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white tracking-tight mt-1">
                      {item.role}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-slate-300 mt-1 font-medium">
                      <Building2 className="w-4 h-4 text-rose-400" />
                      <span>{item.company}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {item.location}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                      {item.summary}
                    </p>

                    {/* Bullet Points */}
                    <div className="space-y-2 mt-4 pt-3 border-t border-slate-800/80">
                      {item.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
