"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { Check, X } from "lucide-react";

const SilkWaves = dynamic(() => import("@/components/reactbits/SilkWaves"), { ssr: false });

const COMPARISON_FEATURES = [
  { name: "Funding in as little as 24 hours", btc: true, banks: false },
  { name: "Approval rates above 90%", btc: true, banks: false },
  { name: "Minimal paperwork required", btc: true, banks: false },
  { name: "No hard credit pull to apply", btc: true, banks: false },
  { name: "Funding options from $10K - $5M+", btc: true, banks: true },
  { name: "Multiple lenders, one application", btc: true, banks: false },
  { name: "Dedicated funding specialist", btc: true, banks: false },
  { name: "Weeks or months to close", btc: false, banks: true },
];

export default function ApplyNow() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden" id="apply-now">
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
      <div className="absolute inset-0 bg-slate-950/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Copy + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#fbbf24] text-xs font-semibold uppercase tracking-wider rounded-full mb-5">
              <span className="w-1.5 h-1.5 bg-[#fbbf24] rounded-full animate-pulse"></span>
              The Smarter Path to Capital
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6 tracking-tight">
              Big Think Capital <span className="text-[#fbbf24]">vs.</span> Traditional Banks
            </h2>
            <p className="text-lg text-slate-200/90 mb-8 leading-relaxed max-w-lg">
              Traditional banks reject 80% of small business loan applications. We built a better way &mdash; faster, more flexible, and designed for real businesses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/apply"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#f59e0b] hover:bg-[#fbbf24] text-[#0e2366] font-bold rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-[#f59e0b]/30 hover:shadow-[#f59e0b]/50"
              >
                Check Eligibility
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <a
                href="tel:844-200-7201"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Talk to Expert
              </a>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              {[
                { val: "$1B+", label: "Funded" },
                { val: "25,000+", label: "Businesses" },
                { val: "24hr", label: "Funding Speed" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl text-white mb-1">{s.val}</div>
                  <div className="text-xs text-slate-300/70 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Comparison table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/40 border border-white/20"
          >
            {/* Header row */}
            <div className="grid grid-cols-[1fr_100px_100px] md:grid-cols-[1fr_120px_120px] gap-2 pb-4 mb-4 border-b border-neutral-200">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Feature</div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-center"
              >
                <div className="text-xs font-bold text-[#0e2366] tracking-tight leading-tight">
                  Big Think<br />Capital
                </div>
                <div className="mt-1 h-1 w-8 bg-[#f59e0b] rounded-full mx-auto"></div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="text-center"
              >
                <div className="text-xs font-bold text-neutral-500 tracking-tight leading-tight">
                  Traditional<br />Banks
                </div>
                <div className="mt-1 h-1 w-8 bg-neutral-300 rounded-full mx-auto"></div>
              </motion.div>
            </div>

            {/* Rows */}
            <div className="space-y-1">
              {COMPARISON_FEATURES.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index + 0.3 }}
                  className="grid grid-cols-[1fr_100px_100px] md:grid-cols-[1fr_120px_120px] gap-2 items-center py-3 border-b border-neutral-100 last:border-0"
                >
                  <span className="text-sm font-medium text-neutral-800">{feature.name}</span>
                  <div className="flex justify-center">
                    {feature.btc ? (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center shadow-md shadow-[#10b981]/30">
                        <Check className="h-4 w-4 text-white" strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center">
                        <X className="h-4 w-4 text-neutral-400" strokeWidth={2.5} />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center">
                    {feature.banks ? (
                      <div className="w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center">
                        <Check className="h-4 w-4 text-neutral-500" strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center">
                        <X className="h-4 w-4 text-neutral-400" strokeWidth={2.5} />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <Link
                href="/apply"
                className="group flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-[#0e2366] to-[#1d3bbb] hover:from-[#1d3bbb] hover:to-[#3a68f5] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#0e2366]/20 hover:shadow-[#0e2366]/40"
              >
                See if You Qualify &mdash; 2 Minutes
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <div className="flex items-center justify-center gap-2 mt-3">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                <p className="text-xs text-neutral-500">No credit impact &middot; No obligation &middot; 256-bit SSL</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
