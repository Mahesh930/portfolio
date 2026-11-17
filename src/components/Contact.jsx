import React, { useState } from 'react';
import { Mail, Phone, Linkedin, MapPin, Send } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Contact({ onShowToast }) {
  const { personal } = PORTFOLIO_DATA;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (onShowToast) onShowToast("Please fix the highlighted fields!");
      return;
    }

    setErrors({});

    const mailtoUrl = `mailto:${personal.email}?subject=${encodeURIComponent(
      formData.subject || `Portfolio Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Hi Mahesh,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
    )}`;

    window.location.href = mailtoUrl;

    if (onShowToast) onShowToast("Drafted email to Mahesh Warpe! Thank you.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const getInputClasses = (fieldName) => {
    const base = "w-full px-4 py-3 rounded-lg bg-white border text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all";
    return errors[fieldName]
      ? `${base} border-rose-400 focus:border-rose-500 focus:ring-rose-500`
      : `${base} border-slate-200`;
  };

  const contactMethods = [
    { label: 'Email', value: personal.email, href: `mailto:${personal.email}`, icon: Mail },
    { label: 'Phone', value: personal.phone, href: `tel:${personal.phone.replace(/[^0-9+]/g, '')}`, icon: Phone },
    { label: 'LinkedIn', value: 'in/mahesh-warpe-129605255', href: personal.linkedinUrl, icon: Linkedin },
    { label: 'Location', value: personal.location, href: null, icon: MapPin },
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-layout mx-auto px-4 sm:px-8">
        <div className="max-w-2xl mb-12 sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 mb-3">
            Contact
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Let&apos;s work together
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Open to full-time Software Developer, SDE, and Full-Stack roles. Reach out anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Contact Information Cards */}
          <div className="lg:col-span-5 space-y-4">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.label}
                  className="rounded-2xl glass-panel p-5 flex items-center gap-4 card-interactive hover:border-blue-400 group"
                >
                  <div className="w-11 h-11 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 group-hover:bg-sky-700 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                      {method.label}
                    </span>
                    {method.href ? (
                      <a
                        href={method.href}
                        target={method.href.startsWith('http') ? '_blank' : undefined}
                        rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-sm sm:text-base font-semibold text-slate-900 hover:text-sky-700 transition-colors truncate block"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <span className="text-sm sm:text-base font-semibold text-slate-900 block truncate">
                        {method.value}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Message Form */}
          <div className="lg:col-span-7 rounded-3xl glass-panel p-6 sm:p-9 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-semibold text-slate-700 block">
                    Your Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                    placeholder="e.g. Alex Morgan"
                    className={getInputClasses('name')}
                  />
                  {errors.name && <p className="text-rose-500 text-xs font-medium mt-0.5">{errors.name}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-semibold text-slate-700 block">
                    Your Work Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
                    placeholder="e.g. alex@company.com"
                    className={getInputClasses('email')}
                  />
                  {errors.email && <p className="text-rose-500 text-xs font-medium mt-0.5">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="text-xs font-semibold text-slate-700 block">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Role Discussion / Project Opportunity"
                  className={getInputClasses('subject')}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-semibold text-slate-700 block">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => { setFormData({ ...formData, message: e.target.value }); setErrors({ ...errors, message: '' }); }}
                  placeholder="Describe the opportunity or message you'd like to share..."
                  className={getInputClasses('message') + ' resize-y'}
                />
                {errors.message && <p className="text-rose-500 text-xs font-medium mt-0.5">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold hover:-translate-y-0.5 active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send Direct Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
