import React from 'react';
import { 
  GitBranch, 
  FileText, 
  Github, 
  Linkedin, 
  Mail, 
  Code2, 
  Award, 
  Layers, 
  ArrowRight,
  MapPin
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Hero({ onOpenResume }) {
  const { personal, metrics } = PORTFOLIO_DATA;

  const iconMap = {
    Code2: Code2,
    Award: Award,
    GitBranch: GitBranch,
    Layers: Layers,
  };

  return (
    <header id="hero" className="relative overflow-hidden">
      {/* Atmospheric background plane */}
      <div className="absolute inset-0 -z-10 hero-atmosphere" aria-hidden="true" />

      <div className="max-w-layout mx-auto px-4 sm:px-8 pt-28 sm:pt-32 pb-10 sm:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center min-h-[min(72vh,720px)]">
          {/* Copy — brand first */}
          <div className="lg:col-span-7 space-y-6 animate-heroIn order-2 lg:order-1">
            <p className="text-sm font-medium tracking-wide text-sky-700 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {personal.statusText}
            </p>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {personal.role}
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05]">
                {personal.name}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                {personal.headline}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
              <span>{personal.location}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#flagship"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold hover:-translate-y-0.5 active:scale-[0.98] transition-all w-full sm:w-auto"
              >
                <GitBranch className="w-4 h-4" />
                View Projects
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/90 hover:bg-white text-slate-800 border border-slate-200 hover:border-slate-300 text-sm font-semibold hover:-translate-y-0.5 active:scale-[0.98] transition-all w-full sm:w-auto"
              >
                <FileText className="w-4 h-4" />
                View Resume
              </button>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-slate-700 hover:text-sky-700 text-sm font-medium transition-colors w-full sm:w-auto"
              >
                Get in touch
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href={personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white/70 text-xs font-medium transition-all"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white/70 text-xs font-medium transition-all"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href={`mailto:${personal.email}`}
                aria-label="Email"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white/70 text-xs font-medium transition-all"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
          </div>

          {/* Profile photo — dominant visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 animate-heroPhoto">
            <div className="relative">
              <div className="absolute -inset-6 sm:-inset-8 rounded-[2rem] bg-gradient-to-br from-sky-200/40 via-transparent to-slate-300/30 blur-2xl" aria-hidden="true" />
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-[1.75rem] overflow-hidden border border-white/80 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.25)] ring-1 ring-slate-900/5">
                <img
                  src={personal.avatarUrl}
                  alt={`${personal.name} — profile photo`}
                  width={320}
                  height={320}
                  className="w-full h-full object-cover object-top scale-105"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics — below hero fold */}
      <div className="border-t border-slate-200/80 bg-white/40 backdrop-blur-sm">
        <div className="max-w-layout mx-auto px-4 sm:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {metrics.map((metric) => {
              const Icon = iconMap[metric.icon] || Code2;
              return (
                <div key={metric.label} className="flex items-start gap-3.5 group">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 group-hover:bg-sky-700 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 tracking-tight">{metric.value}</div>
                    <div className="text-xs font-semibold text-slate-800">{metric.label}</div>
                    <div className="text-[11px] text-slate-500">{metric.subtext}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
