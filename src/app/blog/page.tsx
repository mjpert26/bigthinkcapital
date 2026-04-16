'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePosts } from '@/lib/PostsContext';
import { useState } from 'react';

export default function BlogPage() {
  const { getPublishedPosts } = usePosts();
  const posts = getPublishedPosts();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];
  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <h1 className="font-display text-5xl md:text-6xl text-slate-900 mb-4">Blog &amp; Resources</h1>
            <p className="text-lg text-slate-500">
              Expert insights on business funding, growth strategies, and financial management for small business owners.
            </p>
          </div>

          {/* Categories */}
          <div className="flex gap-2 flex-wrap mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post */}
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="group block mb-12">
              <div className="card overflow-hidden grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto overflow-hidden bg-slate-100">
                  <img
                    src={featured.featured_image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <span className="inline-block w-fit px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full mb-4">
                    {featured.category}
                  </span>
                  <h2 className="font-display text-2xl md:text-3xl text-slate-900 mb-3 group-hover:text-brand-600 transition-colors leading-snug">
                    {featured.title}
                  </h2>
                  <p className="text-slate-500 leading-relaxed mb-5">{featured.excerpt}</p>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span>{featured.author}</span>
                    <span>&middot;</span>
                    <span>{new Date(featured.publish_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Grid */}
          {rest.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group card overflow-hidden flex flex-col">
                  <div className="relative h-48 overflow-hidden bg-slate-100">
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
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-xs text-slate-400 mb-2">
                      {new Date(post.publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h3 className="font-display text-xl text-slate-900 mb-2 group-hover:text-brand-600 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed flex-1">{post.excerpt}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-slate-100 text-xs text-slate-500 rounded-md">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg">No articles found in this category yet.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
