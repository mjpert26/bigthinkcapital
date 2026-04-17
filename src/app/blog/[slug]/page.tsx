"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogApplyForm from "@/components/BlogApplyForm";
import { usePosts } from "@/lib/PostsContext";

function calcReadTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 225));
}

// Sidebar card component - scrolls down to the form, NEVER off-site
function EligibilityCard({ onCtaClick }: { onCtaClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
  return (
    <div className="group relative">
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#f59e0b]/30 via-[#1d3bbb]/20 to-[#0e2366]/30 blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e2366] via-[#1a3296] to-[#0e2366] p-8 shadow-2xl shadow-[#0e2366]/40 transition-transform duration-500 group-hover:-translate-y-1">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "20px 20px" }}></div>
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#f59e0b]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-12 w-40 h-40 bg-[#3a68f5]/30 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fbbf24] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fbbf24]"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#fbbf24]">Pre-qualify in 2 minutes</span>
          </div>
          <h3 className="font-display text-3xl text-white leading-[1.05] mb-4 tracking-tight">See how much you<br/>qualify for.</h3>
          <div className="h-0.5 w-12 bg-[#f59e0b] rounded-full mb-5"></div>
          <p className="text-sm text-blue-100/80 leading-relaxed mb-7">No hard credit pull. No obligation. Just real funding offers from a marketplace of trusted lenders.</p>
          <div className="grid grid-cols-3 gap-3 mb-7 pb-7 border-b border-white/10">
            <div>
              <div className="font-display text-xl text-white leading-none mb-1">$1B+</div>
              <div className="text-[10px] uppercase tracking-wider text-blue-200/60">Funded</div>
            </div>
            <div>
              <div className="font-display text-xl text-white leading-none mb-1">25K+</div>
              <div className="text-[10px] uppercase tracking-wider text-blue-200/60">Customers</div>
            </div>
            <div>
              <div className="font-display text-xl text-white leading-none mb-1">24<span className="text-sm">hr</span></div>
              <div className="text-[10px] uppercase tracking-wider text-blue-200/60">Funding</div>
            </div>
          </div>
          <a
            href="#blog-apply-now"
            onClick={onCtaClick}
            className="group/btn relative flex items-center justify-center gap-2 w-full py-4 bg-[#f59e0b] hover:bg-[#fbbf24] text-[#0e2366] font-bold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-[#f59e0b]/40 hover:shadow-[#f59e0b]/60 overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700"></div>
            <span className="relative">Check Eligibility</span>
            <svg className="relative group-hover/btn:translate-y-0.5 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </a>
          <div className="flex items-center justify-center gap-1.5 mt-4">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-200/50">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            <span className="text-[10px] text-blue-200/50 uppercase tracking-wider">Soft pull only &middot; SSL secured</span>
          </div>
        </div>
      </div>
    </div>
  );
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

  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("blog-apply-now");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="font-display text-4xl text-[#0e2366] mb-4">Article not found</h1>
            <p className="text-neutral-500 mb-8">The article you are looking for does not exist or has been unpublished.</p>
            <Link href="/blog" className="btn-primary">Back to Articles</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const readTime = calcReadTime(post.body);
  const publishedDate = new Date(post.publish_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const authorInitials = (post.author || "BTC").split(" ").map((n) => n[0]).slice(0, 2).join("");

  return (
    <>
      <Navbar />

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-40 bg-neutral-100">
        <div className="h-full bg-gradient-to-r from-[#0e2366] via-[#1d3bbb] to-[#f59e0b] transition-all duration-150" style={{ width: progress + "%" }} />
      </div>

      <main className="pt-24 md:pt-32 pb-20 bg-white">
        {/* HEADER */}
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
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#0e2366] leading-[1.05] mb-6 tracking-tight">{post.title}</h1>
          {post.excerpt && (<p className="text-xl text-neutral-600 leading-relaxed mb-8 max-w-3xl">{post.excerpt}</p>)}
          <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0e2366] to-[#1d3bbb] flex items-center justify-center text-white font-semibold text-sm">{authorInitials}</div>
              <div>
                <div className="text-sm font-semibold text-[#0e2366]">{post.author || "Big Think Capital Team"}</div>
                <div className="text-xs text-neutral-500 flex items-center gap-2">
                  <span>{publishedDate}</span><span>&middot;</span><span>{readTime} min read</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500 mr-1">Share:</span>
              <a href={"https://twitter.com/intent/tweet?url=" + encodeURIComponent(shareUrl) + "&text=" + encodeURIComponent(post.title)} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-neutral-200 hover:border-[#1d3bbb] hover:bg-[#1d3bbb] hover:text-white flex items-center justify-center text-neutral-600 transition-all" aria-label="Share on Twitter">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href={"https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(shareUrl)} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-neutral-200 hover:border-[#1d3bbb] hover:bg-[#1d3bbb] hover:text-white flex items-center justify-center text-neutral-600 transition-all" aria-label="Share on LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href={"https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(shareUrl)} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-neutral-200 hover:border-[#1d3bbb] hover:bg-[#1d3bbb] hover:text-white flex items-center justify-center text-neutral-600 transition-all" aria-label="Share on Facebook">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* FEATURED IMAGE */}
        {post.featured_image && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
            <div className="rounded-2xl overflow-hidden bg-neutral-100 aspect-[2/1] shadow-2xl shadow-[#0e2366]/10">
              <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* BODY + STICKY SIDEBAR (desktop) / inline card (mobile) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
            <div className="max-w-3xl mx-auto lg:mx-0 w-full">
              <article className="article-content" dangerouslySetInnerHTML={{ __html: post.body }} />
              <div className="mt-12 p-6 bg-neutral-50 border border-neutral-200 rounded-2xl flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0e2366] to-[#1d3bbb] flex items-center justify-center text-white font-semibold flex-shrink-0">{authorInitials}</div>
                <div>
                  <div className="text-sm font-semibold text-[#0e2366] mb-1">{post.author || "Big Think Capital Team"}</div>
                  <p className="text-sm text-neutral-600 leading-relaxed">Big Think Capital has funded over $1 billion to more than 25,000 small business owners. Our experts help companies find the right financing for every stage of growth.</p>
                </div>
              </div>
              <div className="lg:hidden mt-12">
                <EligibilityCard onCtaClick={scrollToForm} />
              </div>
            </div>
            <aside className="hidden lg:block">
              <div className="sticky top-32">
                <EligibilityCard onCtaClick={scrollToForm} />
              </div>
            </aside>
          </div>
        </div>

        {/* SILK-WAVE FORM — the actual conversion target */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <BlogApplyForm />
        </div>

        {/* RELATED POSTS */}
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
                    <div className="text-xs text-neutral-500 mb-2">{new Date(rp.publish_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
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
