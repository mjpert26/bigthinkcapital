'use client';

const testimonials = [
  {
    quote: "Big Think Capital helped us secure $150,000 in working capital when our bank turned us away. The process was incredibly fast—we had funds in our account within 48 hours.",
    name: 'Jennifer Torres',
    role: 'Owner, Torres Landscaping',
    initials: 'JT',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    quote: "As a restaurant owner, cash flow is everything. Our line of credit through Big Think has been a game-changer for managing seasonal fluctuations and seizing opportunities.",
    name: 'Michael Okafor',
    role: 'Owner, Savory Kitchen',
    initials: 'MO',
    color: 'from-brand-400 to-blue-500',
  },
  {
    quote: "We used equipment financing to upgrade our entire production line. The monthly payments are predictable, and the tax benefits were a nice bonus. Highly recommend.",
    name: 'Rachel Kim',
    role: 'COO, PrecisionParts Manufacturing',
    initials: 'RK',
    color: 'from-violet-400 to-purple-500',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-brand-600 text-sm font-semibold uppercase tracking-wider">Testimonials</span>
          <h2 className="font-display text-4xl md:text-5xl text-slate-900 mt-3 mb-4">
            Real businesses, real results
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Hear from business owners who&apos;ve used Big Think Capital to fuel their growth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="card p-8 flex flex-col"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              <blockquote className="text-slate-600 leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold`}>
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
