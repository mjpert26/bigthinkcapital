'use client';

import { useRouter } from 'next/navigation';
import { usePosts, BlogPost } from '@/lib/PostsContext';
import PostEditor from '@/components/PostEditor';

export default function NewPostPage() {
  const router = useRouter();
  const { createPost } = usePosts();

  const handleSave = async (data: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
    const result = await createPost(data);
    if (result) router.push('/admin/posts');
  };

  return <PostEditor onSave={handleSave} />;
}
