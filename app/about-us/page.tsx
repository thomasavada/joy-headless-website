import {ForcedTheme} from '@/components/ForcedTheme';
import {Metadata} from 'next';
import Image from 'next/image';
import {FeaturesPreview} from '@/components/layout/sections/features-preview';
import {CTASection} from '@/components/layout/sections/cta';
import {JsonLd} from '@/components/blog/json-ld';
import {frontEndDomain} from "@/lib/frontend";

export const metadata: Metadata = {
  title: 'About us | Joy Rewards & Loyalty Program',
  description: 'Founded in 2021, Joy is the all-in-one solution for creating and managing effortless loyalty programs that cultivate brand affection and influence customer actions.',
};

const stats = [
  {
    number: '9k+',
    label: 'Shopify merchants'
  },
  {
    number: '4.9',
    label: 'Average rating'
  },
  {
    number: '1k8+',
    label: 'Shopify reviews'
  },
  {
    number: '2m',
    label: 'Average response time'
  }
];

export default function AboutUsPage() {
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
        },
        "description": "Founded in 2021, Joy is the all-in-one solution for creating and managing effortless loyalty programs that cultivate brand affection and influence customer actions.",
        "foundingDate": "2021",
        "url": `https://${frontEndDomain}`,
        "sameAs": [
          "https://twitter.com/joyrewards",
          "https://www.linkedin.com/company/joy-rewards"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "1800",
          "bestRating": "5"
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
        "@id": `https://${frontEndDomain}/about-us/#webpage`,
        "url": `https://${frontEndDomain}/about-us/`,
        "name": "About us | Joy Rewards & Loyalty Program",
        "description": "Founded in 2021, Joy is the all-in-one solution for creating and managing effortless loyalty programs that cultivate brand affection and influence customer actions.",
        "isPartOf": {
          "@id": `https://${frontEndDomain}/#website`
        },
        "inLanguage": "en-US",
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "@id": "https://cdn-web.joy.so/cdn/image/2025/01/About-Joy.avif",
          "url": "https://cdn-web.joy.so/cdn/image/2025/01/About-Joy.avif",
          "caption": "Joy team celebrating"
        }
      }
    ]
  };

  return (
    <ForcedTheme theme="dark">
      <JsonLd data={jsonLd} />
      <main className="flex min-h-screen flex-col bg-[#020817]">
        {/* Hero Section */}
        <section className="w-full py-20 sm:py-32">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="flex flex-col items-center space-y-6 text-center">
              <span className="inline-flex text-sm font-medium text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
                Welcome to
              </span>
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl max-w-[800px]">
                Joy Loyalty Program
              </h1>
              <p className="max-w-[700px] text-gray-400 md:text-xl dark:text-gray-400">
                Founded in 2021, is the all-in-one solution for creating and managing effortless loyalty programs that cultivate brand affection and influence customer actions.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="w-full py-20">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
                <div className="space-y-4 text-gray-400">
                  <p>
                    As a product-first company, Joy's mission is to help brands worldwide build deep, meaningful relationships with their customers by delivering innovative, effective, and tailored loyalty solutions.
                  </p>
                  <p>
                    We focus on providing the tools and insights that businesses need to understand their customers better and create personalized, impactful experiences.
                  </p>
                </div>
              </div>
              <div className="relative aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="https://cdn-web.joy.so/cdn/image/2025/01/About-Joy.avif"
                  alt="Joy team celebrating"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="w-full py-20">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden lg:order-2">
                <Image
                  src="https://cdn-web.joy.so/cdn/image/2025/01/we-are-Joy.avif"
                  alt="Joy team working together"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="space-y-6 lg:order-1">
                <h2 className="text-3xl font-bold text-white">Our vision</h2>
                <p className="text-gray-400">
                  Our vision is to set the gold standard in loyalty program solutions, becoming the go-to choice for businesses worldwide by consistently delivering excellence and innovation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-20">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-[#0A0F1C] p-8 rounded-lg border-l-2 border-blue-500 flex flex-col"
                >
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Preview Section */}
        <FeaturesPreview />

        {/* CTA Section */}
        <CTASection
          title={[
            "Join thousands of merchants",
            "who trust Joy"
          ]}
        />
      </main>
    </ForcedTheme>
  );
}
