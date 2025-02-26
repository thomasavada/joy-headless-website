import {getPage, getPages, getRelatedPosts, getSettings, getSinglePost, Post, Settings} from '@/lib/ghost';
import {notFound} from 'next/navigation';
import {Metadata, ResolvingMetadata} from 'next';
import {PostContent} from '@/components/blog/post-content';
import {JsonLd} from '@/components/blog/json-ld';
import {RelatedPosts} from "@/components/blog/related-posts";
import {processPostContent} from '@/components/blog/post-content-server';
import {frontEndDomain} from "@/lib/frontend";
import {ForcedTheme} from '../../components/ForcedTheme';
import {CTASection} from '@/components/layout/sections/cta';
import {SharePost} from '@/components/blog/share-post';
import { getSuccessStoryInfo } from '../../lib/strapi';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Try to get as page first
  const [page, { settings }] = await Promise.all([
    getPage(params.slug) as Promise<Post>,
    getSettings() as Promise<Settings>
  ]);

  // If page exists, return page metadata
  if (page) {
    return {
      title: page.meta_title || `${page.title} | ${settings.title}`,
      description: page.meta_description || page.excerpt,
    };
  }

  // If not a page, try to get as blog post
  const post = await getSinglePost(params.slug) as Post;

  if (!post) {
    return {
      title: `Not Found | ${settings.title}`,
      description: 'The requested content could not be found.',
    };
  }

  // Return blog post metadata
  return {
    title: post.meta_title || `${post.title} | ${settings.title}`,
    description: post.meta_description || post.excerpt,
    alternates: {
      canonical: post.canonical_url || post.url || `https://${frontEndDomain}/${post.slug}`,
    },
    openGraph: {
      title: post.og_title || post.title,
      description: post.og_description || post.excerpt,
      images: post.feature_image ? [post.feature_image] : [],
      type: 'article',
      authors: post.primary_author.name,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      url: post.canonical_url || post.url || `https://${frontEndDomain}/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.twitter_title || post.title,
      description: post.twitter_description || post.excerpt,
      images: post.feature_image ? [post.feature_image] : [],
    },
  };
}

export async function generateStaticParams() {
  const pages = await getPages();
  return pages.map((page: Post) => ({
    slug: page.slug,
  }));
}

export const revalidate = 3600; // Revalidate every hour

export default async function Page({ params }: Props) {
  // Try to get as page first
  const page = await getPage(params.slug);

  // If it's a page, use simple layout
  if (page) {
    const processedHtml = processPostContent(page.html);
    return (
      <ForcedTheme theme="light">
        <main className="flex min-h-screen flex-col">
          <div className="container max-w-4xl mx-auto px-4 py-20">
            <h1 className="text-4xl font-bold mb-12">{page.title}</h1>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: processedHtml }}
            />
          </div>
        </main>
      </ForcedTheme>
    );
  }

  // If not a page, try to get as blog post
  const post = await getSinglePost(params.slug);

  if (!post) {
    notFound();
  }

  // Use blog layout for posts
  const processedHtml = processPostContent(post.html);
  const [successStoryInfo, relatedPosts] = await Promise.all([
    getSuccessStoryInfo(post.id).catch(() => null),
    getRelatedPosts(post)
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Person", "Organization"],
        "@id": `https://${frontEndDomain}/#person`,
        // ... existing code ...
      },
      {
        "@type": "WebSite",
        "@id": `https://${frontEndDomain}/#website`,
        // ... existing code ...
      },
      {
        "@type": "ImageObject",
        "@id": post.feature_image,
        // ... existing code ...
      },
      {
        "@type": "WebPage",
        "@id": `https://${frontEndDomain}/${post.slug}/#webpage`,
        // ... existing code ...
      },
      {
        "@type": "Person",
        "@id": `https://${frontEndDomain}/author/${post.primary_author.slug}/`,
        // ... existing code ...
      },
      {
        "@type": "BlogPosting",
        "headline": post.title,
        // ... existing code ...
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://${frontEndDomain}/${post.slug}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "WebPage",
              "@id": `https://${frontEndDomain}`,
              "url": `https://${frontEndDomain}`,
              "name": "Home"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "WebPage",
              "@id": `https://${frontEndDomain}/blog`,
              "url": `https://${frontEndDomain}/blog`,
              "name": "Blog"
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "WebPage",
              "@id": `https://${frontEndDomain}/${post.slug}`,
              "url": `https://${frontEndDomain}/${post.slug}`,
              "name": post.title
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <ForcedTheme theme="light">
        <JsonLd data={jsonLd} />
        <PostContent
          post={post}
          processedHtml={processedHtml}
          successStoryInfo={successStoryInfo}
        />
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="border-y border-border/10 my-8">
            <SharePost title={post.title} slug={post.slug} />
          </div>
          <RelatedPosts posts={relatedPosts} currentPostId={post.id} />
        </div>
        {/* CTA Section */}
        <CTASection
          title={[
            "Ready to grow your business?",
            "Start with Joy today"
          ]}
          buttonText="Start free trial"
          buttonHref="http://shopify.pxf.io/Vx4jma"
        />
      </ForcedTheme>
    </>
  );
}
