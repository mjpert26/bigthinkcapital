'use client';

import Link from 'next/link';
import { usePosts } from '@/lib/PostsContext';

export default function AdminDashboard() {
  const { posts } = usePosts();
  const published = posts.filter(p => p.status === 'published');
  const drafts = posts.filter(p => p.status === 'draft');
  const recent = [...posts].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).slice(0, 5);

  const stats = [
    { label: 'Total Posts', value: posts.length, icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z', color: 'text-brand-400 bg-brand-500/10' },
    { label: 'Published', value: published.length, icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-green-400 bg-green-500/10' },
    { label: 'Drafts', value: drafts.length, icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', color: 'text-amber-400 bg-amber-500/10' },
    { label: 'Categories', value: new Set(posts.map(p => p.category)).size, icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z', color: 'text-purple-400 bg-purple-500/10' },
  ];

  return (
    <div className="p-6 md:p-8 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-display text-white">Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">Welcome back. Here&apos;s what&apos;s happening with your blog.</p>
        </div>
        <Link href="/admin/posts/new" className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-medium rounded-xl hover:bg-brand-700 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          New Post
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-5">
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={stat.icon} />
              </svg>
            </div>
            <div className="text-2xl font-display text-white">{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent posts */}
      <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl">
        <div className="flex items-center justify-between p-5 border-b border-white/[0.05]">
          <h2 className="text-lg font-display text-white">Recent Posts</h2>
          <Link href="/admin/posts" className="text-sm text-brand-400 hover:text-brand-300 transition-colors">
            View all
          </Link>
        </div>
        {recent.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-slate-500">No posts yet. Create your first post to get started.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.03]">
            {recent.map(post => (
              <Link key={post.id} href={`/admin/posts/${post.id}`} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
                <div className="w-12 h-12 rounded-lg bg-slate-800 overflow-hidden shrink-0">
                  <img src={post.featured_image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{post.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {post.author} &middot; {new Date(post.updated_at).toLocaleDateString()}
                  </div>
                </div>
                <span className={`shrink-0 px-2.5 py-1 text-xs font-medium rounded-full ${
                  post.status === 'published'
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-amber-500/10 text-amber-400'
                }`}>
                  {post.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
