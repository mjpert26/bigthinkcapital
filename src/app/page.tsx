'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ArticleContent from '@/components/ArticleContent';
import StatsSection from '@/components/StatsSection';
import Testimonials from '@/components/Testimonials';
import BlogCards from '@/components/BlogCards';
import ApplyNow from '@/components/ApplyNow';
import Footer from '@/components/Footer';

const BlobDivider = dynamic(() => import('@/components/BlobDivider'), { ssr: false });

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ArticleContent />
        <BlogCards />
        <BlobDivider />
        <StatsSection />
        <Testimonials />
        <ApplyNow />
      </main>
      <Footer />
    </>
  );
}
