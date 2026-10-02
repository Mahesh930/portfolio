# Mahesh Warpe — Professional Full-Stack Portfolio

A high-performance modern developer portfolio built with **React.js**, **Tailwind CSS v3**, **Vite**, and **Node.js** tooling. Directly integrated with GitHub ([@Mahesh930](https://github.com/Mahesh930)) with automated architectural depth and complexity scoring.

---

## 🌟 Key Highlights & Features

1. **Automatic Real-Time GitHub Synchronization**:
   - Connected live to GitHub user profile [`@Mahesh930`](https://github.com/Mahesh930).
   - **Whenever you push or create a new public repository on GitHub**, the portfolio automatically fetches, categorizes, and displays it!
   - Features a **Live Sync status pill**, repository count badge, and a **Sync GitHub** refresh trigger with `localStorage` caching to respect GitHub API rate limits.

2. **Intelligent Complexity & Architectural Depth Engine**:
   - Analyzes repositories by primary language weight, codebase size (KB), and architectural keywords (`erp`, `saas`, `multi-tenant`, `socket`, `real-time`, `auth`, `jwt`, `gis`, `spring`, `mern`).
   - Assigns an **Architectural Depth Score (1–100%)** and **Complexity Tier**:
     - 🟢 **Tier 1:** Enterprise Architecture & Distributed SaaS (*MediCore ERP*)
     - 🔵 **Tier 2:** Full-Stack & Real-Time Applications (*AquaHome*, *RouteMate*)
     - 🟣 **Tier 3:** High-Throughput Cloud & Backend APIs (*VideoTube*, *node_hotels*)
     - 🟡 **Tier 4:** Dynamic Web & Utility Interfaces (*FoodApp*, *AllowanceTracking*)

3. **Complete Resume Integration**:
   - **Hero Section**: Bio, developer terminal, status badge (*Available for Full-Time Roles*), social links.
   - **Skills Matrix**: Categorized interactive proficiency indicators for Languages, Frontend, Backend & Security, Databases, DevOps/Tools, and Core Computer Science.
   - **Flagship Project Showcases**: Architectural cards for *MediCore ERP*, *AquaHome*, *RouteMate*, and *VideoTube*.
   - **Interactive Experience & Education Timelines**:
     - Web Operations Intern at *TechGeekConnect Technologies LLP (TCGT)*.
     - Savitribai Phule Pune University (B.E. Computer Engineering), Government Polytechnic Amravati (Diploma IT), Balbhim College (HSC).
   - **Achievements**: HackerRank 5-Star Problem Solver, 400+ algorithmic coding problems solved, 5–10 shipped full-stack applications.
   - **Interactive Resume Modal**: Full formatted resume with one-click **Print / Save PDF** support.
   - **Architecture Deep-Dive Modal**: Detailed breakdown of system design, database strategies, and key engineering problems solved for each project.
   - **Contact Form**: Pre-fills messages to `warpemahesh356@gmail.com` with one-click send and direct contact details.

4. **Modern UI & Responsive Design**:
   - Built with **Tailwind CSS v3** utility classes.
   - Standard dark developer color palette (obsidian, slate, electric indigo, cyan, emerald).
   - Fluid typography with CSS `clamp()`.
   - Edge-to-edge balanced container layout that minimizes side gutters.
   - Animated mobile navigation drawer.

---

## 🚀 How to Run Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the Vite development server**:
   ```bash
   npm run dev
   ```
   Open your browser at: `http://localhost:3000/`

3. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🌐 How to Deploy to GitHub Pages or Vercel

### Option A: Vercel (Recommended for React & Vite)
1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Framework Preset will automatically detect **Vite**. Click **Deploy**!

### Option B: GitHub Pages
1. Build the production bundle:
   ```bash
   npm run build
   ```
2. You can deploy the `dist/` directory to GitHub Pages using the `gh-pages` package:
   ```bash
   npm install -D gh-pages
   ```
3. Add to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Run:
   ```bash
   npm run deploy
   ```

---

## 📁 File Structure

```
d:/Portfolio/
├── index.html                   # HTML entry point with fonts & metadata
├── package.json                 # React 18, Vite, Tailwind CSS v3, Lucide icons
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS theme & color tokens
├── postcss.config.js            # PostCSS configuration
├── src/
│   ├── main.jsx                 # React root mount
│   ├── App.jsx                  # Main app component & state orchestration
│   ├── index.css                # Tailwind directives & cyber glow styles
│   ├── data/
│   │   └── portfolioData.js     # Resume dataset & curated project overrides
│   ├── services/
│   │   └── githubService.js     # Live GitHub API client & complexity scoring
│   └── components/
│       ├── Navbar.jsx           # Responsive header with mobile drawer
│       ├── Hero.jsx             # Hero section with terminal & metrics
│       ├── About.jsx            # Engineering profile & quick facts
│       ├── Skills.jsx           # Skills matrix with progress bars
│       ├── FlagshipProjects.jsx # Featured SaaS & production cards
│       ├── GitHubExplorer.jsx   # Live GitHub stream, search & filters
│       ├── ExperienceEducation.jsx # Experience, Education, Achievements
│       ├── Contact.jsx          # Contact info & interactive form
│       ├── Footer.jsx           # Footer with back-to-top button
│       ├── ResumeModal.jsx      # Printable PDF-style resume modal
│       └── ProjectModal.jsx     # Architectural deep-dive modal
```
