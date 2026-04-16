'use client';

import { useState } from 'react';
import { BlogPost } from '@/lib/posts';

interface PostEditorProps {
  initialData?: Partial<BlogPost>;
  onSave: (data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => void;
  isEditing?: boolean;
}

const defaultPost = {
  title: '',
  slug: '',
  metaTitle: '',
  metaDescription: '',
  featuredImage: '',
  excerpt: '',
  author: '',
  publishDate: new Date().toISOString().split('T')[0],
  category: '',
  tags: [] as string[],
  body: '',
  status: 'draft' as const,
};

export default function PostEditor({ initialData, onSave, isEditing }: PostEditorProps) {
  const [form, setForm] = useState({ ...defaultPost, ...initialData, tags: initialData?.tags || [] });
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const update = (field: string, value: unknown) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
    setSaved(false);
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      update('tags', [...form.tags, tag]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    update('tags', form.tags.filter((t: string) => t !== tag));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.slug.trim()) errs.slug = 'Slug is required';
    if (!form.body.trim()) errs.body = 'Post body is required';
    if (!form.author.trim()) errs.author = 'Author is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (status: 'draft' | 'published') => {
    if (!validate()) return;
    const data = { ...form, status } as Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>;
    onSave(data);
    setSaved(true);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl bg-white/[0.05] border text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500/40 transition-all text-sm ${
      errors[field] ? 'border-red-500/40' : 'border-white/[0.08]'
    }`;

  const labelClass = 'block text-sm font-medium text-slate-300 mb-1.5';

  return (
    <div className="p-6 md:p-8 lg:p-10 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-display text-white">
            {isEditing ? 'Edit Post' : 'New Post'}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {isEditing ? 'Update your blog post' : 'Create a new blog post'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-sm text-green-400 animate-fade-in">Saved!</span>
          )}
          <button onClick={() => handleSave('draft')} className="px-5 py-2.5 text-sm font-medium text-slate-300 bg-white/[0.05] border border-white/[0.08] rounded-xl hover:bg-white/[0.08] transition-colors">
            Save Draft
          </button>
          <button onClick={() => handleSave('published')} className="px-5 py-2.5 text-sm font-medium text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-colors">
            Publish
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className={labelClass}>Title *</label>
          <input
            type="text"
            placeholder="How to Get Small Business Funding..."
            value={form.title}
            onChange={e => {
              update('title', e.target.value);
              if (!isEditing || !form.slug) update('slug', generateSlug(e.target.value));
            }}
            className={inputClass('title')}
          />
          {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title}</p>}
        </div>

        {/* Slug */}
        <div>
          <label className={labelClass}>Slug *</label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 shrink-0">/blog/</span>
            <input
              type="text"
              placeholder="how-to-get-small-business-funding"
              value={form.slug}
              onChange={e => update('slug', generateSlug(e.target.value))}
              className={inputClass('slug')}
            />
          </div>
          {errors.slug && <p className="text-xs text-red-400 mt-1">{errors.slug}</p>}
        </div>

        {/* Two-col: Meta title & Author */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Meta Title</label>
            <input
              type="text"
              placeholder="SEO-optimized title..."
              value={form.metaTitle}
              onChange={e => update('metaTitle', e.target.value)}
              className={inputClass('metaTitle')}
            />
          </div>
          <div>
            <label className={labelClass}>Author *</label>
            <input
              type="text"
              placeholder="Author name"
              value={form.author}
              onChange={e => update('author', e.target.value)}
              className={inputClass('author')}
            />
            {errors.author && <p className="text-xs text-red-400 mt-1">{errors.author}</p>}
          </div>
        </div>

        {/* Meta description */}
        <div>
          <label className={labelClass}>Meta Description</label>
          <textarea
            rows={2}
            placeholder="Brief description for search engines..."
            value={form.metaDescription}
            onChange={e => update('metaDescription', e.target.value)}
            className={inputClass('metaDescription')}
          />
        </div>

        {/* Featured image */}
        <div>
          <label className={labelClass}>Featured Image URL</label>
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            value={form.featuredImage}
            onChange={e => update('featuredImage', e.target.value)}
            className={inputClass('featuredImage')}
          />
          {form.featuredImage && (
            <div className="mt-2 w-full max-w-sm h-40 rounded-lg overflow-hidden bg-slate-800">
              <img src={form.featuredImage} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Excerpt */}
        <div>
          <label className={labelClass}>Excerpt</label>
          <textarea
            rows={3}
            placeholder="Brief summary for blog cards and social shares..."
            value={form.excerpt}
            onChange={e => update('excerpt', e.target.value)}
            className={inputClass('excerpt')}
          />
        </div>

        {/* Two-col: Category, Publish Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Category</label>
            <input
              type="text"
              placeholder="e.g., Guides, Education, Growth"
              value={form.category}
              onChange={e => update('category', e.target.value)}
              className={inputClass('category')}
            />
          </div>
          <div>
            <label className={labelClass}>Publish Date</label>
            <input
              type="date"
              value={form.publishDate}
              onChange={e => update('publishDate', e.target.value)}
              className={inputClass('publishDate')}
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className={labelClass}>Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Add a tag..."
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className={`flex-1 ${inputClass('tags')}`}
            />
            <button onClick={addTag} className="px-4 py-2 text-sm font-medium text-slate-300 bg-white/[0.05] border border-white/[0.08] rounded-xl hover:bg-white/[0.08] transition-colors shrink-0">
              Add
            </button>
          </div>
          {form.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.tags.map((tag: string) => (
                <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-600/15 text-brand-300 text-xs rounded-full">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-white transition-colors">&times;</button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div>
          <label className={labelClass}>Post Body * <span className="text-slate-500 font-normal">(HTML supported)</span></label>
          <textarea
            rows={16}
            placeholder="Write your post content here. HTML tags like <h2>, <p>, <ul>, <li> are supported..."
            value={form.body}
            onChange={e => update('body', e.target.value)}
            className={`${inputClass('body')} font-mono text-xs leading-relaxed`}
          />
          {errors.body && <p className="text-xs text-red-400 mt-1">{errors.body}</p>}
        </div>

        {/* Status indicator */}
        <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${form.status === 'published' ? 'bg-green-500' : 'bg-amber-500'}`} />
            <span className="text-sm text-slate-300">
              Status: <span className="font-medium text-white capitalize">{form.status}</span>
            </span>
          </div>
          <div className="flex gap-3">
            <button onClick={() => handleSave('draft')} className="px-5 py-2.5 text-sm font-medium text-slate-300 bg-white/[0.05] border border-white/[0.08] rounded-xl hover:bg-white/[0.08] transition-colors">
              Save Draft
            </button>
            <button onClick={() => handleSave('published')} className="px-5 py-2.5 text-sm font-medium text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-colors">
              {form.status === 'published' ? 'Update' : 'Publish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
