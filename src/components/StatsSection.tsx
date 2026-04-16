'use client';

export default function StatsSection() {
  const stats = [
    { value: '$500M+', label: 'Total Funded', sublabel: 'Across all products' },
    { value: '10,000+', label: 'Businesses Funded', sublabel: 'Since 2018' },
    { value: '24hrs', label: 'Average Funding Speed', sublabel: 'For qualified applicants' },
    { value: '95%', label: 'Approval Rate', sublabel: 'After pre-qualification' },
  ];

  return (
    <section className="relative py-20 overflow-hidden" id="how-it-works">
      <div className="absolute inset-0 bg-slate-925" />
      <div className="absolute inset-0 noise" />
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(51,141,255,0.3), transparent 60%)',
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-brand-400 text-sm font-semibold uppercase tracking-wider">Trusted Nationwide</span>
          <h2 className="font-display text-4xl md:text-5xl text-white mt-3 mb-4">
            Numbers that speak for themselves
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            We&apos;ve helped thousands of business owners access the capital they need to grow.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative group bg-white/[0.04] border border-white/[0.06] rounded-2xl p-6 md:p-8 hover:bg-white/[0.07] transition-all duration-300"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-slate-300 mb-0.5">{stat.label}</div>
              <div className="text-xs text-slate-500">{stat.sublabel}</div>
            </div>
          ))}
        </div>

        {/* Trust logos */}
        <div className="mt-16 pt-12 border-t border-white/[0.06]">
          <p className="text-center text-xs text-slate-500 uppercase tracking-wider mb-8">
            Our lending network includes
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-40">
            {['Bluevine', 'OnDeck', 'Fundbox', 'Kabbage', 'LendingClub', 'Credibly'].map(name => (
              <span key={name} className="text-white text-lg font-display tracking-wide">{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
