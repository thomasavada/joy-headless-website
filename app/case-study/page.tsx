import { getPosts } from "@/lib/ghost";
import { SuccessStoriesHero } from "@/components/success-stories/hero";
import { MetricsSection } from "@/components/success-stories/metrics";
import { SuccessStoriesGrid } from "@/components/success-stories/grid";

export const revalidate = 3600; // Revalidate every hour

export default async function SuccessStoriesPage() {
  const posts = await getPosts({
    filter: 'tag:success-stories',
    include: ['tags', 'authors'],
    limit: 'all'
  });

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <SuccessStoriesHero />
      <MetricsSection />
      <SuccessStoriesGrid posts={posts} />
    </main>
  );
} 