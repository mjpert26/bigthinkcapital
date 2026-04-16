"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0e2366] text-white relative overflow-hidden" id="contact">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#1d3bbb]/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#f59e0b]/10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
    </footer>
  );
}


