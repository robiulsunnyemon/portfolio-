import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { 
  Sparkles, 
  Terminal, 
  Download, 
  ArrowRight, 
  Copy, 
  Check, 
  Package, 
  Cpu,
  Layers,
  Cloud
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="about" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-rose-600/15 via-pink-600/15 to-orange-600/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-amber-600/10 rounded-full blur-2xl pointer-events-none -z-10"></div>
      
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Introductions & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status & Company Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#101726] border border-slate-700/60 shadow-inner backdrop-blur-md">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-300">
                Software Engineer at <span className="text-rose-400 font-semibold">{personalInfo.company}</span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
                <Package className="w-3 h-3" /> 3 Pub.dev Packages
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                  Hi, I'm <span className="glow-gradient-text">{personalInfo.name}</span>
                </h1>
              </div>
              <p className="text-xl sm:text-2xl font-bn text-rose-300/90 font-medium">
                {personalInfo.nameBn} <span className="text-slate-400 text-base font-sans font-normal ml-2">/ Software Craftsman & Package Author</span>
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Specializing in high-performance <span className="text-white font-medium">Flutter</span> cross-platform mobile apps and resilient cloud backends in <span className="text-white font-medium">Python FastAPI</span>, <span className="text-white font-medium">Java Spring Boot</span>, <span className="text-white font-medium">Golang</span>, and <span className="text-white font-medium">AWS</span>. Creator of open-source offline-first sync engines and Dart utilities with 100% pub.dev score.
            </p>

            {/* Core Tech Stack Chips */}
            <div className="pt-2">
              <p className="text-xs uppercase tracking-wider text-rose-500 font-bold mb-3 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-rose-500" /> Core Specialization
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Flutter & Dart", color: "border-rose-500/30 bg-rose-950/40 text-rose-300" },
                  { name: "Python FastAPI", color: "border-emerald-500/30 bg-emerald-950/40 text-emerald-300" },
                  { name: "Java Spring Boot", color: "border-amber-500/30 bg-amber-950/40 text-amber-300" },
                  { name: "Golang", color: "border-sky-500/30 bg-sky-950/40 text-sky-300" },
                  { name: "AWS Cloud", color: "border-orange-500/30 bg-orange-950/40 text-orange-300" },
                  { name: "Offline-First Sync", color: "border-pink-500/30 bg-pink-950/40 text-pink-300" },
                ].map((tech) => (
                  <span
                    key={tech.name}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border shadow-xs ${tech.color}`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Call to Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href="#packages"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn-sunset text-white font-semibold text-sm transition-all"
              >
                <Package className="w-4 h-4" />
                Explore Packages
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#12192a] border border-slate-700/80 hover:border-rose-500/50 text-slate-200 hover:text-white font-semibold text-sm transition-all hover:bg-slate-800/80"
              >
                View Projects
              </a>

              {/* Copy Email Button */}
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#101624] border border-slate-800 text-slate-300 hover:text-white font-mono text-xs transition-colors hover:border-slate-700"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>{personalInfo.email}</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Code Terminal & Pub.dev Badge */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-amber-500 rounded-2xl blur-lg opacity-20"></div>
              
              <div className="relative rounded-2xl overflow-hidden bg-[#0d1424] border border-slate-700/80 shadow-2xl">
                
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#080d19] border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                    <span className="ml-2 text-xs font-mono text-slate-400">robiulsuny.dart</span>
                  </div>
                  <div className="text-[11px] font-mono text-rose-300 flex items-center gap-1.5 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30">
                    <Terminal className="w-3 h-3" /> publisher: robiulsuny.com
                  </div>
                </div>

                {/* Terminal Code Content */}
                <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed space-y-2 text-left">
                  <div className="text-slate-400">
                    <span className="text-rose-400">class</span> <span className="text-amber-300">SoftwareEngineer</span> {'{'}
                  </div>

                  <div className="pl-4 space-y-1">
                    <div>
                      <span className="text-slate-400">final String</span> name = <span className="text-emerald-300">"Robiul Suny"</span>;
                    </div>
                    <div>
                      <span className="text-slate-400">final String</span> currentRole = <span className="text-emerald-300">"makTech"</span>;
                    </div>
                    
                    <div className="pt-1">
                      <span className="text-slate-400">final List&lt;String&gt;</span> techStack = [
                      <div className="pl-4 text-rose-300">
                        "Flutter / Dart", "Python FastAPI",<br />
                        "Java Spring Boot", "Golang", "AWS"
                      </div>
                      ];
                    </div>

                    <div className="pt-1">
                      <span className="text-slate-400">final List&lt;PubPackage&gt;</span> openSource = [
                      <div className="pl-4 text-amber-300">
                        "bd_locations", "sync_pilot", "bclean"
                      </div>
                      ];
                    </div>

                    <div className="pt-2 text-slate-400">
                      <span className="text-rose-400">bool</span> isReadyToCollaborate() {'=>'} <span className="text-emerald-400">true</span>;
                    </div>
                  </div>

                  <div className="text-slate-400">{'}'}</div>

                  {/* Terminal Command Prompt Run */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs">
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="text-emerald-400 font-bold">$</span>
                      <span className="text-slate-200">flutter pub add sync_pilot</span>
                    </div>
                    <div className="text-slate-400 text-[11px] mt-1 pl-4 flex items-center gap-1.5">
                      <span className="text-emerald-400">✔</span> Package 'sync_pilot' added (160/160 pub points)
                    </div>
                  </div>
                </div>

                {/* Bottom Pub Publisher Banner */}
                <div className="px-4 py-2.5 bg-[#080d19]/90 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-rose-400 font-bold">160/160</span>
                    <span>Pub Score on all packages</span>
                  </div>
                  <a
                    href={personalInfo.publisherUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1"
                  >
                    View pub.dev <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
