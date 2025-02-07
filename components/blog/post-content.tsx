"use client";
import Image from 'next/image';
import { Post } from '@/lib/ghost';
import { CalendarDays, Clock } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { TableOfContents } from "@/components/ui/table-of-contents";

interface PostContentProps {
  post: Post;
}

export function PostContent({ post }: PostContentProps) {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title, href: `/blog/${post.slug}` },
  ];

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-b from-background/60 to-background border-b border-border/40">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {/* Title and Meta */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">
            {/* Left Column - Title and Meta */}
            <div>
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

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Author and Date */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-3">
                  {post.primary_author.profile_image && (
                    <Image
                      src={post.primary_author.profile_image}
                      alt={post.primary_author.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-medium">{post.primary_author.name}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <time dateTime={post.published_at}>
                        {new Date(post.published_at).toLocaleDateString()}
                      </time>
                      <span>•</span>
                      <span>{Math.ceil(post.html.length / 1000)} min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Featured Image */}
            {post.feature_image && (
              <div className="hidden lg:block rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={post.feature_image}
                  alt={post.title}
                  width={400}
                  height={300}
                  className="w-full h-[300px] object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-12">
          {/* Sidebar with Table of Contents */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents content={post.html} />
            </div>
          </div>

          {/* Main Content */}
          <article className="max-w-3xl">
            {/* Mobile Featured Image */}
            {post.feature_image && (
              <div className="lg:hidden mb-12 rounded-xl overflow-hidden shadow-2xl">
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
            <div className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-p:text-lg prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
              prose-code:text-primary prose-code:bg-primary/10 prose-code:rounded prose-code:px-1
              prose-img:rounded-xl prose-img:shadow-lg prose-img:mx-auto
              prose-pre:bg-card prose-pre:border prose-pre:border-border/40
              [&>*]:mx-auto [&>p>img]:mx-auto"
            >
              <div 
                className="prose-headings:scroll-mt-20"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </div>
          </article>
        </div>
      </div>
    </main>
  );
} 