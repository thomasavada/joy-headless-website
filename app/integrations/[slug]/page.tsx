import Image from 'next/image';
import {fetchIntegrationBySlug, fetchIntegrations} from '@/lib/strapi';
import {Markdown} from '@/components/ui/markdown';
import {Integration} from '@/types/integration';
import Link from 'next/link';
import {ImageCarousel} from '@/components/ui/image-carousel';
import {Metadata, ResolvingMetadata} from 'next';
import {ForcedTheme} from '../../../components/ForcedTheme';

interface IntegrationPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for the page
export async function generateMetadata(
  { params }: IntegrationPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { data: integrations } = await fetchIntegrationBySlug(params.slug);
  const integration = integrations[0];

  if (!integration) {
    return {
      title: 'Integration Not Found | Joy loyalty',
      description: 'The requested integration could not be found.'
    };
  }

  return {
    title: `Joy loyalty | ${integration.name} Integration`,
    description: `Enhance your store with Joy&apos;s ${integration.name} integration. ${integration.short_description}`
  };
}

// Generate static params for all integrations
export async function generateStaticParams() {
  const { data: integrations } = await fetchIntegrations();

  return integrations.map((integration: Integration) => ({
    slug: integration.slug,
  }));
}

export default async function IntegrationPage({ params }: IntegrationPageProps) {
  const { data: integrations } = await fetchIntegrationBySlug(params.slug);
  const integration = integrations[0];

  // Fetch all integrations for related section
  const { data: allIntegrations } = await fetchIntegrations();

  // Get related integrations based on category, excluding current one
  const relatedIntegrations = allIntegrations
    .filter((related: Integration) =>
      related.category === integration.category &&
      related.id !== integration.id
    )
    .slice(0, 3); // Limit to 3 related integrations

  if (!integration) {
    return <div>Integration not found</div>;
  }

  return (
    <ForcedTheme theme="light">
       <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Secondary Sidebar */}
        <aside className="lg:w-80">
          <div className="sticky top-8 space-y-6 bg-card rounded-lg p-6">
            {/* Logo */}
            {integration.logo?.url ? (
              <div className="relative h-16 w-16 bg-white dark:bg-gray-800 rounded-lg p-3">
                <Image
                  src={integration.logo.url}
                  alt={integration.name}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
            ) : (
              <div className="h-16 w-16 bg-muted rounded-lg p-3 flex items-center justify-center">
                <span className="text-muted-foreground text-xs">No logo</span>
              </div>
            )}

            {/* Integration Details */}
            <div className="space-y-3">
              <div>
                <h3 className="text-xs font-medium text-muted-foreground">Built by</h3>
                <p className="text-sm text-foreground">{integration.built_by}</p>
              </div>

              <div>
                <h3 className="text-xs font-medium text-muted-foreground">Works with</h3>
                <p className="text-sm text-foreground">{integration.works_with}</p>
              </div>

              <div>
                <h3 className="text-xs font-medium text-muted-foreground">Category</h3>
                <p className="text-sm text-foreground">{integration.category}</p>
              </div>

              <div>
                <h3 className="text-xs font-medium text-muted-foreground">Availability</h3>
                <p className="text-sm text-foreground">{integration.availability}</p>
              </div>
            </div>

            {/* Support */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-xs font-medium text-muted-foreground mb-2">Support</h3>
              <div className="space-y-2">
                {integration.documentation_link && (
                  <a
                    href={integration.documentation_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-primary hover:underline"
                  >
                    Help Center
                  </a>
                )}
              </div>
            </div>

                 {/* Support */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-xs font-medium text-muted-foreground mb-2">Links</h3>
              <div className="space-y-2">
                {integration.links && (
                  <div className="[&_a]:inline-flex [&_a]:items-center [&_a]:text-xs [&_a]:text-primary hover:[&_a]:underline [&_p]:m-0">
                    <Markdown content={integration.links} />
                  </div>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              {integration.install_link && (
                <a
                  href={integration.install_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Install integration
                </a>
              )}
            </div>
          </div>
        </aside>

        {/* Primary Content */}
        <main className="flex-1">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
                {integration.name}
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                {integration.short_description}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <Markdown content={integration.content} />
            </div>

            {/* Images Carousel */}
            {integration.images && integration.images.length > 0 && (
              <ImageCarousel images={integration.images} />
            )}

            {/* Bottom CTA */}
            <div className="pt-8 flex gap-4">
              {integration.documentation_link && (
                <a
                  href={integration.documentation_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  View Documentation
                </a>
              )}
              {!integration.install_link && (
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium border border-primary text-primary bg-transparent rounded-full hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Request integration
                </a>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Related Integrations Section */}
      {relatedIntegrations.length > 0 && (
        <div className="mt-16 pt-16 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-8">Related Integrations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedIntegrations.map((related: Integration) => (
              <Link
                href={`/integrations/${related.slug}`}
                key={related.id}
                className="group block p-6 bg-card hover:bg-accent rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all duration-200"
              >
                <div className="space-y-4">
                  {related.logo?.url ? (
                    <div className="relative h-12 w-12 mx-auto bg-white dark:bg-gray-800 rounded-lg p-2">
                      <Image
                        src={related.logo.url}
                        alt={related.name}
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>
                  ) : (
                    <div className="h-12 w-12 mx-auto bg-muted rounded-lg p-2 flex items-center justify-center">
                      <span className="text-muted-foreground text-xs">No logo</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {related.name}
                    </h3>
                    <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-medium">
                      {related.availability}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                    {related.short_description}
                  </p>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Built by: {related.built_by}</span>
                      <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 font-medium text-xs">
                        {related.category}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
    </ForcedTheme>

  );
}
