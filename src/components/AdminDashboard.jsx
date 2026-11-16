import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import { 
  getCmsSettings, 
  saveCmsSettings, 
  verifyGitHubToken, 
  fetchRemotePosts, 
  commitPostToGitHub, 
  deletePostFromGitHub,
  getLocalDrafts,
  saveLocalDraft,
  deleteLocalDraft,
  calculateReadTime
} from '../services/githubCms';
import { 
  X, 
  Check, 
  AlertCircle, 
  Plus, 
  FileText, 
  Settings, 
  Send, 
  Save, 
  Trash2, 
  ExternalLink, 
  Eye, 
  Code2, 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  List, 
  Quote, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Table, 
  Key, 
  Lock, 
  Sparkles,
  RefreshCw,
  Terminal,
  FolderGit2
} from 'lucide-react';
import { GithubIcon } from './Icons';

export default function AdminDashboard({ isOpen, onClose, onPostPublished }) {
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'posts' | 'settings'
  const [settings, setSettings] = useState(getCmsSettings());
  const [userInfo, setUserInfo] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState(null);

  // Editor Form State
  const [postForm, setPostForm] = useState({
    id: '',
    title: '',
    subtitle: '',
    slug: '',
    category: 'flutter',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
    tags: 'Flutter, Architecture',
    markdown: '# Title Here\n\nWrite your blog in **Markdown** format...\n\n```dart\nvoid main() {\n  print("Hello from Flutter!");\n}\n```\n',
    sha: null,
  });

  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState(null); // { type: 'success'|'error', message, url, sha }

  // Posts State
  const [localDrafts, setLocalDrafts] = useState([]);
  const [remotePosts, setRemotePosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  // Initial load
  useEffect(() => {
    if (isOpen) {
      const currentSettings = getCmsSettings();
      setSettings(currentSettings);
      setLocalDrafts(getLocalDrafts());

      if (currentSettings.token) {
        verifyToken(currentSettings.token);
        loadRemotePosts(currentSettings);
      } else {
        setActiveTab('settings');
      }
    }
  }, [isOpen]);

  const verifyToken = async (tokenToTest) => {
    setIsVerifying(true);
    setVerifyError(null);
    try {
      const user = await verifyGitHubToken(tokenToTest);
      setUserInfo(user);
    } catch (err) {
      setVerifyError(err.message);
      setUserInfo(null);
    } finally {
      setIsVerifying(false);
    }
  };

  const loadRemotePosts = async (currentSettings) => {
    setIsLoadingPosts(true);
    try {
      const posts = await fetchRemotePosts(currentSettings);
      setRemotePosts(posts);
    } catch (err) {
      console.error('Failed to load remote posts:', err);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  // Auto generate slug from title if not manually edited
  const handleTitleChange = (e) => {
    const title = e.target.value;
    const generatedSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    setPostForm((prev) => ({
      ...prev,
      title,
      slug: prev.slug === '' || prev.slug === prev.lastGeneratedSlug ? generatedSlug : prev.slug,
      lastGeneratedSlug: generatedSlug,
    }));
  };

  // Markdown Toolbar helper to insert syntax at cursor position
  const insertMarkdown = (prefix, suffix = '', defaultText = '') => {
    const textarea = document.getElementById('markdown-textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = postForm.markdown;
    const selection = text.substring(start, end) || defaultText;

    const newText = text.substring(0, start) + prefix + selection + suffix + text.substring(end);
    setPostForm((prev) => ({ ...prev, markdown: newText }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selection.length);
    }, 50);
  };

  // Save Local Draft
  const handleSaveDraft = () => {
    const tagArray = postForm.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const draft = saveLocalDraft({
      ...postForm,
      tags: tagArray,
    });

    setLocalDrafts(getLocalDrafts());
    setPublishStatus({
      type: 'success',
      message: 'Draft saved locally to browser storage!',
    });
    setTimeout(() => setPublishStatus(null), 4000);
  };

  // Publish / Commit to GitHub
  const handlePublishToGitHub = async () => {
    if (!settings.token) {
      setActiveTab('settings');
      setPublishStatus({
        type: 'error',
        message: 'Please provide a GitHub Personal Access Token in Settings first.',
      });
      return;
    }

    if (!postForm.title.trim()) {
      alert('Please enter a title for the blog post.');
      return;
    }

    setIsPublishing(true);
    setPublishStatus(null);

    try {
      const tagArray = postForm.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const postData = {
        ...postForm,
        tags: tagArray,
        readTime: calculateReadTime(postForm.markdown),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };

      const result = await commitPostToGitHub(settings, postData);

      // Remove from local drafts if exists
      if (postForm.id) {
        deleteLocalDraft(postForm.id);
        setLocalDrafts(getLocalDrafts());
      }

      setPublishStatus({
        type: 'success',
        message: `Successfully committed "${result.slug}.md" to GitHub repo ${settings.owner}/${settings.repo}!`,
        url: result.html_url,
        sha: result.sha,
      });

      // Reload posts
      loadRemotePosts(settings);

      // Notify parent to refresh blog list
      if (onPostPublished) {
        onPostPublished();
      }
    } catch (err) {
      setPublishStatus({
        type: 'error',
        message: err.message || 'Failed to commit to GitHub.',
      });
    } finally {
      setIsPublishing(false);
    }
  };

  // Delete remote post
  const handleDeleteRemote = async (post) => {
    if (!window.confirm(`Are you sure you want to delete "${post.slug}.md" from GitHub repository?`)) {
      return;
    }

    try {
      await deletePostFromGitHub(settings, post.slug, post.sha);
      setRemotePosts((prev) => prev.filter((p) => p.slug !== post.slug));
      if (onPostPublished) onPostPublished();
      alert('File removed from GitHub repo.');
    } catch (err) {
      alert(`Delete error: ${err.message}`);
    }
  };

  // Load post into editor
  const handleEditPost = (post) => {
    setPostForm({
      id: post.id || '',
      title: post.title || '',
      subtitle: post.subtitle || '',
      slug: post.slug || '',
      category: post.category || 'flutter',
      image: post.image || '',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags || '',
      markdown: post.markdown || '',
      sha: post.sha || null,
    });
    setActiveTab('editor');
  };

  // Reset editor for new post
  const handleNewPost = () => {
    setPostForm({
      id: '',
      title: '',
      subtitle: '',
      slug: '',
      category: 'flutter',
      image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
      tags: 'Flutter, Dart, Clean Architecture',
      markdown: '# New Blog Title\n\nWrite your thoughts here in **Markdown**...\n',
      sha: null,
    });
    setActiveTab('editor');
    setPublishStatus(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Main Container */}
      <div className="relative w-full max-w-7xl h-[94vh] bg-[#090f1d] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col text-left">
        
        {/* Top Navbar */}
        <div className="px-5 py-3.5 bg-[#060a14] border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-950/40">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm sm:text-base tracking-tight">
                  Git-as-a-CMS Dashboard
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-500/30">
                  GitHub API
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Repo: <span className="text-slate-200">{settings.owner}/{settings.repo}</span> ({settings.branch})
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'editor'
                  ? 'btn-sunset text-white shadow-md shadow-rose-950/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Editor</span>
            </button>

            <button
              onClick={() => setActiveTab('posts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'posts'
                  ? 'btn-sunset text-white shadow-md shadow-rose-950/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Posts</span>
              <span className="text-[10px] px-1.5 rounded-full bg-slate-800 text-slate-300">
                {remotePosts.length + localDrafts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'settings'
                  ? 'btn-sunset text-white shadow-md shadow-rose-950/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings</span>
              {userInfo && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
            </button>
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleNewPost}
              className="btn-sunset hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Post</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feedback / Status Alert */}
        {publishStatus && (
          <div className={`px-6 py-2.5 text-xs flex items-center justify-between border-b ${
            publishStatus.type === 'success'
              ? 'bg-emerald-950/70 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-950/70 border-rose-500/30 text-rose-300'
          }`}>
            <div className="flex items-center gap-2">
              {publishStatus.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{publishStatus.message}</span>
            </div>
            {publishStatus.url && (
              <a
                href={publishStatus.url}
                target="_blank"
                rel="noreferrer"
                className="underline font-mono text-[11px] flex items-center gap-1 text-cyan-300 hover:text-white"
              >
                View on GitHub <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}

        {/* Tab 1: Editor View */}
        {activeTab === 'editor' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Meta Fields Form */}
            <div className="p-4 bg-slate-900/60 border-b border-slate-800 space-y-3 shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                
                {/* Title */}
                <div className="md:col-span-6">
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Post Title *
                  </label>
                  <input
                    type="text"
                    value={postForm.title}
                    onChange={handleTitleChange}
                    placeholder="e.g. Flutter Offline-First Sync with SQLite & WebSockets"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:border-cyan-500 outline-hidden"
                  />
                </div>

                {/* Subtitle */}
                <div className="md:col-span-6">
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Subtitle (বাংলা বা ইংরেজি বিবরণ)
                  </label>
                  <input
                    type="text"
                    value={postForm.subtitle}
                    onChange={(e) => setPostForm({ ...postForm, subtitle: e.target.value })}
                    placeholder="ব্লগের সংক্ষিপ্ত মূল বিষয়বস্তু..."
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:border-cyan-500 outline-hidden font-bn"
                  />
                </div>

              </div>

              <div className="grid grid-cols-2 md:grid-cols-12 gap-3">
                {/* Category */}
                <div className="md:col-span-3">
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Category
                  </label>
                  <select
                    value={postForm.category}
                    onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-hidden"
                  >
                    <option value="flutter">Flutter & Dart</option>
                    <option value="aws">AWS Cloud</option>
                    <option value="backend">Backend & APIs (FastAPI/Go)</option>
                    <option value="architecture">System Architecture</option>
                  </select>
                </div>

                {/* Slug */}
                <div className="md:col-span-3">
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Slug (.md filename)
                  </label>
                  <input
                    type="text"
                    value={postForm.slug}
                    onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })}
                    placeholder="flutter-offline-sync"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-cyan-400 font-mono focus:border-cyan-500 outline-hidden"
                  />
                </div>

                {/* Tags */}
                <div className="md:col-span-3">
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={postForm.tags}
                    onChange={(e) => setPostForm({ ...postForm, tags: e.target.value })}
                    placeholder="Flutter, BLoC, SQLite"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:border-cyan-500 outline-hidden"
                  />
                </div>

                {/* Image URL */}
                <div className="md:col-span-3">
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Cover Image URL
                  </label>
                  <input
                    type="text"
                    value={postForm.image}
                    onChange={(e) => setPostForm({ ...postForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:border-cyan-500 outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Markdown Toolbar */}
            <div className="px-4 py-2 bg-[#0a1020] border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => insertMarkdown('**', '**', 'bold text')}
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                  title="Bold"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown('*', '*', 'italic text')}
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                  title="Italic"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown('\n## ', '\n', 'Heading 2')}
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                  title="Heading 2"
                >
                  <Heading2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown('\n```dart\n', '\n```\n', '// code here')}
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                  title="Code Block"
                >
                  <Code2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown('\n> ', '\n', 'Blockquote')}
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                  title="Blockquote"
                >
                  <Quote className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown('\n- ', '\n', 'List item')}
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                  title="Bullet List"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown('[', '](https://)', 'Link text')}
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                  title="Link"
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown('![Image description](', ')', 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb')}
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                  title="Image"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Word & Read Time Count */}
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span>{calculateReadTime(postForm.markdown)}</span>
                <span>•</span>
                <span>{postForm.markdown.split(/\s+/).filter(Boolean).length} words</span>
              </div>
            </div>

            {/* Split Screen Editor & Live Preview */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800 overflow-hidden">
              {/* Left Pane: Raw Markdown Editor */}
              <div className="flex flex-col h-full bg-[#080d19]">
                <textarea
                  id="markdown-textarea"
                  value={postForm.markdown}
                  onChange={(e) => setPostForm({ ...postForm, markdown: e.target.value })}
                  placeholder="Type your markdown here..."
                  className="w-full flex-1 p-5 bg-transparent text-slate-200 font-mono text-xs sm:text-sm leading-relaxed outline-hidden resize-none selection:bg-cyan-500/30"
                />
              </div>

              {/* Right Pane: Formatted HTML Preview */}
              <div className="flex flex-col h-full bg-[#0c1222] overflow-y-auto p-5 sm:p-7">
                <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-4 pb-2 border-b border-slate-800 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" /> Live Rendered Preview
                </div>

                <div 
                  className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-3 font-bn
                    prose-headings:text-white prose-headings:font-bold
                    prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
                    prose-a:text-cyan-400
                    prose-code:text-cyan-300 prose-code:bg-slate-900 prose-code:px-1 prose-code:rounded prose-code:font-mono prose-code:text-xs
                    prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800 prose-pre:p-3 prose-pre:rounded-xl
                    prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:pl-3 prose-blockquote:italic"
                  dangerouslySetInnerHTML={{ __html: marked.parse(postForm.markdown || '') }}
                />
              </div>
            </div>

            {/* Editor Action Footer */}
            <div className="p-3 px-5 bg-[#060a14] border-t border-slate-800 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Save className="w-4 h-4 text-cyan-400" />
                <span>Save Local Draft</span>
              </button>

              <button
                type="button"
                onClick={handlePublishToGitHub}
                disabled={isPublishing}
                className="btn-sunset px-5 py-2 rounded-xl text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-rose-950/40 transition-all disabled:opacity-50"
              >
                {isPublishing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Committing to GitHub...</span>
                  </>
                ) : (
                  <>
                    <GithubIcon className="w-4 h-4" />
                    <span>Commit & Publish to GitHub</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Posts Management View */}
        {activeTab === 'posts' && (
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">All Managed Articles</h3>
                <p className="text-xs text-slate-400">
                  Remote blogs committed to GitHub repo and local drafts stored in your browser.
                </p>
              </div>

              <button
                onClick={() => loadRemotePosts(settings)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingPosts ? 'animate-spin' : ''}`} />
                <span>Sync with GitHub</span>
              </button>
            </div>

            {/* Remote GitHub Posts */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-mono font-semibold text-cyan-400 tracking-wider flex items-center gap-1.5">
                <GithubIcon className="w-4 h-4" /> Remote GitHub Posts ({remotePosts.length})
              </h4>

              {remotePosts.length === 0 ? (
                <div className="p-8 rounded-xl bg-slate-900/50 border border-slate-800 text-center text-xs text-slate-400 space-y-2">
                  <p>No remote markdown files found yet in `{settings.path}`.</p>
                  <p className="text-[11px] text-slate-500">
                    Switch to the Editor tab to write and commit your first post!
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {remotePosts.map((post) => (
                    <div
                      key={post.slug}
                      className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex items-center justify-between gap-4 transition-all"
                    >
                      <div className="space-y-1 overflow-hidden">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white truncate">
                            {post.title}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                            {post.slug}.md
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-bn line-clamp-1">
                          {post.subtitle || post.snippet}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleEditPost(post)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-950 text-slate-200 hover:text-cyan-300 text-xs font-semibold border border-slate-700 transition-colors"
                        >
                          Edit
                        </button>
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                          title="View on GitHub"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleDeleteRemote(post)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors"
                          title="Delete from GitHub"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Local Drafts */}
            {localDrafts.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <h4 className="text-xs uppercase font-mono font-semibold text-amber-400 tracking-wider">
                  Local Browser Drafts ({localDrafts.length})
                </h4>

                <div className="space-y-2.5">
                  {localDrafts.map((draft) => (
                    <div
                      key={draft.id}
                      className="p-4 rounded-xl bg-slate-900/60 border border-amber-500/20 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <span className="font-bold text-sm text-white">
                          {draft.title || 'Untitled Draft'}
                        </span>
                        <p className="text-xs text-slate-400 line-clamp-1">
                          {draft.snippet}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleEditPost(draft)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-950 text-slate-200 hover:text-amber-300 text-xs font-semibold border border-slate-700"
                        >
                          Resume Edit
                        </button>
                        <button
                          onClick={() => {
                            deleteLocalDraft(draft.id);
                            setLocalDrafts(getLocalDrafts());
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Settings & Token Setup View */}
        {activeTab === 'settings' && (
          <div className="flex-1 p-6 sm:p-10 overflow-y-auto space-y-8">
            <div className="max-w-2xl space-y-6">
              
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  GitHub Git-as-a-CMS Configuration
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Connect your GitHub Personal Access Token to commit markdown files directly to your repository via the official GitHub REST API.
                </p>
              </div>

              {/* Status Indicator */}
              <div className={`p-4 rounded-xl border flex items-center gap-3 ${
                userInfo
                  ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400'
              }`}>
                {userInfo ? (
                  <>
                    <img
                      src={userInfo.avatar_url}
                      alt={userInfo.login}
                      className="w-10 h-10 rounded-full border border-emerald-500/40"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">
                          Connected as @{userInfo.login}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                          Authenticated
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Name: {userInfo.name || userInfo.login} • Repos: {userInfo.public_repos}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <Key className="w-6 h-6 text-rose-400 shrink-0" />
                    <p className="text-xs text-slate-300">
                      Not connected yet. Enter your GitHub Personal Access Token below to enable publishing.
                    </p>
                  </div>
                )}
              </div>

              {verifyError && (
                <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{verifyError}</span>
                </div>
              )}

              {/* Settings Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                    <span>GitHub Personal Access Token (PAT) *</span>
                    <a
                      href="https://github.com/settings/tokens/new?scopes=repo&description=Portfolio+Git+CMS"
                      target="_blank"
                      rel="noreferrer"
                      className="text-rose-400 hover:text-rose-300 hover:underline text-[11px] font-normal flex items-center gap-1"
                    >
                      Generate token on GitHub <ExternalLink className="w-3 h-3" />
                    </a>
                  </label>
                  <input
                    type="password"
                    value={settings.token}
                    onChange={(e) => setSettings({ ...settings, token: e.target.value })}
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx or github_pat_xxxxxxxx"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-white placeholder-slate-600 focus:border-rose-500 outline-hidden"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Your token is stored locally in your browser's `localStorage` and never sent to any third-party server.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      GitHub Username / Owner
                    </label>
                    <input
                      type="text"
                      value={settings.owner}
                      onChange={(e) => setSettings({ ...settings, owner: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono outline-hidden focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Repository Name
                    </label>
                    <input
                      type="text"
                      value={settings.repo}
                      onChange={(e) => setSettings({ ...settings, repo: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono outline-hidden focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Branch
                    </label>
                    <input
                      type="text"
                      value={settings.branch}
                      onChange={(e) => setSettings({ ...settings, branch: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono outline-hidden focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Target Folder Path
                    </label>
                    <input
                      type="text"
                      value={settings.path}
                      onChange={(e) => setSettings({ ...settings, path: e.target.value })}
                      placeholder="content/blogs"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono outline-hidden focus:border-rose-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      saveCmsSettings(settings);
                      verifyToken(settings.token);
                    }}
                    disabled={isVerifying}
                    className="btn-sunset px-5 py-2.5 rounded-xl text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-rose-950/40 transition-colors"
                  >
                    {isVerifying ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Save & Test Connection</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
