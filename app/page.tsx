import Hero from "@/components/layout/sections/hero";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { LoyaltyPreview } from "@/components/layout/sections/loyalty-preview";
import { FeaturesPreview } from "@/components/layout/sections/features-preview";
import { WidgetsPreview } from "@/components/layout/sections/widgets-preview";
import { LoyaltyFeatures } from "@/components/layout/sections/loyalty-features";
import { ShopifyPOS } from "@/components/layout/sections/shopify-pos";
import { StampedMigration } from "@/components/layout/sections/stamped-migration";
import { CustomerStories } from "@/components/layout/sections/customer-stories";
import { TestimonialSection } from "@/components/layout/sections/testimonial";
import { FooterSection } from "@/components/layout/sections/footer";

export default function HomePage() {
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