"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

type FormData = {
  // Step 1
  fundingAmount: string;
  fundingUse: string;
  // Step 2
  timeInBusiness: string;
  monthlyRevenue: string;
  industry: string;
  // Step 3
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
};

const INITIAL: FormData = {
  fundingAmount: "",
  fundingUse: "",
  timeInBusiness: "",
  monthlyRevenue: "",
  industry: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  businessName: "",
};

const FUNDING_AMOUNTS = [
  "$10K - $50K",
  "$50K - $150K",
  "$150K - $500K",
  "$500K - $1M",
  "$1M+",
];

const FUNDING_USES = [
  { icon: "inventory", label: "Inventory / Equipment" },
  { icon: "hire", label: "Hiring / Payroll" },
  { icon: "expand", label: "Expansion / New Location" },
  { icon: "marketing", label: "Marketing / Advertising" },
  { icon: "cash", label: "Cash Flow / Working Capital" },
  { icon: "other", label: "Other" },
];

const TIME_IN_BUSINESS = [
  "Less than 6 months",
  "6 - 12 months",
  "1 - 2 years",
  "2 - 5 years",
  "5+ years",
];

const MONTHLY_REVENUE = [
  "Under $10K",
  "$10K - $25K",
  "$25K - $50K",
  "$50K - $100K",
  "$100K - $250K",
  "$250K+",
];

