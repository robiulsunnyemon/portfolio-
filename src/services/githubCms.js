// GitHub Git-as-a-CMS Service for Robiul Suny's Portfolio
const SETTINGS_KEY = 'portfolio_github_cms_settings';
const LOCAL_POSTS_KEY = 'portfolio_local_blog_posts';

export function getCmsSettings() {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to parse CMS settings:', e);
  }
  return {
    owner: 'robiulsunnyemon',
    repo: 'portfolio-',
    branch: 'main',
    token: '',
    path: 'content/blogs',
  };
}

export function saveCmsSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// Verify GitHub Token & get authenticated user info
export async function verifyGitHubToken(token) {
  if (!token) throw new Error('Personal Access Token is required');
  const res = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token.trim()}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error('Invalid or expired Personal Access Token');
    throw new Error(`GitHub API error: ${res.statusText}`);
  }

  return await res.json();
}

// Helper to encode UTF-8 to Base64 safely
function utf8ToBase64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

// Helper to decode Base64 to UTF-8 safely
function base64ToUtf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

// Parse markdown frontmatter
export function parseFrontmatter(rawContent) {
  const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { metadata: {}, content: rawContent };
  }

  const yamlBlock = match[1];
  const content = match[2];
  const metadata = {};

  yamlBlock.split(/\r?\n/).forEach((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();
      // Remove quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      // Parse arrays e.g. ["a", "b"]
      if (val.startsWith('[') && val.endsWith(']')) {
        try {
          val = JSON.parse(val);
        } catch (_) {
          val = val.slice(1, -1).split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, ''));
        }
      }
      metadata[key] = val;
    }
  });

  return { metadata, content };
}

// Format markdown with frontmatter
export function serializeWithFrontmatter(post) {
  const tagsJson = JSON.stringify(post.tags || []);
  const frontmatter = [
    '---',
    `title: "${(post.title || '').replace(/"/g, '\\"')}"`,
    `subtitle: "${(post.subtitle || '').replace(/"/g, '\\"')}"`,
    `date: "${post.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}"`,
    `readTime: "${post.readTime || '5 min read'}"`,
    `category: "${post.category || 'flutter'}"`,
    `image: "${post.image || ''}"`,
    `tags: ${tagsJson}`,
    '---',
    '',
    post.markdown || '',
  ].join('\n');

  return frontmatter;
}

// Fetch list of all blog files from GitHub content/blogs/
export async function fetchRemotePosts(settings) {
  const { owner, repo, branch, token, path } = settings;
  if (!token) return [];

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token.trim()}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (res.status === 404) {
    // Directory doesn't exist yet, that's okay
    return [];
  }

  if (!res.ok) {
    throw new Error(`Failed to list blogs: ${res.statusText}`);
  }

  const files = await res.json();
  if (!Array.isArray(files)) return [];

  const mdFiles = files.filter((f) => f.name.endsWith('.md'));

  // Fetch content of each file
  const posts = await Promise.all(
    mdFiles.map(async (file) => {
      try {
        const fileRes = await fetch(file.url, {
          headers: {
            Authorization: `Bearer ${token.trim()}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
          },
        });
        const fileData = await fileRes.json();
        const rawContent = base64ToUtf8(fileData.content.replace(/\n/g, ''));
        const { metadata, content } = parseFrontmatter(rawContent);

        const slug = file.name.replace(/\.md$/, '');
        return {
          id: slug,
          slug,
          sha: fileData.sha,
          title: metadata.title || slug,
          subtitle: metadata.subtitle || '',
          date: metadata.date || 'Recent',
          readTime: metadata.readTime || calculateReadTime(content),
          category: metadata.category || 'flutter',
          image: metadata.image || 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
          tags: Array.isArray(metadata.tags) ? metadata.tags : ['Tech'],
          markdown: content,
          snippet: content.slice(0, 180).replace(/[#*`_]/g, '') + '...',
          platform: 'Self-Hosted (GitHub)',
          isRemote: true,
          url: file.html_url,
        };
      } catch (err) {
        console.error('Error fetching file content:', file.name, err);
        return null;
      }
    })
  );

  return posts.filter(Boolean);
}

// Publish or update post directly to GitHub repo via Commit
export async function commitPostToGitHub(settings, post) {
  const { owner, repo, branch, token, path } = settings;
  if (!token) throw new Error('Personal Access Token is required to commit');

  const slug = (post.slug || post.title || 'untitled-post')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const filePath = `${path}/${slug}.md`;
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

  // Check if file exists to get SHA (for updates)
  let sha = post.sha || null;
  if (!sha) {
    try {
      const checkRes = await fetch(`${url}?ref=${branch}`, {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          Accept: 'application/vnd.github+json',
        },
      });
      if (checkRes.ok) {
        const existingData = await checkRes.json();
        sha = existingData.sha;
      }
    } catch (_) {
      // Ignore 404
    }
  }

  const rawFileContent = serializeWithFrontmatter(post);
  const base64Content = utf8ToBase64(rawFileContent);
  const commitMessage = sha
    ? `feat(blog): update post "${post.title}"`
    : `feat(blog): publish new post "${post.title}"`;

  const payload = {
    message: commitMessage,
    content: base64Content,
    branch: branch,
  };
  if (sha) payload.sha = sha;

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token.trim()}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || `GitHub commit failed (${res.statusText})`);
  }

  const responseData = await res.json();
  return {
    slug,
    sha: responseData.content.sha,
    commit: responseData.commit,
    html_url: responseData.content.html_url,
  };
}

// Delete post from GitHub repo
export async function deletePostFromGitHub(settings, slug, sha) {
  const { owner, repo, branch, token, path } = settings;
  const filePath = `${path}/${slug}.md`;
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token.trim()}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `chore(blog): remove post "${slug}"`,
      sha: sha,
      branch: branch,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to delete file from GitHub');
  }

  return true;
}

// Local draft storage helpers
export function getLocalDrafts() {
  try {
    const stored = localStorage.getItem(LOCAL_POSTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (_) {
    return [];
  }
}

export function saveLocalDraft(draft) {
  const existing = getLocalDrafts();
  const id = draft.id || 'draft_' + Date.now();
  const updatedDraft = {
    ...draft,
    id,
    date: draft.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime: draft.readTime || calculateReadTime(draft.markdown || ''),
    snippet: (draft.markdown || '').slice(0, 180).replace(/[#*`_]/g, '') + '...',
    isLocal: true,
  };

  const filtered = existing.filter((d) => d.id !== id);
  const next = [updatedDraft, ...filtered];
  localStorage.setItem(LOCAL_POSTS_KEY, JSON.stringify(next));
  return updatedDraft;
}

export function deleteLocalDraft(id) {
  const existing = getLocalDrafts();
  const next = existing.filter((d) => d.id !== id);
  localStorage.setItem(LOCAL_POSTS_KEY, JSON.stringify(next));
}

// Calculate reading time
export function calculateReadTime(text) {
  if (!text) return '1 min read';
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 180);
  return `${minutes} min read`;
}
