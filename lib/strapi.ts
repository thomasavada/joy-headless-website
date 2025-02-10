import {IntegrationsResponse} from "@/types/integration";

if (!process.env.NEXT_PUBLIC_STRAPI_URL) throw new Error('NEXT_PUBLIC_STRAPI_URL is not defined');
if (!process.env.STRAPI_API_KEY) throw new Error('STRAPI_API_KEY is not defined');

// Common fetch function for Strapi
const fetchFromStrapi = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${endpoint}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
      },
      cache: 'no-store',
      next: { revalidate: 0 }
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch from Strapi: ${endpoint}`);
  }

  return response.json();
};

export const fetchIntegrations = async () => {
  try {
    const data = await fetchFromStrapi<IntegrationsResponse>('integrations?populate=*');
    return data;
  } catch (error) {
    console.error('Error fetching integrations:', error);
    throw error;
  }
};

export const fetchIntegrationBySlug = async (slug: string) => {
  const data = await fetchFromStrapi<IntegrationsResponse>(
    `integrations?filters[slug][$eq]=${slug}&populate=*`
  );
  console.log("data integration one:", JSON.stringify(data, null, 2));
  return data;
};
