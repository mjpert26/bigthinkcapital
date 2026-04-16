'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const SilkWaves = dynamic(() => import('@/components/reactbits/SilkWaves'), { ssr: false });

export default function ApplyNow() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', businessName: '', monthlyRevenue: '', phone: '', email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const inputClass = "w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all text-sm";

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden" id="apply-now">
      {/* SilkWaves background */}
      <div className="absolute inset-0">
        <SilkWaves
          speed={0.8}
          scale={2.5}
          distortion={0.8}
          curve={0.9}
          brightness={0.55}
          opacity={1}
          colors={[
            "#060a14", "#0c1530", "#132757", "#1646b6",
            "#1a6df5", "#338dff", "#59b0ff", "#8ecdff",
          ]}
        />
      </div>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-slate-950/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Copy */}
          <div>
            <span className="inline-block px-3 py-1.5 bg-brand-500/20 border border-brand-400/20 text-brand-300 text-xs font-semibold uppercase tracking-wider rounded-full mb-5">
              Apply Now
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-5">
              Ready to fund<br />your next chapter?
            </h2>
            <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-lg">
              Tell us about your business and get matched with the best funding options in minutes.
              No hard credit pull. No obligation.
            </p>

            <div className="space-y-4 mb-10">
              {[
                'Free consultation with a funding specialist',
                'Multiple offers to compare side-by-side',
                'Funding in as fast as 24 hours',
                'Soft pull only — no impact to your credit score',
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-300">{item}</span>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex gap-8">
              {[
                { val: '$500M+', label: 'Funded' },
                { val: '10,000+', label: 'Businesses' },
                { val: '95%', label: 'Approval Rate' },
              ].map(s => (
                <div key={s.label}>
                  <div className="font-display text-2xl text-white">{s.val}</div>
                  <div className="text-xs text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: SOLID white form card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/30">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-slate-900 mb-2">You&apos;re all set!</h3>
                <p className="text-slate-500 text-sm">A funding specialist will reach out within 1 business hour.</p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl text-slate-900 mb-1">Check Your Eligibility</h3>
                <p className="text-sm text-slate-400 mb-7">Takes less than 2 minutes</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="a-name" className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                    <input id="a-name" type="text" required placeholder="John Smith" value={form.name} onChange={e => update('name', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="a-biz" className="block text-sm font-medium text-slate-700 mb-1.5">Business Name</label>
                    <input id="a-biz" type="text" required placeholder="Acme Corp" value={form.businessName} onChange={e => update('businessName', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="a-rev" className="block text-sm font-medium text-slate-700 mb-1.5">Monthly Revenue</label>
                    <select id="a-rev" required value={form.monthlyRevenue} onChange={e => update('monthlyRevenue', e.target.value)} className={`${inputClass} appearance-none`}>
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
                      <label htmlFor="a-phone" className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                      <input id="a-phone" type="tel" required placeholder="(555) 123-4567" value={form.phone} onChange={e => update('phone', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="a-email" className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                      <input id="a-email" type="email" required placeholder="john@acme.com" value={form.email} onChange={e => update('email', e.target.value)} className={inputClass} />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40 hover:-translate-y-0.5 mt-2 flex items-center justify-center gap-2">
                    Get My Funding Options
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                    <p className="text-xs text-center text-slate-400">256-bit SSL encrypted. Your data is safe.</p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
