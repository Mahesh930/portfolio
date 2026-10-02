import React, { useState, useEffect, useCallback } from 'react';
import { FileText, Menu, X } from 'lucide-react';

export default function Navbar({ repoCount = 17, onOpenResume }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'flagship', 'github-work', 'experience', 'education', 'contact'];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'About', href: '#about', section: 'about' },
    { name: 'Skills', href: '#skills', section: 'skills' },
    { name: 'Projects', href: '#flagship', section: 'flagship' },
    { name: 'Repositories', href: '#github-work', section: 'github-work' },
    { name: 'Experience', href: '#experience', section: 'experience' },
    { name: 'Education', href: '#education', section: 'education' },
    { name: 'Contact', href: '#contact', section: 'contact' },
  ];

  const isActive = useCallback((section) => {
    return activeSection === section;
  }, [activeSection]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-sm py-3 border-b border-slate-200/80' 
        : 'bg-white/75 backdrop-blur-sm py-4 border-b border-slate-200/50'
    }`}>
      <div className="max-w-layout mx-auto px-4 sm:px-8 w-full flex items-center justify-between">
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-base shadow-sm shadow-blue-500/25 border border-white/30 transition-transform group-hover:scale-105">
            MW
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-lg text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
              Mahesh Warpe
            </span>
            <span className="text-[10px] font-mono font-semibold tracking-wider text-blue-600">
              FULL-STACK DEVELOPER
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  isActive(link.section)
                    ? 'text-blue-600 bg-blue-50/80 font-semibold'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/70'
                }`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Live Sync Pill */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs shadow-xs whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shadow-xs" />
            <span>GitHub: {repoCount} Repos Synced</span>
          </div>

          {/* Desktop/Tablet Resume Action (hidden on small devices) */}
          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold shadow-sm hover:shadow active:scale-95 transition-all whitespace-nowrap"
          >
            <FileText className="w-4 h-4" />
            <span>View Resume</span>
          </button>

          {/* Mobile Menu Toggle (3 lines / hamburger) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with Transition */}
      <div
        className={`lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl overflow-hidden transition-all duration-300 ease-out ${
          mobileMenuOpen
            ? 'max-h-[600px] opacity-100 py-4'
            : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="px-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.section)
                  ? 'text-blue-600 bg-blue-50/80 font-semibold'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/70'
              }`}
            >
              {link.name}
            </a>
          ))}

          {/* Mobile Resume Button (inside hamburger drawer) */}
          <div className="pt-2 sm:hidden border-t border-slate-200/80 mt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold shadow-sm active:scale-98 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>View Resume</span>
            </button>
          </div>

          <div className="pt-2 sm:hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs w-full justify-center">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>GitHub: {repoCount} Repos Synced</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
