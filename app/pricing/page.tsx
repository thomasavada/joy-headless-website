'use client';

import {PricingCard} from "@/components/pricing/pricing-card";
import {SponsorsSection} from "@/components/layout/sections/sponsors";
import {Reveal} from "@/components/ui/reveal";
import {PlanComparison} from "@/components/pricing/plan-comparison";
import {CantDecide} from "@/components/pricing/cant-decide";
import {FAQ} from "@/components/pricing/faq";
import {PriceCalculator, PricingProvider} from "@/components/pricing/pricing-context";
import {ForcedTheme} from '@/components/ForcedTheme'

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
      { text: "Basic integration", included: true },
      { text: "Analytics", included: true },
    ],
    isPopular: true,
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
      { text: "Advanced Rule Engine", included: true },
      { text: "Member privileges", included: true },
    ],
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
      { text: "All in Advanced plan and plus", included: true },
      { text: "POS Pro integration", included: true },
      { text: "Hydrogen - Headless support", included: true },
      { text: "Enterprise-level scalability for enhanced security", included: true },
    ],
    idealFor: "Ideal for large enterprises",
    ctaText: "Get started",
    ctaVariant: "outline" as const,
  },
];

export default function PricingPage() {
  return (
    <ForcedTheme theme="dark">
      <PricingProvider>
        <main className="flex flex-col min-h-screen">
          {/* Header Section */}
          <section className="w-full py-12 sm:py-24 md:py-32">
            <div className="container">
              <Reveal>
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                  <span className="text-[#00A6ED] text-sm font-medium">
                    Pricing
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                    A customized pricing plan for <span className="dark:text-primary-dark">every business size</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-white leading-relaxed">
                    Our pricing plans are tailored to meet the unique needs of businesses of all
                    sizes, ensuring flexibility and value at every stage of growth.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Sponsors Section */}
          <section className="w-full py-12">
            <div className="container">
              <SponsorsSection />
            </div>
          </section>

          {/* Calculator Section - Now positioned where we want it */}
          <section className="w-full py-12">
            <div className="container">
              <PriceCalculator />
            </div>
          </section>

          {/* Pricing Cards Section */}
          <section className="w-full py-12 sm:py-24">
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {pricingPlans.map((plan) => (
                  <Reveal key={plan.title}>
                    <PricingCard
                      {...plan}
                      className="text-center"
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Plan Comparison Section */}
          <section className="w-full py-12 sm:py-24">
            <div className="container">
              <PlanComparison />
            </div>
          </section>

          {/* FAQ Section */}
          <section className="w-full py-12 sm:py-24">
            <div className="container">
              <FAQ />
            </div>
          </section>

           {/* Can't Decide Section */}
           <section className="w-full py-12 sm:py-24 md:py-32">
            <div className="container">
              <CantDecide />
            </div>
          </section>
        </main>
      </PricingProvider>
    </ForcedTheme>
  );
}
