'use client';

import {PricingCard} from "@/components/pricing/pricing-card";
import {SponsorsSection} from "@/components/layout/sections/sponsors";
import {Reveal} from "@/components/ui/reveal";
import {PlanComparison} from "@/components/pricing/plan-comparison";
import {CantDecide} from "@/components/pricing/cant-decide";
import {FAQ} from "@/components/pricing/faq";
import {PriceCalculator, PricingProvider} from "@/components/pricing/pricing-context";
import {ForcedTheme} from '@/components/ForcedTheme'
import {JsonLd} from '@/components/blog/json-ld';
import {frontEndDomain} from "@/lib/frontend";

const pricingPlans = [
  {
    title: "Starter",
    price: "Free",
    description: "Ideal for small businesses just starting with basic loyalty features and up to 150 free monthly orders.",
    period: "",
    features: [
      { text: "Up to 150 monthly free orders", included: true },
      { text: "Basic Loyalty page", included: true },
      { text: "Earn point programs: Sign up, Place order", included: true },
      { text: "Redeem program", included: true },
      { text: "Basic integrations", included: true },
    ],
    idealFor: "Ideal for startups",
    ctaText: "Get started",
    ctaVariant: "outline" as const,
  },
  {
    title: "Professional",
    price: "24.99",
    description: "Perfect for growing businesses with advanced loyalty programs and up to 1,000 free monthly orders.",
    hasEnablePos: true,
    features: [
      { text: "Up to 500 monthly free orders", included: true },
      { text: "VIP tiers", included: true },
      { text: "Unlimited Points & Redeem programs", included: true },
      { text: "Basic integrations", included: true },
      { text: "Analytics", included: true },
    ],
    idealFor: "Ideal for growing businesses",
    ctaText: "Choose plan",
    ctaVariant: "default" as const,
  },
  {
    title: "Advanced",
    price: "99",
    description: "Best for businesses looking for a fully featured program with a cost-effective fee for additional orders in the long run.",
    features: [
      { text: "Up to 2,000 monthly free orders", included: true },
      { text: "All features in Pro plan", included: true },
      { text: "POS fully integrated", included: true },
      { text: "Advanced Rule Engine for complex rewards, special event's rewards, and more", included: true },
      { text: "Member privileges", included: true },
      { text: "Advanced analytics", included: true },
    ],
    isPopular: true,
    idealFor: "Ideal for scaling businesses",
    ctaText: "Get started",
    ctaVariant: "outline" as const,
  },
  {
    title: "Enterprise",
    price: "Custom",
    description: "Tailored for large enterprises needing custom solutions, APIs, and dedicated support for high-order volume and scalability.",
    additionalInfo: "From $499/month",
    features: [
      { text: "Unlimited integration, APIs & Webhooks", included: true },
      { text: "All in Advanced plan and Professional plan", included: true },
      { text: "POS Pro integration", included: true },
      { text: "Hydrogen - Headless support", included: true },
      { text: "Enterprise-level scalability for enhanced security", included: true },
      { text: "Dedicated support", included: true },
    ],
    idealFor: "Ideal for large businesses",
    ctaText: "Get started",
    ctaVariant: "outline" as const,
  },
];

