import {getPosts} from "@/lib/ghost";
import {SuccessStoriesHero} from "@/components/success-stories/hero";
import {MetricsSection} from "@/components/success-stories/metrics";
import {SuccessStoriesGrid} from "@/components/success-stories/grid";
import {Metadata} from "next";
import {JsonLd} from '@/components/blog/json-ld';
import {frontEndDomain} from "@/lib/frontend";

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const title = "Case Study | Joy Rewards & Loyalty Program - Joy retention | Loyalty for Shopify";
  const description = "Working with top global brands across industries has helped us create a powerful, flexible loyalty platform and gain the expertise to deliver exceptional";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export const revalidate = 3600; // Revalidate every hour

export default async function CaseStudyPage() {
  const posts = await getPosts({
    filter: 'tag:success-stories',
    include: ['tags', 'authors'],
    limit: 'all'
  });

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
        "@id": `https://${frontEndDomain}/case-study/#webpage`,
        "url": `https://${frontEndDomain}/case-study/`,
        "name": "Case Study | Joy Rewards & Loyalty Program",
        "description": "Working with top global brands across industries has helped us create a powerful, flexible loyalty platform and gain the expertise to deliver exceptional services to our retail, fashion, and F&B clients.",
        "isPartOf": {
          "@id": `https://${frontEndDomain}/#website`
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "ItemList",
        "@id": `https://${frontEndDomain}/case-study/#casestudies`,
        "itemListElement": [
          {
            "@type": "Article",
            "position": 1,
            "url": `https://${frontEndDomain}/case-study/vinamilk`,
            "name": "Vinamilk's Game-Changing Loyalty Strategy",
            "description": "Achieved significant engagements in the first month of program launch"
          },
          {
            "@type": "Article",
            "position": 2,
            "url": `https://${frontEndDomain}/case-study/allbirds`,
            "name": "Allbirds Korea's Secret to Explosive Growth",
            "description": "30% MoM sales growth in campaign"
          },
          {
            "@type": "Article",
            "position": 3,
            "url": `https://${frontEndDomain}/case-study/glamourus`,
            "name": "The Secret Behind Glamour Us' Loyalty Program",
            "description": "High redemption rate in the Glamourus Program"
          },
          {
            "@type": "Article",
            "position": 4,
            "url": `https://${frontEndDomain}/case-study/korean-skincare`,
            "name": "Korean Skincare's Secret to Customer Loyalty Success",
            "description": "High referral conversion rate in Korean Skincare program"
          }
        ]
      }
    ]
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <JsonLd data={jsonLd} />
      <SuccessStoriesHero />
      <MetricsSection />
      <SuccessStoriesGrid posts={posts} />
    </main>
  );
}
