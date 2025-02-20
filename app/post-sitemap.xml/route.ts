import { NextResponse } from 'next/server'
import { getPosts } from '@/lib/ghost'
import { frontEndDomain } from "@/lib/frontend";

interface Post {
  slug: string;
  updated_at: string;
  published_at: string;
}

export async function GET() {
  const baseUrl = `https://${frontEndDomain}`
  const posts = await getPosts()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${posts.map(post => `
  <url>
    <loc>${baseUrl}/${post.slug}</loc>
    <lastmod>${new Date(post.updated_at || post.published_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n  ')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}