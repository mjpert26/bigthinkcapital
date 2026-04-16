'use client';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-brand-50/30 to-white" />
      <div className="absolute inset-0 noise" />
      
      {/* Decorative orbs */}
      <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-brand-200/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-10 left-[5%] w-[400px] h-[400px] bg-blue-200/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6 opacity-0 animate-fade-in">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-green-700">Now Funding</span>
            </div>
            <span className="text-sm text-slate-500">Trusted by 10,000+ businesses</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-slate-900 mb-6 opacity-0 animate-slide-up animate-delay-100">
            Small Business Funding{' '}
            <span className="gradient-text italic">Made Simple</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed mb-10 opacity-0 animate-slide-up animate-delay-200">
            Fast approvals, flexible terms, and multiple funding options—from SBA loans 
            to revenue-based financing. Get the capital your business needs in as little as 24 hours.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-14 opacity-0 animate-slide-up animate-delay-300">
            <a href="#lead-form" className="btn-primary text-base !py-4 !px-8">
              Check Your Eligibility
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#funding-types" className="btn-secondary text-base !py-4 !px-8">
              Explore Options
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 opacity-0 animate-slide-up animate-delay-400">
            {[
              { icon: '⚡', label: 'Decisions in 24 hours' },
              { icon: '🛡️', label: 'No impact on credit to apply' },
              { icon: '💰', label: '$500M+ funded' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5 text-sm text-slate-600">
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
