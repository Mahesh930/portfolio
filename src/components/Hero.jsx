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
  Terminal
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Hero({ onOpenResume, repoCount = 17 }) {
  const { personal, metrics } = PORTFOLIO_DATA;

  const iconMap = {
    Code2: Code2,
    Award: Award,
    GitBranch: GitBranch,
    Layers: Layers,
  };

  return (
    <header id="hero" className="pt-28 sm:pt-36 pb-16 sm:pb-20 relative">
      <div className="max-w-layout mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-medium shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shadow-xs" />
              <span>{personal.statusText}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900">
              Hi, I'm <span className="text-gradient">{personal.name}</span>.<br />
              <span className="text-slate-800">{personal.role}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              {personal.headline}
            </p>

            {/* CTAs — consistent w-full sm:w-auto on all buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#github-work"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold shadow-sm shadow-blue-500/25 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all w-full sm:w-auto"
              >
                <GitBranch className="w-4 h-4" />
                <span>Explore Live GitHub Work</span>
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-300 hover:border-blue-300 text-sm font-semibold hover:-translate-y-0.5 active:scale-95 shadow-xs transition-all w-full sm:w-auto"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-slate-700 hover:text-blue-600 text-sm font-medium hover:bg-blue-50/70 border border-transparent hover:border-blue-100 transition-all w-full sm:w-auto text-center"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200">
              <a
                href={personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub profile: ${personal.githubUsername}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-700 text-xs font-mono shadow-xs hover:-translate-y-0.5 transition-all"
              >
                <Github className="w-3.5 h-3.5 text-blue-600" />
                <span>github.com/{personal.githubUsername}</span>
              </a>

              <a
                href={personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-700 text-xs font-mono shadow-xs hover:-translate-y-0.5 transition-all"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                <span>LinkedIn Profile</span>
              </a>

              <a
                href={`mailto:${personal.email}`}
                aria-label={`Email: ${personal.email}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-700 text-xs font-mono shadow-xs hover:-translate-y-0.5 transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>{personal.email}</span>
              </a>
            </div>
          </div>

          {/* Cyber Terminal Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-800 bg-[#0d121f] shadow-xl overflow-hidden card-interactive group">
              <div className="flex items-center justify-between px-4 py-3 bg-white/[0.05] border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/90" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/90" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  <span>mahesh@developer:~$</span>
                </div>
              </div>

              <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed space-y-3">
                <div>
                  <span className="text-emerald-400">$ </span>
                  <span className="text-slate-100">curl -s api.github.com/users/{personal.githubUsername}</span>
                </div>

                <div className="pl-3 border-l-2 border-blue-500/40 text-slate-300 space-y-1 text-xs">
                  <p className="text-slate-400">&#123;</p>
                  <p className="pl-3"><span className="text-sky-300">"engineer"</span>: <span className="text-amber-300">"{personal.name}"</span>,</p>
                  <p className="pl-3"><span className="text-sky-300">"role"</span>: <span className="text-amber-300">"{personal.role}"</span>,</p>
                  <p className="pl-3"><span className="text-sky-300">"location"</span>: <span className="text-amber-300">"{personal.location}"</span>,</p>
                  <p className="pl-3"><span className="text-sky-300">"coreStack"</span>: [</p>
                  <p className="pl-6 text-blue-300">"Java 17", "Spring Boot 3", "Next.js", "MERN", "PostgreSQL", "Socket.io"</p>
                  <p className="pl-3">],</p>
                  <p className="pl-3"><span className="text-sky-300">"publicRepos"</span>: <span className="text-emerald-400">{repoCount}</span>,</p>
                  <p className="pl-3"><span className="text-sky-300">"problemSolving"</span>: <span className="text-amber-300">"5-Star HackerRank • 400+ Solved"</span></p>
                  <p className="text-slate-400">&#125;</p>
                </div>

                <div className="pt-1">
                  <span className="text-emerald-400">$ </span>
                  <span className="text-slate-100">git status --live-sync</span>
                  <span className="terminal-cursor" aria-hidden="true" />
                  <p className="text-emerald-400 text-xs mt-1">✔ Auto-discovers every newly pushed repository in real-time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Counter Strip */}
        <div className="mt-12 sm:mt-16 p-4 sm:p-6 rounded-2xl glass-panel grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => {
            const Icon = iconMap[metric.icon] || Code2;
            const isLast = i === metrics.length - 1;
            return (
              <div 
                key={metric.label}
                className={`flex items-center gap-4 px-3 py-2 rounded-xl transition-all duration-300 hover:bg-blue-50/50 hover:scale-[1.02] cursor-default ${
                  !isLast ? 'lg:border-r lg:border-slate-200' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 shrink-0 shadow-xs transition-transform duration-300 hover:rotate-3">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-xs font-semibold text-slate-800">{metric.label}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{metric.subtext}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}
