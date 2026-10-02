import { PORTFOLIO_DATA } from '../data/portfolioData';

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || "Mahesh930";

export class GitHubService {
  constructor(username = GITHUB_USERNAME) {
    this.username = username;
    this.cacheKey = `portfolio_repos_${username}`;
    this.cacheTimestampKey = `portfolio_repos_time_${username}`;
    this.cacheTtlMs = 15 * 60 * 1000;
    this.apiEndpoint = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
    this.userEndpoint = `https://api.github.com/users/${username}`;
    this._silentFetchInProgress = false; // Dedup guard for background fetches
  }

  async getRepositories(forceRefresh = false) {
    if (!forceRefresh) {
      const cached = this.getCachedData();
      if (cached) {
        if (Date.now() - cached.timestamp > 5 * 60 * 1000) {
          this.fetchFromApiSilently();
        }
        return {
          repos: this.enrichAllRepos(cached.repos),
          user: cached.user,
          isLive: false,
          source: "cached",
          lastSynced: new Date(cached.timestamp)
        };
      }
    }

    try {
      const [reposRes, userRes] = await Promise.all([
        fetch(this.apiEndpoint, { headers: { Accept: "application/vnd.github.v3+json" } }),
        fetch(this.userEndpoint, { headers: { Accept: "application/vnd.github.v3+json" } })
      ]);

      // Handle rate limiting specifically
      if (reposRes.status === 403) {
        const rateLimitRemaining = reposRes.headers.get('X-RateLimit-Remaining');
        const rateLimitReset = reposRes.headers.get('X-RateLimit-Reset');
        if (rateLimitRemaining === '0' || rateLimitRemaining === 0) {
          const resetDate = rateLimitReset ? new Date(parseInt(rateLimitReset) * 1000) : null;
          const resetMsg = resetDate ? ` Resets at ${resetDate.toLocaleTimeString()}.` : '';
          throw new Error(`GitHub API rate limit exceeded.${resetMsg} Showing cached data.`);
        }
      }

      if (!reposRes.ok) {
        throw new Error(`GitHub API error: ${reposRes.status} ${reposRes.statusText}`);
      }

      const repos = await reposRes.json();
      const user = userRes.ok ? await userRes.json() : null;

      this.setCachedData(repos, user);

      return {
        repos: this.enrichAllRepos(repos),
        user,
        isLive: true,
        source: "live",
        lastSynced: new Date()
      };
    } catch (err) {
      console.warn("Could not fetch live GitHub repos, falling back to cached or default data:", err);
      const fallbackCached = this.getCachedData(true);
      if (fallbackCached) {
        return {
          repos: this.enrichAllRepos(fallbackCached.repos),
          user: fallbackCached.user,
          isLive: false,
          source: "offline_cache",
          lastSynced: new Date(fallbackCached.timestamp),
          error: err.message
        };
      }

      return {
        repos: this.enrichAllRepos(this.getPrebakedRepos()),
        user: { login: this.username, public_repos: 17 },
        isLive: false,
        source: "fallback",
        lastSynced: new Date(),
        error: err.message
      };
    }
  }

  async fetchFromApiSilently() {
    // Dedup: prevent multiple concurrent background fetches
    if (this._silentFetchInProgress) return;
    this._silentFetchInProgress = true;

    try {
      const reposRes = await fetch(this.apiEndpoint, { headers: { Accept: "application/vnd.github.v3+json" } });
      if (reposRes.ok) {
        const repos = await reposRes.json();
        this.setCachedData(repos, null);
      }
    } catch (e) {
      // ignore
    } finally {
      this._silentFetchInProgress = false;
    }
  }

  getCachedData(ignoreTtl = false) {
    try {
      const dataStr = localStorage.getItem(this.cacheKey);
      const timeStr = localStorage.getItem(this.cacheTimestampKey);
      if (!dataStr || !timeStr) return null;

      const timestamp = parseInt(timeStr, 10);
      const isExpired = Date.now() - timestamp > this.cacheTtlMs;

      if (isExpired && !ignoreTtl) return null;

      return {
        repos: JSON.parse(dataStr),
        user: null,
        timestamp
      };
    } catch (e) {
      return null;
    }
  }

  setCachedData(repos, user) {
    try {
      localStorage.setItem(this.cacheKey, JSON.stringify(repos));
      localStorage.setItem(this.cacheTimestampKey, Date.now().toString());
    } catch (e) {
      console.warn("Unable to cache in localStorage", e);
    }
  }

