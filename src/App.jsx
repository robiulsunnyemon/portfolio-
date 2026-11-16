import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsCounter from './components/StatsCounter';
import PubPackages from './components/PubPackages';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import BlogReaderModal from './components/BlogReaderModal';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedBlogToRead, setSelectedBlogToRead] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Keyboard shortcut: Ctrl + Shift + A or Cmd + Shift + A to open Admin CMS
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#080c16] text-slate-100 flex flex-col font-sans selection:bg-rose-500/25 selection:text-rose-200">
      {/* Navigation Bar */}
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <StatsCounter />
        <PubPackages />
        <Skills />
        <Projects />
        <Experience />
        <Blogs 
          key={refreshTrigger}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onOpenReader={(blog) => setSelectedBlogToRead(blog)}
        />
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* GitHub Git-as-a-CMS Admin Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onPostPublished={() => setRefreshTrigger((prev) => prev + 1)}
      />

      {/* Full Markdown Blog Reader Modal */}
      <BlogReaderModal
        blog={selectedBlogToRead}
        onClose={() => setSelectedBlogToRead(null)}
      />
    </div>
  );
}
