"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePosts } from "@/lib/PostsContext";

function calcReadTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 225));
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { getPostBySlug, getPublishedPosts } = usePosts();
  const post = getPostBySlug(slug);
  const relatedPosts = getPublishedPosts().filter((p) => p.slug !== slug).slice(0, 3);

  const [progress, setProgress] = useState(0);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const pct = total > 0 ? (h.scrollTop / total) * 100 : 0;
      setProgress(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="font-display text-4xl text-[#0e2366] mb-4">Article not found</h1>
            <p className="text-neutral-500 mb-8">The article you are looking for does not exist or has been unpublished.</p>
            <Link href="/" className="btn-primary">Back to Articles</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const readTime = calcReadTime(post.body);
  const publishedDate = new Date(post.publish_date).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });

  const authorInitials = (post.author || "BTC").split(" ").map((n) => n[0]).slice(0, 2).join("");

  return (
    <>
      <Navbar />

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-40 bg-neutral-100">
        <div
          className="h-full bg-gradient-to-r from-[#0e2366] via-[#1d3bbb] to-[#f59e0b] transition-all duration-150"
          style={{ width: progress + "%" }}
        />
      </div>

      <main className="pt-24 md:pt-32 pb-20 bg-white">
        {/* Breadcrumb + category */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-[#1d3bbb] transition-colors mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            All Articles
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f59e0b]/10 text-[#92400e] text-xs font-semibold rounded-full uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full"></span>
              {post.category}
            </span>
            {post.tags && post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">{tag}</span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#0e2366] leading-[1.05] mb-6 tracking-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-neutral-600 leading-relaxed mb-8 max-w-3xl">{post.excerpt}</p>
          )}

          {/* Author row */}
          <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0e2366] to-[#1d3bbb] flex items-center justify-center text-white font-semibold text-sm">
                {authorInitials}
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0e2366]">{post.author || "Big Think Capital Team"}</div>
                <div className="text-xs text-neutral-500 flex items-center gap-2">
                  <span>{publishedDate}</span>
                  <span>&middot;</span>
                  <span>{readTime} min read</span>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500 mr-1">Share:</span>
              <a
                href={"https://twitter.com/intent/tweet?url=" + encodeURIComponent(shareUrl) + "&text=" + encodeURIComponent(post.title)}
                target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-neutral-200 hover:border-[#1d3bbb] hover:bg-[#1d3bbb] hover:text-white flex items-center justify-center text-neutral-600 transition-all"
                aria-label="Share on Twitter"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a
                href={"https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(shareUrl)}
                target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-neutral-200 hover:border-[#1d3bbb] hover:bg-[#1d3bbb] hover:text-white flex items-center justify-center text-neutral-600 transition-all"
                aria-label="Share on LinkedIn"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a
                href={"https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(shareUrl)}
                target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-neutral-200 hover:border-[#1d3bbb] hover:bg-[#1d3bbb] hover:text-white flex items-center justify-center text-neutral-600 transition-all"
                aria-label="Share on Facebook"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Featured image */}
        {post.featured_image && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
            <div className="rounded-2xl overflow-hidden bg-neutral-100 aspect-[2/1] shadow-2xl shadow-[#0e2366]/10">
              <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* Article body + sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-12 lg:gap-16">
            {/* Body */}
            <div className="max-w-3xl mx-auto lg:mx-0 w-full">
              <article className="article-content" dangerouslySetInnerHTML={{ __html: post.body }} />

              {/* Inline CTA */}
              <div className="inline-cta my-16">
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f59e0b]/20 text-[#fbbf24] text-xs font-semibold rounded-full uppercase tracking-wider mb-4">
                    <span className="w-1.5 h-1.5 bg-[#fbbf24] rounded-full animate-pulse"></span>
                    Limited Time
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-white mb-3">Need funding for your business?</h3>
                  <p className="text-blue-100 mb-6 max-w-md mx-auto leading-relaxed">Check your eligibility in under 2 minutes. No impact on your credit score.</p>
                  <a href="https://apply.bigthinkcapital.com/sign-up" className="inline-flex items-center gap-2 px-8 py-4 bg-[#f59e0b] hover:bg-[#fbbf24] text-[#0e2366] font-bold rounded-xl transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#f59e0b]/30">
                    Check Eligibility
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                  <div className="mt-5 flex items-center justify-center gap-4 text-xs text-blue-200">
                    <span className="flex items-center gap-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>No credit impact</span>
                    <span className="flex items-center gap-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>2-minute form</span>
                    <span className="flex items-center gap-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>Expert guidance</span>
                  </div>
                </div>
              </div>

              {/* Author bio card */}
              <div className="mt-12 p-6 bg-neutral-50 border border-neutral-200 rounded-2xl flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0e2366] to-[#1d3bbb] flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {authorInitials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#0e2366] mb-1">{post.author || "Big Think Capital Team"}</div>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Big Think Capital has funded over $1 billion to more than 25,000 small business owners. Our experts help companies find the right financing for every stage of growth.
                  </p>
                </div>
              </div>
            </div>

            {/* Sticky sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-6">
                {/* Apply CTA */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0e2366] to-[#1d3bbb] p-6 text-white shadow-xl shadow-[#0e2366]/20">
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#f59e0b]/20 rounded-full blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#fbbf24] mb-2">Get Funded Fast</div>
                    <h4 className="font-display text-2xl mb-3 leading-tight">See how much you qualify for</h4>
                    <p className="text-sm text-blue-100 mb-5 leading-relaxed">Check your eligibility in 2 minutes. No impact to your credit score.</p>
                    <a href="https://apply.bigthinkcapital.com/sign-up" className="flex items-center justify-center gap-2 w-full py-3 bg-[#f59e0b] hover:bg-[#fbbf24] text-[#0e2366] font-bold rounded-xl transition-all text-sm">
                      Check Eligibility
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                    <div className="mt-4 flex items-center gap-2 text-xs text-blue-200">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                      256-bit SSL encryption
                    </div>
                  </div>
                </div>

                {/* Trust signals */}
                <div className="bg-white border border-neutral-200 rounded-2xl p-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">Trusted by 25,000+ businesses</div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#0e2366]/10 flex items-center justify-center text-[#0e2366]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#0e2366]">$1B+ Funded</div>
                        <div className="text-xs text-neutral-500">Across all funding types</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#0e2366]/10 flex items-center justify-center text-[#0e2366]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#0e2366]">25,000+ Businesses</div>
                        <div className="text-xs text-neutral-500">Funded & growing</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#0e2366]/10 flex items-center justify-center text-[#0e2366]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#0e2366]">24hr Funding</div>
                        <div className="text-xs text-neutral-500">On select products</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Need help */}
                <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 text-center">
                  <div className="text-sm font-semibold text-[#0e2366] mb-1">Prefer to talk?</div>
                  <p className="text-xs text-neutral-500 mb-3">Speak with a funding expert now</p>
                  <a href="tel:844-200-7201" className="inline-flex items-center gap-2 text-lg font-bold text-[#1d3bbb] hover:text-[#f59e0b] transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                    844-200-7201
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-16 border-t border-neutral-200">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#f59e0b] mb-2">Keep Reading</div>
                <h2 className="font-display text-3xl md:text-4xl text-[#0e2366]">More from the Knowledge Center</h2>
              </div>
              <Link href="/blog" className="text-sm font-semibold text-[#1d3bbb] hover:text-[#f59e0b] transition-colors inline-flex items-center gap-1">
                View all articles
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={"/blog/" + rp.slug} className="group card overflow-hidden flex flex-col">
                  <div className="relative h-48 overflow-hidden bg-neutral-100">
                    {rp.featured_image && (
                      <img src={rp.featured_image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-white/95 backdrop-blur text-[#0e2366] text-xs font-semibold rounded-full">{rp.category}</span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-xs text-neutral-500 mb-2">
                      {new Date(rp.publish_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                    <h3 className="font-display text-xl text-[#0e2366] group-hover:text-[#1d3bbb] transition-colors leading-snug mb-2">{rp.title}</h3>
                    {rp.excerpt && <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">{rp.excerpt}</p>}
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1d3bbb] group-hover:text-[#f59e0b] transition-colors">
                      Read article
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
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