const INDUSTRIES = [
  "Retail",
  "Restaurant / Food",
  "Construction",
  "Healthcare",
  "Professional Services",
  "E-commerce",
  "Transportation",
  "Manufacturing",
  "Other",
];

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const update = (field: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const canAdvance = () => {
    if (step === 1) return data.fundingAmount && data.fundingUse;
    if (step === 2) return data.timeInBusiness && data.monthlyRevenue && data.industry;
    if (step === 3)
      return data.firstName && data.lastName && data.email && data.phone && data.businessName;
    return false;
  };

  const eligibilityScore = () => {
    let score = 0;
    if (data.fundingAmount) score += 15;
    if (data.fundingUse) score += 10;
    if (data.timeInBusiness) {
      const idx = TIME_IN_BUSINESS.indexOf(data.timeInBusiness);
      score += idx >= 2 ? 25 : idx * 10;
    }
    if (data.monthlyRevenue) {
      const idx = MONTHLY_REVENUE.indexOf(data.monthlyRevenue);
      score += Math.min(idx * 5 + 10, 25);
    }
    if (data.industry) score += 10;
    if (data.firstName && data.lastName) score += 5;
    if (data.email && data.phone) score += 10;
    return Math.min(score, 98);
  };

  const submit = async () => {
    // In production this would POST to a lead capture endpoint
    // For now just show the success state
    setSubmitted(true);
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Minimal top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0e2366] to-[#1d3bbb] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="font-display text-lg text-[#0e2366] tracking-tight">Big Think Capital</span>
          </Link>
          <div className="flex items-center gap-6">
            <a href="tel:844-200-7201" className="hidden md:flex items-center gap-2 text-sm text-neutral-600 hover:text-[#1d3bbb] transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <span className="font-medium">844-200-7201</span>
            </a>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-500">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              <span>Secure application</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main split layout */}
      <div className="pt-16 min-h-screen grid lg:grid-cols-[480px_1fr]">
        {/* LEFT: Brand panel (dark) */}
        <aside className="hidden lg:flex flex-col justify-between bg-[#0e2366] text-white p-12 relative overflow-hidden sticky top-16 h-[calc(100vh-4rem)]">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#1d3bbb]/40 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#f59e0b]/10 blur-3xl"></div>
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "24px 24px"
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/30 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-pulse"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#fbbf24]">Pre-qualify in 2 minutes</span>
            </div>

            <h1 className="font-display text-4xl xl:text-5xl leading-[1.05] mb-6 tracking-tight">
              Get the capital your business deserves.
            </h1>

            <p className="text-blue-100/80 text-lg leading-relaxed max-w-sm">
              No impact to your credit score. No obligation. Real offers from real lenders &mdash; in minutes, not weeks.
            </p>
          </div>

          {/* Testimonial */}
          <div className="relative z-10 py-8">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-sm text-blue-50 leading-relaxed italic mb-4">
                &ldquo;Funded in 36 hours when every bank had turned us down. The team walked me through every option &mdash; no pressure, just answers.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center text-[#0e2366] font-bold text-sm">
                  MR
                </div>
                <div>
                  <div className="text-sm font-semibold">Maria Rodriguez</div>
                  <div className="text-xs text-blue-200/60">Owner, Rodriguez Construction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust strip */}
          <div className="relative z-10">
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-white/10">
              <div>
                <div className="font-display text-2xl text-white">$1B+</div>
                <div className="text-[11px] text-blue-200/60 uppercase tracking-wider mt-1">Funded</div>
              </div>
              <div>
                <div className="font-display text-2xl text-white">25K+</div>
                <div className="text-[11px] text-blue-200/60 uppercase tracking-wider mt-1">Businesses</div>
              </div>
              <div>
                <div className="font-display text-2xl text-white">4.9<span className="text-base text-[#fbbf24]">&#9733;</span></div>
                <div className="text-[11px] text-blue-200/60 uppercase tracking-wider mt-1">Trustpilot</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-200/50">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              256-bit SSL &middot; SOC 2 compliant &middot; Your data is never sold
            </div>
          </div>
        </aside>

        {/* RIGHT: Form panel */}
        <main className="p-6 sm:p-10 lg:p-16 flex flex-col">
          {!submitted && (
            <>
              {/* Mobile-only header (hides on lg) */}
              <div className="lg:hidden mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/30 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse"></span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#92400e]">Pre-qualify in 2 minutes</span>
                </div>
                <h1 className="font-display text-3xl text-[#0e2366] leading-tight tracking-tight">
                  Get the capital your business deserves.
                </h1>
              </div>

              {/* Progress */}
              <div className="max-w-xl w-full mx-auto mb-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-neutral-500">
                    Step <span className="font-semibold text-[#0e2366]">{step}</span> of 3
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-neutral-500">Eligibility estimate</span>
                    <span className="font-bold text-[#0e2366] tabular-nums">
                      {mounted ? eligibilityScore() : 0}%
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0e2366] via-[#1d3bbb] to-[#f59e0b] transition-all duration-500 ease-out"
                    style={{ width: mounted ? eligibilityScore() + "%" : "0%" }}
                  />
                </div>
              </div>

              {/* Form steps */}
              <div className="max-w-xl w-full mx-auto flex-1">
                {/* STEP 1 */}
                {step === 1 && (
                  <div className="animate-fade-in">
                    <div className="mb-8">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#f59e0b] mb-2">Funding Details</div>
                      <h2 className="font-display text-3xl text-[#0e2366] mb-2 tracking-tight">How much funding do you need?</h2>
                      <p className="text-neutral-500">Select the range that best fits your business needs.</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
                      {FUNDING_AMOUNTS.map((amt) => (
                        <button
                          key={amt}
                          onClick={() => update("fundingAmount", amt)}
                          className={
                            "px-4 py-4 rounded-xl border-2 text-sm font-semibold transition-all duration-200 " +
                            (data.fundingAmount === amt
                              ? "border-[#0e2366] bg-[#0e2366] text-white shadow-lg shadow-[#0e2366]/20 scale-[1.02]"
                              : "border-neutral-200 bg-white text-neutral-700 hover:border-[#1d3bbb] hover:text-[#1d3bbb]")
                          }
                        >
                          {amt}
                        </button>
                      ))}
                    </div>

                    <div className="mb-8">
                      <label className="text-sm font-semibold text-[#0e2366] mb-3 block">What will you use it for?</label>
                      <div className="grid grid-cols-2 gap-3">
                        {FUNDING_USES.map((use) => (
                          <button
                            key={use.label}
                            onClick={() => update("fundingUse", use.label)}
                            className={
                              "px-4 py-3 rounded-xl border-2 text-sm font-medium text-left transition-all duration-200 " +
                              (data.fundingUse === use.label
                                ? "border-[#f59e0b] bg-[#f59e0b]/5 text-[#0e2366]"
                                : "border-neutral-200 bg-white text-neutral-600 hover:border-[#f59e0b]/50")
                            }
                          >
                            {use.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div className="animate-fade-in">
                    <div className="mb-8">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#f59e0b] mb-2">About Your Business</div>
                      <h2 className="font-display text-3xl text-[#0e2366] mb-2 tracking-tight">Tell us about your business.</h2>
                      <p className="text-neutral-500">This helps us match you with the right lenders.</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-semibold text-[#0e2366] mb-3 block">Time in business</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {TIME_IN_BUSINESS.map((t) => (
                            <button
                              key={t}
                              onClick={() => update("timeInBusiness", t)}
                              className={
                                "px-3 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 " +
                                (data.timeInBusiness === t
                                  ? "border-[#0e2366] bg-[#0e2366] text-white"
                                  : "border-neutral-200 bg-white text-neutral-700 hover:border-[#1d3bbb]")
                              }
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-[#0e2366] mb-3 block">Average monthly revenue</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {MONTHLY_REVENUE.map((r) => (
                            <button
                              key={r}
                              onClick={() => update("monthlyRevenue", r)}
                              className={
                                "px-3 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 " +
                                (data.monthlyRevenue === r
                                  ? "border-[#0e2366] bg-[#0e2366] text-white"
                                  : "border-neutral-200 bg-white text-neutral-700 hover:border-[#1d3bbb]")
                              }
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-[#0e2366] mb-3 block">Industry</label>
                        <select
                          value={data.industry}
                          onChange={(e) => update("industry", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 bg-white text-neutral-700 font-medium focus:border-[#1d3bbb] focus:outline-none transition-colors"
                        >
                          <option value="">Select your industry...</option>
                          {INDUSTRIES.map((i) => (
                            <option key={i} value={i}>{i}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div className="animate-fade-in">
                    <div className="mb-8">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#f59e0b] mb-2">Final Step</div>
                      <h2 className="font-display text-3xl text-[#0e2366] mb-2 tracking-tight">Where should we send your offers?</h2>
                      <p className="text-neutral-500">We&apos;ll reach out within 10 minutes with your matched lenders.</p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-neutral-600 mb-1.5 block uppercase tracking-wider">First Name</label>
                          <input
                            type="text"
                            value={data.firstName}
                            onChange={(e) => update("firstName", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 bg-white text-neutral-900 focus:border-[#1d3bbb] focus:outline-none transition-colors"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-neutral-600 mb-1.5 block uppercase tracking-wider">Last Name</label>
                          <input
                            type="text"
                            value={data.lastName}
                            onChange={(e) => update("lastName", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 bg-white text-neutral-900 focus:border-[#1d3bbb] focus:outline-none transition-colors"
                            placeholder="Smith"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-neutral-600 mb-1.5 block uppercase tracking-wider">Business Name</label>
                        <input
                          type="text"
                          value={data.businessName}
                          onChange={(e) => update("businessName", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 bg-white text-neutral-900 focus:border-[#1d3bbb] focus:outline-none transition-colors"
                          placeholder="Smith Enterprises LLC"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-neutral-600 mb-1.5 block uppercase tracking-wider">Email</label>
                        <input
                          type="email"
                          value={data.email}
                          onChange={(e) => update("email", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 bg-white text-neutral-900 focus:border-[#1d3bbb] focus:outline-none transition-colors"
                          placeholder="john@smithenterprises.com"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-neutral-600 mb-1.5 block uppercase tracking-wider">Phone</label>
                        <input
                          type="tel"
                          value={data.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 bg-white text-neutral-900 focus:border-[#1d3bbb] focus:outline-none transition-colors"
                          placeholder="(555) 123-4567"
                        />
                      </div>

                      <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-100 text-xs text-neutral-600 leading-relaxed">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5 text-[#1d3bbb]">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                          <path d="M7 11V7a5 5 0 0110 0v4"/>
                        </svg>
                        <span>
                          By clicking submit, you agree to our <a href="/privacy" className="text-[#1d3bbb] underline">Privacy Policy</a> and <a href="/terms" className="text-[#1d3bbb] underline">Terms of Service</a>. We&apos;ll never sell your information. No impact to your credit score.
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Nav buttons */}
                <div className="flex items-center justify-between mt-10 gap-4">
                  {step > 1 ? (
                    <button
                      onClick={prev}
                      className="inline-flex items-center gap-2 px-6 py-3 text-neutral-600 font-semibold hover:text-[#0e2366] transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                      </svg>
                      Back
                    </button>
                  ) : <div />}

                  {step < 3 ? (
                    <button
                      onClick={next}
                      disabled={!canAdvance()}
                      className="group inline-flex items-center gap-2 px-8 py-4 bg-[#0e2366] hover:bg-[#1d3bbb] disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-[#0e2366]/20 hover:shadow-[#0e2366]/40 hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"
                    >
                      Continue
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={submit}
                      disabled={!canAdvance()}
                      className="group inline-flex items-center gap-2 px-8 py-4 bg-[#f59e0b] hover:bg-[#fbbf24] disabled:bg-neutral-300 disabled:cursor-not-allowed text-[#0e2366] font-bold rounded-xl transition-all shadow-lg shadow-[#f59e0b]/30 hover:shadow-[#f59e0b]/50 hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"
                    >
                      See My Offers
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </>
          )}

          {/* SUCCESS */}
          {submitted && (
            <div className="max-w-xl w-full mx-auto flex-1 flex flex-col justify-center animate-fade-in">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] mx-auto mb-6 flex items-center justify-center shadow-lg shadow-[#10b981]/30">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#10b981] mb-2">Application Received</div>
                <h2 className="font-display text-4xl text-[#0e2366] mb-4 tracking-tight">You&apos;re pre-qualified, {data.firstName}.</h2>
                <p className="text-neutral-600 text-lg leading-relaxed mb-8 max-w-md mx-auto">
                  One of our funding experts will call you at <span className="font-semibold text-[#0e2366]">{data.phone}</span> within 10 minutes with your matched offers.
                </p>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0e2366] to-[#1d3bbb] text-white mb-8 text-left">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#fbbf24] mb-3">What happens next</div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                      <div className="text-sm text-blue-50">We match you with 3-5 lenders based on your profile</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                      <div className="text-sm text-blue-50">A funding expert calls to walk through your options</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                      <div className="text-sm text-blue-50">Funding can hit your account in as little as 24 hours</div>
                    </div>
                  </div>
                </div>

                <Link href="/" className="text-sm text-neutral-500 hover:text-[#1d3bbb] transition-colors">
                  &larr; Back to articles while you wait
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
