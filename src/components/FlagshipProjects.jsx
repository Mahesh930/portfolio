import React from 'react';
import { ExternalLink, Github, CheckCircle2, BookOpen, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function FlagshipProjects({ projects = [], onOpenProjectModal }) {
  // Use live API data if available, otherwise fallback to curated data
  let flagships = projects.filter(p => p.featured || p.depthScore >= 88).slice(0, 4);

  // Fallback: if API hasn't loaded yet, build from curatedProjects
  if (flagships.length === 0) {
    const curated = PORTFOLIO_DATA.curatedProjects || {};
    flagships = Object.entries(curated)
      .filter(([_, p]) => p.featured)
      .map(([name, p]) => ({
        name,
        title: p.title,
        category: p.category,
        complexityTier: p.complexity,
        depthScore: p.depthScore,
        description: p.description,
        highlights: p.highlights || [],
        techStack: p.techStack || [],
        architectureTags: p.architectureTags || [],
        githubUrl: p.githubUrl,
        demoUrl: p.demoUrl,
        featured: true,
      }))
      .slice(0, 4);
  }

  const getBadgeColor = (tier = '') => {
    if (tier.includes('Enterprise') || tier.includes('Tier 1')) {
      return 'bg-blue-50 border-blue-200 text-blue-700';
    }
    if (tier.includes('Real-Time') || tier.includes('Marketplace')) {
      return 'bg-sky-50 border-sky-200 text-sky-700';
    }
    if (tier.includes('AI') || tier.includes('Geospatial')) {
      return 'bg-indigo-50 border-indigo-200 text-indigo-700';
    }
    if (tier.includes('Backend') || tier.includes('Tier 3')) {
      return 'bg-amber-50 border-amber-200 text-amber-700';
    }
    return 'bg-emerald-50 border-emerald-200 text-emerald-700';
  };

  return (
    <section id="flagship" className="py-20 relative">
      <div className="max-w-layout mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs uppercase tracking-wider mb-3 shadow-xs">
            Flagship Engineering
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Featured Production & SaaS Projects
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Architecturally sophisticated applications built with enterprise multi-tenancy, real-time sync, and distributed design patterns.
          </p>
        </div>

        {flagships.length > 0 ? (
          <div className="space-y-8">
            {flagships.map((project) => (
              <article 
                key={project.name}
                className="rounded-3xl glass-panel p-6 sm:p-9 card-interactive hover:border-blue-400 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left/Main Column */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className={`px-2.5 py-1 rounded-full border text-[11px] font-mono font-semibold uppercase tracking-wider shadow-xs ${getBadgeColor(project.complexityTier)}`}>
                        {project.complexityTier}
                      </span>
                      <span className="px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50 text-[11px] font-mono text-slate-600 shadow-xs">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {project.description}
                    </p>

                    <div className="space-y-2 pt-1">
                      {project.highlights.map((h, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-normal">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      <button
                        onClick={() => onOpenProjectModal(project)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-blue-500/25 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Architecture Deep Dive</span>
                      </button>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-300 hover:border-blue-300 text-xs sm:text-sm font-medium hover:-translate-y-0.5 active:scale-95 shadow-xs transition-all"
                      >
                        <Github className="w-4 h-4" />
                        <span>View Code</span>
                      </a>

                      {project.demoUrl && project.demoUrl !== project.githubUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 hover:text-blue-600 text-xs sm:text-sm font-medium hover:bg-blue-50/70 border border-transparent hover:border-blue-100 transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Architecture & Depth Meter */}
                  <div className="lg:col-span-5 bg-slate-50/90 border border-slate-200 rounded-2xl p-5 sm:p-7 space-y-5 shadow-xs">
                    {/* Depth Meter */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-slate-500 uppercase font-mono tracking-wider text-[11px]">Architectural Depth</span>
                        <span className="text-blue-600 font-mono font-bold">{project.depthScore} / 100</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-blue-600 transition-all duration-700"
                          style={{ width: `${project.depthScore}%` }}
                        />
                      </div>
                    </div>

                    {/* Core Tech Stack */}
                    <div className="space-y-2">
                      <span className="text-slate-500 uppercase font-mono tracking-wider text-[10px] block">Core Tech Stack</span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span 
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-blue-700 font-mono text-[11px] shadow-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Architecture Tags */}
                    <div className="space-y-2">
                      <span className="text-slate-500 uppercase font-mono tracking-wider text-[10px] block">Key Paradigms</span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.architectureTags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-mono text-[11px] shadow-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-500 space-y-2 rounded-3xl glass-panel">
            <Sparkles className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-base font-semibold text-slate-800">Loading Featured Projects...</h4>
            <p className="text-xs">Synchronizing with GitHub API for the latest project data.</p>
          </div>
        )}
      </div>
    </section>
  );
}
