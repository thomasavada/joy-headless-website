import {frontEndDomain} from '@/lib/frontend';
import {NextResponse} from 'next/server';

export async function GET() {
  const robotsTxt = `
    User-agent: *
    Disallow: *?
    Disallow: */search/
    Sitemap: https://${frontEndDomain}/sitemap_index.xml
  `.trim();

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
    },
  });
}
