import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-100/80 py-12">
      <div className="max-w-layout mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm shadow-sm shadow-blue-500/20">
              MW
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">Mahesh Warpe</div>
              <div className="text-slate-500 font-mono text-[11px]">Software Developer • Pune, India</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs text-slate-600">
            <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
            <a href="#skills" className="hover:text-blue-600 transition-colors">Skills</a>
            <a href="#flagship" className="hover:text-blue-600 transition-colors">Projects</a>
            <a href="#github-work" className="hover:text-blue-600 transition-colors">Repositories</a>
            <a href="#experience" className="hover:text-blue-600 transition-colors">Experience</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-slate-500">
          <span>© 2026 Mahesh Warpe. Built with React.js, Tailwind CSS, and Live GitHub Sync.</span>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium transition-colors active:scale-95"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
