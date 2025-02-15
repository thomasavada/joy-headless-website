import {getFeaturedPosts, getRegularPosts, getSettings, Post, Settings} from '@/lib/ghost';
import {PostGrid} from '@/components/blog/post-grid';
import {FooterSection} from "@/components/layout/sections/footer";
import {Metadata} from 'next';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/ui/search-input';

// Number of posts per page
const POSTS_PER_PAGE = 9;

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSettings() as Settings;

  return {
    title: `Blog | ${settings.title}`,
    description: settings.description,
    openGraph: {
      title: `Blog - ${settings.title}`,
      description: settings.description,
      type: 'website',
      images: settings.cover_image ? [settings.cover_image] : [],
    },
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const searchTerm = searchParams.search || '';

  // Fetch featured posts and paginated regular posts in parallel
  const [featuredPosts, { posts: regularPosts, totalPosts }] = await Promise.all([
    getFeaturedPosts() as Promise<Post[]>,
    getRegularPosts({
      page: currentPage,
      limit: POSTS_PER_PAGE,
      search: searchTerm,
    }) as Promise<{ posts: Post[]; totalPosts: number }>,
  ]);

  // Calculate total pages
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Blog Header */}
      <section className="w-full border-b border-border/40 bg-gradient-to-b from-background/60 to-background">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 max-w-6xl">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-heading font-medium mb-4">
              Blog
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
              Insights, updates, and stories about loyalty programs, customer retention,
              and building lasting relationships with your customers.
            </p>
            <SearchInput className="max-w-full sm:max-w-md" />
          </div>
        </div>
      </section>

      {/* Blog Content */}
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
              featuredPosts={!searchTerm && currentPage === 1 ? featuredPosts : []}
              regularPosts={regularPosts}
            />
            
            {totalPages > 1 && (
              <div className="mt-8 sm:mt-12 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  baseUrl={`/blog${searchTerm ? `?search=${searchTerm}` : ''}`}
                />
              </div>
            )}
          </>
        )}
      </section>

      <FooterSection />
    </main>
  );
}
