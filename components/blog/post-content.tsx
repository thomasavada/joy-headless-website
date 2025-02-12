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

      // Process gallery cards
      const galleryCards = doc.querySelectorAll('.kg-gallery-card');
      galleryCards.forEach((card) => {
        card.className = 'kg-card kg-gallery-card my-8';
        
        const container = card.querySelector('.kg-gallery-container');
        if (container) {
          container.className = 'kg-gallery-container flex flex-col gap-4';
        }

        const rows = card.querySelectorAll('.kg-gallery-row');
        rows.forEach((row) => {
          row.className = 'kg-gallery-row grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';
        });

        const images = card.querySelectorAll('.kg-gallery-image');
        images.forEach((imageDiv) => {
          imageDiv.className = 'kg-gallery-image relative aspect-[3/2] overflow-hidden rounded-lg';
          
          const img = imageDiv.querySelector('img');
          if (img) {
            img.className = 'absolute inset-0 w-full h-full object-cover';
          }
        });
      });

      // Process callout cards
      const calloutCards = doc.querySelectorAll('.kg-callout-card');
      calloutCards.forEach((card) => {
        // Base classes for all callout cards
        let cardClasses = 'kg-card kg-callout-card flex gap-4 p-6 rounded-lg my-8';
        
        // Add color-specific background
        if (card.classList.contains('kg-callout-card-blue')) {
          cardClasses += ' bg-blue-50';
        } else if (card.classList.contains('kg-callout-card-green')) {
          cardClasses += ' bg-green-50';
        } else if (card.classList.contains('kg-callout-card-yellow')) {
          cardClasses += ' bg-yellow-50';
        } else if (card.classList.contains('kg-callout-card-red')) {
          cardClasses += ' bg-red-50';
        } else {
          cardClasses += ' bg-gray-50';
        }
        
        card.className = cardClasses;

        // Style the emoji container
        const emojiDiv = card.querySelector('.kg-callout-emoji');
        if (emojiDiv) {
          emojiDiv.className = 'kg-callout-emoji text-2xl flex-shrink-0';
        }

        // Style the text container
        const textDiv = card.querySelector('.kg-callout-text');
        if (textDiv) {
          textDiv.className = 'kg-callout-text text-gray-700 flex-grow';
        }
      });

      // Process toggle cards
      const toggleCards = doc.querySelectorAll('.kg-toggle-card');
      toggleCards.forEach((card) => {
        card.className = 'kg-card kg-toggle-card border border-gray-200 rounded-lg my-8';
        
        const heading = card.querySelector('.kg-toggle-heading');
        if (heading) {
          heading.className = 'kg-toggle-heading flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-t-lg transition-colors';
        }

        const headingText = card.querySelector('.kg-toggle-heading-text');
        if (headingText) {
          headingText.className = 'kg-toggle-heading-text text-base font-medium text-gray-900 flex-grow pr-4';
        }

        const button = card.querySelector('.kg-toggle-card-icon');
        if (button) {
          button.className = 'kg-toggle-card-icon w-5 h-5 text-gray-500 transform transition-transform duration-200';
          // Update SVG styling
          const svg = button.querySelector('svg');
          if (svg) {
            svg.setAttribute('class', 'w-5 h-5');
          }
          const path = button.querySelector('path');
          if (path) {
            path.setAttribute('stroke', 'currentColor');
            path.setAttribute('stroke-width', '2');
            path.setAttribute('fill', 'none');
          }
        }

        const content = card.querySelector('.kg-toggle-content');
        if (content) {
          content.className = 'kg-toggle-content hidden p-4 text-gray-700';
        }

        // Add click handler via data attribute
        card.setAttribute('data-toggle', 'true');
      });

      setProcessedContent(doc.body.innerHTML);
    }
  }, [post.html]);

  // Add useEffect for toggle functionality
  useEffect(() => {
    const handleToggleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const toggleCard = target.closest('.kg-toggle-card');
      
      if (toggleCard) {
        const content = toggleCard.querySelector('.kg-toggle-content');
        const icon = toggleCard.querySelector('.kg-toggle-card-icon');
        
        if (content && icon) {
          const isHidden = content.classList.contains('hidden');
          
          // Toggle content visibility
          content.classList.toggle('hidden');
          
          // Rotate icon
          if (isHidden) {
            icon.classList.add('rotate-180');
          } else {
            icon.classList.remove('rotate-180');
          }
        }
      }
    };

    // Add click listeners to all toggle cards
    const toggleCards = document.querySelectorAll('[data-toggle="true"]');
    toggleCards.forEach(card => {
      const heading = card.querySelector('.kg-toggle-heading');
      if (heading) {
        heading.addEventListener('click', handleToggleClick);
      }
    });

    // Cleanup
    return () => {
      toggleCards.forEach(card => {
        const heading = card.querySelector('.kg-toggle-heading');
        if (heading) {
          heading.removeEventListener('click', handleToggleClick);
        }
      });
    };
  }, [processedContent]);

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
                    [&_.kg-toggle-content]:p-4 [&_.kg-toggle-content]:text-gray-700"
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
