import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  feature_image: string;
  published_at: string;
  reading_time: number;
  primary_author: {
    name: string;
    profile_image: string;
  };
}

interface PostCardProps {
  post: Post;
  priority?: boolean;
}

export function PostCard({ post, priority = false }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/9]">
          <Image
            src={post.feature_image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/blog/${post.slug}`} className="block">
          <h2 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="relative w-6 h-6 rounded-full overflow-hidden mr-2">
                <Image
                  src={post.primary_author.profile_image}
                  alt={post.primary_author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span>{post.primary_author.name}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span>{formatDate(post.published_at)}</span>
            <span>{post.reading_time} min read</span>
          </div>
        </div>
      </div>
    </article>
  );
}