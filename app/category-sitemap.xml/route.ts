import { NextResponse } from 'next/server';
import { frontEndDomain } from "@/lib/frontend";
import { getTags } from '@/lib/ghost';

// Function to ensure trailing slash
const ensureTrailingSlash = (url: string) => {
  return url.endsWith('/') ? url : `${url}/`;
};

export async function GET() {
  const baseUrl = `https://${frontEndDomain}`;

  try {
    const tags = await getTags();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${tags.map(tag => `
  <url>
    <loc>${ensureTrailingSlash(`${baseUrl}/category/${tag.slug}`)}</loc>
    <lastmod>${tag.updated_at || new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n  ')}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generating category sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

// Add revalidation time
export const revalidate = 3600; // Revalidate every hour
