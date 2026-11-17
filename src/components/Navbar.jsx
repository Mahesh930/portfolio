import React, { useState, useEffect, useCallback } from 'react';
import { FileText, Menu, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Navbar({ repoCount = 17, onOpenResume }) {
  const { personal } = PORTFOLIO_DATA;
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
    { name: 'Contact', href: '#contact', section: 'contact' },
  ];

  const isActive = useCallback((section) => {
    return activeSection === section;
  }, [activeSection]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-sm py-2.5 border-b border-slate-200/80' 
        : 'bg-transparent py-4 border-b border-transparent'
    }`}>
      <div className="max-w-layout mx-auto px-4 sm:px-8 w-full flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 group">
          <img
            src={personal.avatarUrl}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover object-top ring-2 ring-white shadow-sm group-hover:ring-sky-200 transition-all"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-display font-bold text-base sm:text-lg text-slate-900 tracking-tight group-hover:text-sky-800 transition-colors">
              {personal.name}
            </span>
            <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-500">
              {personal.role}
            </span>
          </div>
        </a>

        <ul className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                  isActive(link.section)
                    ? 'text-sky-800 bg-sky-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <div className="hidden md:inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900/5 text-slate-600 font-mono text-[11px] whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {repoCount} repos
          </div>

          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold active:scale-95 transition-all whitespace-nowrap"
          >
            <FileText className="w-4 h-4" />
            Resume
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-lg bg-white/80 text-slate-700 hover:bg-white border border-slate-200 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl overflow-hidden transition-all duration-300 ease-out ${
          mobileMenuOpen
            ? 'max-h-[600px] opacity-100 py-4'
            : 'max-h-0 opacity-0 py-0 border-transparent'
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
                  ? 'text-sky-800 bg-sky-50 font-semibold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </a>
          ))}

          <div className="pt-2 sm:hidden border-t border-slate-200/80 mt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-all"
            >
              <FileText className="w-4 h-4" />
              View Resume
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
