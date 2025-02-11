import {IntegrationsResponse} from "@/types/integration";

if (!process.env.NEXT_PUBLIC_STRAPI_URL) throw new Error('NEXT_PUBLIC_STRAPI_URL is not defined');
if (!process.env.NEXT_STRAPI_API_KEY) throw new Error('STRAPI_API_KEY is not defined');

// Common fetch function for Strapi
const fetchFromStrapi = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${endpoint}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_STRAPI_API_KEY}`,
        'Cache-Control': 'no-store',
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
    console.log("data integrations:", JSON.stringify(data, null, 2));
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

export interface SuccessStoryInfo {
  id: number;
  ghost_post_id: string;
  company_name: string;
  industry: string | null;
  location: string | null;
  revenue: string | null;
  use_case: string | null;
  orders_per_month: string | null;
  points_redemption_rate: string | null;
  features: {
    data: string[];
  };
  key_results: {
    data: string[];
  };
}

export async function getSuccessStoryInfo(ghostPostId: string) {
  try {
    const data = await fetchFromStrapi<{data: SuccessStoryInfo[]}>(
      `success-stories-infos?filters[ghost_post_id][$eq]=${ghostPostId}&populate=*`
    );
    
    return data.data[0];
  } catch (error) {
    console.error('Error fetching success story info:', error);
    return null;
  }
}
