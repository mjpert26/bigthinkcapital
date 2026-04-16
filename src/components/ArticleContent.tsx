'use client';

export default function ArticleContent() {
  return (
    <section className="relative py-16 md:py-24" id="funding-types">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_340px] gap-12 xl:gap-16">
          {/* Main article */}
          <article className="article-content max-w-none">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold tracking-wide uppercase rounded-full mb-4">
                Complete Guide
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-slate-900 leading-[1.05] mb-4">
                How to Get Small Business Funding in 2026
              </h1>
              <p className="text-lg text-slate-400">Updated April 2026 &middot; 12 min read</p>
            </div>

            <p>
              Securing the right funding can be the difference between a business that thrives and one that stalls.
              Whether you&apos;re launching a new venture, managing seasonal cash flow, or ready to expand,
              understanding your options is the first step toward smart growth.
            </p>
            <p>
              In this guide, we break down every major funding option available to small business owners in 2026,
              including qualification requirements, timelines, and how to choose the right solution for your needs.
            </p>

            {/* Types of Business Funding */}
            <h2 id="types">Types of Business Funding</h2>
            <p>
              The small business funding landscape has never been more diverse. From government-backed SBA loans
              to flexible revenue-based financing, today&apos;s entrepreneurs have access to a wide range of capital
              solutions tailored to different needs and stages of growth.
            </p>
            <ul>
              <li>SBA loans for long-term, low-rate financing</li>
              <li>Revenue-based financing for fast, flexible capital</li>
              <li>Equipment financing to spread the cost of major purchases</li>
              <li>Business lines of credit for ongoing working capital</li>
              <li>Invoice factoring to unlock cash tied up in receivables</li>
              <li>Commercial real estate loans for property purchases</li>
            </ul>

            {/* SBA Loans */}
            <h2 id="sba-loans">SBA Loans</h2>
            <p>
              SBA loans remain one of the most sought-after funding options for established businesses.
              Backed by the Small Business Administration, these loans are issued through approved lenders
              and offer some of the most competitive rates and longest repayment terms available.
            </p>
            <div className="callout-box">
              <h3 className="!mt-0 !mb-3 text-brand-900">SBA Loan Quick Facts</h3>
              <ul className="!mb-0">
                <li>Loan amounts up to $5 million (7(a) program)</li>
                <li>Interest rates typically 5.5%â€“8%</li>
                <li>Repayment terms up to 25 years for real estate</li>
                <li>Requires strong credit (680+ recommended)</li>
                <li>Processing time: 30â€“90 days</li>
              </ul>
            </div>
            <p>
              The SBA 7(a) program is the most common, offering general-purpose funding for working capital,
              equipment, and business acquisition. The 504 program is specifically designed for real estate
              and large equipment purchases.
            </p>

            {/* Inline CTA 1 */}
            <div className="inline-cta">
              <div className="relative z-10">
                <h3 className="!mt-0 !mb-2 text-white text-2xl">Not sure which option is right for you?</h3>
                <p className="!text-blue-100 !mb-5 max-w-lg">Our funding specialists can match you with the best product for your business in minutesâ€”not days.</p>
                <a href="/apply" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
                  See Your Options
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>

            {/* Revenue-Based Financing */}
            <h2 id="rbf">Revenue-Based Financing &amp; Merchant Cash Advances</h2>
            <p>
              Revenue-based financing (RBF) and merchant cash advances (MCAs) have transformed how small businesses
              access capital. Unlike traditional loans, approval is based primarily on your business&apos;s revenue
              rather than your personal credit score.
            </p>
            <p>
              With an MCA, you receive a lump sum of capital in exchange for a fixed percentage of future daily sales.
              Repayment is automatic and adjusts with your revenueâ€”when business is strong, you pay back faster;
              during slower periods, payments decrease proportionally.
            </p>
            <div className="callout-box">
              <h3 className="!mt-0 !mb-3 text-brand-900">Best For</h3>
              <p className="!mb-0 !text-brand-800">Businesses with strong, consistent revenue that need capital quickly. Ideal for inventory purchases, marketing campaigns, hiring, and bridging seasonal gaps.</p>
            </div>

            {/* Equipment Financing */}
            <h2 id="equipment">Equipment Financing</h2>
            <p>
              Need new equipment, machinery, vehicles, or technology? Equipment financing lets you spread the cost
              over the useful life of the asset. The equipment itself serves as collateral, which often translates
              to easier qualification and competitive rates.
            </p>
            <ul>
              <li>Finance up to 100% of equipment cost</li>
              <li>Fixed monthly payments for easy budgeting</li>
              <li>Potential tax benefits (Section 179 deduction)</li>
              <li>Preserve working capital for other needs</li>
            </ul>

            {/* Business Line of Credit */}
            <h2 id="loc">Business Line of Credit</h2>
            <p>
              A business line of credit gives you a revolving pool of capital that you can draw from as needed.
              You only pay interest on the amount you use, making it one of the most flexible funding options available.
              It&apos;s particularly valuable for managing cash flow fluctuations and covering unexpected expenses.
            </p>

            {/* Inline CTA 2 */}
            <div className="inline-cta">
              <div className="relative z-10">
                <h3 className="!mt-0 !mb-2 text-white text-2xl">Ready to explore your options?</h3>
                <p className="!text-blue-100 !mb-5 max-w-lg">Check your eligibility in 60 seconds. No impact on your credit score.</p>
                <a href="/apply" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
                  Check Eligibility
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>

            {/* Qualification */}
            <h2 id="qualify">What You Need to Qualify</h2>
            <p>
              Qualification requirements vary depending on the funding product, but most lenders evaluate
              a common set of factors. Here&apos;s what you&apos;ll typically need:
            </p>
            <ul>
              <li><strong>Time in business:</strong> Most products require at least 6 months, though some need 2+ years</li>
              <li><strong>Monthly revenue:</strong> $10,000+ per month for most alternative products; higher for SBA loans</li>
              <li><strong>Business bank statements:</strong> 3â€“6 months of recent statements</li>
              <li><strong>Credit score:</strong> Ranges from 500+ for MCAs to 680+ for SBA loans</li>
              <li><strong>No active bankruptcies:</strong> Most lenders require no open bankruptcy proceedings</li>
            </ul>

            {/* Speed */}
            <h2 id="speed">How Fast Can Funding Happen?</h2>
            <p>
              Speed is often the deciding factor for business owners choosing between funding options.
              Here&apos;s a realistic timeline for each product:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 my-8">
              {[
                { type: 'Revenue-Based / MCA', time: '24â€“48 hours', color: 'bg-green-50 border-green-200 text-green-800' },
                { type: 'Business Line of Credit', time: '2â€“5 days', color: 'bg-blue-50 border-blue-200 text-blue-800' },
                { type: 'Equipment Financing', time: '3â€“7 days', color: 'bg-purple-50 border-purple-200 text-purple-800' },
                { type: 'SBA Loans', time: '30â€“90 days', color: 'bg-amber-50 border-amber-200 text-amber-800' },
              ].map(item => (
                <div key={item.type} className={`rounded-xl border p-5 ${item.color}`}>
                  <div className="text-sm font-medium opacity-70 mb-1">{item.type}</div>
                  <div className="text-xl font-display">{item.time}</div>
                </div>
              ))}
            </div>

            {/* Common Mistakes */}
            <h2 id="mistakes">Common Mistakes Business Owners Make</h2>
            <p>
              Avoid these common pitfalls when seeking business funding to ensure you get the best possible
              terms and protect your business&apos;s financial health:
            </p>
            <ul>
              <li><strong>Not shopping around:</strong> Different lenders offer vastly different rates and terms. Always compare multiple options before committing.</li>
              <li><strong>Applying to too many lenders at once:</strong> Multiple hard credit pulls can temporarily lower your score. Work with a broker who can present you to multiple lenders with a single application.</li>
              <li><strong>Ignoring the total cost:</strong> Focus on the total cost of capital, not just the monthly payment. Factor rates, fees, and prepayment penalties all affect your bottom line.</li>
              <li><strong>Waiting until you&apos;re desperate:</strong> The best time to secure funding is before you urgently need it. Desperation limits your negotiating power and options.</li>
              <li><strong>Poor financial record-keeping:</strong> Disorganized finances slow down the process and can result in higher rates or denials.</li>
            </ul>

            {/* Inline CTA 3 */}
            <div className="inline-cta">
              <div className="relative z-10">
                <h3 className="!mt-0 !mb-2 text-white text-2xl">Let&apos;s find the right funding for you</h3>
                <p className="!text-blue-100 !mb-5 max-w-lg">Tell us about your business and we&apos;ll match you with the best options. It takes less than 2 minutes.</p>
                <a href="/apply" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
                  Get Funding Options
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          </article>

          {/* Sidebar / Sticky CTA */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              {/* Quick nav */}
              <div className="card p-6 mb-6">
                <h4 className="font-display text-lg text-slate-900 mb-4">In this guide</h4>
                <nav className="flex flex-col gap-2">
                  {[
                    { id: 'types', label: 'Types of Funding' },
                    { id: 'sba-loans', label: 'SBA Loans' },
                    { id: 'rbf', label: 'Revenue-Based Financing' },
                    { id: 'equipment', label: 'Equipment Financing' },
                    { id: 'loc', label: 'Line of Credit' },
                    { id: 'qualify', label: 'Qualification Requirements' },
                    { id: 'speed', label: 'Funding Speed' },
                    { id: 'mistakes', label: 'Common Mistakes' },
                  ].map(item => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="text-sm text-slate-500 hover:text-brand-600 transition-colors pl-3 border-l-2 border-transparent hover:border-brand-400 py-0.5"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Sticky CTA card */}
              <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-6 text-white shadow-xl shadow-brand-600/20">
                <h4 className="font-display text-xl mb-2">Get Funded Fast</h4>
                <p className="text-sm text-blue-100 mb-5 leading-relaxed">
                  See how much funding your business qualifies for. No impact to your credit score.
                </p>
                <a href="/apply" className="flex items-center justify-center gap-2 w-full py-3 bg-white text-brand-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors text-sm">
                  Check Eligibility
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <div className="mt-4 flex items-center gap-2 text-xs text-blue-200">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  256-bit SSL encryption
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

