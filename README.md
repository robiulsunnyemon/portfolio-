# Robiul Suny (রবিউল সানি) - Developer Portfolio

A modern, high-performance portfolio website built with **React**, **Vite**, and **Tailwind CSS**. Designed specifically for showcasing Flutter/Dart mobile engineering, distributed backend systems (Python FastAPI, Java Spring Boot, Golang), AWS cloud architectures, and open-source pub.dev packages.

---

## 🚀 Key Highlights & Sections

1. **Hero & Developer Console**:
   - Bio, role at **makTech**, bilingual branding (English + বাংলা).
   - Interactive terminal snippet with live copyable commands (`flutter pub add sync_pilot`, etc.).
   - Quick "Copy Email" button with instant feedback toast.
2. **Metrics & Impact Counter**:
   - 3+ Verified Pub.dev Packages
   - 160/160 Max Pub.dev Score (100% Quality & Documentation)
   - 1,300+ Active Developer Downloads
   - Google Play Store published production apps
3. **Open-Source Flutter Packages (Dedicated Showcase)**:
   - `bd_locations` (Bangladesh Divisions, Districts, Upazilas offline dataset)
   - `sync_pilot` (Offline-first sync engine with 3-way conflict resolution)
   - `bclean` (Flutter Clean Architecture & BLoC CLI tool)
   - One-click copy commands (`flutter pub add ...` / `dart pub global activate ...`)
4. **Skills & Arsenal**:
   - Categorized by Mobile, Backend, Cloud & DevOps, Databases & Architecture.
5. **Projects with Filter Tabs & Modal**:
   - Filter by All, Mobile & Play Store, Backend & Cloud, Open Source.
   - Interactive detail modal with feature bullets, architecture notes, and direct Play Store / GitHub links.
6. **Career Experience**:
   - Timeline highlighting Software Engineer role at **makTech** and open-source contributions.
7. **Hashnode Technical Blogs**:
   - Dummy articles on Flutter offline sync, FastAPI scaling on AWS, BLoC clean architecture, and Golang concurrency with like counter and direct Hashnode links.
8. **Contact & Socials**:
   - Working message submission state, direct email copy, and links to GitHub, LinkedIn, Hashnode, and Pub.dev.

### ✍️ GitHub Git-as-a-CMS Admin Dashboard

Your portfolio includes a built-in serverless **Git-as-a-CMS** dashboard with a live Markdown editor:
- **How to open**:
  - Click the **"Write Blog (Admin CMS)"** button in the Blogs section.
  - Or click the **CMS (Lock icon)** in the top navigation bar or footer.
  - Or press keyboard shortcut: `Ctrl + Shift + A` (or `Cmd + Shift + A`).
- **How it works**:
  - Enter your GitHub Personal Access Token (`contents: write` scope) in Settings.
  - When you click **"Commit & Publish to GitHub"**, it uses the official GitHub REST API to commit your markdown post directly into `content/blogs/{slug}.md` in your repository.
  - No external database or server needed!
  - Features real-time split-screen Markdown preview, word count, auto read-time calculation, tag management, and local draft saving.

---

## 🛠️ How to Run Locally

```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Start the development server with Hot Module Replacement (HMR)
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 📝 How to Update Your Projects & Info

All website content is centralized in **[`src/data/portfolioData.js`](file:///d:/portfolio/src/data/portfolioData.js)** for easy updates without touching UI code:

- **Personal Info & Bio**: Update `personalInfo` object (name, email, company, social links).
- **Pub.dev Packages**: Update `pubPackages` array to add new packages or update download counts.
- **Projects**: Edit or add new objects in `projects` array:
  ```javascript
  {
    id: "my-new-project",
    title: "Project Title",
    category: "mobile", // 'mobile' | 'backend' | 'package'
    categoryLabel: "Mobile & Play Store",
    isPlayStore: true,
    playStoreUrl: "https://play.google.com/store/apps/...",
    githubUrl: "https://github.com/...",
    image: "https://...",
    description: "Short description...",
    technologies: ["Flutter", "FastAPI", "AWS"],
    features: ["Feature 1", "Feature 2"]
  }
  ```
- **Hashnode Blogs**: Add or replace articles in `blogs` array.

---

## 🌐 Deployment Options

- **Vercel**: Run `vercel` or link your GitHub repository.
- **Netlify**: Drag and drop the `dist/` folder or link GitHub repo with build command `npm run build` and publish directory `dist`.
- **GitHub Pages**: Build with `npm run build` and deploy the `dist/` folder using `gh-pages`.
