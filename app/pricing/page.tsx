'use client';

import { PricingCard } from "@/components/pricing/pricing-card";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { Reveal } from "@/components/ui/reveal";
import { PlanComparison } from "@/components/pricing/plan-comparison";
import { CantDecide } from "@/components/pricing/cant-decide";
import { FAQ } from "@/components/pricing/faq";
import { PricingProvider } from "@/components/pricing/pricing-context";

const pricingPlans = [
  {
    title: "Starter",
    price: "Free",
    description: "Ideal for businesses in their early stages, seeking to improve customer retention.",
    period: "",
    features: [
      { text: "Up to 150 monthly free orders", included: true },
      { text: "Basic Loyalty page", included: true },
      { text: "Earn point programs: Sign up, Place order", included: true },
      { text: "Redeem program", included: true },
      { text: "Basic integrations", included: true },
    ],
    idealFor: "Ideal for growing businesses",
    ctaText: "Get started",
    ctaVariant: "outline" as const,
  },
  {
    title: "Professional",
    price: "24.99",
    description: "Ideal for growing businesses with advanced loyalty programs and customer engagement.",
    hasEnablePos: true,
    features: [
      { text: "Up to 1000 monthly free orders", included: true },
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
    description: "For established businesses looking for a fully featured program.",
    features: [
      { text: "Up to 2,000 monthly free orders", included: true },
      { text: "All features in Pro plan", included: true },
      { text: "POS fully integrated", included: true },
      { text: "Advanced Rule Engine", included: true },
      { text: "Member privileges", included: true },
    ],
    idealFor: "Ideal for advanced deployments",
    ctaText: "Get started",
    ctaVariant: "outline" as const,
  },
  {
    title: "Enterprise",
    price: "Custom",
    description: "For large enterprises needing custom solutions and dedicated support.",
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
                A customized pricing plan for every business size
              </h1>
              <p className="text-lg sm:text-xl text-white leading-relaxed">
                Our pricing plans are tailored to meet the unique needs of businesses of all
                sizes, ensuring flexibility and value at every stage of growth.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="w-full py-12 sm:py-24">
        <div className="container">
          <PricingProvider>
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
          </PricingProvider>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="w-full py-12 border-t border-[#1D2939]">
        <div className="container">
          <SponsorsSection />
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
  );
} 