import Link from "next/link";
import { Post } from "@/lib/ghost";
import { PostCard } from "./post-card";

interface RelatedPostsProps {
  posts: Post[];
  currentPostId: string;
}

export function RelatedPosts({ posts, currentPostId }: RelatedPostsProps) {
  // Transform the URL to case-study format if it's a success story
  const getPostUrl = (post: Post) => `/${post.slug}`;

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
            <Link key={post.id} href={getPostUrl(post)} className="group">
              <PostCard post={post} variant="default" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
