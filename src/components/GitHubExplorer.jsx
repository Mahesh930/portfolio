import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Search, RefreshCw, FolderGit2, ExternalLink, Layers, Sparkles } from 'lucide-react';

export default function GitHubExplorer({ 
  repositories = [], 
  onRefresh, 
  isRefreshing = false, 
  lastSynced, 
  isLive = false,
  onOpenProjectModal 
}) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedLang, setSelectedLang] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [sortBy, setSortBy] = useState('depth');
  const debounceRef = useRef(null);

  // Debounce search input (300ms)
  const handleSearchChange = useCallback((value) => {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(value);
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const langColorMap = {
    TypeScript: '#3178c6',
    JavaScript: '#f7df1e',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    'C++': '#f34b7d',
  };

  const filteredRepositories = useMemo(() => {
    let result = [...repositories];

    // Search query (using debounced value)
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase().trim();
      result = result.filter(r => 
        (r.name && r.name.toLowerCase().includes(q)) ||
        (r.title && r.title.toLowerCase().includes(q)) ||
        (r.description && r.description.toLowerCase().includes(q)) ||
        (r.language && r.language.toLowerCase().includes(q)) ||
        (r.techStack && r.techStack.some(t => t.toLowerCase().includes(q))) ||
        (r.architectureTags && r.architectureTags.some(a => a.toLowerCase().includes(q)))
      );
    }

    // Language filter
    if (selectedLang !== 'all') {
      result = result.filter(r => {
        const lang = (r.language || '').toLowerCase();
        if (selectedLang === 'typescript') return lang === 'typescript';
        if (selectedLang === 'javascript') return lang === 'javascript';
        if (selectedLang === 'java') return lang === 'java';
        if (selectedLang === 'web') return lang === 'html' || lang === 'css';
        return true;
      });
    }

    // Complexity tier filter
    if (selectedTier !== 'all') {
      result = result.filter(r => {
        if (selectedTier === 'tier1') return r.depthScore >= 90;
        if (selectedTier === 'tier2') return r.depthScore >= 80 && r.depthScore < 90;
        if (selectedTier === 'tier3') return r.depthScore >= 70 && r.depthScore < 80;
        if (selectedTier === 'tier4') return r.depthScore < 70;
        return true;
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'depth') return b.depthScore - a.depthScore;
      if (sortBy === 'recent') return new Date(b.updatedAt) - new Date(a.updatedAt);
      if (sortBy === 'stars') return (b.stars + b.forks) - (a.stars + a.forks);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [repositories, debouncedSearch, selectedLang, selectedTier, sortBy]);

  return (
    <section id="github-work" className="py-20 relative">
      <div className="max-w-layout mx-auto px-4 sm:px-8">
        <div className="max-w-2xl mb-12 sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 mb-3">
            GitHub
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Live repositories
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Synced from{' '}
            <a href="https://github.com/Mahesh930" target="_blank" rel="noopener noreferrer" className="text-sky-700 font-semibold hover:underline">
              @Mahesh930
            </a>
            . New repos are categorized by language and architectural depth.
          </p>
        </div>

        <div className="rounded-3xl glass-panel p-5 sm:p-8 space-y-6">
          {/* Controls Top Bar: Search, Status, Refresh */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search by name, technology, or pattern..."
                aria-label="Search repositories"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs transition-all"
              />
            </div>

            <div className="flex items-center justify-between md:justify-end gap-3.5">
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-blue-700 block">
                  {repositories.length} Repositories Synced
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {isLive ? 'Live API Connected' : 'Cached Sync'}
                </span>
              </div>

              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                aria-label="Sync repositories from GitHub"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-600 text-xs font-mono shadow-xs hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Sync GitHub</span>
              </button>
            </div>
          </div>

          {/* Filter Pills Row */}
          <div className="space-y-3">
            {/* Language Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full min-w-0">
              <span className="text-xs font-mono text-slate-500 shrink-0 mr-1">Language:</span>
              {[
                { id: 'all', label: 'All' },
                { id: 'typescript', label: 'TypeScript' },
                { id: 'javascript', label: 'JavaScript' },
                { id: 'java', label: 'Java' },
                { id: 'web', label: 'HTML / CSS' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setSelectedLang(pill.id)}
                  aria-pressed={selectedLang === pill.id}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    selectedLang === pill.id
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-blue-50 shadow-xs active:scale-95'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Complexity Tier Pills & Sort Selector */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full min-w-0">
                <span className="text-xs font-mono text-slate-500 shrink-0 mr-1">Tier:</span>
                {[
                  { id: 'all', label: 'All' },
                  { id: 'tier1', label: 'T1: Enterprise' },
                  { id: 'tier2', label: 'T2: Full-Stack' },
                  { id: 'tier3', label: 'T3: Backend' },
                  { id: 'tier4', label: 'T4: UI/Tools' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    aria-pressed={selectedTier === tier.id}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      selectedTier === tier.id
                        ? 'bg-blue-600 text-white font-semibold shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-blue-50 shadow-xs active:scale-95'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort repositories"
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-mono focus:outline-none focus:border-blue-500 shadow-xs transition-all shrink-0 cursor-pointer"
              >
                <option value="depth" className="bg-white text-slate-900">Sort: Complexity Depth</option>
                <option value="recent" className="bg-white text-slate-900">Sort: Recently Pushed</option>
                <option value="stars" className="bg-white text-slate-900">Sort: Activity & Stars</option>
                <option value="name" className="bg-white text-slate-900">Sort: Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Repos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pt-3">
            {filteredRepositories.map((repo) => {
              const langColor = langColorMap[repo.language] || '#2563eb';
              return (
                <div
                  key={repo.name}
                  className={`rounded-2xl border bg-white p-4 sm:p-5 flex flex-col justify-between gap-4 card-interactive group shadow-xs hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 overflow-hidden ${
                    repo.featured ? 'border-l-4 border-l-blue-600 border-slate-200' : 'border-slate-200'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FolderGit2 className="w-4 h-4 text-blue-600 shrink-0 group-hover:scale-110 transition-transform" />
                        <h4 className="font-bold text-sm sm:text-base text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                          {repo.title || repo.name}
                        </h4>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-[10px] font-semibold shrink-0">
                        {repo.depthScore}/100
                      </span>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                      {repo.description}
                    </p>

                    {/* Depth Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono text-slate-500">
                        <span>Complexity</span>
                        <span>{repo.depthScore}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-blue-600 transition-all duration-700"
                          style={{ width: `${repo.depthScore}%` }}
                        />
                      </div>
                    </div>

                    {/* Paradigm Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(repo.architectureTags || []).slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-600 font-mono text-[10px] shadow-2xs hover:border-blue-300 hover:text-blue-700 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-slate-100 text-xs font-mono">
                    <div className="flex items-center gap-2 text-slate-500 text-[11px] min-w-0">
                      <span
                        className="w-2 h-2 rounded-full shrink-0 shadow-2xs"
                        style={{ backgroundColor: langColor }}
                      />
                      <span className="truncate">{repo.language || 'Code'}</span>
                      <span className="opacity-40">•</span>
                      <span className="shrink-0">{repo.relativeUpdated}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-auto sm:ml-0">
                      <button
                        onClick={() => onOpenProjectModal(repo)}
                        className="px-2.5 py-1 rounded-md bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 text-[11px] shadow-xs active:scale-95 transition-all font-medium"
                      >
                        Details
                      </button>
                      <a
                        href={repo.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-md bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-[11px] shadow-xs active:scale-95 transition-all inline-flex items-center gap-1 font-medium"
                      >
                        <span>GitHub</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredRepositories.length === 0 && (
            <div className="text-center py-16 text-slate-500 space-y-2">
              <Sparkles className="w-8 h-8 text-slate-400 mx-auto" />
              <h4 className="text-base font-semibold text-slate-800">No Repositories Match Filters</h4>
              <p className="text-xs">Try adjusting your search keywords or resetting language/tier filters.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
