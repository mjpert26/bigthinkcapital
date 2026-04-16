'use client';

import { useRouter } from 'next/navigation';
import { usePosts } from '@/lib/PostsContext';
import PostEditor from '@/components/PostEditor';
import { BlogPost } from '@/lib/posts';

export default function NewPostPage() {
  const router = useRouter();
  const { createPost } = usePosts();

  const handleSave = (data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    createPost(data);
    router.push('/admin/posts');
  };

  return <PostEditor onSave={handleSave} />;
}
