import Image from 'next/image';
import Link from 'next/link';
import {formatDate} from '@/lib/utils';
import { Post, Tag } from "@/lib/types";

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'featured' | 'secondary';
}

export function PostCard({ post, variant = 'default' }: PostCardProps) {
  const renderTags = (tags: Tag[]) => (
    <div className="flex flex-wrap gap-2 mb-3">
      {tags.slice(0, 3).map(tag => (
        <span
          key={tag.id}
          className="px-2.5 py-1 bg-primary/5 text-primary rounded-full text-xs font-medium"
        >
          {tag.name}
        </span>
      ))}
    </div>
  );

  const variants = {
    default: {
      imageSize: { width: 400, height: 225 },
      titleSize: 'text-lg',
      excerptSize: 'text-xs',
      spacing: 'space-y-3',
    },
    featured: {
      imageSize: { width: 1000, height: 562 },
      titleSize: 'text-2xl',
      excerptSize: 'text-lg',
      spacing: 'space-y-4',
    },
    secondary: {
      imageSize: { width: 400, height: 225 },
      titleSize: 'text-base',
      excerptSize: 'text-sm',
      spacing: 'space-y-3',
    },
  };

  const styles = variants[variant];

  return (
    <article className={styles.spacing}>
      {post.feature_image && (
        <div className="aspect-[16/9] overflow-hidden rounded-lg bg-muted/20">
          <Image
            src={post.feature_image}
            alt={post.title}
            width={styles.imageSize.width}
            height={styles.imageSize.height}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            priority={variant === 'featured'}
          />
        </div>
      )}
      <div className="space-y-2">
        {post.tags && renderTags(post.tags)}
        <h3 className={`${styles.titleSize} font-heading font-medium line-clamp-2 group-hover:text-primary transition-colors`}>
          {post.title}
        </h3>
        <p className={`${styles.excerptSize} text-muted-foreground opacity-60 line-clamp-2`}>
          {post.excerpt}
        </p>
      </div>
    </article>
  );
}
