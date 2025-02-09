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
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <ReadingProgress />
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <div className="w-full bg-gradient-to-b from-background/60 to-background border-b border-border/40">
          <div className="container mx-auto px-4 py-16 max-w-6xl">
            {/* Title and Meta */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Title and Meta */}
              <div>
                {/* Breadcrumb - Refined colors for better sharpness */}
                <div className="text-[10px] text-[#4B5563] dark:text-[#D1D5DB] mb-8">
                  <Breadcrumb 
                    items={breadcrumbItems} 
                    className="tracking-wider uppercase"
                  />
                </div>

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

                {/* Title and Excerpt - Adjusted for better readability */}
                <h1 className="text-3xl font-bold mb-6 leading-tight">
                  {post.title}
                </h1>
                
                {post.excerpt && (
                  <p className="text-[15px] text-muted-foreground mb-6 leading-relaxed max-w-[95%]">
                    {post.excerpt}
                  </p>
                )}

                {/* Author and Meta - Updated sizes */}
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
                      <div className="flex items-center gap-4 text-[12px] text-muted/60 dark:text-muted-dark/60">
                        <time dateTime={post.published_at}>
                          {formatDate(post.published_at)}
                        </time>
                        <span>•</span>
                        <span>
                          {Math.ceil(post.html.length / 1000)} min read
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Featured Image */}
              {post.feature_image && (
                <div className="hidden lg:block rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src={post.feature_image}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-[400px] object-cover rounded-lg"
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

            {/* Main Content - Adjusted for better readability */}
            <article className="max-w-3xl">
              {/* Schedule Demo Callout */}
              <div className="lg:hidden mb-12">
                <a 
                  href="https://cal.com/sales-avada/joy-demo-call" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block bg-card rounded-lg border p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium">Request a demo</h3>
                    <p className="text-sm text-muted-foreground">
                      Get on a demo with Rivo, and we'll walk you through the app and help you migrate over from another solution.
                    </p>
                    <div className="flex items-center gap-2 text-primary text-sm font-medium mt-2">
                      Request a demo
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>
              </div>

              {/* Content - Updated typography with brand fonts */}
              <div className="prose dark:prose-invert max-w-none
                font-sans
                prose-p:text-[15px] prose-p:leading-[1.7] prose-p:mb-3 prose-p:text-muted-foreground/80
                prose-headings:font-heading prose-headings:leading-snug prose-headings:tracking-tight
                prose-h1:text-[28px] prose-h1:mb-3 prose-h1:font-medium prose-h1:text-foreground/95
                prose-h2:text-[22px] prose-h2:mt-6 prose-h2:mb-2 prose-h2:font-medium prose-h2:text-foreground/95
                prose-h3:text-[18px] prose-h3:mt-4 prose-h3:mb-2 prose-h3:font-medium prose-h3:text-foreground/95
                prose-strong:font-medium prose-strong:text-foreground/90
                prose-em:text-muted-foreground/70 prose-em:font-normal
                prose-a:text-primary/90 prose-a:underline hover:prose-a:text-primary prose-a:font-medium
                prose-li:text-[15px] prose-li:mb-1 prose-li:leading-[1.7] prose-li:text-muted-foreground/80
                prose-img:rounded-lg prose-img:shadow-lg
                prose-pre:bg-muted/5 prose-pre:border prose-pre:border-border/30 prose-pre:font-mono
                prose-code:text-primary/90 prose-code:bg-primary/5 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono
                prose-blockquote:border-l-primary/30 prose-blockquote:text-muted-foreground/70 prose-blockquote:italic
                [&>*:first-child]:mt-0
                [&_.anchor-link]:no-underline
                [&_.anchor-link]:text-muted-foreground/50
                [&_.anchor-link:hover]:text-primary/70
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