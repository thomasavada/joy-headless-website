import { NextResponse } from 'next/server';
import { frontEndDomain } from "@/lib/frontend";
import { getPosts } from '@/lib/ghost';

// Function to ensure trailing slash
const ensureTrailingSlash = (url: string) => {
  return url.endsWith('/') ? url : `${url}/`;
};

export async function GET() {
  const baseUrl = `https://${frontEndDomain}`;

  try {
    const posts = await getPosts({
      filter: 'tag:case-study',
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${posts.map(post => `
  <url>
    <loc>${ensureTrailingSlash(`${baseUrl}/case-study/${post.slug}`)}</loc>
    <lastmod>${post.updated_at}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n  ')}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generating case study sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

export const revalidate = 3600; // Revalidate every hour