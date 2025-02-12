"use client";
import Image from 'next/image';
import {Post} from '@/lib/ghost';
import {TableOfContents} from "@/components/ui/table-of-contents";
import {useEffect, useState} from "react";
import {ReadingProgress} from "@/components/blog/reading-progress";
import {ScrollToTop} from "@/components/ui/scroll-to-top";
import {SuccessStoryInfo} from '@/lib/strapi';
import {StatsCard} from '@/components/case-study/stats-card';
import {MetricsSection} from '@/components/case-study/metrics-section';
import { formatDate } from '@/lib/utils';
import { Clock, Calendar, User } from 'lucide-react';

interface PostContentProps {
  post: Post;
  successStoryInfo?: SuccessStoryInfo;
}

export function PostContent({ post, successStoryInfo }: PostContentProps) {
  const [processedContent, setProcessedContent] = useState(post.html);

  // Calculate reading time
  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

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

    // Process images
    const images = doc.querySelectorAll('img');
    images.forEach((img) => {
      const src = img.getAttribute('src');
      if (src) {
        // Transform the base URL first
        let transformedSrc = src;
        if (src.includes('storage.googleapis.com/joy-ghost-cms.firebasestorage.app')) {
          const pathMatch = src.match(/firebasestorage\.app\/(.*)/);
          if (pathMatch && pathMatch[1]) {
            transformedSrc = `https://cdn-web.joy.so/cdn/image/${pathMatch[1]}`;
          }
        }

        // Create responsive srcset with transformed URL
        const widths = [400, 600, 800, 1200, 1600];
        const srcset = widths
          .map(width => `${transformedSrc}?width=${width} ${width}w`)
          .join(', ');
        
        // Set sizes attribute based on container context
        let sizes = '(max-width: 768px) 100vw, ';
        if (img.parentElement?.classList.contains('full-width')) {
          sizes += '1200px';
        } else if (img.parentElement?.classList.contains('medium')) {
          sizes += '600px';
        } else if (img.parentElement?.classList.contains('small')) {
          sizes += '400px';
        } else {
          sizes += '800px';
        }
        
        // Set attributes
        img.setAttribute('srcset', srcset);
        img.setAttribute('sizes', sizes);
        img.setAttribute('loading', 'lazy');
        img.className = 'w-full h-auto rounded-lg';
        
        // Set default src with transformed URL
        img.setAttribute('src', `${transformedSrc}?width=800`);
      }
    });

    setProcessedContent(doc.body.innerHTML);
  }, [post.html]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <>
      <ReadingProgress />
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <div className="w-full bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-16 max-w-6xl">
            {/* Title and Meta */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Title and Meta */}
              <div className="space-y-4">
                {/* Tags */}
                {post.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span
                        key={tag.id}
                        className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-900">
                  {post.title}
                </h1>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                {/* Meta Information */}
                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                  {/* Author */}
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>{post.primary_author.name}</span>
                  </div>

                  {/* Publication Date */}
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <time dateTime={post.published_at}>
                      {formatDate(post.published_at)}
                    </time>
                  </div>

                  {/* Reading Time */}
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{getReadingTime(post.html)} min read</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Featured Image */}
              {post.feature_image && (
                <div className="lg:block">
                  <Image
                    src={post.feature_image}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover rounded-lg"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12">
            {/* Main Content Column */}
            <div>
              {/* Metrics Section */}
              {successStoryInfo && <MetricsSection info={successStoryInfo} />}

              {/* Article Content */}
              <article className="prose prose-sm max-w-none">
                <div
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                  className="prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary"
                />
              </article>
            </div>

            {/* Sidebar */}
            <aside className="order-first lg:order-last">
              <div className="sticky top-24 space-y-6">
                {/* Stats Section */}
                {successStoryInfo && <StatsCard info={successStoryInfo} />}

                {/* Table of Contents */}
                <TableOfContents content={post.html} />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
