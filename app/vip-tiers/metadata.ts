import { Metadata } from 'next';
import { frontEndDomain } from "@/lib/frontend";

export const metadata: Metadata = {
  title: 'VIP Tiers Program for Shopify | Customer Loyalty - Joy',
  description: 'Build tiered loyalty campaigns with point thresholds, easily managed through Joy\'s user-friendly platform.',
  openGraph: {
    title: 'VIP Tiers Program for Shopify | Customer Loyalty - Joy',
    description: 'Build tiered loyalty campaigns with point thresholds, easily managed through Joy\'s user-friendly platform.',
    type: 'website',
    url: `https://${frontEndDomain}/vip-tiers`,
    siteName: 'Joy Rewards & Loyalty Program',
  },
};