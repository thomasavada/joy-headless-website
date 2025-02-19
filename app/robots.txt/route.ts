import { frontEndDomain } from '@/lib/frontend';
import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `
    User-agent: *
    Disallow: /

    Sitemap: https://${frontEndDomain}/sitemap.xml
  `.trim();

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
    },
  });
}
