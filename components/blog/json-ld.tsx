'use client';

interface JsonLdProps {
  data: {
    "@context": string;
    "@type": string;
    publisher: {
      "@type": string;
      name: string;
      url: string;
      logo: {
        "@type": string;
        url: string;
        width: number;
        height: number;
      };
    };
    author: {
      "@type": string;
      name: string;
      url: string;
      sameAs: string[];
    };
    headline: string;
    url: string;
    datePublished: string;
    dateModified: string;
    image: {
      "@type": string;
      url: string;
      width: number;
      height: number;
    };
    description: string;
    mainEntityOfPage: string;
  };
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
} 