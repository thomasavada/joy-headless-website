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
import {CTASection} from '@/components/layout/sections/cta';
// import {Reveal} from '@/components/ui/reveal';
// import {StaggerContainer} from '@/components/ui/stagger-container';
// import { ForcedThemeWrapper } from "../components/ForcedThemeWrapper";
import {ForcedTheme} from "../components/ForcedTheme";
import Script from 'next/script';
import {frontEndDomain} from '@/lib/frontend';

// Remove the metadata generation from the home page since we want to use the layout's metadata
// The layout's metadata will be used as the default for the home page

export default function HomePage() {
  return (
    <ForcedTheme theme="dark">
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Joy",
            "url": `https://${frontEndDomain}`,
            "logo": `https://${frontEndDomain}/images/logo.png`,
            "description": "Loyalty that feels joyful to build brand love. A gamified and omnichannel loyalty experience that sparks joy with POS for Shopify.",
            "sameAs": [
              "https://twitter.com/joyloyalty",
              "https://www.linkedin.com/company/joy-loyalty"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "hello@joy.so",
              "contactType": "customer service"
            },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            }
          })
        }}
      />
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
      {/* <StaggerContainer>
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
      </StaggerContainer> */}
      {/* CTA Section */}
      <CTASection
        title={[
          "Start growing your business",
          "with Joy today"
        ]}
        buttonText="Get started for free"
        buttonHref="/signup"
      />
    </main>
    </ForcedTheme>
  );
}
