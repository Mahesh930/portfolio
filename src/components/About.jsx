import React from 'react';
import { UserCheck, ShieldCheck, Zap, Server } from 'lucide-react';

export default function About() {
  const highlights = [
    { title: "Multi-Tenant Architectures", icon: Server, color: "text-blue-600" },
    { title: "WebSocket Real-Time Systems", icon: Zap, color: "text-blue-600" },
    { title: "Stateless JWT & RBAC Security", icon: ShieldCheck, color: "text-blue-600" },
    { title: "Database Query Optimizations", icon: UserCheck, color: "text-blue-600" },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-layout mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs uppercase tracking-wider mb-3 shadow-xs">
            Engineering Profile
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            About Mahesh Warpe
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Passionate full-stack developer dedicated to writing clean, maintainable, and high-throughput software systems.
          </p>
        </div>

        <div className="rounded-3xl glass-panel p-6 sm:p-10 card-interactive">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Story */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                Transforming complex business logic into rock-solid software architecture.
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                I am a Computer Engineering graduate from <strong className="text-slate-900">Savitribai Phule Pune University</strong> with extensive hands-on experience building production-grade web applications. My development ethos revolves around architectural scalability, transactional safety, and responsive user experiences.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                During my Web Operations Internship at <strong className="text-blue-600">TechGeekConnect Technologies</strong>, I engineered production modules for vehicle rentals and strengthened platform integrity through bot-filtering and robust authentication. Whether it is eliminating <strong className="text-slate-900">N+1 queries</strong> in Spring Boot using <code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 font-mono text-xs">JPQL JOIN FETCH</code> or preventing race conditions in MongoDB via <strong className="text-slate-900">Mongoose transactions</strong>, I focus deeply on the engineering fundamentals that make software reliable.
              </p>

              <div className="flex flex-wrap gap-2.5 pt-2">
                {highlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <span 
                      key={item.title}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/90 text-xs font-semibold text-slate-700 shadow-xs hover:border-blue-400 hover:text-blue-700 hover:bg-white hover:-translate-y-0.5 transition-all cursor-default"
                    >
                      <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                      <span>{item.title}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Quick Facts Sidebar */}
            <div className="lg:col-span-5 bg-slate-50/80 border border-slate-200 rounded-2xl p-5 sm:p-8 space-y-4 shadow-xs">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 border-b border-slate-200 pb-3">
                // Quick Engineering Facts
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm">
                <li className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                  <span className="text-slate-500">Current Base:</span>
                  <strong className="text-slate-900">Pune, Maharashtra, India</strong>
                </li>
                <li className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                  <span className="text-slate-500">Degree:</span>
                  <strong className="text-slate-900">B.E. Computer Engineering</strong>
                </li>
                <li className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                  <span className="text-slate-500">Core Ecosystem:</span>
                  <strong className="text-blue-600">Spring Boot 3 + MERN Stack</strong>
                </li>
                <li className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                  <span className="text-slate-500">GitHub Activity:</span>
                  <strong className="text-blue-700 font-semibold">17+ Live Public Repos</strong>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-500">Algorithmic Problem Solving:</span>
                  <strong className="text-blue-700 font-semibold">5-Star Gold HackerRank (400+)</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
