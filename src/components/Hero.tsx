'use client';

import dynamic from 'next/dynamic';

const StaggeredText = dynamic(() => import('@/components/reactbits/StaggeredText'), { ssr: false });

export default function Hero() {
  return (
    <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-brand-50/20 to-white" />
      <div className="absolute inset-0 noise" />
      <div className="absolute top-10 right-[15%] w-[400px] h-[400px] bg-brand-100/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-50 border border-brand-100 rounded-full">
              <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
              <span className="text-xs font-semibold text-brand-700">Big Think Capital</span>
            </div>
            <span className="text-sm text-slate-400">Business Funding Resources</span>
          </div>

          <StaggeredText
            text="Small Business Funding|Guides & Resources"
            as="h1"
            segmentBy="words"
            separator="|"
            direction="top"
            delay={80}
            duration={0.6}
            blur={true}
            staggerDirection="forward"
            className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-slate-900"
          />

          <p className="text-lg text-slate-500 mt-5 max-w-2xl leading-relaxed">
            Expert guides on SBA loans, revenue-based financing, equipment funding, and more.
            Helping business owners make smarter funding decisions.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-slate-100">
            {[
              { val: '$500M+', label: 'funded' },
              { val: '10,000+', label: 'businesses helped' },
              { val: '24hr', label: 'average funding speed' },
            ].map(s => (
              <div key={s.label} className="flex items-baseline gap-1.5">
                <span className="font-display text-lg text-slate-900">{s.val}</span>
                <span className="text-sm text-slate-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
