import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import TextLogo from './TextLogo';
import { 
  Code2, 
  Menu, 
  X, 
  ExternalLink, 
  Sparkles, 
  Terminal, 
  Package, 
  Lock 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Navbar({ onOpenAdmin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Packages', href: '#packages', badge: '3' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Blogs', href: '#blogs' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#080d1a]/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/30 py-3.5' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Brand */}
          <a href="#" className="flex items-center">
            <TextLogo />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#0f172a]/70 border border-slate-800/80 rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-full hover:bg-slate-800/60 flex items-center gap-1.5"
              >
                {link.label}
                {link.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold rounded-full">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-slate-700/60 transition-all"
              title="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.socials.pubDev}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800/60 border border-transparent hover:border-slate-700/60 transition-all"
              title="Pub.dev Verified Publisher"
            >
              <Package className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 border border-transparent hover:border-slate-700/60 transition-all"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>

            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 border border-transparent hover:border-rose-500/30 transition-all flex items-center gap-1.5 text-xs font-mono"
              title="Open GitHub Git-CMS Dashboard"
            >
              <Lock className="w-4 h-4 text-rose-400" />
              <span className="hidden xl:inline">CMS</span>
            </button>

            <a
              href="#contact"
              className="ml-1 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white btn-sunset rounded-xl transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-700/60"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a1020]/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 mt-3 space-y-3 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/50"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-xs px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded-full font-mono">
                    {link.badge} packages
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-800/40"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.socials.pubDev}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 bg-slate-800/40"
              >
                <Package className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-blue-400 bg-slate-800/40"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="p-2 rounded-lg text-cyan-400 hover:text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono"
                title="Admin CMS"
              >
                <Lock className="w-4 h-4" />
              </button>
            </div>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
