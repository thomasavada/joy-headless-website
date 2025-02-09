export interface Integration {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  short_description: string;
  content: string;
  category: string;
  availability: string;
  built_by: string;
  works_with: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  links: string | null;
  documentation_link: string | null;
  install_link: string | null;
  logo: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail?: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: string | null;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  } | null;
  images: Array<{
    id: number;
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
    formats?: {
      thumbnail?: {
        url: string;
        width: number;
        height: number;
      };
    };
  }> | null;
}

export interface IntegrationsResponse {
  data: Integration[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
} 