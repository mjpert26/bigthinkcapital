"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0e2366] text-white relative overflow-hidden" id="contact">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#1d3bbb]/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#f59e0b]/10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-5">
              <img src="/logo.png" alt="Big Think Capital" className="h-14 w-auto" />
            </Link>
            <p className="text-sm text-blue-100/70 leading-relaxed max-w-sm mb-6">
              Big Think Capital is a leading financial marketplace helping business owners access the capital they need. Over $1 billion funded to 25,000+ businesses.
            </p>

            <div className="flex items-center gap-3 mt-5">
              <a href="https://www.linkedin.com/company/bigthinkcapital.com/" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#f59e0b] hover:text-[#0e2366] flex items-center justify-center transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://www.facebook.com/bigthinkcapital" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#f59e0b] hover:text-[#0e2366] flex items-center justify-center transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/big_think_capital/" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#f59e0b] hover:text-[#0e2366] flex items-center justify-center transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://twitter.com/bigthinkcapital" aria-label="Twitter/X" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#f59e0b] hover:text-[#0e2366] flex items-center justify-center transition-all">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[#fbbf24] uppercase tracking-wider mb-4">Funding</h4>
            <ul className="space-y-2.5">
              <li><a href="https://bigthinkcapital.com/funding-solutions/sba-loans/" className="text-sm text-blue-100/70 hover:text-white transition-colors">SBA Loans</a></li>
              <li><a href="https://bigthinkcapital.com/funding-solutions/business-term-loans/" className="text-sm text-blue-100/70 hover:text-white transition-colors">Term Loans</a></li>
              <li><a href="https://bigthinkcapital.com/funding-solutions/business-line-of-credit/" className="text-sm text-blue-100/70 hover:text-white transition-colors">Line of Credit</a></li>
              <li><a href="https://bigthinkcapital.com/funding-solutions/working-capital/" className="text-sm text-blue-100/70 hover:text-white transition-colors">Working Capital</a></li>
              <li><a href="https://bigthinkcapital.com/funding-solutions/equipment-financing/" className="text-sm text-blue-100/70 hover:text-white transition-colors">Equipment Financing</a></li>
              <li><a href="https://bigthinkcapital.com/funding-solutions/invoice-factoring/" className="text-sm text-blue-100/70 hover:text-white transition-colors">Invoice Factoring</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[#fbbf24] uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li><Link href="/blog" className="text-sm text-blue-100/70 hover:text-white transition-colors">Articles</Link></li>
              <li><a href="https://bigthinkcapital.com/knowledge-center/" className="text-sm text-blue-100/70 hover:text-white transition-colors">Knowledge Center</a></li>
              <li><a href="https://bigthinkcapital.com/success-stories/" className="text-sm text-blue-100/70 hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="https://bigthinkcapital.com/faqs/" className="text-sm text-blue-100/70 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="https://bigthinkcapital.com/partner-with-us/" className="text-sm text-blue-100/70 hover:text-white transition-colors">Partner With Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[#fbbf24] uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><a href="https://bigthinkcapital.com/about-us/" className="text-sm text-blue-100/70 hover:text-white transition-colors">About Us</a></li>
              <li><a href="https://bigthinkcapital.com/our-team/" className="text-sm text-blue-100/70 hover:text-white transition-colors">Our Team</a></li>
              <li><a href="https://bigthinkcapital.com/careers/" className="text-sm text-blue-100/70 hover:text-white transition-colors">Careers</a></li>
              <li><a href="https://bigthinkcapital.com/press/" className="text-sm text-blue-100/70 hover:text-white transition-colors">Press</a></li>
              <li><a href="https://bigthinkcapital.com/contact/" className="text-sm text-blue-100/70 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-blue-100/50 max-w-3xl leading-relaxed">
            &copy; {new Date().getFullYear()} Big Think Capital. All rights reserved. Big Think Capital is a lending marketplace. Funding products are offered through our network of lending partners. Referral bonuses are not allowed in California.
          </p>
          <div className="flex items-center gap-4 flex-shrink-0">
            <a href="https://bigthinkcapital.com/privacy-policy/" className="text-xs text-blue-100/60 hover:text-white transition-colors">Privacy</a>
            <span className="text-xs text-blue-100/30">|</span>
            <a href="https://bigthinkcapital.com/terms-of-use/" className="text-xs text-blue-100/60 hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
