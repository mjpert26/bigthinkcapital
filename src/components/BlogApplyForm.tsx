"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const SilkWaves = dynamic(() => import("@/components/reactbits/SilkWaves"), { ssr: false });

export default function BlogApplyForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    monthlyRevenue: "",
    phone: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to Supabase leads table or CRM webhook
    setSubmitted(true);
  };

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#1d3bbb]/20 focus:border-[#1d3bbb] transition-all text-sm";

  return (
    <section className="relative overflow-hidden rounded-3xl my-16" id="blog-apply-now">
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-950/55" />

      <div className="relative z-10 px-6 sm:px-10 lg:px-14 py-14 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: Copy */}
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#fbbf24] text-xs font-semibold uppercase tracking-wider rounded-full mb-5">
              <span className="w-1.5 h-1.5 bg-[#fbbf24] rounded-full animate-pulse"></span>
              Apply Now
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white leading-[1.1] mb-5 tracking-tight">
              Ready to fund your<br />next chapter?
            </h2>
            <p className="text-base md:text-lg text-slate-200/90 mb-8 leading-relaxed max-w-md">
              Get matched with the best funding options in minutes. No hard credit pull. No obligation.
            </p>

            <div className="space-y-3 mb-8">
              {[
                "Free consultation with a funding specialist",
                "Multiple offers to compare side-by-side",
                "Funding in as fast as 24 hours",
                "Soft pull only — no impact to credit",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#10b981]/20 flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-200">{item}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div>
                <div className="font-display text-2xl text-white mb-1">$1B+</div>
                <div className="text-[11px] text-slate-300/70 uppercase tracking-wider">Funded</div>
              </div>
              <div>
                <div className="font-display text-2xl text-white mb-1">25K+</div>
                <div className="text-[11px] text-slate-300/70 uppercase tracking-wider">Businesses</div>
              </div>
              <div>
                <div className="font-display text-2xl text-white mb-1">4.9<span className="text-sm text-[#fbbf24]">★</span></div>
                <div className="text-[11px] text-slate-300/70 uppercase tracking-wider">Trustpilot</div>
              </div>
            </div>
          </div>

          {/* Right: White form card */}
          <div className="bg-white rounded-3xl p-7 md:p-9 shadow-2xl shadow-black/40">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#10b981]/30">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-[#0e2366] mb-2">You&apos;re all set!</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  A funding specialist will reach out within one business hour.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="font-display text-2xl text-[#0e2366] mb-1">Check Your Eligibility</h3>
                  <p className="text-sm text-neutral-500">Takes less than 2 minutes</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="b-name" className="block text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <input
                      id="b-name"
                      type="text"
                      required
                      placeholder="John Smith"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="b-biz" className="block text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-1.5">
                      Business Name
                    </label>
                    <input
                      id="b-biz"
                      type="text"
                      required
                      placeholder="Acme Corp"
                      value={form.businessName}
                      onChange={(e) => update("businessName", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="b-rev" className="block text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-1.5">
                      Monthly Revenue
                    </label>
                    <select
                      id="b-rev"
                      required
                      value={form.monthlyRevenue}
                      onChange={(e) => update("monthlyRevenue", e.target.value)}
                      className={inputClass + " appearance-none"}
                    >
                      <option value="">Select range</option>
                      <option value="under-10k">Under $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="100k-250k">$100,000 - $250,000</option>
                      <option value="250k+">$250,000+</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="b-phone" className="block text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-1.5">
                        Phone
                      </label>
                      <input
                        id="b-phone"
                        type="tel"
                        required
                        placeholder="(555) 123-4567"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="b-email" className="block text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-1.5">
                        Email
                      </label>
                      <input
                        id="b-email"
                        type="email"
                        required
                        placeholder="john@acme.com"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="group w-full py-4 bg-[#f59e0b] hover:bg-[#fbbf24] text-[#0e2366] font-bold rounded-xl transition-all shadow-lg shadow-[#f59e0b]/30 hover:shadow-[#f59e0b]/50 hover:-translate-y-0.5 mt-2 flex items-center justify-center gap-2"
                  >
                    Get My Funding Options
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                    <p className="text-xs text-neutral-400">256-bit SSL encrypted. Your data is safe.</p>
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
