import { NextResponse } from 'next/server'
import { frontEndDomain } from "@/lib/frontend";

export async function GET() {
  const baseUrl = `https://${frontEndDomain}`
  const pages = [
    '',
    '/about-us',
    '/member-exclusive-deal',
    '/milestone',
    '/referral',
    '/reward-programs',
    '/vip-tiers',
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n  ')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}