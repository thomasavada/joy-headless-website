import { getSinglePost, getPosts, getSettings, Post, Settings } from '@/lib/ghost';
import { FooterSection } from "@/components/layout/sections/footer";
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { PostContent } from '@/components/blog/post-content';
import { JsonLd } from '@/components/blog/json-ld';

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
      canonical: post.canonical_url || post.url || `https://joy.so/blog/${post.slug}`,
    },
    openGraph: {
      title: post.og_title || post.title,
      description: post.og_description || post.excerpt,
      images: post.feature_image ? [post.feature_image] : [],
      type: 'article',
      authors: post.primary_author.name,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      url: post.canonical_url || post.url || `https://joy.so/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.twitter_title || post.title,
      description: post.twitter_description || post.excerpt,
      images: post.feature_image ? [post.feature_image] : [],
    },
  };
}

// Update the Post interface in lib/ghost.ts to include these fields
interface Post {
  // ... existing fields
  meta_title?: string;
  meta_description?: string;
  og_title?: string;
  og_description?: string;
  twitter_title?: string;
  twitter_description?: string;
  updated_at: string;
  canonical_url?: string;
  url?: string;
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
      "url": "https://ghost.joy.so/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ghost.joy.so/favicon.ico",
        "width": 48,
        "height": 48
      }
    },
    "author": {
      "@type": "Person",
      "name": post.primary_author.name,
      "url": `https://ghost.joy.so/author/${post.primary_author.slug}/`,
      "sameAs": []
    },
    "headline": post.title,
    "url": `https://ghost.joy.so/${post.slug}/`,
    "datePublished": post.published_at,
    "dateModified": post.updated_at,
    "image": {
      "@type": "ImageObject",
      "url": post.feature_image,
      "width": 1200,
      "height": 800
    },
    "description": post.excerpt,
    "mainEntityOfPage": `https://ghost.joy.so/${post.slug}/`
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PostContent post={post} />
    </>
  );
}