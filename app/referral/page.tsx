import {ForcedTheme} from '@/components/ForcedTheme';
import {Button} from '@/components/ui/button';
import {SponsorsSection} from '@/components/layout/sections/sponsors';
import {CustomCollapsible} from '@/components/ui/collapsible';
import {TestimonialSection} from '@/components/layout/sections/testimonial';
import {Metadata} from 'next';
import Image from 'next/image';
import {CTASection} from '@/components/layout/sections/cta';
import {JsonLd} from '@/components/blog/json-ld';
import {frontEndDomain} from "@/lib/frontend";

export const metadata: Metadata = {
  title: 'Shopify Referral Program | Customer Referral Marketing - Joy',
  description: 'Grow your Shopify store with a powerful referral program. Reward customers for sharing, automate referral tracking, and boost word-of-mouth marketing. Easy to set up and manage.',
  openGraph: {
    title: 'Shopify Referral Program | Customer Referral Marketing - Joy',
    description: 'Grow your Shopify store with a powerful referral program. Reward customers for sharing, automate referral tracking, and boost word-of-mouth marketing. Easy to set up and manage.',
    type: 'website',
  },
};

const rewardTypes = [
  {
    title: 'Discount percentage',
    description: `Give a percentage discount on customers' next purchase as a token of appreciation for spreading the word.`,
  },
  {
    title: 'Discount amount',
    description: `Offer a fixed discount amount for each successful referral, rewarding customers' efforts with immediate savings.`,
  },
  {
    title: 'Points reward',
    description: 'Award points for every successful referral, which customers can redeem for future purchases or exclusive rewards.',
  },
];

const sharingFeatures = [
  {
    title: 'Share via social media',
    description: 'Automatically generate a unique referral link for each customer to share with their friends.',
    image: 'https://cdn-web.joy.so/cdn/image/2025/02/Easy-to-share-referral-links.png',
    alt: 'Easy-to-share referral links'
  },
  {
    title: 'Share via social media',
    description: 'Easily share referral links across multiple social platforms with ease using Joy.',
    image: 'https://cdn-web.joy.so/cdn/image/2025/02/Share-via-social-media.png',
    alt: 'Share via social media'
  },
  {
    title: 'Seamless Email Marketing Integration',
    description: 'Integrate effortlessly with your email marketing tool for smooth customer communication.',
    image: 'https://cdn-web.joy.so/cdn/image/2025/02/Email-Marketing-Integration.png',
    alt: 'Email Marketing Integration'
  },
];

export default function ReferralPage() {
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
        "@id": `https://${frontEndDomain}/referral/#webpage`,
        "url": `https://${frontEndDomain}/referral/`,
        "name": "Referral Program - Joy",
        "description": "Transform loyal customers into powerful brand ambassadors with Joy's referral program. Encourage sharing and reward both referrers and their friends.",
        "isPartOf": {
          "@id": `https://${frontEndDomain}/#website`
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "Product",
        "@id": `https://${frontEndDomain}/referral/#product`,
        "name": "Joy Referral Program",
        "description": "Transform Loyal Customers into Powerful Brand Ambassadors - Encourage loyal customers to share their positive experiences and become advocates.",
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
        }
      },
      {
        "@type": "ItemList",
        "@id": `https://${frontEndDomain}/referral/#features`,
        "name": "Referral Program Features",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Discount percentage",
            "description": "Give a percentage discount on customers' next purchase as a token of appreciation for spreading the word."
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Discount amount",
            "description": "Offer a fixed discount amount for each successful referral, rewarding customers' efforts with immediate savings."
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Points reward",
            "description": "Award points for every successful referral, which customers can redeem for future purchases or exclusive rewards."
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": `https://${frontEndDomain}/referral/#sharing`,
        "name": "How to Share Referrals",
        "description": "Make referral rewards simple to access and redeem",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Share via social media",
            "text": "Automatically generate a unique referral link for each customer to share with their friends."
          },
          {
            "@type": "HowToStep",
            "name": "Share across platforms",
            "text": "Easily share referral links across multiple social platforms with ease using Joy."
          },
          {
            "@type": "HowToStep",
            "name": "Email Marketing Integration",
            "text": "Integrate effortlessly with your email marketing tool for smooth customer communication."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `https://${frontEndDomain}/referral/#testimonials`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What do customers say about Joy's referral program?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Customers praise Joy's user-friendly interface and flexibility. The referral program is noted for being easy to understand and use, with seamless integration across different platforms."
            }
          }
        ]
      }
    ]
  };

  return (
    <ForcedTheme theme="dark">
      <main className="flex min-h-screen flex-col">
        <JsonLd data={jsonLd} />
        {/* Hero Section */}
        <section className="w-full py-20 sm:py-32 md:py-40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-24">
              <span className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary-dark/10 text-primary-dark">
                Built for Shopify
              </span>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Transform Loyal Customers into<br />
                  <span className="text-primary-dark">Powerful Brand Ambassadors</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Encourage loyal customers to share their positive experiences and become advocates, helping to grow your brand organically
                </p>
              </div>
              <Button size="lg">Book a demo</Button>
            </div>

            {/* Sponsors with extra margin */}
            <div className="mb-24">
              <SponsorsSection />
            </div>

            {/* Win-Win Section with Collapsibles */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                  Turn Sharing into a Win-Win for Everyone
                </h2>
                <p className="text-xl text-gray-400">
                  Reward both customers and their friends, making sharing a mutually beneficial experience that drives growth.
                </p>
              </div>

              {/* Collapsible Section */}
              <div className="bg-gray-900/50 rounded-lg p-6">
                <CustomCollapsible title="Discount percentage">
                  Give a percentage discount on customers' next purchase as a token of appreciation for spreading the word.
                </CustomCollapsible>

                <CustomCollapsible title="Discount amount">
                  Offer a fixed discount amount for each successful referral, rewarding customers' efforts with immediate savings.
                </CustomCollapsible>

                <CustomCollapsible title="Points reward">
                  Award points for every successful referral, which customers can redeem for future purchases or exclusive rewards.
                </CustomCollapsible>
              </div>
            </div>
          </div>
        </section>

        {/* Sharing Features Section */}
        <section className="w-full py-20 sm:py-32 md:py-40 bg-gray-900 border-t border-gray-800">
          <div className="container px-4 md:px-6">
            <div className="space-y-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center">
                Make referral rewards simple to access and redeem
              </h2>
              <p className="text-gray-400 text-center max-w-3xl mx-auto">
                Customers can share referral links on multiple platforms and get email reminders for rewards
              </p>

              <div className="grid gap-8 md:grid-cols-3">
                {sharingFeatures.map((feature, index) => (
                  <div key={index} className="flex flex-col items-center text-center space-y-4">
                    <div className="relative w-full aspect-[380/269] rounded-lg overflow-hidden">
                      <Image
                        src={feature.image}
                        alt={feature.alt}
                        fill
                        className="object-cover"
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

        {/* Testimonials Section with borders */}
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
