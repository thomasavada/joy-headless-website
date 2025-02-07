import { getSinglePost, getPosts, Post } from '@/lib/ghost';
import Image from 'next/image';
import { FooterSection } from "@/components/layout/sections/footer";
import { notFound } from 'next/navigation';
import { CalendarDays, Clock } from "lucide-react";

interface Props {
  params: {
    slug: string;
  };
}

// Generate static pages for all posts at build time
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: Props) {
  const post = await getSinglePost(params.slug) as Post;

  if (!post) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-b from-background/60 to-background border-b border-border/40">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex gap-2 mb-6">
              {post.tags.map(tag => (
                <span 
                  key={tag.id}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
            {/* Author */}
            <div className="flex items-center gap-3">
              {post.primary_author.profile_image ? (
                <Image
                  src={post.primary_author.profile_image}
                  alt={post.primary_author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {post.primary_author.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-medium text-foreground">
                  {post.primary_author.name}
                </p>
                {post.primary_author.bio && (
                  <p className="text-sm">{post.primary_author.bio}</p>
                )}
              </div>
            </div>

            {/* Date and Reading Time */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                <time dateTime={post.published_at}>
                  {new Date(post.published_at).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{Math.ceil(post.html.length / 1000)} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Featured Image */}
        {post.feature_image && (
          <div className="mb-12 -mt-20 rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={post.feature_image}
              alt={post.title}
              width={1200}
              height={630}
              className="w-full"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          <div 
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-p:text-lg prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
              prose-code:text-primary prose-code:bg-primary/10 prose-code:rounded prose-code:px-1
              prose-img:rounded-xl prose-img:shadow-lg
              prose-pre:bg-card prose-pre:border prose-pre:border-border/40"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </article>

      <FooterSection />
    </main>
  );
}