import { Metadata } from 'next';
import { frontEndDomain } from '@/lib/frontend';

export const metadata: Metadata = {
  title: 'Milestone Program - Joy',
  description: 'Empower brands to gamify the customer journey, boosting retention, sales, cross-selling, and engagement',
  openGraph: {
    title: 'Milestone Program - Joy',
    description: 'Empower brands to gamify the customer journey, boosting retention, sales, cross-selling, and engagement',
    url: `https://${frontEndDomain}/milestone`,
    siteName: 'Joy | Rewards & Loyalty Program for Shopify Business',
    type: 'website',
    images: [
      {
        url: 'https://cdn-web.joy.so/cdn/image/2024/10/Logo_Joy.webp',
        width: 150,
        height: 150,
        alt: 'Joy Logo'
      }
    ]
  }
};