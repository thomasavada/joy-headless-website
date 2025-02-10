import Image from "next/image";
import Link from "next/link";
import {Post} from "@/lib/types";

interface RelatedPostsProps {
  posts: Post[];
  currentPostId: string;
}

export function RelatedPosts({ posts, currentPostId }: RelatedPostsProps) {
  // Filter out current post and get 3 related posts
  const relatedPosts = posts
    .filter(post => post.id !== currentPostId)
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <div className="py-20 border-t border-border/40">
      <div className="space-y-10">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Related Posts</h2>
          <p className="text-muted-foreground">More articles you might like</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <article className="space-y-4">
                {post.feature_image && (
                  <div className="aspect-[16/9] overflow-hidden rounded-lg bg-muted/20">
                    <Image
                      src={post.feature_image}
                      alt={post.title}
                      width={600}
                      height={340}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="space-y-3">
                  <h3 className="text-lg font-medium line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
