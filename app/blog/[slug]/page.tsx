import { getSinglePost, getPosts, Post } from '@/lib/ghost';
import { FooterSection } from "@/components/layout/sections/footer";
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { PostContent } from '@/components/blog/post-content';

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
  const post = await getSinglePost(params.slug) as Post;

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    openGraph: {
      title: post.og_title || post.title,
      description: post.og_description || post.excerpt,
      images: post.feature_image ? [post.feature_image] : [],
      type: 'article',
      authors: post.primary_author.name,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
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

  return (
    <>
      <PostContent post={post} />
      <FooterSection />
    </>
  );
}