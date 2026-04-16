'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-925 text-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="font-display text-lg">Big Think Capital</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Helping small businesses access the capital they need to grow since 2018.
            </p>
          </div>

          {/* Funding */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Funding</h4>
            <ul className="space-y-2.5">
              {['SBA Loans', 'Revenue-Based Financing', 'Equipment Financing', 'Business Line of Credit', 'Invoice Factoring'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Blog', href: '/blog' },
                { label: 'Funding Guide', href: '#' },
                { label: 'Business Calculator', href: '#' },
                { label: 'FAQ', href: '#' },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5">
              {['About Us', 'Careers', 'Contact', 'Privacy Policy', 'Terms of Service'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Big Think Capital. All rights reserved. Big Think Capital is not a lender.
            Funding products are offered through our network of lending partners.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500">NMLS #1234567</span>
            <span className="text-xs text-slate-600">|</span>
            <span className="text-xs text-slate-500">Equal Opportunity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
