import Image from "next/image";
import Link from "next/link";
import {Post, Tag} from "@/lib/types";

interface PostGridProps {
  featuredPosts: Post[];
  regularPosts: Post[];
}

export function PostGrid({ featuredPosts, regularPosts }: PostGridProps) {
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


  return (
    <div className="space-y-24">
      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section>
          <h2 className="text-lg font-medium text-muted-foreground mb-8">
            Featured Posts ({featuredPosts.length})
          </h2>

          {featuredPosts.length === 1 ? (
            // Single featured post - Full width layout
            <div className="max-w-4xl">
              <Link
                href={`/${featuredPosts[0].slug}`}
                className="group block"
                target="_blank"
              >
                <article className="grid md:grid-cols-2 gap-8 items-center">
                  {featuredPosts[0].feature_image && (
                    <div className="aspect-[16/9] overflow-hidden rounded-lg bg-muted/20">
                      <Image
                        src={featuredPosts[0].feature_image}
                        alt={featuredPosts[0].title}
                        width={1200}
                        height={675}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        priority
                      />
                    </div>
                  )}
                  <div className="space-y-4">
                    {featuredPosts[0].tags && renderTags(featuredPosts[0].tags)}
                    <h3 className="text-2xl font-heading font-medium leading-snug group-hover:text-primary transition-colors">
                      {featuredPosts[0].title}
                    </h3>
                    <p className="text-lg text-muted-foreground/80">
                      {featuredPosts[0].excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            </div>
          ) : (
            // Multiple featured posts - Left big, right small layout
            <div className="grid md:grid-cols-[1.5fr_1fr] gap-8">
              {/* Main featured post */}
              <Link
                href={`/${featuredPosts[0].slug}`}
                className="group"
                target="_blank"
              >
                <article className="space-y-4">
                  {featuredPosts[0].feature_image && (
                    <div className="aspect-[16/9] overflow-hidden rounded-lg bg-muted/20">
                      <Image
                        src={featuredPosts[0].feature_image}
                        alt={featuredPosts[0].title}
                        width={1000}
                        height={562}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        priority
                      />
                    </div>
                  )}
                  <div className="space-y-3">
                    {featuredPosts[0].tags && renderTags(featuredPosts[0].tags)}
                    <h3 className="text-2xl font-heading font-medium line-clamp-2 group-hover:text-primary transition-colors">
                      {featuredPosts[0].title}
                    </h3>
                    <p className="text-lg text-muted-foreground/80 line-clamp-3">
                      {featuredPosts[0].excerpt}
                    </p>
                  </div>
                </article>
              </Link>

              {/* Secondary featured posts */}
              <div className="space-y-6">
                {featuredPosts.slice(1).map((post) => (
                  <Link
                    key={post.id}
                    href={`/${post.slug}`}
                    className="group block"
                    target="_blank"
                  >
                    <article className="space-y-3">
                      {post.feature_image && (
                        <div className="aspect-[16/9] overflow-hidden rounded-lg bg-muted/20">
                          <Image
                            src={post.feature_image}
                            alt={post.title}
                            width={400}
                            height={225}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="space-y-2">
                        {post.tags && renderTags(post.tags)}
                        <h3 className="text-base font-heading font-medium line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground/80 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                    </article>
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
              <Link
                key={post.id}
                href={`/${post.slug}`}
                className="group"
                target="_blank"
              >
                <article className="space-y-3">
                  {post.feature_image && (
                    <div className="aspect-[16/9] overflow-hidden rounded-lg bg-muted/20">
                      <Image
                        src={post.feature_image}
                        alt={post.title}
                        width={400}
                        height={225}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    {post.tags && renderTags(post.tags)}
                    <h3 className="text-sm font-heading font-medium line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-muted-foreground/80 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
