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
  successStoryInfo?: SuccessStoryInfo;
  processedHtml: string;
}

export function PostContent({ post, successStoryInfo, processedHtml }: PostContentProps) {
  // Calculate reading time
  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

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
                <div className="lg:block">
                  <Image
                    src={post.feature_image}
                    alt={post.title}
                    width={1200}
                    height={800}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
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
                  dangerouslySetInnerHTML={{ __html: processedHtml }}
                  className="prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary
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
                    [&_.kg-gallery-image]:relative [&_.kg-gallery-image]:aspect-[3/2] [&_.kg-gallery-image]:overflow-hidden [&_.kg-gallery-image]:rounded-lg
                    [&_.kg-gallery-image_img]:absolute [&_.kg-gallery-image_img]:inset-0 [&_.kg-gallery-image_img]:w-full [&_.kg-gallery-image_img]:h-full [&_.kg-gallery-image_img]:object-cover
                    [&_.kg-callout-card]:flex [&_.kg-callout-card]:gap-4 [&_.kg-callout-card]:p-6 [&_.kg-callout-card]:rounded-lg [&_.kg-callout-card]:my-8
                    [&_.kg-callout-card-blue]:bg-blue-50
                    [&_.kg-callout-card-green]:bg-green-50
                    [&_.kg-callout-card-yellow]:bg-yellow-50
                    [&_.kg-callout-card-red]:bg-red-50
                    [&_.kg-callout-emoji]:text-2xl [&_.kg-callout-emoji]:flex-shrink-0
                    [&_.kg-callout-text]:text-gray-700 [&_.kg-callout-text]:flex-grow
                    [&_.kg-toggle-card]:border [&_.kg-toggle-card]:border-gray-200 [&_.kg-toggle-card]:rounded-lg [&_.kg-toggle-card]:my-8
                    [&_.kg-toggle-heading]:flex [&_.kg-toggle-heading]:items-center [&_.kg-toggle-heading]:justify-between [&_.kg-toggle-heading]:p-4 
                    [&_.kg-toggle-heading]:cursor-pointer [&_.kg-toggle-heading]:bg-gray-50 [&_.kg-toggle-heading]:hover:bg-gray-100 
                    [&_.kg-toggle-heading]:rounded-t-lg [&_.kg-toggle-heading]:transition-colors
                    [&_.kg-toggle-heading-text]:text-base [&_.kg-toggle-heading-text]:font-medium [&_.kg-toggle-heading-text]:text-gray-900 
                    [&_.kg-toggle-heading-text]:flex-grow [&_.kg-toggle-heading-text]:pr-4
                    [&_.kg-toggle-card-icon]:w-5 [&_.kg-toggle-card-icon]:h-5 [&_.kg-toggle-card-icon]:text-gray-500 
                    [&_.kg-toggle-card-icon]:transform [&_.kg-toggle-card-icon]:transition-transform [&_.kg-toggle-card-icon]:duration-200
                    [&_.kg-toggle-content]:p-4 [&_.kg-toggle-content]:text-gray-700
                    [&_.kg-product-card]:my-8 [&_.kg-product-card]:max-w-sm [&_.kg-product-card]:mx-auto
                    [&_.kg-product-card-container]:bg-white [&_.kg-product-card-container]:border [&_.kg-product-card-container]:border-gray-200 
                    [&_.kg-product-card-container]:rounded-lg [&_.kg-product-card-container]:overflow-hidden [&_.kg-product-card-container]:flex 
                    [&_.kg-product-card-container]:flex-col [&_.kg-product-card-container]:w-full
                    [&_.kg-product-card-image]:w-full [&_.kg-product-card-image]:h-64 [&_.kg-product-card-image]:object-cover
                    [&_.kg-product-card-title-container]:p-4 [&_.kg-product-card-title-container]:border-b [&_.kg-product-card-title-container]:border-gray-200
                    [&_.kg-product-card-title]:text-lg [&_.kg-product-card-title]:font-semibold [&_.kg-product-card-title]:text-gray-900
                    [&_.kg-product-card-rating]:flex [&_.kg-product-card-rating]:items-center [&_.kg-product-card-rating]:gap-1 [&_.kg-product-card-rating]:px-4 [&_.kg-product-card-rating]:pt-4
                    [&_.kg-product-card-rating-star]:w-5 [&_.kg-product-card-rating-star]:h-5
                    [&_.kg-product-card-rating-active_svg]:w-full [&_.kg-product-card-rating-active_svg]:h-full [&_.kg-product-card-rating-active_svg]:text-yellow-400 [&_.kg-product-card-rating-active_svg]:fill-current
                    [&_.kg-product-card-description]:p-4 [&_.kg-product-card-description]:text-gray-600
                    [&_.kg-product-card-button]:mx-4 [&_.kg-product-card-button]:mb-4 [&_.kg-product-card-button]:inline-flex 
                    [&_.kg-product-card-button]:items-center [&_.kg-product-card-button]:justify-center [&_.kg-product-card-button]:px-6 
                    [&_.kg-product-card-button]:py-2.5 [&_.kg-product-card-button]:text-sm [&_.kg-product-card-button]:font-medium 
                    [&_.kg-product-card-button]:text-white [&_.kg-product-card-button]:bg-[#0E0C3D] 
                    [&_.kg-product-card-button]:hover:bg-[#0E0C3D]/90 [&_.kg-product-card-button]:rounded-full 
                    [&_.kg-product-card-button]:transition-colors [&_.kg-product-card-button]:no-underline
                    [&_.kg-bookmark-card]:my-8
                    [&_.kg-bookmark-container]:flex [&_.kg-bookmark-container]:border [&_.kg-bookmark-container]:border-gray-200 
                    [&_.kg-bookmark-container]:rounded-lg [&_.kg-bookmark-container]:overflow-hidden 
                    [&_.kg-bookmark-container]:hover:border-gray-300 [&_.kg-bookmark-container]:transition-colors 
                    [&_.kg-bookmark-container]:no-underline
                    [&_.kg-bookmark-content]:flex-grow [&_.kg-bookmark-content]:p-5 [&_.kg-bookmark-content]:flex 
                    [&_.kg-bookmark-content]:flex-col [&_.kg-bookmark-content]:gap-2
                    [&_.kg-bookmark-title]:text-lg [&_.kg-bookmark-title]:font-semibold [&_.kg-bookmark-title]:text-gray-900 
                    [&_.kg-bookmark-title]:line-clamp-2
                    [&_.kg-bookmark-description]:text-sm [&_.kg-bookmark-description]:text-gray-600 [&_.kg-bookmark-description]:line-clamp-2
                    [&_.kg-bookmark-metadata]:flex [&_.kg-bookmark-metadata]:items-center [&_.kg-bookmark-metadata]:gap-3 
                    [&_.kg-bookmark-metadata]:text-xs [&_.kg-bookmark-metadata]:text-gray-500
                    [&_.kg-bookmark-icon]:w-4 [&_.kg-bookmark-icon]:h-4 [&_.kg-bookmark-icon]:object-contain
                    [&_.kg-bookmark-thumbnail]:relative [&_.kg-bookmark-thumbnail]:w-1/3 [&_.kg-bookmark-thumbnail]:min-w-[200px] 
                    [&_.kg-bookmark-thumbnail]:hidden [&_.kg-bookmark-thumbnail]:md:block [&_.kg-bookmark-thumbnail]:bg-gray-100
                    [&_.kg-bookmark-thumbnail_img]:absolute [&_.kg-bookmark-thumbnail_img]:inset-0 
                    [&_.kg-bookmark-thumbnail_img]:w-full [&_.kg-bookmark-thumbnail_img]:h-full [&_.kg-bookmark-thumbnail_img]:object-cover
                    [&_.kg-header-card]:relative [&_.kg-header-card]:w-full [&_.kg-header-card]:py-20 [&_.kg-header-card]:my-8
                    [&_.kg-header-card-content]:container [&_.kg-header-card-content]:mx-auto [&_.kg-header-card-content]:px-4 [&_.kg-header-card-content]:max-w-6xl
                    [&_.kg-header-card-text]:space-y-4
                    [&_.kg-header-card-text.kg-align-center]:text-center
                    [&_.kg-header-card-text.kg-align-right]:text-right
                    [&_.kg-header-card-heading]:text-4xl [&_.kg-header-card-heading]:md:text-5xl [&_.kg-header-card-heading]:lg:text-6xl [&_.kg-header-card-heading]:font-bold
                    [&_.kg-header-card-subheading]:text-xl [&_.kg-header-card-subheading]:md:text-2xl [&_.kg-header-card-subheading]:font-medium [&_.kg-header-card-subheading]:opacity-90"
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
