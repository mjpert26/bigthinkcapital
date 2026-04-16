'use client';

import { useParams, useRouter } from 'next/navigation';
import { usePosts, BlogPost } from '@/lib/PostsContext';
import PostEditor from '@/components/PostEditor';
import Link from 'next/link';

export default function EditPostPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { getPost, updatePost, loading } = usePosts();
  const post = getPost(id);

  if (loading) return <div className="p-10 text-center"><p className="text-slate-400">Loading...</p></div>;

  if (!post) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-display text-white mb-3">Post not found</h2>
        <Link href="/admin/posts" className="text-brand-400 hover:text-brand-300 text-sm">Back to Posts</Link>
      </div>
    );
  }

  const handleSave = async (data: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
    const result = await updatePost(id, data);
    if (result) router.push('/admin/posts');
  };

  return <PostEditor initialData={post} onSave={handleSave} isEditing />;
}
