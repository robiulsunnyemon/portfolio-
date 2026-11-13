import React from 'react';
import { skillCategories } from '../data/portfolioData';
import { 
  Smartphone, 
  Server, 
  Cloud, 
  Database, 
  CheckCircle, 
  Cpu, 
  Sparkles,
  Layers
} from 'lucide-react';

const iconMap = {
  Smartphone: Smartphone,
  Server: Server,
  Cloud: Cloud,
  Database: Database,
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-slate-900/30 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" /> Technical Arsenal
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive <span className="glow-gradient-text">Skills & Tech Stack</span>
          </h2>
          <p className="text-base text-slate-400">
            A balanced skill set across modern mobile app architecture, high-concurrency backend services, and resilient cloud infrastructure.
          </p>
        </div>

        {/* Grid of Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Layers;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-slate-700 relative overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-800/80">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {cat.category}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Production battle-tested tools & frameworks
                    </p>
                  </div>
                </div>

                {/* Skills list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/30 transition-all group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-semibold text-sm text-slate-200 group-hover:text-cyan-300 transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400 border border-slate-700/60 font-medium">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {skill.desc}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* Architectural Principles Pill Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-[#0a1224]/90 to-slate-900/90 border border-slate-800/80">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left space-y-1">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Engineering Principles & Standards
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                SOLID Principles • Domain-Driven Design • Clean Architecture • Test-Driven Development (TDD) • Offline-First State Synchronization
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
                makTech standards
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
