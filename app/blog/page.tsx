import {getFeaturedPosts, getRegularPosts, getSettings, Post, Settings} from '@/lib/ghost';
import {PostGrid} from '@/components/blog/post-grid';
import {FooterSection} from "@/components/layout/sections/footer";
import {Metadata} from 'next';
import { Pagination } from '@/components/ui/pagination';

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
  searchParams: { page?: string };
}) {
  // Get current page from search params, default to 1
  const currentPage = Number(searchParams.page) || 1;

  // Fetch featured posts and paginated regular posts in parallel
  const [featuredPosts, { posts: regularPosts, totalPosts }] = await Promise.all([
    getFeaturedPosts() as Promise<Post[]>,
    getRegularPosts({
      page: currentPage,
      limit: POSTS_PER_PAGE,
    }) as Promise<{ posts: Post[]; totalPosts: number }>,
  ]);

  // Calculate total pages
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Blog Header */}
      <section className="w-full border-b border-border/40 bg-gradient-to-b from-background/60 to-background">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-heading font-medium mb-4">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Insights, updates, and stories about loyalty programs, customer retention,
              and building lasting relationships with your customers.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <PostGrid
          featuredPosts={currentPage === 1 ? featuredPosts : []}
          regularPosts={regularPosts}
        />
        
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl="/blog"
            />
          </div>
        )}
      </section>

      <FooterSection />
    </main>
  );
}
