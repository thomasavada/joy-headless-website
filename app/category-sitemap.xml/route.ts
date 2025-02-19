import { NextResponse } from 'next/server'
import { frontEndDomain } from "@/lib/frontend";

export async function GET() {
  const baseUrl = `https://${frontEndDomain}`
  const categories = [
    'loyalty-program',
    'rewards',
    'referral-marketing',
    'customer-retention',
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${categories.map(category => `
  <url>
    <loc>${baseUrl}/category/${category}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
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