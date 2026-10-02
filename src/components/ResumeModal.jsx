import React, { useEffect, useRef } from 'react';
import { X, Printer } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Body scroll lock + Escape key + Focus trap
  useEffect(() => {
    if (!isOpen) return;

    // Store the currently focused element to restore on close
    previousActiveElement.current = document.activeElement;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Escape key handler
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // Focus trap
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

    // Focus the modal container
    setTimeout(() => modalRef.current?.focus(), 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus
      previousActiveElement.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { personal, skills, experience, education, achievements, curatedProjects } = PORTFOLIO_DATA;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/50 backdrop-blur-sm animate-fadeIn print-resume-container"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Resume Modal"
    >
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden animate-modalPop print-resume-inner outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80 print-hide">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-lg text-slate-900">Resume — {personal.name}</h3>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold shadow-sm active:scale-95 transition-all"
            >
              <Printer className="w-3.5 h-3.5 text-white" />
              <span>Print / Save PDF</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors"
            aria-label="Close resume modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Printable Resume */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-white text-slate-900 font-sans leading-relaxed selection:bg-slate-200 print-resume-body">
          <header className="text-center border-b-2 border-slate-900 pb-3 mb-5">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
              {personal.name}
            </h1>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              • Software Developer •
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600 mt-2 font-mono">
              <span>{personal.location}</span>
              <span>|</span>
              <span>{personal.phone}</span>
              <span>|</span>
              <span>{personal.email}</span>
              <span>|</span>
              <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" className="text-blue-700 underline font-medium hover:text-blue-900">
                LinkedIn
              </a>
              <span>|</span>
              <a href={personal.githubUrl} target="_blank" rel="noreferrer" className="text-blue-700 underline font-medium hover:text-blue-900">
                GitHub
              </a>
            </div>
          </header>

          {/* Professional Summary */}
          <section className="mb-5">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-xs text-slate-700 leading-normal text-justify">
              {personal.summary}
            </p>
          </section>

          {/* Technical Skills */}
          <section className="mb-5">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
              Technical Skills
            </h2>
            <div className="text-xs space-y-1 text-slate-800">
              <p><strong>Programming Languages:</strong> JavaScript, TypeScript, Java, C++</p>
              <p><strong>Frontend Development:</strong> React.js, Next.js, Redux Toolkit, RTK Query, TanStack Query, HTML, CSS, Tailwind CSS, Bootstrap, Shadcn UI</p>
              <p><strong>Backend Development:</strong> Node.js, Express.js, Spring Boot, Spring Security, Hibernate/JPA, REST APIs, Socket.io, JWT, OAuth2</p>
              <p><strong>Databases:</strong> MongoDB (Mongoose), PostgreSQL, MySQL</p>
              <p><strong>Testing & Tools:</strong> Postman, Git, GitHub, Cloudinary, VS Code, Docker</p>
              <p><strong>Core Engineering:</strong> Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks</p>
            </div>
          </section>

          {/* Professional Experience */}
          <section className="mb-5">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
              Professional Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.role} className="space-y-1 mb-3">
                <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                  <span>{exp.role}</span>
                  <span className="font-mono text-[11px] text-slate-600">{exp.period}</span>
                </div>
                <div className="text-[11px] text-slate-600 italic">
                  {exp.company} — {exp.location} | Stack: {exp.techStack.join(', ')}
                </div>
                <ul className="list-disc pl-4 text-xs text-slate-700 space-y-1">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Projects */}
          <section className="mb-5">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
              Projects
            </h2>
            {Object.values(curatedProjects).filter(p => p.featured).map((proj) => (
              <div key={proj.title} className="mb-3 space-y-1">
                <div className="text-xs font-bold text-slate-900">
                  {proj.title}
                </div>
                <div className="text-[11px] font-mono text-slate-600">
                  {proj.techStack.join(' · ')}
                </div>
                <ul className="list-disc pl-4 text-xs text-slate-700 space-y-0.5">
                  {proj.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Education */}
          <section className="mb-5">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.institution} className="flex justify-between items-start text-xs">
                  <div>
                    <strong className="text-slate-900">{edu.institution}</strong>
                    <div className="text-slate-700">{edu.degree} | <strong>{edu.score}</strong></div>
                  </div>
                  <span className="font-mono text-[11px] text-slate-600 shrink-0">
                    {edu.period.split('–')[1] || edu.period}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements */}
          <section>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
              Achievements
            </h2>
            <ul className="list-disc pl-4 text-xs text-slate-700 space-y-1">
              {achievements.map((ach) => (
                <li key={ach.title}>
                  <strong>{ach.title}:</strong> {ach.description}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
