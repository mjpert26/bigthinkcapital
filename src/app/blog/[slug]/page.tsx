'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePosts } from '@/lib/PostsContext';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { getPostBySlug, getPublishedPosts } = usePosts();
  const post = getPostBySlug(slug);
  const relatedPosts = getPublishedPosts().filter(p => p.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="font-display text-4xl text-slate-900 mb-4">Article not found</h1>
            <p className="text-slate-500 mb-8">The article you&apos;re looking for doesn&apos;t exist or has been unpublished.</p>
            <Link href="/blog" className="btn-primary">Back to Blog</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-20">
        {/* Article header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-brand-600 transition-colors mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Blog
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full">{post.category}</span>
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-500 text-xs rounded-full">{tag}</span>
            ))}
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-[1.08] mb-5">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span className="font-medium text-slate-600">{post.author}</span>
            <span>&middot;</span>
            <span>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>

        {/* Featured image */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="rounded-2xl overflow-hidden bg-slate-100 aspect-[2/1]">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Article body */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {/* Inline CTA */}
          <div className="inline-cta my-12">
            <div className="relative z-10 text-center">
              <h3 className="!mt-0 !mb-2 text-white text-2xl">Need funding for your business?</h3>
              <p className="!text-blue-100 !mb-5 max-w-md mx-auto">Check your eligibility in under 2 minutes with no impact on your credit score.</p>
              <a href="/#apply-now" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
                Check Eligibility
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
            <h2 className="font-display text-3xl text-slate-900 mb-8">More articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map(rp => (
                <Link key={rp.id} href={`/blog/${rp.slug}`} className="group card overflow-hidden flex flex-col">
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img src={rp.featuredImage} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-slate-400 mb-1.5">
                      {new Date(rp.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h3 className="font-display text-lg text-slate-900 group-hover:text-brand-600 transition-colors leading-snug">{rp.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
