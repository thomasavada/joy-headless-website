import { getPosts, getRelatedPosts, getSettings, getSinglePost, Post, Settings } from '@/lib/ghost';
import { getSuccessStoryInfo } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { PostContent } from '@/components/blog/post-content';
import { JsonLd } from '@/components/blog/json-ld';
import { RelatedPosts } from "@/components/blog/related-posts";
import { frontEndDomain } from "@/lib/frontend";
import { ForcedTheme } from '@/components/ForcedTheme';
import { CTASection } from '@/components/layout/sections/cta';
import { SharePost } from '@/components/blog/share-post';

export const revalidate = 3600; // Revalidate every hour

interface Props {
  params: {
    slug: string;
  };
}

// Generate metadata for each case study
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const [post, { settings }] = await Promise.all([
    getSinglePost(params.slug) as Promise<Post>,
    getSettings() as Promise<Settings>
  ]);

  if (!post) {
    return {
      title: `Not Found | ${settings.title}`,
      description: 'The requested case study could not be found.',
    };
  }

  return {
    title: post.meta_title || `${post.title} | ${settings.title}`,
    description: post.meta_description || post.excerpt,
    alternates: {
      canonical: post.canonical_url || post.url || `https://${frontEndDomain}/case-study/${post.slug}`,
    },
    openGraph: {
      title: post.og_title || post.title,
      description: post.og_description || post.excerpt,
      images: post.feature_image ? [post.feature_image] : [],
      type: 'article',
      authors: post.primary_author.name,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      url: post.canonical_url || post.url || `https://${frontEndDomain}/case-study/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.twitter_title || post.title,
      description: post.twitter_description || post.excerpt,
      images: post.feature_image ? [post.feature_image] : [],
    },
  };
}

// Generate static pages for all case studies at build time
export async function generateStaticParams() {
  const posts = await getPosts({
    filter: 'tag:case-study',
  });
  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}

export default async function CaseStudyPage({ params }: Props) {
  const post = await getSinglePost(params.slug);

  if (!post) {
    notFound();
  }

  // Process the HTML content
  const processedHtml = processPostContent(post.html);

  // Fetch additional info from Strapi and related posts in parallel
  const [successStoryInfo, relatedPosts] = await Promise.all([
    getSuccessStoryInfo(post.id),
    getRelatedPosts(post)
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    publisher: {
      "@type": "Organization",
      name: "Joy Loyalty",
      url: `https://${frontEndDomain}/`,
      logo: {
        "@type": "ImageObject",
        url: `https://${frontEndDomain}/favicon.ico`,
        width: 48,
        height: 48
      }
    },
    author: {
      "@type": "Person",
      name: post.primary_author.name,
      url: `https://${frontEndDomain}/author/${post.primary_author.slug}/`,
      sameAs: []
    },
    headline: post.title,
    url: `https://${frontEndDomain}/case-study/${post.slug}/`,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    image: {
      "@type": "ImageObject",
      url: post.feature_image,
      width: 1200,
      height: 800
    },
    description: post.excerpt,
    mainEntityOfPage: `https://${frontEndDomain}/case-study/${post.slug}/`
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
            <SharePost title={post.title} slug={`case-study/${post.slug}`} />
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
