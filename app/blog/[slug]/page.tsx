import {getPosts, getRelatedPosts, getSettings, getSinglePost, Post, Settings} from '@/lib/ghost';
import {notFound} from 'next/navigation';
import {Metadata, ResolvingMetadata} from 'next';
import {PostContent} from '@/components/blog/post-content';
import {JsonLd} from '@/components/blog/json-ld';
import {RelatedPosts} from "@/components/blog/related-posts";
import { processPostContent } from '@/components/blog/post-content-server';

interface Props {
  params: {
    slug: string;
  };
}

// Generate metadata for each blog post
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
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: post.meta_title || `${post.title} | ${settings.title}`,
    description: post.meta_description || post.excerpt,
    alternates: {
      canonical: post.canonical_url || post.url || `https://webv2.joy.so/blog/${post.slug}`,
    },
    openGraph: {
      title: post.og_title || post.title,
      description: post.og_description || post.excerpt,
      images: post.feature_image ? [post.feature_image] : [],
      type: 'article',
      authors: post.primary_author.name,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      url: post.canonical_url || post.url || `https://webv2.joy.so/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.twitter_title || post.title,
      description: post.twitter_description || post.excerpt,
      images: post.feature_image ? [post.feature_image] : [],
    },
  };
}

// Generate static pages for all posts at build time
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: Props) {
  const post = await getSinglePost(params.slug) as Post;
  const relatedPosts = await getRelatedPosts(post);
  const processedHtml = processPostContent(post.html);

  if (!post) {
    notFound();
  }

  // Create JSON-LD data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "publisher": {
      "@type": "Organization",
      "name": "Joy Loyalty",
      "url": "https://webv2.joy.so/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://webv2.joy.so/favicon.ico",
        "width": 48,
        "height": 48
      }
    },
    "author": {
      "@type": "Person",
      "name": post.primary_author.name,
      "url": `https://webv2.joy.so/author/${post.primary_author.slug}/`,
      "sameAs": []
    },
    "headline": post.title,
    "url": `https://webv2.joy.so/${post.slug}/`,
    "datePublished": post.published_at,
    "dateModified": post.updated_at,
    "image": {
      "@type": "ImageObject",
      "url": post.feature_image,
      "width": 1200,
      "height": 800
    },
    "description": post.excerpt,
    "mainEntityOfPage": `https://webv2.joy.so/${post.slug}/`
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PostContent 
        post={post} 
        processedHtml={processedHtml}
        successStoryInfo={post.successStoryInfo} 
      />
      <div className="container mx-auto px-4 max-w-6xl">
        <RelatedPosts posts={relatedPosts} currentPostId={post.id} />
      </div>
    </>
  );
}
