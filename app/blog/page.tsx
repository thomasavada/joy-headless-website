import { getPosts, Post } from '@/lib/ghost';
import Link from 'next/link';
import Image from 'next/image';
import { FooterSection } from "@/components/layout/sections/footer";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Joy - Rewards & Loyalty Program for Shopify Business',
  description: 'Explore articles about loyalty programs, customer retention strategies, and e-commerce growth tips for Shopify businesses.',
  openGraph: {
    title: 'Joy Blog - Loyalty Program Insights',
    description: 'Discover strategies and tips for growing your Shopify business with loyalty programs.',
    type: 'website',
  },
};

export default async function BlogPage() {
  const posts = await getPosts() as Post[];

  return (
    <main className="flex min-h-screen flex-col">
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-card rounded-lg overflow-hidden">
              {post.feature_image && (
                <Image
                  src={post.feature_image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-4">
                  {post.primary_author.profile_image && (
                    <Image
                      src={post.primary_author.profile_image}
                      alt={post.primary_author.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-medium">{post.primary_author.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(post.published_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <FooterSection />
    </main>
  );
} 