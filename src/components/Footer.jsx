import React from 'react';
import { personalInfo } from '../data/portfolioData';
import TextLogo from './TextLogo';
import { 
  Terminal, 
  Package, 
  BookOpen, 
  ArrowUp,
  Lock
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, HashnodeIcon } from './Icons';

export default function Footer({ onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-[#060a14] border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Brand */}
          <div className="flex items-center">
            <TextLogo />
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.pubDev}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-slate-700 transition-colors"
              title="Pub.dev Verified Publisher"
            >
              <Package className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.hashnode}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-slate-700 transition-colors"
              title="Hashnode Tech Blogs"
            >
              <HashnodeIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-sky-400 hover:border-slate-700 transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-slate-700 transition-colors ml-1"
              title="Admin Git-CMS Portal"
            >
              <Lock className="w-4 h-4" />
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-slate-700 transition-colors"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted for <span className="text-slate-300 font-medium">makTech</span> & Open-Source Community
          </p>
        </div>

      </div>
    </footer>
  );
}
