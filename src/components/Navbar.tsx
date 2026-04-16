'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-sm shadow-slate-200/50 border-b border-slate-100'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-shadow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="font-display text-xl tracking-tight text-slate-900">
              Big Think <span className="text-brand-600">Capital</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <a href="#funding-types" className="btn-ghost text-sm">Funding Options</a>
            <a href="#how-it-works" className="btn-ghost text-sm">How It Works</a>
            <Link href="/blog" className="btn-ghost text-sm">Blog</Link>
            <a href="#contact" className="btn-ghost text-sm">Contact</a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/admin" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
              Admin
            </Link>
            <a href="#lead-form" className="btn-primary text-sm !py-2.5 !px-5">
              Check Eligibility
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-slate-700 transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-slate-700 transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-slate-700 transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-6 pt-2 animate-fade-in">
            <div className="flex flex-col gap-1">
              <a href="#funding-types" className="px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg" onClick={() => setMobileOpen(false)}>Funding Options</a>
              <a href="#how-it-works" className="px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg" onClick={() => setMobileOpen(false)}>How It Works</a>
              <Link href="/blog" className="px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg" onClick={() => setMobileOpen(false)}>Blog</Link>
              <a href="#contact" className="px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg" onClick={() => setMobileOpen(false)}>Contact</a>
              <div className="pt-3 px-4">
                <a href="#lead-form" className="btn-primary w-full text-sm" onClick={() => setMobileOpen(false)}>
                  Check Eligibility
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
