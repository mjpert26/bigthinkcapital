'use client';

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900" />
      <div className="absolute inset-0 noise" />
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.15), transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(59,130,246,0.3), transparent 50%)',
      }} />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-5 leading-tight">
          Ready to grow your business?
        </h2>
        <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-xl mx-auto">
          Join 10,000+ business owners who&apos;ve used Big Think Capital to access the funding they need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/apply" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-700 font-semibold rounded-xl hover:bg-blue-50 transition-all shadow-lg shadow-brand-900/30 hover:-translate-y-0.5 text-base">
            Check Your Eligibility
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="tel:+18005551234" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-all text-base">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Call (800) 555-1234
          </a>
        </div>
      </div>
    </section>
  );
}

