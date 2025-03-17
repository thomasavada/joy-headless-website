import {ForcedTheme} from '@/components/ForcedTheme';
import {Metadata} from 'next';
import {JsonLd} from '@/components/blog/json-ld';
import {frontEndDomain} from "@/lib/frontend";
import { ContactForm } from './contact-form';

export const metadata: Metadata = {
  title: 'Book a Demo | Joy Rewards & Loyalty Program',
  description: 'Schedule a demo with our experts to learn how Joy can help grow your business with loyalty programs.',
};

export default function BookDemoPage() {
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
        "@id": `https://${frontEndDomain}/book-demo/#webpage`,
        "url": `https://${frontEndDomain}/book-demo/`,
        "name": "Book a Demo | Joy Rewards & Loyalty Program",
        "description": "Schedule a demo with our experts to learn how Joy can help grow your business with loyalty programs.",
        "isPartOf": {
          "@id": `https://${frontEndDomain}/#website`
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "ContactPage",
        "@id": `https://${frontEndDomain}/book-demo/#contactpage`,
        "url": `https://${frontEndDomain}/book-demo/`,
        "name": "Book a Demo with Joy Experts",
        "description": "Talk to our experts and learn how Joy can help grow your business with loyalty programs.",
        "provider": {
          "@id": `https://${frontEndDomain}/#person`
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "sales@joy.so",
          "contactType": "sales",
          "availableLanguage": "English"
        }
      }
    ]
  };

  return (
    <ForcedTheme theme="dark">
      <JsonLd data={jsonLd} />
      <main className="flex min-h-screen flex-col bg-[#020817]">
        <div className="container max-w-6xl mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left Column - Content */}
              <div className="max-w-md">
                <h1 className="text-5xl font-bold mb-6">Talk to experts</h1>
                <p className="text-gray-400 mb-8">
                  Don&apos;t hesitate to reach out with any questions.<br />
                  We&apos;ll get back to you quickly with a response.
                </p>
                <div className="flex items-center gap-2 text-gray-400">
                  <span>📧</span>
                  <span>sales@joy.so</span>
                </div>
              </div>

              {/* Right Column - Form */}
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </ForcedTheme>
  );
}
