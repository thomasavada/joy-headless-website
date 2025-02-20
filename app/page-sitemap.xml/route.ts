import { NextResponse } from 'next/server';
import { frontEndDomain } from "@/lib/frontend";
import { readdirSync } from 'fs';
import { join } from 'path';
import { getPages } from '@/lib/ghost';

// Function to ensure trailing slash
const ensureTrailingSlash = (url: string) => {
  return url.endsWith('/') ? url : `${url}/`;
};

// Function to recursively get all page routes from the app directory
function getPageRoutes(dir: string, baseDir: string = ''): string[] {
  const routes: string[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relativePath = join(baseDir, entry.name);

    if (entry.isDirectory()) {
      // Skip special Next.js directories and API routes
      if (!entry.name.startsWith('_') &&
          !entry.name.startsWith('.') &&
          !entry.name.startsWith('api') &&
          entry.name !== 'category' &&
          entry.name !== 'case-study') {
        // If directory contains page.tsx, add the route
        try {
          if (readdirSync(fullPath).some(file => file === 'page.tsx')) {
            routes.push(relativePath === 'page' ? '/' : ensureTrailingSlash(`/${relativePath}`));
          }
        } catch (error) {
          console.error(`Error reading directory ${fullPath}:`, error);
        }
        // Recursively get routes from subdirectories
        routes.push(...getPageRoutes(fullPath, relativePath));
      }
    }
  }

  return routes;
}

export async function GET() {
  const baseUrl = `https://${frontEndDomain}`;
  const appDir = join(process.cwd(), 'app');

  try {
    // Get routes from app directory
    const appRoutes = getPageRoutes(appDir)
      .filter(route => !route.includes('[') && !route.includes(']'));

    // Get pages from Ghost CMS
    const ghostPages = await getPages();
    const ghostRoutes = ghostPages.map(page => ensureTrailingSlash(`/${page.slug}`));

    // Combine both sets of routes
    const allRoutes = [...new Set([...appRoutes, ...ghostRoutes])];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes.map(route => {
    // Find matching Ghost page for lastmod date
    const ghostPage = ghostPages.find(page => ensureTrailingSlash(`/${page.slug}`) === route);
    const lastmod = ghostPage ? ghostPage.updated_at : new Date().toISOString();

    return `
  <url>
    <loc>${ensureTrailingSlash(baseUrl + route)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
  }).join('\n  ')}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generating page sitemap:', error);

    // Fallback to static routes if either file system reading or Ghost CMS fails
    const fallbackRoutes = [
      '',
      '/about-us',
      '/member-exclusive-deal',
      '/milestone',
      '/referral',
      '/reward-programs',
      '/vip-tiers',
    ].map(route => ensureTrailingSlash(route));

    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${fallbackRoutes.map(route => `
  <url>
    <loc>${ensureTrailingSlash(baseUrl + route)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
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

export const revalidate = 3600; // Revalidate every hour
