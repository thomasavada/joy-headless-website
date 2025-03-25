import { Metadata } from 'next';
import { frontEndDomain } from "@/lib/frontend";

export const metadata: Metadata = {
  title: 'Milestone Rewards Program for Shopify | Customer Loyalty - Joy',
  description: 'Create engaging milestone-based loyalty programs for your Shopify store. Reward customers for achievements, drive engagement, and increase customer lifetime value.',
  openGraph: {
    title: 'Milestone Rewards Program for Shopify | Customer Loyalty - Joy',
    description: 'Create engaging milestone-based loyalty programs for your Shopify store. Reward customers for achievements, drive engagement, and increase customer lifetime value.',
    type: 'website',
    url: `https://${frontEndDomain}/milestone`,
    siteName: 'Joy Rewards & Loyalty Program',
  },
};