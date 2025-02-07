"use client";
import Image from 'next/image';
import { Post } from '@/lib/ghost';
import { CalendarDays, Clock, Link2 } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { TableOfContents } from "@/components/ui/table-of-contents";
import { useEffect, useState } from "react";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

interface PostContentProps {
  post: Post;
}

export function PostContent({ post }: PostContentProps) {
  const [processedContent, setProcessedContent] = useState(post.html);

  useEffect(() => {
    // Process the content to add anchor links to headings
    const doc = new DOMParser().parseFromString(post.html, 'text/html');
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

    headings.forEach((heading) => {
      const text = heading.textContent || '';
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      heading.id = id;

      // Create anchor link
      const anchor = document.createElement('a');
      anchor.href = `#${id}`;
      anchor.className = 'anchor-link';
      anchor.innerHTML = `
        <span class="invisible ml-2 hover:visible group-hover:visible">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </span>
      `;
      
      heading.classList.add('group');
      heading.appendChild(anchor);
    });

    setProcessedContent(doc.body.innerHTML);
  }, [post.html]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title, href: `/blog/${post.slug}` },
  ];

  return (
    <>
      <ReadingProgress />
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
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
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
                [&>*]:mx-auto [&>p>img]:mx-auto
                [&_.anchor-link]:no-underline
                [&_.anchor-link]:text-muted-foreground
                [&_.anchor-link:hover]:text-primary
                prose-headings:scroll-mt-20"
              >
                <div 
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                />
              </div>
            </article>
          </div>
        </div>
      </main>
      <ScrollToTop />
    </>
  );
} 