  enrichAllRepos(repos) {
    if (!Array.isArray(repos)) return [];
    const curated = PORTFOLIO_DATA.curatedProjects || {};

    return repos
      .filter(repo => !repo.fork || curated[repo.name])
      .map(repo => this.enrichSingleRepo(repo, curated[repo.name]))
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        if (b.depthScore !== a.depthScore) {
          return b.depthScore - a.depthScore;
        }
        return new Date(b.pushed_at || b.updated_at) - new Date(a.pushed_at || a.updated_at);
      });
  }

  enrichSingleRepo(repo, curatedMeta = null) {
    const rawName = repo.name;
    const lang = repo.language || (curatedMeta && curatedMeta.techStack && curatedMeta.techStack[0]) || "JavaScript";
    const size = repo.size || 0;
    const stars = repo.stargazers_count || 0;
    const forks = repo.forks_count || 0;
    const updatedAt = repo.pushed_at || repo.updated_at;

    const autoAnalysis = this.analyzeRepoComplexity(repo);

    const isCurated = !!curatedMeta;
    const title = curatedMeta?.title || this.formatRepoTitle(rawName);
    const category = curatedMeta?.category || autoAnalysis.category;
    const complexityTier = curatedMeta?.complexity || autoAnalysis.tier;
    const depthScore = curatedMeta?.depthScore || autoAnalysis.score;
    const description = curatedMeta?.description || repo.description || this.generateFallbackDescription(rawName, lang);
    const techStack = curatedMeta?.techStack || autoAnalysis.techStack;
    const architectureTags = curatedMeta?.architectureTags || autoAnalysis.architectureTags;
    const highlights = curatedMeta?.highlights || autoAnalysis.highlights;
    const featured = curatedMeta?.featured || (depthScore >= 88);

    return {
      id: repo.id || rawName,
      name: rawName,
      title,
      category,
      complexityTier,
      depthScore,
      featured,
      isCurated,
      description,
      language: lang,
      techStack,
      architectureTags,
      highlights,
      githubUrl: repo.html_url || `https://github.com/${this.username}/${rawName}`,
      demoUrl: curatedMeta?.demoUrl || repo.homepage || repo.html_url,
      stars,
      forks,
      sizeKb: size,
      updatedAt,
      relativeUpdated: this.formatRelativeTime(updatedAt),
      topics: repo.topics || []
    };
  }

  analyzeRepoComplexity(repo) {
    let score = 50;
    const name = (repo.name || "").toLowerCase();
    const desc = (repo.description || "").toLowerCase();
    const lang = (repo.language || "").toLowerCase();
    const size = repo.size || 0;
    const text = `${name} ${desc}`;

    if (["typescript", "java", "c++", "rust", "go", "c#"].includes(lang)) {
      score += 15;
    } else if (["javascript", "python"].includes(lang)) {
      score += 10;
    } else {
      score += 5;
    }

    if (size > 1500) score += 15;
    else if (size > 500) score += 10;
    else if (size > 100) score += 5;

    const keywordWeights = [
      { pattern: /erp|hospital|multi-tenant|saas|enterprise|monorepo/i, weight: 16, tag: "Enterprise SaaS" },
      { pattern: /realtime|real-time|socket|websocket|chat|tracking/i, weight: 14, tag: "Real-Time Systems" },
      { pattern: /jwt|auth|security|oauth|rbac|spring-security/i, weight: 12, tag: "Security & Auth" },
      { pattern: /api|backend|express|spring|controller|restful|microservice/i, weight: 12, tag: "REST Architecture" },
      { pattern: /postgres|mongo|hibernate|jpa|database|sql|transactions/i, weight: 12, tag: "Database Engineering" },
      { pattern: /nextjs|next|turborepo|vite|redux|tanstack/i, weight: 10, tag: "Modern Frontend" },
      { pattern: /travel|map|mapbox|geolocation|gis/i, weight: 12, tag: "Geospatial GIS" },
      { pattern: /stream|video|media|cloudinary|upload|transcode/i, weight: 12, tag: "Cloud Media" },
      { pattern: /delivery|marketplace|food|ecommerce|rental|store/i, weight: 10, tag: "E-Commerce" }
    ];

    const architectureTags = [];
    keywordWeights.forEach(kw => {
      if (kw.pattern.test(text)) {
        score += kw.weight;
        if (!architectureTags.includes(kw.tag)) {
          architectureTags.push(kw.tag);
        }
      }
    });

    if (architectureTags.length === 0) {
      if (lang === "typescript" || lang === "javascript") architectureTags.push("Full-Stack JS/TS");
      else if (lang === "html" || lang === "css") architectureTags.push("Web Interface");
      else architectureTags.push("Software Engineering");
    }

    score = Math.min(98, Math.max(45, score));

    let tier = "Core System (Tier 5)";
    let category = "Software Application";

    if (score >= 90) {
      tier = "Enterprise Architecture (Tier 1)";
      category = "Enterprise SaaS & Distributed Architecture";
    } else if (score >= 80) {
      tier = "Full-Stack Application (Tier 2)";
      category = "Full-Stack Web & Cloud";
    } else if (score >= 70) {
      tier = "Backend & Systems (Tier 3)";
      category = "Backend Services & Micro-APIs";
    } else if (score >= 60) {
      tier = "Frontend Application (Tier 4)";
      category = "Interactive Client Application";
    } else {
      tier = "Core Utility / Foundation (Tier 5)";
      category = "Developer Tools & Practice";
    }

    const techStack = [];
    if (repo.language) techStack.push(repo.language);
    if (/react/i.test(text)) techStack.push("React.js");
    if (/next/i.test(text)) techStack.push("Next.js");
    if (/spring/i.test(text)) techStack.push("Spring Boot");
    if (/node|express/i.test(text)) techStack.push("Node.js / Express");
    if (/mongo/i.test(text)) techStack.push("MongoDB");
    if (/postgres/i.test(text)) techStack.push("PostgreSQL");
    if (/tailwind/i.test(text)) techStack.push("Tailwind CSS");

    if (techStack.length === 0) {
      techStack.push(repo.language || "Web Stack");
    }

    const highlights = [
      `Engineered with ${repo.language || "modern technologies"} with clean modular code organization.`,
      `Repository size of ~${Math.round(size)} KB with active version control on GitHub.`
    ];

    return {
      score,
      tier,
      category,
      architectureTags: architectureTags.slice(0, 4),
      techStack,
      highlights
    };
  }

  formatRepoTitle(name) {
    return name
      .replace(/[-_]+/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  generateFallbackDescription(name, lang) {
    return `An open-source ${lang} project engineered by Mahesh Warpe exploring scalable design patterns, efficient algorithms, and responsive interfaces.`;
  }

  formatRelativeTime(dateString) {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Updated today";
    if (diffDays === 1) return "Updated yesterday";
    if (diffDays < 30) return `Updated ${diffDays} days ago`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `Updated ${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
    const diffYears = Math.floor(diffMonths / 12);
    return `Updated ${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`;
  }

  getPrebakedRepos() {
    return [
      { name: "hospitalManagement", language: "TypeScript", size: 441, stargazers_count: 0, forks_count: 0, updated_at: "2026-09-23T06:11:23Z", description: "The Advanced application for management of hospital using java springboot Hibernate TypeScript NextJs" },
      { name: "waterAqua", language: "JavaScript", size: 1200, stargazers_count: 0, forks_count: 1, updated_at: "2026-09-25T04:51:31Z", description: "A Real Time Water Delivery application with the help of MERN stack" },
      { name: "routematev2", language: "TypeScript", size: 1850, stargazers_count: 0, forks_count: 0, updated_at: "2026-08-14T05:31:16Z", description: "AI-Powered Multimodal Travel Planner with Mapbox GL and Supabase" },
      { name: "Yt", language: "JavaScript", size: 980, stargazers_count: 0, forks_count: 0, updated_at: "2026-02-16T07:15:13Z", description: "VideoTube - Scalable YouTube-style video sharing platform with Cloudinary" },
      { name: "AllowanceTracking", language: "TypeScript", size: 714, stargazers_count: 0, forks_count: 0, updated_at: "2026-08-17T15:08:26Z", description: "Automated expense and allowance management tracker" },
      { name: "swastik-group", language: "HTML", size: 1540, stargazers_count: 0, forks_count: 0, updated_at: "2026-09-25T17:50:20Z", description: "Corporate enterprise portal for Swastik Group" },
      { name: "node_hotels", language: "JavaScript", size: 410, stargazers_count: 0, forks_count: 0, updated_at: "2024-06-17T10:36:21Z", description: "Hotel booking & reservation backend service" },
      { name: "FoodApp", language: "JavaScript", size: 2598, stargazers_count: 0, forks_count: 0, updated_at: "2025-06-20T09:44:39Z", description: "Online food ordering and cart management web application" },
      { name: "RealEstate-", language: "JavaScript", size: 680, stargazers_count: 0, forks_count: 0, updated_at: "2025-04-10T03:56:54Z", description: "Vehicle and property rental module" },
      { name: "Quiz-app", language: "JavaScript", size: 150, stargazers_count: 0, forks_count: 0, updated_at: "2025-07-02T15:04:53Z", description: "Interactive quiz web application" },
      { name: "linkedIn-HTML-CSS", language: "HTML", size: 6293, stargazers_count: 0, forks_count: 0, updated_at: "2025-04-29T10:24:59Z", description: "Pixel-perfect LinkedIn UI clone" },
      { name: "JS_Basic", language: "HTML", size: 22, stargazers_count: 0, forks_count: 0, updated_at: "2024-12-23T09:02:31Z", description: "Core JavaScript problem solutions and fundamentals" },
      { name: "Digital-clock-JS", language: "CSS", size: 1, stargazers_count: 0, forks_count: 0, updated_at: "2025-06-12T11:39:56Z", description: "Minimalist digital clock with real-time DOM updates" },
      { name: "DotNetFirst", language: "HTML", size: 861, stargazers_count: 0, forks_count: 0, updated_at: "2025-07-18T04:17:18Z", description: "First exploration in .NET application architecture" }
    ];
  }
}

export const githubService = new GitHubService();
