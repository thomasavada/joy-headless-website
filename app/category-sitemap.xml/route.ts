import { NextResponse } from 'next/server'
import { frontEndDomain } from "@/lib/frontend";
import { getTags, Tag } from '@/lib/ghost';

export async function GET() {
  const baseUrl = `https://${frontEndDomain}`

  try {
    // Fetch all tags from Ghost
    const tags = await getTags();

    // Generate XML for each tag
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${tags.map((tag: Tag) => `
  <url>
    <loc>${baseUrl}/category/${tag.slug}</loc>
    <lastmod>${tag.updated_at || new Date().toISOString()}</lastmod>
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
  } catch (error) {
    console.error('Error generating category sitemap:', error);

    // Return a minimal sitemap with main categories in case of error
    const fallbackCategories = [
      'loyalty-program',
      'rewards',
      'referral-marketing',
      'customer-retention',
    ];

    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${fallbackCategories.map(category => `
  <url>
    <loc>${baseUrl}/category/${category}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n  ')}
</urlset>`;

    return new NextResponse(fallbackXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }
}

// Add revalidation time
export const revalidate = 3600; // Revalidate every hour