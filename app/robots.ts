import {MetadataRoute} from 'next';
import {frontEndDomain} from "@/lib/frontend";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `https://${frontEndDomain}/sitemap.xml`,
  };
}
