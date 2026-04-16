'use client';

import Link from 'next/link';
import { usePosts } from '@/lib/PostsContext';
import { useState } from 'react';

export default function AdminPostsPage() {
  const { posts, deletePost } = usePosts();
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = posts
    .filter(p => filter === 'all' || p.status === filter)
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.author.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  const handleDelete = async (id: string) => {
    await deletePost(id);
    setConfirmDelete(null);
  };

  const publishedCount = posts.filter(p => p.status === 'published').length;
  const draftCount = posts.filter(p => p.status === 'draft').length;

  return (
    <div className="p-6 md:p-8 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-display text-white">Blog Posts</h1>
          <p className="text-sm text-slate-400 mt-1">{posts.length} total posts</p>
        </div>
        <Link href="/admin/posts/new" className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-medium rounded-xl hover:bg-brand-700 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex gap-2">
          {[
            { key: 'all' as const, label: 'All', count: posts.length },
            { key: 'published' as const, label: 'Published', count: publishedCount },
            { key: 'draft' as const, label: 'Drafts', count: draftCount },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                filter === f.key
                  ? 'bg-brand-600/20 text-brand-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              {f.label} <span className="text-xs opacity-60 ml-1">{f.count}</span>
            </button>
          ))}
        </div>
        <div className="flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500/40"
          />
        </div>
      </div>

      {/* Posts table */}
      <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-16 text-center">
            <svg className="w-12 h-12 text-slate-600 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p className="text-slate-400 mb-2">No posts found</p>
            <p className="text-sm text-slate-500">
              {search ? 'Try a different search term.' : 'Create your first blog post to get started.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.05]">
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3">Post</th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Author</th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3 hidden lg:table-cell">Category</th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Date</th>
                  <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {filtered.map(post => (
                  <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 overflow-hidden shrink-0 hidden sm:block">
                          <img src={post.featured_image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-white truncate max-w-[250px]">{post.title}</div>
                          <div className="text-xs text-slate-500 truncate max-w-[250px]">/{post.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-400 hidden md:table-cell">{post.author}</td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="px-2 py-0.5 text-xs bg-white/[0.05] text-slate-300 rounded">{post.category}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        post.status === 'published'
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-400 hidden sm:table-cell">
                      {new Date(post.publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/posts/${post.id}`}
                          className="p-2 text-slate-400 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all"
                          title="Edit"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </Link>
                        {confirmDelete === post.id ? (
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleDelete(post.id)} className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors">
                              Confirm
                            </button>
                            <button onClick={() => setConfirmDelete(null)} className="px-2 py-1 text-xs text-slate-400 hover:text-white transition-colors">
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDelete(post.id)}
                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                            title="Delete"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
