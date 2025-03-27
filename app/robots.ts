import {MetadataRoute} from 'next';
import {frontEndDomain} from "@/lib/frontend";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/*.json$',  // Prevent crawling of JSON endpoints
          '/search', // Prevent crawling of search results
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      }
    ],
    sitemap: `https://${frontEndDomain}/sitemap.xml`,
    host: `https://${frontEndDomain}`,
  };
}
