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
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PostContentProps {
  post: Post;
  processedHtml: string;
  successStoryInfo: SuccessStoryInfo | null;
}

export function PostContent({ post, processedHtml, successStoryInfo }: PostContentProps) {
  // Calculate reading time
  const getReadingTime = (content: string) => {
    if (!content) return 0;
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Loyalty Program", href: "/category/loyalty-program/" },
  ];

  return (
    <>
      <ReadingProgress />
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <div className="w-full bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-16 max-w-6xl">
            {/* Title and Meta */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_600px] gap-12 items-start">
              {/* Left Column - Title and Meta */}
              <div className="space-y-4 lg:sticky lg:top-24">
                {/* Breadcrumbs */}
                <nav>
                  <ol className="flex items-center space-x-1 text-xs text-gray-400">
                    {breadcrumbItems.map((item, index) => (
                      <li key={item.href} className="flex items-center">
                        <Link
                          href={item.href}
                          className="hover:text-primary transition-colors"
                        >
                          {item.label}
                        </Link>
                        {index < breadcrumbItems.length - 1 && (
                          <ChevronRight className="w-3 h-3 mx-1" />
                        )}
                      </li>
                    ))}
                  </ol>
                </nav>

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
                    <span>{getReadingTime(processedHtml)} min read</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Featured Image */}
              {post.feature_image && (
                <div className="lg:block overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={post.feature_image}
                    alt={post.title}
                    width={1200}
                    height={800}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                    className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
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
                  dangerouslySetInnerHTML={{ __html: processedHtml }}
                  className="prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary
                    [&_.kg-card]:my-8
                    [&_.kg-image-card]:overflow-hidden [&_.kg-image-card]:rounded-lg [&_.kg-image-card]:shadow-md
                    [&_.kg-image-card_img]:w-full [&_.kg-image-card_img]:h-auto
                    [&_.kg-card-hascaption]:space-y-4

                    [&_.kg-embed-card]:my-8
                    [&_.kg-embed-card_iframe]:w-full [&_.kg-embed-card_iframe]:aspect-video [&_.kg-embed-card_iframe]:rounded-lg

                    [&_.kg-button-card]:my-8 [&_.kg-button-card]:text-center
                    [&_.kg-btn]:inline-flex [&_.kg-btn]:items-center [&_.kg-btn]:justify-center
                    [&_.kg-btn]:px-6 [&_.kg-btn]:py-2.5 [&_.kg-btn]:text-sm [&_.kg-btn]:font-medium
                    [&_.kg-btn]:text-white [&_.kg-btn]:bg-[#0E0C3D] [&_.kg-btn]:hover:bg-[#0E0C3D]/90
                    [&_.kg-btn]:rounded-full [&_.kg-btn]:transition-colors [&_.kg-btn]:no-underline

                    [&_.kg-gallery-card]:my-8
                    [&_.kg-gallery-container]:flex [&_.kg-gallery-container]:flex-col [&_.kg-gallery-container]:gap-4
                    [&_.kg-gallery-row]:grid [&_.kg-gallery-row]:grid-cols-1 [&_.kg-gallery-row]:sm:grid-cols-2 [&_.kg-gallery-row]:lg:grid-cols-3 [&_.kg-gallery-row]:gap-4
                    [&_.kg-gallery-image]:overflow-hidden [&_.kg-gallery-image]:rounded-lg [&_.kg-gallery-image]:shadow-md
                    [&_.kg-gallery-image_img]:w-full [&_.kg-gallery-image_img]:h-auto [&_.kg-gallery-image_img]:hover:scale-105 [&_.kg-gallery-image_img]:transition-transform [&_.kg-gallery-image_img]:duration-500

                    [&_.kg-callout-card]:flex [&_.kg-callout-card]:gap-4 [&_.kg-callout-card]:p-6 [&_.kg-callout-card]:rounded-lg [&_.kg-callout-card]:my-8
                    [&_.kg-callout-card-blue]:bg-blue-50
                    [&_.kg-callout-card-green]:bg-green-50
                    [&_.kg-callout-card-yellow]:bg-yellow-50
                    [&_.kg-callout-card-red]:bg-red-50
                    [&_.kg-callout-emoji]:text-2xl [&_.kg-callout-emoji]:flex-shrink-0
                    [&_.kg-callout-text]:text-gray-700 [&_.kg-callout-text]:flex-grow

                    [&_figcaption]:text-center [&_figcaption]:mt-4 [&_figcaption]:text-sm [&_figcaption]:text-gray-500"
                />
              </article>
            </div>

            {/* Sidebar */}
            <aside className="order-first lg:order-last">
              <div className="sticky top-24 space-y-6">
                {/* Stats Section */}
                {successStoryInfo && <StatsCard info={successStoryInfo} />}

                {/* Table of Contents */}
                <TableOfContents content={processedHtml} />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
