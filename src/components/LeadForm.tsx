'use client';

import { useState } from 'react';

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', businessName: '', monthlyRevenue: '', phone: '', email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" id="lead-form">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-100/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left copy */}
          <div>
            <span className="text-brand-600 text-sm font-semibold uppercase tracking-wider">Get Started</span>
            <h2 className="font-display text-4xl md:text-5xl text-slate-900 mt-3 mb-5">
              See what you qualify for
            </h2>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              Fill out this quick form and one of our funding specialists will reach out with your
              personalized options. No obligation, no impact on your credit score.
            </p>

            <div className="space-y-5">
              {[
                { icon: 'M9 12l2 2 4-4', label: 'Free, no-obligation consultation' },
                { icon: 'M9 12l2 2 4-4', label: 'See multiple funding options at once' },
                { icon: 'M9 12l2 2 4-4', label: 'Dedicated funding specialist assigned' },
                { icon: 'M9 12l2 2 4-4', label: 'Soft credit check only — no impact to your score' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <span className="text-slate-600">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8 md:p-10">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-slate-900 mb-2">You&apos;re all set!</h3>
                <p className="text-slate-500">A funding specialist will reach out within 1 business hour with your personalized options.</p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl text-slate-900 mb-1">Check Your Eligibility</h3>
                <p className="text-sm text-slate-400 mb-7">Takes less than 2 minutes</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                    <input
                      id="name" type="text" required placeholder="John Smith"
                      value={form.name} onChange={e => update('name', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-slate-700 mb-1.5">Business Name</label>
                    <input
                      id="businessName" type="text" required placeholder="Acme Corp"
                      value={form.businessName} onChange={e => update('businessName', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="revenue" className="block text-sm font-medium text-slate-700 mb-1.5">Monthly Revenue</label>
                    <select
                      id="revenue" required
                      value={form.monthlyRevenue} onChange={e => update('monthlyRevenue', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all appearance-none"
                    >
                      <option value="">Select range</option>
                      <option value="10k-25k">$10,000 – $25,000</option>
                      <option value="25k-50k">$25,000 – $50,000</option>
                      <option value="50k-100k">$50,000 – $100,000</option>
                      <option value="100k-250k">$100,000 – $250,000</option>
                      <option value="250k+">$250,000+</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                      <input
                        id="phone" type="tel" required placeholder="(555) 123-4567"
                        value={form.phone} onChange={e => update('phone', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                      <input
                        id="email" type="email" required placeholder="john@acme.com"
                        value={form.email} onChange={e => update('email', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-primary w-full !py-4 text-base mt-2">
                    Get My Funding Options
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                  <p className="text-xs text-center text-slate-400 mt-3">
                    By submitting, you agree to our Terms of Service and Privacy Policy. No hard credit pull required.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
