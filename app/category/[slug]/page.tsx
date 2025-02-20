import { ForcedTheme } from '@/components/ForcedTheme';
import { getPosts, getRegularPosts, getSettings, Post, Settings } from '@/lib/ghost';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostGrid } from '@/components/blog/post-grid';
import { FooterSection } from "@/components/layout/sections/footer";
import { Pagination } from '@/components/ui/pagination';

// Number of posts per page
const POSTS_PER_PAGE = 9;

interface Props {
  params: {
    slug: string;
  };
  searchParams: {
    page?: string;
    search?: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { settings } = await getSettings() as Settings;
  const categoryName = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${categoryName} - ${settings.title}`,
    description: `Read articles about ${categoryName.toLowerCase()} and learn how to grow your business with Joy's loyalty program.`,
    openGraph: {
      title: `${categoryName} - ${settings.title}`,
      description: `Read articles about ${categoryName.toLowerCase()} and learn how to grow your business with Joy's loyalty program.`,
      type: 'website',
      images: settings.cover_image ? [settings.cover_image] : [],
    },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1;
  const searchTerm = searchParams.search || '';

  // Get posts filtered by tag
  const { posts: regularPosts, totalPosts } = await getRegularPosts({
    page: currentPage,
    limit: POSTS_PER_PAGE,
    search: searchTerm,
    filter: `tag:${params.slug}`
  });

  if (!regularPosts.length && currentPage === 1 && !searchTerm) {
    notFound();
  }

  // Calculate total pages
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const categoryName = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <ForcedTheme theme="light">
      <main className="flex min-h-screen flex-col">
        {/* Category Header */}
        <section className="w-full border-b border-border/40 bg-gradient-to-b from-background/60 to-background">
          <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 max-w-6xl">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl font-heading font-medium mb-4">
                {categoryName}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
                Read articles about {categoryName.toLowerCase()} and learn how to grow your business with Joy&apos;s loyalty program.
              </p>
            </div>
          </div>
        </section>

        {/* Category Content */}
        <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 max-w-6xl">
          {totalPosts === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <h2 className="text-lg font-medium mb-2">No results found</h2>
              <p className="text-muted-foreground">
                Try adjusting your search terms or browse all articles
              </p>
            </div>
          ) : (
            <>
              <PostGrid
                featuredPosts={[]}
                regularPosts={regularPosts}
              />

              {totalPages > 1 && (
                <div className="mt-8 sm:mt-12 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    baseUrl={`/category/${params.slug}${searchTerm ? `?search=${searchTerm}` : ''}`}
                  />
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </ForcedTheme>
  );
}