'use client';

import { useState } from 'react';
import { BlogPost } from '@/lib/PostsContext';

interface PostEditorProps {
  initialData?: Partial<BlogPost>;
  onSave: (data: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => Promise<unknown>;
  isEditing?: boolean;
}

const generateSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function PostEditor({ initialData, onSave, isEditing }: PostEditorProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [body, setBody] = useState(initialData?.body || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [author, setAuthor] = useState(initialData?.author || 'Big Think Capital Team');
  const [category, setCategory] = useState(initialData?.category || 'Guides');
  const [featuredImage, setFeaturedImage] = useState(initialData?.featured_image || '');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [metaTitle, setMetaTitle] = useState(initialData?.meta_title || '');
  const [metaDescription, setMetaDescription] = useState(initialData?.meta_description || '');
  const [publishDate, setPublishDate] = useState(initialData?.publish_date || new Date().toISOString().split('T')[0]);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!body.trim()) errs.body = 'Post content is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async (status: 'draft' | 'published') => {
    if (!validate()) return;
    setSaving(true);
    const finalSlug = slug.trim() || generateSlug(title);
    const data: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'> = {
      title: title.trim(),
      slug: finalSlug,
      meta_title: metaTitle.trim() || `${title.trim()} | Big Think Capital`,
      meta_description: metaDescription.trim() || excerpt.trim() || title.trim(),
      featured_image: featuredImage.trim() || 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop',
      excerpt: excerpt.trim() || body.replace(/<[^>]*>/g, '').slice(0, 160) + '...',
      author: author.trim() || 'Big Think Capital Team',
      publish_date: publishDate,
      category: category.trim() || 'Guides',
      tags,
      body: body.trim(),
      status,
    };
    await onSave(data);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) { setTags([...tags, tag]); setTagInput(''); }
  };

  const inputClass = (field?: string) =>
    `w-full px-4 py-3 rounded-xl bg-white/[0.05] border text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500/40 transition-all text-sm ${
      field && errors[field] ? 'border-red-500/40' : 'border-white/[0.08]'
    }`;

  return (
    <div className="p-6 md:p-8 lg:p-10 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-display text-white">{isEditing ? 'Edit Post' : 'New Post'}</h1>
          <p className="text-sm text-slate-400 mt-1">
            Fields marked with <span className="text-red-400">*</span> are required. Everything else is auto-filled.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-green-400 animate-fade-in">Saved!</span>}
          {saving && <span className="text-sm text-slate-400">Saving...</span>}
          <button onClick={() => handleSave('draft')} disabled={saving} className="px-5 py-2.5 text-sm font-medium text-slate-300 bg-white/[0.05] border border-white/[0.08] rounded-xl hover:bg-white/[0.08] transition-colors disabled:opacity-50">
            Save Draft
          </button>
          <button onClick={() => handleSave('published')} disabled={saving} className="px-5 py-2.5 text-sm font-medium text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-50">
            Publish
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Title <span className="text-red-400">*</span></label>
          <input type="text" placeholder="e.g. How to Get Small Business Funding in 2026" value={title}
            onChange={e => { setTitle(e.target.value); if (!isEditing || !slug) setSlug(generateSlug(e.target.value)); setErrors(prev => ({ ...prev, title: '' })); }}
            className={inputClass('title')} />
          {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Post Content <span className="text-red-400">*</span></label>
          <p className="text-xs text-slate-500 mb-2">Write your article. Plain text or HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt; for formatting.</p>
          <textarea rows={14} placeholder={"Write your article here...\n\nSeparate paragraphs with blank lines.\n\nYou can also use HTML:\n<h2>Section Title</h2>\n<p>Paragraph text.</p>"}
            value={body} onChange={e => { setBody(e.target.value); setErrors(prev => ({ ...prev, body: '' })); }}
            className={`${inputClass('body')} font-mono text-xs leading-relaxed min-h-[300px]`} />
          {errors.body && <p className="text-xs text-red-400 mt-1">{errors.body}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Author</label>
            <input type="text" placeholder="Big Think Capital Team" value={author} onChange={e => setAuthor(e.target.value)} className={inputClass()} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className={`${inputClass()} appearance-none`}>
              {['Guides','Education','Growth','Industry','Tips','News'].map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Excerpt / Summary</label>
          <textarea rows={2} placeholder="Auto-generated from content if left blank." value={excerpt} onChange={e => setExcerpt(e.target.value)} className={inputClass()} />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Featured Image URL</label>
          <input type="url" placeholder="https://images.unsplash.com/... (uses default if blank)" value={featuredImage} onChange={e => setFeaturedImage(e.target.value)} className={inputClass()} />
          {featuredImage && <div className="mt-2 w-full max-w-xs h-32 rounded-lg overflow-hidden bg-slate-800"><img src={featuredImage} alt="Preview" className="w-full h-full object-cover" /></div>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Tags</label>
          <div className="flex gap-2 mb-2">
            <input type="text" placeholder="Add a tag and press Enter..." value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} className={`flex-1 ${inputClass()}`} />
            <button onClick={addTag} className="px-4 py-2 text-sm font-medium text-slate-300 bg-white/[0.05] border border-white/[0.08] rounded-xl hover:bg-white/[0.08] transition-colors shrink-0">Add</button>
          </div>
          {tags.length > 0 && <div className="flex flex-wrap gap-2">{tags.map(tag => (
            <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-600/15 text-brand-300 text-xs rounded-full">{tag}<button onClick={() => setTags(tags.filter(t => t !== tag))} className="hover:text-white">&times;</button></span>
          ))}</div>}
        </div>

        <button onClick={() => setShowAdvanced(!showAdvanced)} className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${showAdvanced ? 'rotate-90' : ''}`}><path d="M9 18l6-6-6-6"/></svg>
          Advanced SEO Settings
        </button>

        {showAdvanced && (
          <div className="space-y-4 pl-4 border-l border-white/[0.06] animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">URL Slug</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 shrink-0">/blog/</span>
                <input type="text" value={slug} onChange={e => setSlug(generateSlug(e.target.value))} className={inputClass()} placeholder="auto-generated-from-title" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Meta Title</label>
              <input type="text" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} className={inputClass()} placeholder="Auto: Title | Big Think Capital" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Meta Description</label>
              <textarea rows={2} value={metaDescription} onChange={e => setMetaDescription(e.target.value)} className={inputClass()} placeholder="Auto-generated from excerpt" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Publish Date</label>
              <input type="date" value={publishDate} onChange={e => setPublishDate(e.target.value)} className={inputClass()} />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl mt-4">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${initialData?.status === 'published' ? 'bg-green-500' : 'bg-amber-500'}`} />
            <span className="text-sm text-slate-300">Status: <span className="font-medium text-white capitalize">{initialData?.status || 'new'}</span></span>
          </div>
          <div className="flex gap-3">
            <button onClick={() => handleSave('draft')} disabled={saving} className="px-5 py-2.5 text-sm font-medium text-slate-300 bg-white/[0.05] border border-white/[0.08] rounded-xl hover:bg-white/[0.08] transition-colors disabled:opacity-50">Save Draft</button>
            <button onClick={() => handleSave('published')} disabled={saving} className="px-5 py-2.5 text-sm font-medium text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-50">{initialData?.status === 'published' ? 'Update & Publish' : 'Publish Now'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
