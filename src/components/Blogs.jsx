import React, { useState, useEffect } from 'react';
import { blogs as initialBlogs, personalInfo } from '../data/portfolioData';
import { getCmsSettings, fetchRemotePosts, getLocalDrafts } from '../services/githubCms';
import { 
  BookOpen, 
  ExternalLink, 
  Clock, 
  Calendar, 
  Heart, 
  ArrowRight, 
  Sparkles,
  PenTool,
  Lock,
  Plus
} from 'lucide-react';
import { HashnodeIcon, GithubIcon } from './Icons';

export default function Blogs({ onOpenAdmin, onOpenReader }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [allBlogs, setAllBlogs] = useState(initialBlogs);
  const [likesState, setLikesState] = useState({});

  // Sync dynamic blogs from GitHub or localStorage
  const refreshBlogs = async () => {
    try {
      const localDrafts = getLocalDrafts();
      const settings = getCmsSettings();
      let remotePosts = [];
      if (settings.token) {
        remotePosts = await fetchRemotePosts(settings);
      }

      // Combine: remote first, then local drafts, then baseline Hashnode blogs
      const combined = [...remotePosts, ...localDrafts, ...initialBlogs];
      // Deduplicate by id or slug
      const seen = new Set();
      const unique = combined.filter((b) => {
        const key = b.id || b.slug;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      setAllBlogs(unique);
      setLikesState(
        unique.reduce((acc, curr) => ({ ...acc, [curr.id || curr.slug]: { count: curr.likes || 1, liked: false } }), {})
      );
    } catch (e) {
      console.error('Error refreshing blogs:', e);
    }
  };

  useEffect(() => {
    refreshBlogs();
  }, []);

  const toggleLike = (id) => {
    setLikesState(prev => {
      const current = prev[id] || { count: 0, liked: false };
      return {
        ...prev,
        [id]: {
          count: current.liked ? current.count - 1 : current.count + 1,
          liked: !current.liked
        }
      };
    });
  };

  const filterTabs = [
    { id: 'all', label: 'All Articles', count: allBlogs.length },
    { id: 'flutter', label: 'Flutter & Dart Deep Dive', count: allBlogs.filter(b => b.category === 'flutter').length },
    { id: 'aws', label: 'AWS Cloud Foundations', count: allBlogs.filter(b => b.category === 'aws').length },
  ];

  const filteredBlogs = activeFilter === 'all'
    ? allBlogs
    : allBlogs.filter(b => b.category === activeFilter);

  return (
    <section id="blogs" className="py-24 relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <HashnodeIcon className="w-3.5 h-3.5" />
              <span>Published on robiulsuny.hashnode.dev & Git CMS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Engineering <span className="glow-gradient-text">Blogs & Insights</span>
            </h2>
            <p className="text-base text-slate-400 font-bn leading-relaxed">
              ফ্লাটার আর্কিটেকচার, ডার্ট মেমোরি মডেল, কনকারেন্সি এবং ক্লাউড ইনফ্রাস্ট্রাকচার নিয়ে নিয়মিত টেকনিক্যাল লেখালেখি।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            {/* Open Admin Markdown Dashboard button */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02]"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Write Blog (Admin CMS)</span>
            </button>

            <a
              href={personalInfo.socials.hashnode}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-blue-500/50 text-slate-200 hover:text-white text-xs font-semibold transition-all hover:bg-slate-800"
            >
              <span>Hashnode</span>
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            </a>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeFilter === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeFilter === tab.id ? 'bg-blue-900 text-blue-200' : 'bg-slate-800 text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredBlogs.map((blog) => {
            const blogKey = blog.id || blog.slug;
            const currentLike = likesState[blogKey] || { count: blog.likes || 1, liked: false };
            const isSelfHosted = Boolean(blog.markdown);

            return (
              <article
                key={blogKey}
                className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-800 hover:border-blue-500/40 relative group text-left"
              >
                <div>
                  {/* Blog Cover Image */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                    {/* Top Badges over image */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full backdrop-blur-md border ${
                        isSelfHosted 
                          ? 'bg-cyan-950/90 text-cyan-300 border-cyan-500/40' 
                          : 'bg-slate-900/85 text-blue-300 border-slate-700/80'
                      }`}>
                        {blog.platform || 'Git-CMS'}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-900/85 backdrop-blur-md text-slate-300 border border-slate-700/80 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        {blog.readTime}
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-[11px] text-slate-300 backdrop-blur-sm px-2 py-0.5 rounded bg-black/40">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{blog.date}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors leading-snug line-clamp-2">
                      <button
                        onClick={() => {
                          if (isSelfHosted) onOpenReader(blog);
                          else window.open(blog.url, '_blank');
                        }}
                        className="text-left hover:underline"
                      >
                        {blog.title}
                      </button>
                    </h3>

                    {/* Subtitle in Bengali */}
                    {blog.subtitle && (
                      <p className="text-xs font-bn text-cyan-400/95 mt-2 line-clamp-1">
                        {blog.subtitle}
                      </p>
                    )}

                    {/* Snippet in Noto Serif / Hind Siliguri */}
                    <p className="text-xs sm:text-sm text-slate-300/90 font-bn mt-2.5 leading-relaxed line-clamp-3">
                      {blog.snippet}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {blog.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 px-6 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => toggleLike(blogKey)}
                    className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg border transition-all ${
                      currentLike.liked
                        ? 'bg-rose-950/40 border-rose-500/40 text-rose-400'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${currentLike.liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{currentLike.count}</span>
                  </button>

                  {/* Read Article Action */}
                  {isSelfHosted ? (
                    <button
                      onClick={() => onOpenReader(blog)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span>Read Markdown</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <a
                      href={blog.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Read on Hashnode</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
