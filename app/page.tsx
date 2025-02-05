import { BenefitsSection } from "@/components/layout/sections/benefits";
import { CommunitySection } from "@/components/layout/sections/community";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import Hero from "@/components/layout/sections/hero";
import { PricingSection } from "@/components/layout/sections/pricing";
import { ServicesSection } from "@/components/layout/sections/services";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { TeamSection } from "@/components/layout/sections/team";
import { TestimonialSection } from "@/components/layout/sections/testimonial";
import { LoyaltyPreview } from "@/components/layout/sections/loyalty-preview";
import { FeaturesPreview } from "@/components/layout/sections/features-preview";
import { WidgetsPreview } from "@/components/layout/sections/widgets-preview";
import { LoyaltyFeatures } from "@/components/layout/sections/loyalty-features";
import { ShopifyPOS } from "@/components/layout/sections/shopify-pos";
import { StampedMigration } from "@/components/layout/sections/stamped-migration";
import { CustomerStories } from "@/components/layout/sections/customer-stories";

export const metadata = {
  title: "Shadcn - Landing template",
  description: "Free Shadcn landing page for developers",
  openGraph: {
    type: "website",
    url: "https://github.com/nobruf/shadcn-landing-page.git",
    title: "Shadcn - Landing template",
    description: "Free Shadcn landing page for developers",
    images: [
      {
        url: "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
        width: 1200,
        height: 630,
        alt: "Shadcn - Landing template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://github.com/nobruf/shadcn-landing-page.git",
    title: "Shadcn - Landing template",
    description: "Free Shadcn landing page for developers",
    images: [
      "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
    ],
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <SponsorsSection />
      <LoyaltyPreview />
      <FeaturesPreview />
      <WidgetsPreview />
      <LoyaltyFeatures />
      <ShopifyPOS />
      <StampedMigration />
      <CustomerStories />
  
      <TestimonialSection />
    
      <FooterSection />
    </main>
  );
}