export default function PricingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Person", "Organization"],
        "@id": `https://${frontEndDomain}/#person`,
        "name": "Joy | Rewards & Loyalty Program for Shopify Business",
        "logo": {
          "@type": "ImageObject",
          "@id": `https://${frontEndDomain}/#logo`,
          "url": "https://cdn-web.joy.so/cdn/image/2024/10/Logo_Joy.webp?width=150",
          "contentUrl": "https://cdn-web.joy.so/cdn/image/2024/10/Logo_Joy.webp?width=150",
          "caption": "Joy | Rewards & Loyalty Program for Shopify Business",
          "inLanguage": "en-US"
        },
        "image": {
          "@type": "ImageObject",
          "@id": `https://${frontEndDomain}/#logo`,
          "url": "https://cdn-web.joy.so/cdn/image/2024/10/Logo_Joy.webp?width=150",
          "contentUrl": "https://cdn-web.joy.so/cdn/image/2024/10/Logo_Joy.webp?width=150",
          "caption": "Joy | Rewards & Loyalty Program for Shopify Business",
          "inLanguage": "en-US"
        }
      },
      {
        "@type": "WebSite",
        "@id": `https://${frontEndDomain}/#website`,
        "url": `https://${frontEndDomain}`,
        "name": "Joy | Rewards & Loyalty Program for Shopify Business",
        "alternateName": "Joy | Rewards & Loyalty Program for Shopify Business",
        "publisher": {
          "@id": `https://${frontEndDomain}/#person`
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "WebPage",
        "@id": `https://${frontEndDomain}/pricing/#webpage`,
        "url": `https://${frontEndDomain}/pricing/`,
        "name": "Pricing - Joy Rewards & Loyalty Program",
        "description": "Our pricing plans are tailored to meet the unique needs of businesses of all sizes, ensuring flexibility and value at every stage of growth.",
        "isPartOf": {
          "@id": `https://${frontEndDomain}/#website`
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "Product",
        "@id": `https://${frontEndDomain}/pricing/#product`,
        "name": "Joy Loyalty Program",
        "description": "A customized pricing plan for every business size - Loyalty program solution for Shopify businesses",
        "brand": {
          "@id": `https://${frontEndDomain}/#person`
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "USD",
          "lowPrice": "0",
          "highPrice": "499",
          "offerCount": "4",
          "offers": [
            {
              "@type": "Offer",
              "name": "Starter",
              "price": "0",
              "priceCurrency": "USD",
              "description": "Up to 150 monthly free orders",
              "availability": "https://schema.org/InStock"
            },
            {
              "@type": "Offer",
              "name": "Professional",
              "price": "24.99",
              "priceCurrency": "USD",
              "description": "Up to 1000 monthly free orders",
              "availability": "https://schema.org/InStock"
            },
            {
              "@type": "Offer",
              "name": "Advanced",
              "price": "99",
              "priceCurrency": "USD",
              "description": "Up to 2,000 monthly free orders",
              "availability": "https://schema.org/InStock"
            },
            {
              "@type": "Offer",
              "name": "Enterprise",
              "price": "499",
              "priceCurrency": "USD",
              "description": "Custom solution for large enterprises",
              "availability": "https://schema.org/InStock"
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": `https://${frontEndDomain}/pricing/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can't decide which pricing plan is right for you?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Share your needs with us, and we'll create a customized offer with all the promotional features you need. Contact our team for personalized assistance."
            }
          }
        ]
      }
    ]
  };

  return (
    <ForcedTheme theme="dark">
      <PricingProvider>
        <main className="flex flex-col min-h-screen">
          <JsonLd data={jsonLd} />
          {/* Header Section */}
          <section className="w-full py-12 md:py-20 lg:py-32">
            <div className="container px-4 mx-auto max-w-7xl">
              <Reveal>
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                  <span className="text-[#00A6ED] text-sm font-medium">
                    Pricing
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                    A customized pricing plan for <span className="dark:text-primary-dark">every business size</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-white leading-relaxed max-w-2xl mx-auto">
                    Our pricing plans are tailored to meet the unique needs of businesses of all
                    sizes, ensuring flexibility and value at every stage of growth.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Sponsors Section */}
          <section className="w-full py-12">
            <div className="container px-4 mx-auto max-w-7xl">
              <SponsorsSection />
            </div>
          </section>

          {/* Calculator Section */}
          <section className="w-full py-12">
            <div className="container px-4 mx-auto max-w-7xl">
              <PriceCalculator />
            </div>
          </section>

          {/* Pricing Cards Section */}
          <section className="w-full py-12 md:py-20">
            <div className="container px-4 mx-auto max-w-7xl">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
                {pricingPlans.map((plan) => (
                  <Reveal key={plan.title}>
                    <PricingCard
                      {...plan}
                      className="h-full"
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Plan Comparison Section */}
          <section className="w-full py-12 md:py-20">
            <div className="container px-4 mx-auto max-w-7xl overflow-x-auto">
              <PlanComparison />
            </div>
          </section>

          {/* FAQ Section */}
          <section className="w-full py-12 md:py-20">
            <div className="container px-4 mx-auto max-w-7xl">
              <FAQ />
            </div>
          </section>

          {/* Can't Decide Section */}
          <section className="w-full py-12 md:py-20 lg:py-32">
            <div className="container px-4 mx-auto max-w-7xl">
              <CantDecide />
            </div>
          </section>
        </main>
      </PricingProvider>
    </ForcedTheme>
  );
}
