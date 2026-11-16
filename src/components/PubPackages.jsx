import React, { useState } from 'react';
import { pubPackages, personalInfo } from '../data/portfolioData';
import { 
  Package, 
  ThumbsUp, 
  Award, 
  Download, 
  ExternalLink, 
  Copy, 
  Check, 
  Terminal, 
  Layers, 
  CheckCircle2, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function PubPackages() {
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="packages" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/30 text-rose-400 text-xs font-semibold uppercase tracking-wider">
              <Package className="w-3.5 h-3.5" />
              Verified Pub.dev Publisher
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Open-Source <span className="glow-gradient-text">Flutter & Dart</span> Packages
            </h2>
            <p className="text-base text-slate-400 leading-relaxed">
              Contributions to the Dart and Flutter ecosystem published under verified publisher{' '}
              <a 
                href={personalInfo.publisherUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="text-rose-400 hover:underline font-mono"
              >
                {personalInfo.publisher}
              </a>
              . Engineered with 100% pub points, offline-first capabilities, and developer ergonomics.
            </p>
          </div>

          <a
            href={personalInfo.publisherUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#12192a] border border-slate-700/80 hover:border-rose-500/50 text-slate-200 hover:text-white text-sm font-semibold transition-all hover:bg-slate-800 self-start md:self-auto"
          >
            <span>Visit Publisher on pub.dev</span>
            <ExternalLink className="w-4 h-4 text-rose-400" />
          </a>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pubPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-slate-800 hover:border-cyan-500/40 relative group"
            >
              {/* Top Meta */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-mono">
                        {pkg.name}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono border border-slate-700">
                        {pkg.version}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      License: {pkg.license}
                    </span>
                  </div>

                  <a
                    href={pkg.pubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 transition-colors"
                    title={`View ${pkg.name} on pub.dev`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Score & Metric Badges */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/90 text-center mb-5">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <ThumbsUp className="w-3 h-3 text-cyan-400" /> Likes
                    </div>
                    <span className="text-sm font-bold text-white mt-0.5">{pkg.likes}</span>
                  </div>
                  <div className="flex flex-col items-center border-x border-slate-800">
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Award className="w-3 h-3 text-amber-400" /> Pub Points
                    </div>
                    <span className="text-sm font-bold text-amber-400 mt-0.5">{pkg.pubPoints} / 160</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Download className="w-3 h-3 text-emerald-400" /> Downloads
                    </div>
                    <span className="text-sm font-bold text-white mt-0.5">{pkg.downloads}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[13.5px] sm:text-sm text-slate-200/95 leading-relaxed mb-5 min-h-[4rem] font-normal">
                  {pkg.description}
                </p>

                {/* Key Highlights */}
                <div className="space-y-2.5 mb-6">
                  <p className="text-xs uppercase font-semibold text-cyan-400 tracking-wider">
                    Key Capabilities:
                  </p>
                  {pkg.highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-[12.5px] sm:text-xs text-slate-200 leading-relaxed font-normal">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {pkg.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/70 text-slate-400 border border-slate-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom CLI Snippet & CTA */}
              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                {/* Copy Command */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300">
                  <div className="flex items-center gap-2 overflow-hidden truncate">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{pkg.installCmd}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(pkg.installCmd, pkg.id)}
                    className="ml-2 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white shrink-0 transition-colors"
                    title="Copy command"
                  >
                    {copiedId === pkg.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <a
                  href={pkg.pubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-sunset w-full py-2.5 px-4 rounded-xl text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-950/40"
                >
                  <span>Explore on pub.dev</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Verification banner note */}
        <div className="mt-12 p-4 rounded-2xl bg-[#0f1626]/70 border border-slate-800/80 hover:border-rose-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-300 text-left">
              All packages follow rigorous null-safety guidelines, automated GitHub actions test matrices across Android, iOS, Web & Desktop platforms.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-rose-400 shrink-0">
            100% Static Analysis Clean
          </span>
        </div>

      </div>
    </section>
  );
}
