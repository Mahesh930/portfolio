/**
 * Portfolio Application Main Controller
 * Orchestrates dynamic GitHub API rendering, filters, sorting, modals, and interactivity.
 */

document.addEventListener("DOMContentLoaded", async () => {
  const githubService = new GitHubService(PORTFOLIO_DATA.personal.githubUsername);
  let allRepositories = [];
  let currentFilterLang = "all";
  let currentFilterTier = "all";
  let currentSort = "depth";
  let currentSearch = "";

  // 1. Initial Render of Static Data from Resume
  renderHeroData();
  renderSkillsMatrix();
  renderExperience();
  renderEducation();
  renderAchievements();
  setupContactForm();
  setupModals();
  setupNavbar();

  // 2. Fetch and Render Live GitHub Work
  await loadAndRenderGitHubData(false);

  // 3. Setup GitHub Explorer Controls (Search, Filters, Sort, Refresh)
  setupExplorerEvents();

  /**
   * Load repositories from GitHub service (cached or live)
   */
  async function loadAndRenderGitHubData(forceRefresh = false) {
    const refreshBtn = document.getElementById("btn-refresh-github");
    const syncStatusEl = document.getElementById("sync-status-text");
    const repoCountBadge = document.getElementById("repo-count-badge");
    const navSyncPill = document.getElementById("nav-sync-pill");

    if (refreshBtn) refreshBtn.classList.add("spinning");
    if (syncStatusEl) syncStatusEl.textContent = "Syncing live with GitHub API...";

    try {
      const data = await githubService.getRepositories(forceRefresh);
      allRepositories = data.repos;

      // Update sync indicators
      const count = allRepositories.length;
      if (repoCountBadge) repoCountBadge.textContent = `${count} Repositories`;
      if (navSyncPill) navSyncPill.innerHTML = `<span class="pulse-dot"></span> GitHub: ${count} Repos Synced`;

      if (syncStatusEl) {
        const timeAgo = githubService.formatRelativeTime(data.lastSynced);
        syncStatusEl.innerHTML = `Connected to <a href="https://github.com/Mahesh930" target="_blank" style="color:var(--accent-cyan);text-decoration:underline;">@Mahesh930</a> • ${data.isLive ? 'Live API' : 'Cached Sync'} (${timeAgo})`;
      }

      // Render Flagships
      renderFlagshipProjects(allRepositories);

      // Render Explorer Grid
      applyExplorerFilters();

      if (forceRefresh) {
        showToast("Successfully synchronized with GitHub API!");
      }
    } catch (err) {
      console.error("Failed to load GitHub repositories:", err);
      if (syncStatusEl) syncStatusEl.textContent = "Offline cache loaded";
    } finally {
      if (refreshBtn) refreshBtn.classList.remove("spinning");
    }
  }

  /**
   * Renders the Flagship Showcase Projects
   */
  function renderFlagshipProjects(repos) {
    const container = document.getElementById("flagship-container");
    if (!container) return;

    // Filter flagship/featured projects
    const flagships = repos.filter(r => r.featured || r.depthScore >= 88).slice(0, 4);

    container.innerHTML = flagships.map(project => {
      const badgeClass = getBadgeClass(project.complexityTier);
      return `
        <article class="flagship-card" data-repo-name="${escapeHtml(project.name)}">
          <div class="flagship-inner">
            <div class="flagship-main">
              <div class="flagship-header-row">
                <span class="badge ${badgeClass}">${escapeHtml(project.complexityTier)}</span>
                <span class="badge badge-saas" style="background:rgba(255,255,255,0.05);color:var(--text-muted);border-color:var(--border-subtle);">${escapeHtml(project.category)}</span>
              </div>
              
              <h3 class="flagship-title">${escapeHtml(project.title)}</h3>
              <p class="flagship-desc">${escapeHtml(project.description)}</p>

              <div class="flagship-highlights">
                ${project.highlights.map(h => `
                  <div class="highlight-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>${escapeHtml(h)}</span>
                  </div>
                `).join('')}
              </div>

              <div class="flagship-actions">
                <button class="btn btn-primary btn-sm btn-open-modal" data-repo="${escapeHtml(project.name)}">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                  Architecture Deep Dive
                </button>
                <a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  View Code
                </a>
                ${project.demoUrl && project.demoUrl !== project.githubUrl ? `
                  <a href="${escapeHtml(project.demoUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    Live Demo
                  </a>
                ` : ''}
              </div>
            </div>

            <div class="flagship-sidebar">
              <div class="sidebar-block">
                <span class="sidebar-label">Engineering Depth Score</span>
                <div class="depth-meter-wrap">
                  <div class="depth-meter-header">
                    <span>Architectural Complexity</span>
                    <span class="depth-score-val">${project.depthScore} / 100</span>
                  </div>
                  <div class="depth-meter-bar">
                    <div class="depth-meter-fill" style="width: ${project.depthScore}%;"></div>
                  </div>
                </div>
              </div>

              <div class="sidebar-block">
                <span class="sidebar-label">Core Tech Stack</span>
                <div class="tech-pills">
                  ${project.techStack.map(t => `<span class="tech-pill glow">${escapeHtml(t)}</span>`).join('')}
                </div>
              </div>

              <div class="sidebar-block" style="margin-bottom:0;">
                <span class="sidebar-label">Key Architectural Paradigms</span>
                <div class="tech-pills">
                  ${project.architectureTags.map(a => `<span class="tech-pill">${escapeHtml(a)}</span>`).join('')}
                </div>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  /**
   * Applies active search, language, tier, and sort options to repository explorer
   */
  function applyExplorerFilters() {
    const grid = document.getElementById("repos-grid");
    if (!grid) return;

    let filtered = [...allRepositories];

    // Search query filter
    if (currentSearch.trim()) {
      const q = currentSearch.toLowerCase().trim();
      filtered = filtered.filter(r => 
        (r.name && r.name.toLowerCase().includes(q)) ||
        (r.title && r.title.toLowerCase().includes(q)) ||
        (r.description && r.description.toLowerCase().includes(q)) ||
        (r.language && r.language.toLowerCase().includes(q)) ||
        (r.techStack && r.techStack.some(t => t.toLowerCase().includes(q))) ||
        (r.architectureTags && r.architectureTags.some(a => a.toLowerCase().includes(q)))
      );
    }

    // Language filter
    if (currentFilterLang !== "all") {
      filtered = filtered.filter(r => {
        const lang = (r.language || "").toLowerCase();
        if (currentFilterLang === "typescript") return lang === "typescript";
        if (currentFilterLang === "javascript") return lang === "javascript";
        if (currentFilterLang === "java") return lang === "java";
        if (currentFilterLang === "web") return lang === "html" || lang === "css";
        return true;
      });
    }

    // Complexity tier filter
    if (currentFilterTier !== "all") {
      filtered = filtered.filter(r => {
        if (currentFilterTier === "tier1") return r.depthScore >= 90;
        if (currentFilterTier === "tier2") return r.depthScore >= 80 && r.depthScore < 90;
        if (currentFilterTier === "tier3") return r.depthScore >= 70 && r.depthScore < 80;
        if (currentFilterTier === "tier4") return r.depthScore < 70;
        return true;
      });
    }

    // Sorting
    filtered.sort((a, b) => {
      if (currentSort === "depth") {
        return b.depthScore - a.depthScore;
      }
      if (currentSort === "recent") {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
      if (currentSort === "stars") {
        return (b.stars + b.forks) - (a.stars + a.forks);
      }
      if (currentSort === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:14px; opacity:0.5;">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h4 style="font-size:1.15rem; color:var(--text-primary); margin-bottom:6px;">No Repositories Match Filter</h4>
          <p style="font-size:0.9rem;">Try adjusting your keyword search or clearing language filters.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(repo => {
      const langColor = getLanguageColor(repo.language);
      const badgeClass = getBadgeClass(repo.complexityTier);

      return `
        <div class="repo-card ${repo.featured ? 'flagship-border' : ''}">
          <div class="repo-card-top">
            <div class="repo-title-group">
              <svg class="repo-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              <h4 class="repo-name">${escapeHtml(repo.title || repo.name)}</h4>
            </div>
            <span class="badge ${badgeClass}" style="font-size:0.68rem; padding:3px 8px;">${repo.depthScore}/100</span>
          </div>

          <p class="repo-desc">${escapeHtml(repo.description)}</p>

          <div class="repo-depth-bar">
            <span>Complexity</span>
            <div class="repo-depth-track">
              <div class="repo-depth-bar-fill" style="width: ${repo.depthScore}%;"></div>
            </div>
            <span>${repo.depthScore}%</span>
          </div>

          <div class="repo-tags">
            ${(repo.architectureTags || []).slice(0, 3).map(tag => `
              <span class="tech-pill">${escapeHtml(tag)}</span>
            `).join('')}
          </div>

          <div class="repo-card-footer">
            <div class="lang-indicator">
              <span class="lang-color-dot" style="background-color: ${langColor};"></span>
              <span>${escapeHtml(repo.language || 'Code')}</span>
              <span style="opacity:0.4; margin:0 4px;">•</span>
              <span>${repo.relativeUpdated}</span>
            </div>

            <div class="repo-footer-actions">
              <button class="btn btn-outline btn-sm btn-open-modal" data-repo="${escapeHtml(repo.name)}" style="padding:4px 9px; font-size:0.75rem;">
                Details
              </button>
              <a href="${escapeHtml(repo.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="padding:4px 9px; font-size:0.75rem;">
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Setup Explorer Filter Pills & Inputs
   */
  function setupExplorerEvents() {
    const searchInput = document.getElementById("repo-search-input");
    const langPills = document.querySelectorAll("[data-filter-lang]");
    const tierPills = document.querySelectorAll("[data-filter-tier]");
    const sortSelect = document.getElementById("repo-sort-select");
    const refreshBtn = document.getElementById("btn-refresh-github");

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        currentSearch = e.target.value;
        applyExplorerFilters();
      });
    }

    langPills.forEach(pill => {
      pill.addEventListener("click", () => {
        langPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        currentFilterLang = pill.getAttribute("data-filter-lang");
        applyExplorerFilters();
      });
    });

    tierPills.forEach(pill => {
      pill.addEventListener("click", () => {
        tierPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        currentFilterTier = pill.getAttribute("data-filter-tier");
        applyExplorerFilters();
      });
    });

    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        currentSort = e.target.value;
        applyExplorerFilters();
      });
    }

    if (refreshBtn) {
      refreshBtn.addEventListener("click", async () => {
        await loadAndRenderGitHubData(true);
      });
    }

    // Delegate modal triggers for project cards
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-open-modal");
      if (btn) {
        const repoName = btn.getAttribute("data-repo");
        openProjectModal(repoName);
      }
    });
  }

  /**
   * Render Hero Section data & stats
   */
  function renderHeroData() {
    const p = PORTFOLIO_DATA.personal;
    const nameEl = document.getElementById("hero-name");
    const titleEl = document.getElementById("hero-title-text");
    const summaryEl = document.getElementById("hero-summary");
    const statusTextEl = document.getElementById("status-text");

    if (nameEl) nameEl.textContent = p.name;
    if (titleEl) titleEl.textContent = p.title;
    if (summaryEl) summaryEl.textContent = p.headline;
    if (statusTextEl) statusTextEl.textContent = p.statusText;

    // Metrics counter strip
    const metricsContainer = document.getElementById("hero-metrics-container");
    if (metricsContainer) {
      metricsContainer.innerHTML = PORTFOLIO_DATA.metrics.map(m => `
        <div class="metric-item">
          <div class="metric-icon-wrap">
            ${getIconSvg(m.icon)}
          </div>
          <div class="metric-data">
            <span class="metric-val">${m.value}</span>
            <span class="metric-sub">${m.label}</span>
          </div>
        </div>
      `).join('');
    }
  }

  /**
   * Render Skills Matrix
   */
  function renderSkillsMatrix() {
    const container = document.getElementById("skills-container");
    if (!container) return;

    const s = PORTFOLIO_DATA.skills;
    const categories = [
      { key: "languages", title: "Programming Languages", icon: "code", items: s.languages },
      { key: "frontend", title: "Frontend & UI Architecture", icon: "layout", items: s.frontend },
      { key: "backend", title: "Backend, APIs & Security", icon: "server", items: s.backend },
      { key: "databases", title: "Databases & Cloud Storage", icon: "database", items: s.databases },
      { key: "devopsAndTools", title: "Tools, DevOps & Monorepos", icon: "tool", items: s.devopsAndTools },
      { key: "coreEngineering", title: "Core CS & Engineering", icon: "cpu", items: s.coreEngineering }
    ];

    container.innerHTML = categories.map(cat => `
      <div class="skill-category-card">
        <div class="skill-cat-header">
          <div class="skill-cat-icon">
            ${getIconSvg(cat.icon)}
          </div>
          <h4 class="skill-cat-title">${cat.title}</h4>
        </div>

        <div class="skill-items-list">
          ${cat.items.map(item => `
            <div class="skill-row">
              <div class="skill-info">
                <span class="skill-name">${item.name}</span>
                <span class="skill-pct">${item.tag ? item.tag : `${item.level}%`}</span>
              </div>
              <div class="skill-progress-track">
                <div class="skill-progress-bar" style="width: ${item.level}%;"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  /**
   * Render Experience Timeline
   */
  function renderExperience() {
    const container = document.getElementById("experience-timeline");
    if (!container) return;

    container.innerHTML = PORTFOLIO_DATA.experience.map(exp => `
      <div class="timeline-node">
        <span class="timeline-marker"></span>
        <div class="timeline-card">
          <div class="timeline-header">
            <h4 class="timeline-role">${escapeHtml(exp.role)}</h4>
            <span class="timeline-org">${escapeHtml(exp.company)} — ${escapeHtml(exp.location)}</span>
            <span class="timeline-period">${escapeHtml(exp.period)}</span>
          </div>

          <div class="tech-pills" style="margin-bottom:12px;">
            ${exp.techStack.map(t => `<span class="tech-pill glow">${escapeHtml(t)}</span>`).join('')}
          </div>

          <ul class="timeline-bullets">
            ${exp.bullets.map(b => `<li class="timeline-bullet">${escapeHtml(b)}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');
  }

  /**
   * Render Education
   */
  function renderEducation() {
    const container = document.getElementById("education-timeline");
    if (!container) return;

    container.innerHTML = PORTFOLIO_DATA.education.map(edu => `
      <div class="timeline-node">
        <span class="timeline-marker"></span>
        <div class="timeline-card">
          <div class="timeline-header">
            <h4 class="timeline-role">${escapeHtml(edu.degree)}</h4>
            <span class="timeline-org">${escapeHtml(edu.institution)}</span>
            <span class="timeline-period">${escapeHtml(edu.period)}</span>
          </div>
          <span class="score-badge">${escapeHtml(edu.score)}</span>
          <p class="timeline-body" style="margin-top:10px;">${escapeHtml(edu.description)}</p>
        </div>
      </div>
    `).join('');
  }

  /**
   * Render Achievements
   */
  function renderAchievements() {
    const container = document.getElementById("achievements-container");
    if (!container) return;

    container.innerHTML = PORTFOLIO_DATA.achievements.map(ach => `
      <div class="achievement-card">
        <div class="achievement-icon">
          ${getIconSvg(ach.icon)}
        </div>
        <div>
          <h4 class="achievement-title">${escapeHtml(ach.title)}</h4>
          <div class="achievement-platform">${escapeHtml(ach.platform)}</div>
          <p class="achievement-desc">${escapeHtml(ach.description)}</p>
        </div>
      </div>
    `).join('');
  }

  /**
   * Project Deep Dive Modal Logic
   */
  function openProjectModal(repoName) {
    const repo = allRepositories.find(r => r.name === repoName) || allRepositories[0];
    if (!repo) return;

    const modal = document.getElementById("project-modal");
    const content = document.getElementById("project-modal-content");
    if (!modal || !content) return;

    content.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:20px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
          <div>
            <span class="badge ${getBadgeClass(repo.complexityTier)}" style="margin-bottom:8px;">${escapeHtml(repo.complexityTier)}</span>
            <h2 style="font-size:1.8rem; font-weight:800; color:var(--text-primary);">${escapeHtml(repo.title || repo.name)}</h2>
            <div style="color:var(--accent-cyan); font-family:var(--font-mono); font-size:0.85rem; margin-top:4px;">
              ${escapeHtml(repo.category)} • Depth Score: ${repo.depthScore}/100
            </div>
          </div>
          <div style="display:flex; gap:10px;">
            <a href="${escapeHtml(repo.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              View on GitHub ↗
            </a>
            ${repo.demoUrl && repo.demoUrl !== repo.githubUrl ? `
              <a href="${escapeHtml(repo.demoUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
                Live Demo ↗
              </a>
            ` : ''}
          </div>
        </div>

        <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:18px;">
          <h4 style="font-size:0.85rem; font-family:var(--font-mono); color:var(--text-muted); text-transform:uppercase; margin-bottom:8px;">Overview & Engineering Problem</h4>
          <p style="color:#cbd5e1; font-size:0.95rem; line-height:1.7;">${escapeHtml(repo.description)}</p>
        </div>

        <div>
          <h4 style="font-size:0.85rem; font-family:var(--font-mono); color:var(--text-muted); text-transform:uppercase; margin-bottom:12px;">Architectural Highlights & Innovations</h4>
          <div style="display:flex; flex-direction:column; gap:10px;">
            ${(repo.highlights || []).map(h => `
              <div style="display:flex; align-items:flex-start; gap:12px; font-size:0.9rem; color:#e2e8f0; line-height:1.6;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:var(--accent-cyan); flex-shrink:0; margin-top:3px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>${escapeHtml(h)}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div>
          <h4 style="font-size:0.85rem; font-family:var(--font-mono); color:var(--text-muted); text-transform:uppercase; margin-bottom:10px;">Tech Stack & Frameworks</h4>
          <div class="tech-pills">
            ${(repo.techStack || []).map(t => `<span class="tech-pill glow">${escapeHtml(t)}</span>`).join('')}
          </div>
        </div>

        <div>
          <h4 style="font-size:0.85rem; font-family:var(--font-mono); color:var(--text-muted); text-transform:uppercase; margin-bottom:10px;">Architectural Patterns</h4>
          <div class="tech-pills">
            ${(repo.architectureTags || []).map(a => `<span class="tech-pill">${escapeHtml(a)}</span>`).join('')}
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:14px; background:rgba(0,0,0,0.3); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:16px;">
          <div>
            <span style="font-size:0.75rem; color:var(--text-muted); display:block;">Primary Language</span>
            <span style="font-weight:600; color:var(--text-primary);">${escapeHtml(repo.language || 'N/A')}</span>
          </div>
          <div>
            <span style="font-size:0.75rem; color:var(--text-muted); display:block;">Repository Size</span>
            <span style="font-weight:600; color:var(--text-primary);">~${Math.round(repo.sizeKb || 0)} KB</span>
          </div>
          <div>
            <span style="font-size:0.75rem; color:var(--text-muted); display:block;">Last Activity</span>
            <span style="font-weight:600; color:var(--accent-emerald);">${repo.relativeUpdated}</span>
          </div>
        </div>
      </div>
    `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  /**
   * Modal and Drawer Handlers
   */
  function setupModals() {
    const resumeModal = document.getElementById("resume-modal");
    const projectModal = document.getElementById("project-modal");
    const openResumeBtns = document.querySelectorAll(".btn-open-resume");
    const closeBtns = document.querySelectorAll(".modal-close-btn");

    openResumeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        renderResumeModalContent();
        resumeModal.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    closeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        if (resumeModal) resumeModal.classList.remove("active");
        if (projectModal) projectModal.classList.remove("active");
        document.body.style.overflow = "";
      });
    });

    [resumeModal, projectModal].forEach(m => {
      if (m) {
        m.addEventListener("click", (e) => {
          if (e.target === m) {
            m.classList.remove("active");
            document.body.style.overflow = "";
          }
        });
      }
    });

    // ESC key closes modals
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (resumeModal) resumeModal.classList.remove("active");
        if (projectModal) projectModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    // Print button inside resume modal
    const printBtn = document.getElementById("btn-print-resume");
    if (printBtn) {
      printBtn.addEventListener("click", () => {
        window.print();
      });
    }
  }

  /**
   * Renders the formatted printable resume inside modal
   */
  function renderResumeModalContent() {
    const container = document.getElementById("resume-modal-body");
    if (!container) return;

    const p = PORTFOLIO_DATA.personal;
    container.innerHTML = `
      <div class="resume-doc" id="printable-resume">
        <header class="resume-header">
          <h1 class="resume-name">${escapeHtml(p.name)}</h1>
          <div class="resume-tagline">• Software Developer •</div>
          <div class="resume-contact-bar">
            <span>${p.location}</span>
            <span>|</span>
            <span>${p.phone}</span>
            <span>|</span>
            <span>${p.email}</span>
            <span>|</span>
            <span>${p.linkedinUrl}</span>
            <span>|</span>
            <span>${p.githubUrl}</span>
          </div>
        </header>

        <section class="resume-sec">
          <h3 class="resume-sec-title">Professional Summary</h3>
          <p style="font-size:0.85rem; color:#334155; line-height:1.6;">${escapeHtml(p.summary)}</p>
        </section>

        <section class="resume-sec">
          <h3 class="resume-sec-title">Technical Skills</h3>
          <div style="font-size:0.83rem; line-height:1.6; color:#1e293b;">
            <p><strong>Programming Languages:</strong> JavaScript, TypeScript, Java, C++</p>
            <p><strong>Frontend Development:</strong> React.js, Next.js, Redux Toolkit, RTK Query, TanStack Query, HTML, CSS, Tailwind CSS, Bootstrap, Shadcn UI</p>
            <p><strong>Backend Development:</strong> Node.js, Express.js, Spring Boot, Spring Security, Hibernate/JPA, REST APIs, Socket.io, JWT, OAuth2</p>
            <p><strong>Databases:</strong> MongoDB (Mongoose), PostgreSQL, MySQL</p>
            <p><strong>Testing & Tools:</strong> Postman, Git, GitHub, Cloudinary, VS Code, Docker</p>
            <p><strong>Core Engineering:</strong> Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks</p>
          </div>
        </section>

        <section class="resume-sec">
          <h3 class="resume-sec-title">Professional Experience</h3>
          ${PORTFOLIO_DATA.experience.map(exp => `
            <div class="resume-item">
              <div class="resume-item-header">
                <span>${escapeHtml(exp.role)}</span>
                <span>${escapeHtml(exp.period)}</span>
              </div>
              <div class="resume-item-sub">${escapeHtml(exp.company)} — ${escapeHtml(exp.location)} | Stack: ${exp.techStack.join(', ')}</div>
              <ul class="resume-bullets">
                ${exp.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </section>

        <section class="resume-sec">
          <h3 class="resume-sec-title">Projects</h3>
          ${Object.values(PORTFOLIO_DATA.curatedProjects).filter(p => p.featured).map(proj => `
            <div class="resume-item">
              <div class="resume-item-header">
                <span>${escapeHtml(proj.title)}</span>
              </div>
              <div class="resume-item-sub">${proj.techStack.join(' · ')}</div>
              <ul class="resume-bullets">
                ${proj.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </section>

        <section class="resume-sec">
          <h3 class="resume-sec-title">Education</h3>
          ${PORTFOLIO_DATA.education.map(edu => `
            <div class="resume-item" style="margin-bottom:8px;">
              <div class="resume-item-header">
                <span>${escapeHtml(edu.institution)}</span>
                <span>${escapeHtml(edu.period.split('–')[1] || edu.period)}</span>
              </div>
              <div style="font-size:0.83rem; color:#475569;">${escapeHtml(edu.degree)} | <strong>${escapeHtml(edu.score)}</strong></div>
            </div>
          `).join('')}
        </section>

        <section class="resume-sec">
          <h3 class="resume-sec-title">Achievements</h3>
          <ul class="resume-bullets">
            ${PORTFOLIO_DATA.achievements.map(a => `<li><strong>${escapeHtml(a.title)}:</strong> ${escapeHtml(a.description)}</li>`).join('')}
          </ul>
        </section>
      </div>
    `;
  }

  /**
   * Contact Form Submission
   */
  function setupContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contact-name").value.trim();
      const email = document.getElementById("contact-email").value.trim();
      const subject = document.getElementById("contact-subject").value.trim();
      const message = document.getElementById("contact-message").value.trim();

      if (!name || !email || !message) {
        showToast("Please fill in all required fields!");
        return;
      }

      // Pre-fill a mailto trigger so the user can send directly
      const mailtoUrl = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${encodeURIComponent(subject || `Portfolio Inquiry from ${name}`)}&body=${encodeURIComponent(`Hi Mahesh,\n\n${message}\n\nFrom: ${name} (${email})`)}`;
      window.location.href = mailtoUrl;

      showToast("Drafted email to Mahesh Warpe! Thank you.");
      form.reset();
    });
  }

  /**
   * Navbar behavior
   */
  function setupNavbar() {
    const navbar = document.querySelector(".navbar");
    const mobileToggle = document.getElementById("mobile-menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });

    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show-mobile");
      });

      // Close mobile drawer when any link is tapped
      navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("show-mobile");
        });
      });
    }
  }

  /**
   * Toast notification helper
   */
  function showToast(message) {
    let toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <span>${escapeHtml(message)}</span>
    `;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3800);
  }

  // Helpers
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getBadgeClass(tier) {
    if (!tier) return "badge-fullstack";
    if (tier.includes("Enterprise") || tier.includes("Tier 1")) return "badge-saas";
    if (tier.includes("Real-Time") || tier.includes("Marketplace")) return "badge-realtime";
    if (tier.includes("AI") || tier.includes("Geospatial")) return "badge-ai";
    if (tier.includes("Backend") || tier.includes("Tier 3")) return "badge-backend";
    return "badge-fullstack";
  }

  function getLanguageColor(lang) {
    const map = {
      TypeScript: "#3178c6",
      JavaScript: "#f7df1e",
      Java: "#b07219",
      HTML: "#e34c26",
      CSS: "#563d7c",
      Python: "#3572A5",
      "C++": "#f34b7d"
    };
    return map[lang] || "#06b6d4";
  }

  function getIconSvg(name) {
    const svgs = {
      code: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
      award: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`,
      "git-branch": `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>`,
      layers: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
      layout: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`,
      server: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`,
      database: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`,
      tool: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
      cpu: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
      star: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
      rocket: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>`
    };
    return svgs[name] || svgs.code;
  }
});
