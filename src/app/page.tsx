'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ArticleContent from '@/components/ArticleContent';
import StatsSection from '@/components/StatsSection';
import Testimonials from '@/components/Testimonials';
import BlogCards from '@/components/BlogCards';
import LeadForm from '@/components/LeadForm';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsSection />
        <ArticleContent />
        <Testimonials />
        <LeadForm />
        <BlogCards />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
