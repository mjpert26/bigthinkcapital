'use client';

import { useParams, useRouter } from 'next/navigation';
import { usePosts } from '@/lib/PostsContext';
import PostEditor from '@/components/PostEditor';
import { BlogPost } from '@/lib/posts';
import Link from 'next/link';

export default function EditPostPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { getPost, updatePost } = usePosts();
  const post = getPost(id);

  if (!post) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-display text-white mb-3">Post not found</h2>
        <p className="text-slate-400 mb-6">The post you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/admin/posts" className="text-brand-400 hover:text-brand-300 text-sm">
          Back to Posts
        </Link>
      </div>
    );
  }

  const handleSave = (data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    updatePost(id, data);
    router.push('/admin/posts');
  };

  return <PostEditor initialData={post} onSave={handleSave} isEditing />;
}
