import {MetadataRoute} from 'next';
import {getPosts, getSettings} from '@/lib/ghost';

// Define the interface for Ghost post
interface GhostPost {
  slug: string;
  updated_at: string;
  published_at: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { settings } = await getSettings();
  const posts = await getPosts() as GhostPost[];
  const baseUrl = 'https://webv2.joy.so';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ];

  // Blog posts
  const blogPages = posts.map((post: GhostPost) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at || post.published_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
