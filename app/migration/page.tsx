import {Metadata} from "next";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {SponsorsSection} from "@/components/layout/sections/sponsors";
import {ArrowRight, BarChart3, DollarSign, Gift} from "lucide-react";
import {TypewriterText} from "@/components/layout/sections/stamped-migration";
import {JsonLd} from '@/components/blog/json-ld';
import {frontEndDomain} from "@/lib/frontend";

export const metadata: Metadata = {
  title: "Migration - Joy",
  description: "Easily migrate your loyalty program to Joy",
};

const migrationFeatures = [
  {
    icon: DollarSign,
    title: "Customer Name",
    description: "Streamlining the process of creating custom rewards"
  },
  {
    icon: BarChart3,
    title: "VIP Tier Name",
    description: "The customer's rank tier in your loyalty program to ensure customer information and benefits"
  },
  {
    icon: Gift,
    title: "Birth Date",
    description: "Keep all customer birth dates for special rewards and birthday campaigns"
  },
  {
    icon: DollarSign,
    title: "Points Balance",
    description: "Points transferred accurately to make customers continue redeeming rewards"
  },
  {
    icon: BarChart3,
    title: "Email",
    description: "Customer emails will be maintained the core communication channel between you and customers"
  },
  {
    icon: Gift,
    title: "Other data",
    description: "Do you want to migrate more data?"
  }
];

const migrationGuides = [
  {
    name: "Yotpo",
    logo: "https://cdn-web.joy.so/cdn/image/2025/01/Yopto.avif",
    href: "https://help.joy.so/migration/migrations-from-apps/migration-from-yotpo-loyalty-to-joy-loyalty"
  },
  {
    name: "Stamped",
    logo: "https://cdn-web.joy.so/cdn/image/2025/01/stamped.avif",
    href: "https://help.joy.so/migration/migrations-from-apps/migration-from-stamped-to-joy-loyalty"
  },
  {
    name: "Smile",
    logo: "https://cdn-web.joy.so/cdn/image/2025/01/smile.avif",
    href: "https://help.joy.so/migration/migrations-from-apps/migration-from-smile-to-joy-loyalty"
  },
  {
    name: "Appstle",
    logo: "https://cdn-web.joy.so/cdn/image/2025/01/Appstle-e1735805634907.avif",
    href: "https://help.joy.so/migration/migrations-from-apps/migration-from-appstle-sm-loyalty-and-rewards-to-joy-loyalty"
  },
  {
    name: "Rivo",
    logo: "https://cdn-web.joy.so/cdn/image/2025/01/rivo.avif",
    href: "https://help.joy.so/migration/migrations-from-apps/migration-from-rivo-to-joy-loyalty"
  },
  {
    name: "Bon",
    logo: "https://cdn-web.joy.so/cdn/image/2025/01/bon.avif",
    href: "https://help.joy.so/migration/migrations-from-apps/migration-from-bon-loyalty-to-joy-loyalty"
  }
];

export default function MigrationPage() {
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
        "@id": `https://${frontEndDomain}/migrate/#webpage`,
        "url": `https://${frontEndDomain}/migrate/`,
        "name": "Migration - Joy",
        "description": "Easily migrate your loyalty program to Joy",
        "isPartOf": {
          "@id": `https://${frontEndDomain}/#website`
        },
        "inLanguage": "en-US",
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "@id": "https://cdn-web.joy.so/cdn/image/2024/12/image-3.png",
          "url": "https://cdn-web.joy.so/cdn/image/2024/12/image-3.png",
          "caption": "Migration Data Types"
        }
      },
      {
        "@type": "FAQPage",
        "@id": `https://${frontEndDomain}/migrate/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What customer data can Joy migrate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Joy can migrate customer names, VIP tier names, birth dates, points balances, emails, and other custom data. The migration process is backed by 24/7 expert support and includes no migration fee."
            }
          },
          {
            "@type": "Question",
            "name": "Which platforms can I migrate from?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Joy supports migration from Yotpo, Stamped, Smile, Appstle, Rivo, Bon, and other loyalty platforms. Each migration comes with step-by-step guides and expert support."
            }
          }
        ]
      },
      {
        "@type": "Service",
        "@id": `https://${frontEndDomain}/migrate/#service`,
        "name": "Joy Migration Service",
        "description": "Transfer your customer data and loyalty settings with our powerful, user-friendly platform – no hassle, just results",
        "provider": {
          "@id": `https://${frontEndDomain}/#person`
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "description": "No migration fee"
        },
        "serviceType": "Loyalty Program Migration",
        "termsOfService": `https://${frontEndDomain}/terms-of-use/`
      }
    ]
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
              Easily migrate from<br />
              <TypewriterText />
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Transfer your customer data and loyalty settings with our powerful, user-friendly platform – no hassle, just results
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">Book Demo</Button>
            </div>
          </div>
        </div>
      </section>

      <SponsorsSection />

      {/* Migration Data Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                What customer data can<br />Joy migrate?
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Customize and build your own logic, backed by 24/7 expert support team
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="w-5 h-5 rounded-full bg-primary-dark/10 flex items-center justify-center">
                    <svg className="w-3 h-3 text-primary-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                  </div>
                  No migration fee
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="w-5 h-5 rounded-full bg-primary-dark/10 flex items-center justify-center">
                    <svg className="w-3 h-3 text-primary-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                  </div>
                  1-1 expert support
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="w-5 h-5 rounded-full bg-primary-dark/10 flex items-center justify-center">
                    <svg className="w-3 h-3 text-primary-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                  </div>
                  Customer Information Privacy
                </li>
              </ul>
              <div className="pt-4">
                <Button
                  asChild
                  variant="link"
                  className="text-primary-dark hover:text-primary-dark/90 px-0 font-medium"
                >
                  <a href="#migrate-page">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative aspect-square">
              <Image
                src="https://cdn-web.joy.so/cdn/image/2024/12/image-3.png"
                alt="Migration Data Types"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {migrationFeatures.map((feature) => (
              <div key={feature.title} className="flex flex-col items-start gap-4 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-dark/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary-dark" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Migration Guides Section */}
      <section className="w-full py-12 sm:py-24 border-t border-white/10">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Start your seamless<br />migration with the guide
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Follow our step-by-step migration guides to transfer your loyalty program smoothly and securely
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {migrationGuides.map((guide) => (
              <div key={guide.name} className="flex flex-col items-center gap-2">
                <a
                  href={guide.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square w-full max-w-[160px] rounded-lg bg-white/5 p-4 hover:bg-white/10 transition-colors"
                >
                  <Image
                    src={guide.logo}
                    alt={`${guide.name} logo`}
                    fill
                    className="object-contain p-4"
                  />
                </a>
                <Button
                  asChild
                  variant="link"
                  className="text-sm text-white/70 hover:text-white h-auto p-0"
                >
                  <a
                    href={guide.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Migrate from {guide.name} →
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
