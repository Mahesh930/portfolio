import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Cpu, HardDrive, Calendar } from 'lucide-react';

export default function ProjectModal({ project, isOpen, onClose }) {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Body scroll lock + Escape key + Focus trap
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl?.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    setTimeout(() => modalRef.current?.focus(), 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previousActiveElement.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Project details: ${project.title || project.name}`}
    >
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden animate-modalPop text-slate-800 outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <h3 className="font-bold text-base sm:text-lg text-slate-900">Project Architecture Deep Dive</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Title & Actions */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 pb-4 border-b border-slate-200">
            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-semibold shadow-xs">
                {project.complexityTier}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                {project.title || project.name}
              </h2>
              <div className="text-xs sm:text-sm font-mono text-blue-600 font-semibold">
                {project.category} • Depth Score: {project.depthScore} / 100
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold shadow-sm shadow-blue-500/20 hover:shadow active:scale-95 transition-all"
              >
                <span>GitHub</span>
                <Github className="w-3.5 h-3.5" />
              </a>
              {project.demoUrl && project.demoUrl !== project.githubUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-300 hover:border-blue-300 text-xs font-semibold shadow-xs active:scale-95 transition-all"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Overview */}
          <div className="rounded-2xl bg-slate-50/80 border border-slate-200 p-5 space-y-2 shadow-xs">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
              System Overview & Problem Solved
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Architectural Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Architectural Highlights & Engineering Decisions
            </h4>
            <div className="space-y-2">
              {(project.highlights || []).map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-normal">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Technologies & Frameworks
            </h4>
            <div className="flex flex-wrap gap-2">
              {(project.techStack || []).map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-medium shadow-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Architecture Paradigms */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Architectural Paradigms
            </h4>
            <div className="flex flex-wrap gap-2">
              {(project.architectureTags || []).map((a) => (
                <span
                  key={a}
                  className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700 font-mono text-xs shadow-xs"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-3 gap-3 rounded-2xl bg-slate-50 border border-slate-200 p-4 text-xs font-mono shadow-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">Language</span>
              <span className="text-slate-800 font-semibold">{project.language || 'N/A'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Codebase Size</span>
              <span className="text-slate-800 font-semibold">~{Math.round(project.sizeKb || 0)} KB</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Last Activity</span>
              <span className="text-emerald-700 font-semibold">{project.relativeUpdated}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
