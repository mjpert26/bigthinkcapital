'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { BlogPost, samplePosts } from '@/lib/posts';

interface PostsContextType {
  posts: BlogPost[];
  getPost: (id: string) => BlogPost | undefined;
  getPostBySlug: (slug: string) => BlogPost | undefined;
  getPublishedPosts: () => BlogPost[];
  createPost: (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => BlogPost;
  updatePost: (id: string, updates: Partial<BlogPost>) => BlogPost | undefined;
  deletePost: (id: string) => boolean;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

const STORAGE_KEY = 'btc_blog_posts';

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPosts(JSON.parse(stored));
      } else {
        setPosts(samplePosts);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(samplePosts));
      }
    } catch {
      setPosts(samplePosts);
    }
    setLoaded(true);
  }, []);

  const persist = useCallback((updated: BlogPost[]) => {
    setPosts(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
  }, []);

  const getPost = useCallback((id: string) => posts.find(p => p.id === id), [posts]);
  const getPostBySlug = useCallback((slug: string) => posts.find(p => p.slug === slug && p.status === 'published'), [posts]);

  const getPublishedPosts = useCallback(
    () => posts
      .filter(p => p.status === 'published')
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()),
    [posts]
  );

  const createPost = useCallback((data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): BlogPost => {
    const now = new Date().toISOString();
    const newPost: BlogPost = {
      ...data,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };
    persist([...posts, newPost]);
    return newPost;
  }, [posts, persist]);

  const updatePost = useCallback((id: string, updates: Partial<BlogPost>): BlogPost | undefined => {
    const idx = posts.findIndex(p => p.id === id);
    if (idx === -1) return undefined;
    const updated = { ...posts[idx], ...updates, updatedAt: new Date().toISOString() };
    const newPosts = [...posts];
    newPosts[idx] = updated;
    persist(newPosts);
    return updated;
  }, [posts, persist]);

  const deletePost = useCallback((id: string): boolean => {
    const filtered = posts.filter(p => p.id !== id);
    if (filtered.length === posts.length) return false;
    persist(filtered);
    return true;
  }, [posts, persist]);

  if (!loaded) return null;

  return (
    <PostsContext.Provider value={{ posts, getPost, getPostBySlug, getPublishedPosts, createPost, updatePost, deletePost }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error('usePosts must be used within PostsProvider');
  return ctx;
}
