import Hero from "@/components/layout/sections/hero";
import {SponsorsSection} from "@/components/layout/sections/sponsors";
import {LoyaltyPreview} from "@/components/layout/sections/loyalty-preview";
import {FeaturesPreview} from "@/components/layout/sections/features-preview";
import {WidgetsPreview} from "@/components/layout/sections/widgets-preview";
import {LoyaltyFeatures} from "@/components/layout/sections/loyalty-features";
import {ShopifyPOS} from "@/components/layout/sections/shopify-pos";
import {StampedMigration} from "@/components/layout/sections/stamped-migration";
import {CustomerStories} from "@/components/layout/sections/customer-stories";
import {TestimonialSection} from "@/components/layout/sections/testimonial";
import {Reveal} from '@/components/ui/reveal';
import {StaggerContainer} from '@/components/ui/stagger-container';

// Remove the metadata generation from the home page since we want to use the layout's metadata
// The layout's metadata will be used as the default for the home page

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <StaggerContainer>
        <Reveal width="100%">
          <SponsorsSection />
        </Reveal>
        <Reveal width="100%">
          <LoyaltyPreview />
        </Reveal>
        <Reveal width="100%">
          <FeaturesPreview />
        </Reveal>
        <Reveal width="100%">
          <WidgetsPreview />
        </Reveal>
        <Reveal width="100%">
          <LoyaltyFeatures />
        </Reveal>
        <Reveal width="100%">
          <ShopifyPOS />
        </Reveal>
        <Reveal width="100%">
          <StampedMigration />
        </Reveal>
        <Reveal width="100%">
          <CustomerStories />
        </Reveal>
        <Reveal width="100%">
          <TestimonialSection />
        </Reveal>
      </StaggerContainer>
    </main>
  );
}
