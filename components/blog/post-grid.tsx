import Link from "next/link";
import { Post } from "@/lib/types";
import { PostCard } from "./post-card";

interface PostGridProps {
  featuredPosts: Post[];
  regularPosts: Post[];
}

export function PostGrid({ featuredPosts, regularPosts }: PostGridProps) {
  return (
    <div className="space-y-24">
      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section>
          <h2 className="text-lg font-medium text-muted-foreground mb-8">
            Featured Posts ({featuredPosts.length})
          </h2>

          {featuredPosts.length === 1 ? (
            // Single featured post
            <div className="max-w-4xl">
              <Link href={`/${featuredPosts[0].slug}`} className="group" target="_blank">
                <PostCard post={featuredPosts[0]} variant="featured" />
              </Link>
            </div>
          ) : (
            // Multiple featured posts
            <div className="grid md:grid-cols-[1.5fr_1fr] gap-8">
              <Link href={`/${featuredPosts[0].slug}`} className="group" target="_blank">
                <PostCard post={featuredPosts[0]} variant="featured" />
              </Link>

              <div className="space-y-6">
                {featuredPosts.slice(1).map((post) => (
                  <Link key={post.id} href={`/${post.slug}`} className="group" target="_blank">
                    <PostCard post={post} variant="secondary" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Regular Posts Section */}
      <section>
        <div className="space-y-8">
          <h2 className="text-lg font-medium text-muted-foreground">All Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Link key={post.id} href={`/${post.slug}`} className="group" target="_blank">
                <PostCard post={post} variant="default" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
