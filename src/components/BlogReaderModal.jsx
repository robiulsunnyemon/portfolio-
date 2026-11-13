import React from 'react';
import { marked } from 'marked';
import { 
  X, 
  Calendar, 
  Clock, 
  ExternalLink, 
  Share2, 
  Tag, 
  Sparkles,
  BookOpen,
  ArrowLeft
} from 'lucide-react';
import { HashnodeIcon, GithubIcon } from './Icons';

export default function BlogReaderModal({ blog, onClose }) {
  if (!blog) return null;

  // Convert markdown to HTML safely using marked
  const renderedHtml = blog.markdown ? marked.parse(blog.markdown) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose}></div>

      <div className="relative w-full max-w-4xl bg-[#0c1222] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col text-left">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-[#080d1a] border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
              {blog.category?.toUpperCase() || 'TECH'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {blog.url && (
              <a
                href={blog.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
              >
                <span>View Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
          
          {/* Cover image if present */}
          {blog.image && (
            <div className="w-full h-56 sm:h-72 rounded-xl overflow-hidden relative shadow-lg">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1222] via-transparent to-transparent"></div>
            </div>
          )}

          {/* Meta Info */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                {blog.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                {blog.readTime}
              </span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded bg-slate-800/80 text-cyan-300 font-mono text-[11px] border border-slate-700/60">
                {blog.platform || 'GitHub Git-CMS'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {blog.title}
            </h1>

            {blog.subtitle && (
              <p className="text-base sm:text-lg font-bn text-cyan-400/90 leading-relaxed font-medium">
                {blog.subtitle}
              </p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {blog.tags?.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-6">
            {/* If markdown content is available */}
            {renderedHtml ? (
              <div 
                className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4 font-bn text-base
                  prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                  prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
                  prose-a:text-cyan-400 prose-a:underline hover:prose-a:text-cyan-300
                  prose-code:text-cyan-300 prose-code:bg-slate-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-xs
                  prose-pre:bg-[#070b16] prose-pre:border prose-pre:border-slate-800 prose-pre:p-4 prose-pre:rounded-xl
                  prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-400
                  prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5
                  prose-img:rounded-xl prose-img:shadow-md"
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
              />
            ) : (
              /* Fallback snippet for external Hashnode blogs */
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 font-bn">
                  <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                    {blog.snippet}
                  </p>
                  <p className="text-xs text-slate-400 font-sans">
                    This article is published on your verified Hashnode publication. Click below to read the complete article on Hashnode:
                  </p>
                </div>

                <div className="text-center pt-2">
                  <a
                    href={blog.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-indigo-500 transition-all hover:scale-[1.02]"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Read Full Article on Hashnode</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
