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
const SmoothCursor = dynamic(() => import('@/components/reactbits/SmoothCursor'), { ssr: false });

export default function HomePage() {
  return (
    <>
      <SmoothCursor
        pointsCount={30}
        lineWidth={0.4}
        springStrength={0.35}
        dampening={0.55}
        color="#338dff"
        blur={0}
        trailOpacity={0.6}
        smoothFactor={1}
      />
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
