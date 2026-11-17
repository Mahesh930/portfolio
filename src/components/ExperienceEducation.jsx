import React from 'react';
import { Briefcase, GraduationCap, Award, Star, Code, Rocket, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function ExperienceEducation() {
  const { experience, education, achievements } = PORTFOLIO_DATA;

  const achievementIcons = {
    Star: Star,
    Code: Code,
    Rocket: Rocket,
  };

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-layout mx-auto px-4 sm:px-8">
        <div className="max-w-2xl mb-12 sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 mb-3">
            Background
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Experience & education
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Industry internship experience with a strong computer engineering foundation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Work Experience Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-900">Work Experience</h3>
            </div>

            <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
              {experience.map((exp) => (
                <div key={exp.role} className="relative group">
                  {/* Timeline marker */}
                  <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-sm" />

                  <div className="rounded-2xl glass-panel p-6 space-y-3.5 card-interactive hover:border-blue-400">
                    <div>
                      <h4 className="font-bold text-base sm:text-lg text-slate-900">
                        {exp.role}
                      </h4>
                      <div className="text-blue-600 font-semibold text-xs sm:text-sm">
                        {exp.company} — {exp.location}
                      </div>
                      <div className="text-slate-500 font-mono text-xs mt-0.5">
                        {exp.period}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200/80 text-blue-700 font-mono text-[10px] shadow-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <ul className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-1" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div id="education" className="space-y-6">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-900">Academic Education</h3>
            </div>

            <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
              {education.map((edu) => (
                <div key={edu.degree} className="relative group">
                  {/* Timeline marker */}
                  <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm" />

                  <div className="rounded-2xl glass-panel p-6 space-y-3 card-interactive hover:border-blue-400">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <h4 className="font-bold text-base sm:text-lg text-slate-900">
                          {edu.degree}
                        </h4>
                        <div className="text-blue-600 font-semibold text-xs sm:text-sm">
                          {edu.institution}
                        </div>
                      </div>
                      <span className="text-slate-500 font-mono text-xs whitespace-nowrap">
                        {edu.period}
                      </span>
                    </div>

                    <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs font-semibold shadow-xs">
                      {edu.score}
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {achievements.map((ach) => {
            const Icon = achievementIcons[ach.icon] || Award;
            return (
              <div 
                key={ach.title}
                className="rounded-2xl glass-panel p-6 flex items-start gap-4 card-interactive hover:border-blue-400 group"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors">{ach.title}</h4>
                  <div className="text-blue-600 font-mono text-xs font-medium">{ach.platform}</div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{ach.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
