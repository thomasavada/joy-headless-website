import React from 'react';

type JsonLdGraphData = {
  "@context": string;
  "@graph": Array<{
    "@type": string | string[];
    "@id": string;
    [key: string]: any;
  }>;
};

type JsonLdArticleData = {
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
  description?: string;
  image?: {
    "@type": string;
    url: string;
  };
  datePublished?: string;
  dateModified?: string;
  mainEntityOfPage: string;
};

type JsonLdProps = {
  data: JsonLdGraphData | JsonLdArticleData;
};

export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};