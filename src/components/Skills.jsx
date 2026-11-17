import React, { useEffect, useRef, useState } from 'react';
import { Code, Layout, Server, Database, Wrench, Cpu } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Skills() {
  const { skills } = PORTFOLIO_DATA;
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll-triggered animation for progress bars
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = [
    { key: 'languages', title: 'Programming Languages', icon: Code, items: skills.languages },
    { key: 'frontend', title: 'Frontend & UI Architecture', icon: Layout, items: skills.frontend },
    { key: 'backend', title: 'Backend, APIs & Security', icon: Server, items: skills.backend },
    { key: 'databases', title: 'Databases & Cloud Storage', icon: Database, items: skills.databases },
    { key: 'devopsAndTools', title: 'Tools, DevOps & Monorepos', icon: Wrench, items: skills.devopsAndTools },
    { key: 'coreEngineering', title: 'Core CS & Engineering', icon: Cpu, items: skills.coreEngineering },
  ];

  return (
    <section id="skills" className="py-20 relative" ref={sectionRef}>
      <div className="max-w-layout mx-auto px-4 sm:px-8">
        <div className="max-w-2xl mb-12 sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 mb-3">
            Skills
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Technology stack
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Frontend, backend, databases, and tooling used to ship production systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div 
                key={cat.key} 
                className="rounded-2xl glass-panel p-6 sm:p-7 card-interactive hover:border-blue-400 group"
              >
                <div className="flex items-center gap-3 border-b border-slate-200/80 pb-4 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 group-hover:bg-sky-700 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-sky-800 transition-colors">
                    {cat.title}
                  </h3>
                </div>

                <div className="space-y-3.5">
                  {cat.items.map((item) => (
                    <div key={item.name} className="space-y-1.5 group/item">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-slate-700 group-hover/item:text-slate-900 transition-colors">{item.name}</span>
                        <span className="text-sky-700 font-mono text-[11px]">
                          {item.tag ? item.tag : `${item.level}%`}
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200/80 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-slate-900 transition-all duration-1000 ease-out"
                          style={{ 
                            width: isVisible ? `${item.level}%` : '0%',
                            transitionDelay: isVisible ? '0.1s' : '0s'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
