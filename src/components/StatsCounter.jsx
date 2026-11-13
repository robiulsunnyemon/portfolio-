import React from 'react';
import { Package, Award, Download, Smartphone, Server } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function StatsCounter() {
  const statsList = [
    {
      icon: Package,
      value: "3+",
      label: "Pub.dev Packages",
      description: "Verified publisher robiulsuny.com",
      accent: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/20"
    },
    {
      icon: Award,
      value: "160/160",
      label: "Pub.dev Points",
      description: "100% Quality, Static Analysis & Docs",
      accent: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20"
    },
    {
      icon: Download,
      value: "1,300+",
      label: "Package Downloads",
      description: "Active developers relying on packages",
      accent: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20"
    },
    {
      icon: Smartphone,
      value: "Play Store",
      label: "Published Apps",
      description: "Production mobile apps in active use",
      accent: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20"
    },
    {
      icon: Server,
      value: "5+ Stacks",
      label: "Tech Ecosystems",
      description: "Flutter, FastAPI, Spring Boot, Go, AWS",
      accent: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20"
    }
  ];

  return (
    <section className="py-10 border-y border-slate-800/80 bg-slate-900/40 backdrop-blur-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {statsList.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 transition-all hover:-translate-y-1 group"
              >
                <div className={`w-10 h-10 rounded-xl ${stat.bg} border flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${stat.accent}`} />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-300 mt-0.5">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400 mt-1 line-clamp-1">
                  {stat.subtext || stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
