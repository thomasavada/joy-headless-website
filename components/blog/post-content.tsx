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

interface PostContentProps {
  post: Post;
  successStoryInfo?: SuccessStoryInfo;
}

export function PostContent({ post, successStoryInfo }: PostContentProps) {
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
        <div className="w-full bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-16 max-w-6xl">
            {/* Title and Meta */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Title and Meta */}
              <div>
                {/* Tags */}
                {post.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map(tag => (
                      <span
                        key={tag.id}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title and Excerpt */}
                <h1 className="text-3xl font-bold mb-6 text-gray-900">
                  {post.title}
                </h1>

                {post.excerpt && (
                  <p className="text-base text-gray-600 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </div>

              {/* Right Column - Featured Image */}
              {post.feature_image && (
                <div className="hidden lg:block">
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

        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
            {/* Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Stats Section */}
                {successStoryInfo && <StatsCard info={successStoryInfo} />}

                {/* Table of Contents */}
                <TableOfContents content={post.html} />
              </div>
            </div>

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
          </div>
        </div>
      </main>
      <ScrollToTop />
    </>
  );
}
