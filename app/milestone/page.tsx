'use client';

import {ForcedTheme} from '@/components/ForcedTheme';
import {Button} from '@/components/ui/button';
import {SponsorsSection} from '@/components/layout/sections/sponsors';
import {TestimonialSection} from '@/components/layout/sections/testimonial';
import {Clock, DollarSign, MessageSquare, ShoppingBag, Star} from 'lucide-react';
import Image from 'next/image';
import {CTASection} from '@/components/layout/sections/cta';
import {JsonLd} from '@/components/blog/json-ld';
import {frontEndDomain} from "@/lib/frontend";

const loyaltyIncentives = [
  {
    title: 'Number of orders',
    description: 'Recognize loyal customers as they return, making each purchase more rewarding.',
    icon: ShoppingBag,
  },
  {
    title: 'Amount spend',
    description: 'Encourage higher spend by rewarding customers as they invest more in your brand.',
    icon: DollarSign,
  },
  {
    title: 'Earned points',
    description: 'Motivate continued engagement by letting customers earn rewards with every interaction.',
    icon: Star,
  },
  {
    title: 'Number of reviews',
    description: 'Show appreciation for feedback, turning reviews into a valuable part of your loyalty program.',
    icon: MessageSquare,
  },
  {
    title: 'Inactivity',
    description: 'Reconnect with inactive customers by offering personalized rewards that encourage them to return.',
    icon: Clock,
  }
];

const features = [
  {
    title: 'Easily add rule for each milestone',
    description: 'Quickly choose the right rule type for each milestone.',
    image: 'https://cdn-web.joy.so/cdn/image/2025/02/Frame-2085653604-2.png',
  },
  {
    title: 'Set Custom Rules',
    description: 'Define unique rules for every milestone to tailor the experience to your needs.',
    image: 'https://cdn-web.joy.so/cdn/image/2025/02/Frame-2085653604-1-2.png',
  },
  {
    title: 'Track with Analytics',
    description: 'Monitor your milestones with detailed analytics to measure performance and success.',
    image: 'https://cdn-web.joy.so/cdn/image/2025/02/Frame-2085653604-2-1.png',
  }
];

export default function MilestonePage() {
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
        "@id": `https://${frontEndDomain}/milestone/#webpage`,
        "url": `https://${frontEndDomain}/milestone/`,
        "name": "Milestone Program - Joy",
        "description": "Empower brands to gamify the customer journey, boosting retention, sales, cross-selling, and engagement",
        "isPartOf": {
          "@id": `https://${frontEndDomain}/#website`
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "Product",
        "@id": `https://${frontEndDomain}/milestone/#product`,
        "name": "Joy Milestone Program",
        "description": "Celebrating Every Step of Your Customers' Journey - Empowers brands to gamify the customer journey, boosting retention, sales, cross-selling, and engagement",
        "brand": {
          "@id": `https://${frontEndDomain}/#person`
        },
        "offers": {
          "@type": "AggregateOffer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "USD",
          "seller": {
            "@id": `https://${frontEndDomain}/#person`
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "1800"
        }
      },
      {
        "@type": "ItemList",
        "@id": `https://${frontEndDomain}/milestone/#features`,
        "name": "Milestone Program Features",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Number of orders",
            "description": "Recognize loyal customers as they return, making each purchase more rewarding."
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Amount spend",
            "description": "Encourage higher spend by rewarding customers as they invest more in your brand."
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Earned points",
            "description": "Motivate continued engagement by letting customers earn rewards with every interaction."
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Number of reviews",
            "description": "Show appreciation for feedback, turning reviews into a valuable part of your loyalty program."
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Inactivity",
            "description": "Reconnect with inactive customers by offering personalized rewards that encourage them to return."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `https://${frontEndDomain}/milestone/#testimonials`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What do customers say about Joy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Customers praise Joy's flexibility, ease of use, and seamless POS experience. Diecast Model Centre mentions 'There are plenty of options to tailor a rewards program to your liking.' Happy Earth Tea states 'Been working with Joy multiple months now. We have been very satisfied with how things work here.'"
            }
          }
        ]
      }
    ]
  };

  return (
    <ForcedTheme theme="dark">
      <JsonLd data={jsonLd} />
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="w-full py-20 sm:py-32 md:py-40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-24">
              <span className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary-dark/10 text-primary-dark">
                Built for Shopify
              </span>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Celebrating Every Step of<br />
                  Your Customers' Journey
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Empowers brands to gamify the customer journey, boosting retention, sales, cross-selling, and engagement
                </p>
              </div>
              <Button size="lg">Book a demo</Button>
            </div>

            {/* Sponsors with extra margin */}
            <div className="mb-24">
              <SponsorsSection />
            </div>
          </div>
        </section>

        {/* Loyalty Incentives Section */}
        <section className="w-full py-20 sm:py-32 md:py-40 border-t border-gray-800">
          <div className="container px-4 md:px-6">
            <div className="space-y-16">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Effective Loyalty Incentives<br />
                  To Reward Your Customers
                </h2>
              </div>

              <div className="flex flex-col items-center gap-16">
                {/* First row - 2 items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-4xl">
                  {loyaltyIncentives.slice(0, 2).map((incentive, index) => (
                    <div key={index} className="flex flex-col items-center text-center space-y-6">
                      <div className="flex items-center justify-center w-20 h-20 bg-[#0A1628] rounded-2xl">
                        <incentive.icon className="w-10 h-10 text-[#1863DC]" />
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-xl font-bold">{incentive.title}</h4>
                        <p className="text-gray-400 max-w-sm mx-auto">{incentive.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Second row - 3 items */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full max-w-6xl">
                  {loyaltyIncentives.slice(2).map((incentive, index) => (
                    <div key={index} className="flex flex-col items-center text-center space-y-6">
                      <div className="flex items-center justify-center w-20 h-20 bg-[#0A1628] rounded-2xl">
                        <incentive.icon className="w-10 h-10 text-[#1863DC]" />
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-xl font-bold">{incentive.title}</h4>
                        <p className="text-gray-400 max-w-sm mx-auto">{incentive.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 sm:py-32 md:py-40 bg-gray-900 border-t border-gray-800">
          <div className="container px-4 md:px-6">
            <div className="space-y-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center">
                Create Milestones with Ease
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
            "Drive repeat sales.",
            "Reward your customers with Joy"
          ]}
          variant="gradient"
        />
      </main>
    </ForcedTheme>
  );
}
