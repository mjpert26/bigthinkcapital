'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BlogFeed from '@/components/BlogFeed';
import ApplyNow from '@/components/ApplyNow';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BlogFeed />
        <ApplyNow />
      </main>
      <Footer />
    </>
  );
}
