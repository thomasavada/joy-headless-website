import {getPosts, getRelatedPosts, getSettings, getSinglePost, Post, Settings} from '@/lib/ghost';
import {getSuccessStoryInfo} from '@/lib/strapi';
import {notFound} from 'next/navigation';
import {Metadata, ResolvingMetadata} from 'next';
import {CaseStudyContentServer} from '@/components/case-study/case-study-content-server';

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
      canonical: post.canonical_url || post.url || `https://joy.so/case-study/${post.slug}`,
    },
    openGraph: {
      title: post.og_title || post.title,
      description: post.og_description || post.excerpt,
      images: post.feature_image ? [post.feature_image] : [],
      type: 'article',
      authors: post.primary_author.name,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      url: post.canonical_url || post.url || `https://joy.so/case-study/${post.slug}`,
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
    filter: 'tag:success-stories',
  });
  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}

export default async function CaseStudyPage({ params }: Props) {
  const post = await getSinglePost(params.slug) as Post;
  const relatedPosts = await getRelatedPosts(post);

  if (!post) {
    notFound();
  }

  // Fetch additional info from Strapi
  const successStoryInfo = await getSuccessStoryInfo(post.id);

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
    <CaseStudyContentServer
      post={post}
      successStoryInfo={successStoryInfo}
      relatedPosts={relatedPosts}
      jsonLd={jsonLd}
    />
  );
}
