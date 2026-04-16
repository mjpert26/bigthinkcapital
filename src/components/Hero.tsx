'use client';

import dynamic from 'next/dynamic';

const AuroraBlur = dynamic(() => import('@/components/reactbits/AuroraBlur'), { ssr: false });
const StaggeredText = dynamic(() => import('@/components/reactbits/StaggeredText'), { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0">
        <AuroraBlur
          width="100%"
          height="100%"
          speed={0.8}
          brightness={0.5}
          saturation={1.2}
          noiseScale={4}
          movementX={-1.5}
          movementY={-2}
          verticalFade={0.8}
          bloomIntensity={2.2}
          layers={[
            { color: "#1a6df5", speed: 0.25, intensity: 0.45 },
            { color: "#338dff", speed: 0.12, intensity: 0.35 },
            { color: "#6366f1", speed: 0.18, intensity: 0.15 },
            { color: "#06b6d4", speed: 0.08, intensity: 0.2 },
          ]}
          skyLayers={[
            { color: "#0c1222", blend: 0.6 },
            { color: "#132757", blend: 0.4 },
          ]}
        />
      </div>
      <div className="absolute inset-0 noise" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6 opacity-0 animate-fade-in">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/10 backdrop-blur-sm rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-green-300">Now Funding</span>
            </div>
            <span className="text-sm text-blue-200/60">Trusted by 10,000+ businesses</span>
          </div>

          <div className="mb-6">
            <StaggeredText
              text="Small Business|Funding Made Simple"
              as="h1"
              segmentBy="words"
              separator="|"
              direction="top"
              delay={100}
              duration={0.7}
              blur={true}
              staggerDirection="forward"
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-white"
            />
          </div>

          <p className="text-lg md:text-xl text-blue-100/60 max-w-2xl leading-relaxed mb-10 opacity-0 animate-slide-up animate-delay-300">
            Fast approvals, flexible terms, and multiple funding options&mdash;from SBA loans
            to revenue-based financing. Get the capital your business needs in as little as 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14 opacity-0 animate-slide-up animate-delay-400">
            <a href="#apply-now" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-700 font-semibold rounded-xl hover:bg-blue-50 transition-all shadow-lg shadow-white/10 hover:-translate-y-0.5 text-base">
              Check Your Eligibility
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#funding-types" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/15 text-white font-medium rounded-xl hover:bg-white/5 transition-all text-base backdrop-blur-sm">
              Explore Options
            </a>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4 opacity-0 animate-slide-up animate-delay-500">
            {[
              { label: 'Decisions in 24 hours' },
              { label: 'No impact on credit to apply' },
              { label: '$500M+ funded' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5 text-sm text-blue-200/50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400">
                  <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" />
                </svg>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
