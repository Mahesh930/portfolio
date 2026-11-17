import React from 'react';
import { Server, Zap, ShieldCheck, Database } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function About() {
  const { personal } = PORTFOLIO_DATA;

  const highlights = [
    { title: "Multi-tenant architectures", icon: Server },
    { title: "Real-time WebSocket systems", icon: Zap },
    { title: "JWT & RBAC security", icon: ShieldCheck },
    { title: "Query optimization", icon: Database },
  ];

  return (
    <section id="about" className="py-20 sm:py-24 relative">
      <div className="max-w-layout mx-auto px-4 sm:px-8">
        <div className="max-w-2xl mb-12 sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 mb-3">
            About
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Engineer focused on reliable, scalable software
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Clean architecture, transactional safety, and interfaces people actually enjoy using.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-xs">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 shadow-lg shadow-slate-900/10">
                <img
                  src={personal.avatarUrl}
                  alt={personal.name}
                  width={400}
                  height={500}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 space-y-1 text-center lg:text-left">
                <p className="font-display font-bold text-lg text-slate-900">{personal.name}</p>
                <p className="text-sm text-slate-500">{personal.role} · {personal.location}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                I am a Computer Engineering graduate from{' '}
                <strong className="text-slate-900 font-semibold">Savitribai Phule Pune University</strong>{' '}
                with hands-on experience shipping production-style web applications across the MERN stack
                and Java/Spring Boot — including multi-tenant SaaS and real-time marketplaces.
              </p>
              <p>
                During my Web Operations internship at{' '}
                <strong className="text-sky-800 font-semibold">TechGeekConnect Technologies</strong>, I
                built production modules for vehicle rentals and hardened auth against bots and spam.
                Day to day I care about fundamentals: eliminating N+1 queries with{' '}
                <code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 font-mono text-xs">
                  JPQL JOIN FETCH
                </code>
                , preventing race conditions with Mongoose transactions, and keeping APIs secure and predictable.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-slate-200/90 hover:border-sky-300 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800">{item.title}</span>
                  </div>
                );
              })}
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 pt-4 border-t border-slate-200 text-sm">
              <div className="flex justify-between gap-4 sm:block sm:space-y-0.5">
                <dt className="text-slate-500">Degree</dt>
                <dd className="font-semibold text-slate-900">B.E. Computer Engineering</dd>
              </div>
              <div className="flex justify-between gap-4 sm:block sm:space-y-0.5">
                <dt className="text-slate-500">Stack focus</dt>
                <dd className="font-semibold text-slate-900">Spring Boot 3 + MERN</dd>
              </div>
              <div className="flex justify-between gap-4 sm:block sm:space-y-0.5">
                <dt className="text-slate-500">Problem solving</dt>
                <dd className="font-semibold text-slate-900">5★ HackerRank · 400+ solved</dd>
              </div>
              <div className="flex justify-between gap-4 sm:block sm:space-y-0.5">
                <dt className="text-slate-500">Open to</dt>
                <dd className="font-semibold text-slate-900">Full-time SDE roles</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
