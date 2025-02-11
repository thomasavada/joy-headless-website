import Image from 'next/image';
import Link from 'next/link';
import {fetchIntegrations} from '@/lib/strapi';
import {Integration} from '@/types/integration';
import {Metadata} from 'next';

export const revalidate = 3600; // Revalidate every hour

// Add metadata for the integrations listing page
export const metadata: Metadata = {
  title: "Joy loyalty | Integrations",
  description: "Over 20+ carefully curated integrations to help you streamline your workflow, enhance your store&apos;s performance, and create seamless customer experiences.",
};

export default async function IntegrationsPage() {
  const { data: integrations } = await fetchIntegrations();

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <div className="py-20 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
          Joy integrates with your most-loved tools
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect Joy with 20+ carefully curated integrations to streamline your workflow and enhance your store's performance
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <a
            href="#integrations-grid"
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-full transition-colors"
            tabIndex={0}
            aria-label="Browse available integrations"
          >
            Browse integrations
          </a>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-primary border border-primary/20 rounded-full bg-white dark:bg-white/5 hover:bg-primary/5 dark:hover:bg-white/10 transition-colors"
            tabIndex={0}
            aria-label="Request new integration"
          >
            Request integration
          </a>
        </div>
      </div>

      {/* Integrations Grid */}
      <div id="integrations-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
        {integrations.map((integration: Integration) => (
          <Link
            href={`/integrations/${integration.slug}`}
            key={integration.id}
            className="group block p-6 bg-card hover:bg-accent rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all duration-200"
          >
            <div className="space-y-4">
              {integration.logo?.url ? (
                <div className="relative h-20 w-20 bg-white dark:bg-gray-800 rounded-lg p-2">
                  <Image
                    src={integration.logo.url}
                    alt={integration.name}
                    fill
                    className="object-contain"
                    sizes="200px"
                  />
                </div>
              ) : (
                <div className="h-12 w-12 mx-auto bg-muted rounded-lg p-2 flex items-center justify-center">
                  <span className="text-muted-foreground text-xs">No logo</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {integration.name}
                </h2>
                <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-medium">
                  {integration.availability}
                </span>
              </div>

              <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                {integration.short_description}
              </p>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Built by: {integration.built_by}</span>
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 font-medium text-xs">
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
