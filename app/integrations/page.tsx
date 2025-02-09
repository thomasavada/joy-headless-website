import Image from 'next/image';
import Link from 'next/link';
import { fetchIntegrations } from '@/lib/strapi';
import { Integration } from '@/types/integration';

export const revalidate = 3600; // Revalidate every hour

export default async function IntegrationsPage() {
  const { data: integrations } = await fetchIntegrations();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12 text-foreground">Integrations</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {integrations.map((integration: Integration) => (
          <Link
            href={`/integrations/${integration.slug}`}
            key={integration.id}
            className="group block p-6 bg-card hover:bg-accent rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="space-y-4">
              {integration.logo?.data?.attributes?.url ? (
                <div className="relative h-12 w-12 mx-auto bg-white dark:bg-gray-800 rounded-lg p-2">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${integration.logo.data.attributes.url}`}
                    alt={integration.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="h-12 w-12 mx-auto bg-muted rounded-lg p-2" />
              )}
              
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {integration.name}
                </h2>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {integration.availability}
                </span>
              </div>
              
              <p className="text-muted-foreground text-sm line-clamp-2">
                {integration.short_description}
              </p>
              
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Built by: {integration.built_by}</span>
                  <span className="px-2 py-1 rounded-full bg-muted">
                    {integration.category}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 