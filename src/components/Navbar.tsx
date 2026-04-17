"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 " +
        (scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm shadow-neutral-200/50 border-b border-neutral-100"
          : "bg-white/70 backdrop-blur-md")
      }
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group" aria-label="Big Think Capital home">
            <img
              src="https://bigthinkcapital.com/wp-content/uploads/2024/08/Big-Think-Capital-Logo-2-300x124.png"
              alt="Big Think Capital"
              className="h-10 md:h-12 w-auto transition-opacity group-hover:opacity-80"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/blog" className="text-sm font-medium text-neutral-700 hover:text-[#1d3bbb] transition-colors">
              Articles
            </Link>
            <a
              href="https://bigthinkcapital.com/funding-solutions/"
              className="text-sm font-medium text-neutral-700 hover:text-[#1d3bbb] transition-colors"
            >
              Funding Solutions
            </a>
            <a
              href="https://bigthinkcapital.com/knowledge-center/"
              className="text-sm font-medium text-neutral-700 hover:text-[#1d3bbb] transition-colors"
            >
              Knowledge Center
            </a>
            <a
              href="https://bigthinkcapital.com/about-us/"
              className="text-sm font-medium text-neutral-700 hover:text-[#1d3bbb] transition-colors"
            >
              About
            </a>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:844-200-7201" className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-[#1d3bbb] transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              844-200-7201
            </a>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f59e0b] hover:bg-[#fbbf24] text-[#0e2366] font-bold text-sm rounded-lg transition-all hover:-translate-y-0.5 shadow-md shadow-[#f59e0b]/20 hover:shadow-[#f59e0b]/40"
            >
              Check Eligibility
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={"block h-0.5 bg-neutral-700 transition-all duration-200 " + (mobileOpen ? "rotate-45 translate-y-2" : "")} />
              <span className={"block h-0.5 bg-neutral-700 transition-all duration-200 " + (mobileOpen ? "opacity-0" : "")} />
              <span className={"block h-0.5 bg-neutral-700 transition-all duration-200 " + (mobileOpen ? "-rotate-45 -translate-y-2" : "")} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-6 pt-2 animate-fade-in border-t border-neutral-100 mt-2">
            <div className="flex flex-col gap-1 pt-4">
              <Link href="/blog" className="px-4 py-3 text-neutral-700 hover:bg-neutral-50 rounded-lg font-medium" onClick={() => setMobileOpen(false)}>
                Articles
              </Link>
              <a href="https://bigthinkcapital.com/funding-solutions/" className="px-4 py-3 text-neutral-700 hover:bg-neutral-50 rounded-lg font-medium">
                Funding Solutions
              </a>
              <a href="https://bigthinkcapital.com/knowledge-center/" className="px-4 py-3 text-neutral-700 hover:bg-neutral-50 rounded-lg font-medium">
                Knowledge Center
              </a>
              <a href="https://bigthinkcapital.com/about-us/" className="px-4 py-3 text-neutral-700 hover:bg-neutral-50 rounded-lg font-medium">
                About
              </a>
              <a href="tel:844-200-7201" className="px-4 py-3 text-neutral-700 hover:bg-neutral-50 rounded-lg font-medium flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                844-200-7201
              </a>
              <div className="pt-3 px-4">
                <Link
                  href="/apply"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#f59e0b] hover:bg-[#fbbf24] text-[#0e2366] font-bold text-sm rounded-lg transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  Check Eligibility
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
