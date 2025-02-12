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
    if (post.html) {
      const doc = new DOMParser().parseFromString(post.html, 'text/html');

      // Process YouTube embeds
      const embedCards = doc.querySelectorAll('.kg-embed-card');
      embedCards.forEach((card) => {
        card.className = 'kg-card kg-embed-card my-8';
        const iframe = card.querySelector('iframe');
        if (iframe) {
          iframe.className = 'w-full aspect-video rounded-lg';
          iframe.removeAttribute('width');
          iframe.removeAttribute('height');
        }
      });

      // Process button cards
      const buttonCards = doc.querySelectorAll('.kg-button-card');
      buttonCards.forEach((card) => {
        card.className = 'kg-card kg-button-card kg-align-center my-8';
        const button = card.querySelector('.kg-btn');
        if (button) {
          button.className = 'kg-btn kg-btn-accent inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-[#0E0C3D] hover:bg-[#0E0C3D]/90 rounded-full transition-colors no-underline';
        }
      });

      setProcessedContent(doc.body.innerHTML);
    }
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
                  className="prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary
                    [&_.kg-embed-card]:my-8
                    [&_.kg-embed-card_iframe]:w-full [&_.kg-embed-card_iframe]:aspect-video [&_.kg-embed-card_iframe]:rounded-lg
                    [&_.kg-button-card]:my-8 [&_.kg-button-card]:text-center
                    [&_.kg-btn]:inline-flex [&_.kg-btn]:items-center [&_.kg-btn]:justify-center 
                    [&_.kg-btn]:px-6 [&_.kg-btn]:py-2.5 [&_.kg-btn]:text-sm [&_.kg-btn]:font-medium 
                    [&_.kg-btn]:text-white [&_.kg-btn]:bg-[#0E0C3D] [&_.kg-btn]:hover:bg-[#0E0C3D]/90 
                    [&_.kg-btn]:rounded-full [&_.kg-btn]:transition-colors [&_.kg-btn]:no-underline"
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
