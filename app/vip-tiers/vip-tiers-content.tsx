'use client';

import { Button } from '@/components/ui/button';
import { SponsorsSection } from '@/components/layout/sections/sponsors';
import { TestimonialSection } from '@/components/layout/sections/testimonial';
import { Gift, Percent, Star, Truck } from 'lucide-react';
import { CTASection } from '@/components/layout/sections/cta';
import { JsonLd } from '@/components/blog/json-ld';
import { frontEndDomain } from "@/lib/frontend";
import Image from 'next/image';

const rewardTypes = [
  {
    title: 'Free Shipping',
    description: 'Offer free shipping to your VIP customers',
    icon: Truck,
  },
  {
    title: 'Exclusive Discounts',
    description: 'Give special discounts to your loyal customers',
    icon: Percent,
  },
  {
    title: 'Points Multiplier',
    description: 'Multiply points earned for VIP members',
    icon: Star,
  },
  {
    title: 'Birthday Rewards',
    description: 'Special rewards on customer birthdays',
    icon: Gift,
  },
];

const features = [
  {
    title: 'Customizable Tiers',
    description: 'Create unique VIP tiers that match your brand',
    image: 'https://cdn-web.joy.so/cdn/image/2025/02/Frame-2085653604-2.png',
  },
  {
    title: 'Flexible Rules',
    description: 'Set spending thresholds and requirements for each tier',
    image: 'https://cdn-web.joy.so/cdn/image/2025/02/Frame-2085653604-1-2.png',
  },
  {
    title: 'Tier Analytics',
    description: 'Track performance and customer movement between tiers',
    image: 'https://cdn-web.joy.so/cdn/image/2025/02/Frame-2085653604-2-1.png',
  }
];

export function VIPTiersContent() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "publisher": {
      "@type": "Organization",
      "name": "Joy | Rewards & Loyalty Program for Shopify Business",
      "url": `https://${frontEndDomain}`,
      "logo": {
        "@type": "ImageObject",
        "url": "https://cdn-web.joy.so/cdn/image/2024/10/Logo_Joy.webp?width=150",
        "width": 150,
        "height": 150
      }
    },
    "author": {
      "@type": "Organization",
      "name": "Joy",
      "url": `https://${frontEndDomain}`,
      "sameAs": [`https://${frontEndDomain}`]
    },
    "headline": "VIP Tiers Program",
    "description": "Create personalized VIP tiers to reward your most valuable customers",
    "image": {
      "@type": "ImageObject",
      "url": "https://cdn-web.joy.so/cdn/image/2024/10/Logo_Joy.webp?width=150",
      "width": 150,
      "height": 150
    },
    "url": `https://${frontEndDomain}/vip-tiers`,
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": `https://${frontEndDomain}/vip-tiers`
  };

  return (
    <main className="flex min-h-screen flex-col">
      <JsonLd data={jsonLd} />

      {/* Hero Section */}
      <section className="w-full py-12 sm:py-24">
        <div className="container">
          <div className="flex flex-col items-center text-center gap-6">
            <span className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary-dark/10 text-primary-dark">
              Built for Shopify
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Create personalized VIP tiers<br />
              to reward your most valuable customers
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Design a tiered loyalty program that encourages customers to engage more with your brand
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">Book Demo</Button>
            </div>
          </div>
        </div>
      </section>

      <SponsorsSection />

      {/* Reward Types Section */}
      <section className="w-full py-20 sm:py-32 md:py-40 border-t border-gray-800">
        <div className="container px-4 md:px-6">
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Reward Types for VIP Tiers
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Choose from various reward types to create compelling VIP benefits
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {rewardTypes.map((reward, index) => (
                <div key={index} className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-lg bg-primary-dark/10 flex items-center justify-center">
                    <reward.icon className="w-8 h-8 text-primary-dark" />
                  </div>
                  <h3 className="text-xl font-bold">{reward.title}</h3>
                  <p className="text-gray-400">{reward.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 sm:py-32 md:py-40 bg-gray-900 border-t border-gray-800">
        <div className="container px-4 md:px-6">
          <div className="space-y-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center">
              Powerful VIP Tier Features
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center space-y-4">
                  <div className="relative w-full aspect-[380/269] rounded-lg overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                    />
                  </div>
                  <h4 className="text-xl font-bold">{feature.title}</h4>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="border-t border-gray-800">
        <TestimonialSection />
      </section>

      {/* CTA Section */}
      <CTASection
        title={[
          "Start rewarding your VIP customers",
          "with Joy today"
        ]}
        variant="gradient"
      />
    </main>
  );
}