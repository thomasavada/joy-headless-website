import { getFeaturedPosts, getRegularPosts, getSettings, Post, Settings } from '@/lib/ghost';
import { PostGrid } from '@/components/blog/post-grid';
import { FooterSection } from "@/components/layout/sections/footer";
import { Metadata } from 'next';

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

export default async function BlogPage() {
  // Fetch featured and regular posts in parallel
  const [featuredPosts, regularPosts] = await Promise.all([
    getFeaturedPosts() as Promise<Post[]>,
    getRegularPosts() as Promise<Post[]>
  ]);

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
          featuredPosts={featuredPosts}
          regularPosts={regularPosts}
        />
      </section>

      <FooterSection />
    </main>
  );
} 