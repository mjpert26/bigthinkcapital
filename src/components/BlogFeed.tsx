'use client';

import Link from 'next/link';
import { usePosts } from '@/lib/PostsContext';

export default function BlogFeed() {
  const { getPublishedPosts } = usePosts();
  const posts = getPublishedPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  if (posts.length === 0) {
    return (
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <p className="text-slate-400 text-lg">No articles published yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured article */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="group block mb-10">
            <div className="card overflow-hidden grid md:grid-cols-[1.2fr_1fr] gap-0">
              <div className="relative h-56 md:h-80 overflow-hidden bg-slate-100">
                <img
                  src={featured.featured_image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-brand-600 text-white text-xs font-semibold rounded-full shadow-lg">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-7 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full">{featured.category}</span>
                  <span className="text-xs text-slate-400">
                    {new Date(featured.publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-slate-900 mb-3 group-hover:text-brand-600 transition-colors leading-snug">
                  {featured.title}
                </h2>
                <p className="text-slate-500 leading-relaxed mb-4 line-clamp-3">{featured.excerpt}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-600">{featured.author}</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Grid of posts */}
        {rest.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl text-slate-900">Latest Articles</h3>
              <Link href="/blog" className="text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1 group">
                View all
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group card overflow-hidden flex flex-col">
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-brand-700 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="text-xs text-slate-400 mb-2">
                      {new Date(post.publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      {' '}&middot;{' '}{post.author}
                    </div>
                    <h3 className="font-display text-lg text-slate-900 mb-2 group-hover:text-brand-600 transition-colors leading-snug flex-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-brand-600 group-hover:gap-2.5 transition-all">
                      Read article
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Inline CTA - subtle, not aggressive */}
        <div className="mt-12 bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-100 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="font-display text-xl text-slate-900 mb-1">Need funding for your business?</h3>
            <p className="text-slate-500 text-sm">See what you qualify for in under 2 minutes. No impact on your credit.</p>
          </div>
          <a href="#apply-now" className="btn-primary shrink-0 !py-3">
            Check Eligibility
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
