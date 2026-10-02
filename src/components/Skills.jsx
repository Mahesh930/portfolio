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
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs uppercase tracking-wider mb-3 shadow-xs">
            Technical Competence
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Skills & Technology Stack
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Comprehensive toolset spanning frontend engineering, scalable backend services, databases, and DevOps.
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
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 shrink-0 shadow-xs group-hover:scale-105 group-hover:bg-blue-100 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cat.title}
                  </h3>
                </div>

                <div className="space-y-3.5">
                  {cat.items.map((item) => (
                    <div key={item.name} className="space-y-1.5 group/item">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-slate-700 group-hover/item:text-slate-900 transition-colors">{item.name}</span>
                        <span className="text-blue-600 font-mono text-[11px]">
                          {item.tag ? item.tag : `${item.level}%`}
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200/80 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-blue-600 transition-all duration-1000 ease-out"
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
