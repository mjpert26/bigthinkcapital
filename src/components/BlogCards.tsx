'use client';

import Link from 'next/link';
import { usePosts } from '@/lib/PostsContext';

export default function BlogCards() {
  const { getPublishedPosts } = usePosts();
  const posts = getPublishedPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <span className="text-brand-600 text-sm font-semibold uppercase tracking-wider">Resources</span>
            <h2 className="font-display text-4xl md:text-5xl text-slate-900 mt-3">
              Latest from the blog
            </h2>
          </div>
          <Link href="/blog" className="btn-ghost text-brand-600 hover:!text-brand-700 !px-0 group">
            View all articles
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group card overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-brand-700 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="text-xs text-slate-400 mb-2.5">
                  {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  {' '}&middot;{' '}{post.author}
                </div>
                <h3 className="font-display text-xl text-slate-900 mb-2 group-hover:text-brand-600 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand-600 group-hover:gap-2.5 transition-all">
                  Read more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
