'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  featured_image: string;
  excerpt: string;
  author: string;
  publish_date: string;
  category: string;
  tags: string[];
  body: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

interface PostsContextType {
  posts: BlogPost[];
  loading: boolean;
  refresh: () => Promise<void>;
  getPost: (id: string) => BlogPost | undefined;
  getPostBySlug: (slug: string) => BlogPost | undefined;
  getPublishedPosts: () => BlogPost[];
  createPost: (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => Promise<BlogPost | null>;
  updatePost: (id: string, updates: Partial<BlogPost>) => Promise<BlogPost | null>;
  deletePost: (id: string) => Promise<boolean>;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('publish_date', { ascending: false });

    if (!error && data) {
      setPosts(data as BlogPost[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const getPost = useCallback(
    (id: string) => posts.find(p => p.id === id),
    [posts]
  );

  const getPostBySlug = useCallback(
    (slug: string) => posts.find(p => p.slug === slug && p.status === 'published'),
    [posts]
  );

  const getPublishedPosts = useCallback(
    () => posts
      .filter(p => p.status === 'published')
      .sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()),
    [posts]
  );

  const createPost = useCallback(async (data: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost | null> => {
    const { data: newPost, error } = await supabase
      .from('blog_posts')
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error('Error creating post:', error);
      return null;
    }

    await fetchPosts();
    return newPost as BlogPost;
  }, [fetchPosts]);

  const updatePost = useCallback(async (id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> => {
    const { data: updated, error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating post:', error);
      return null;
    }

    await fetchPosts();
    return updated as BlogPost;
  }, [fetchPosts]);

  const deletePost = useCallback(async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
      return false;
    }

    await fetchPosts();
    return true;
  }, [fetchPosts]);

  return (
    <PostsContext.Provider value={{
      posts, loading, refresh: fetchPosts,
      getPost, getPostBySlug, getPublishedPosts,
      createPost, updatePost, deletePost,
    }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error('usePosts must be used within PostsProvider');
  return ctx;
}
