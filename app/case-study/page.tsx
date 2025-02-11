import {getPosts} from "@/lib/ghost";
import {SuccessStoriesHero} from "@/components/success-stories/hero";
import {MetricsSection} from "@/components/success-stories/metrics";
import {SuccessStoriesGrid} from "@/components/success-stories/grid";
import {Metadata} from "next";

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const title = "Case Study x Joy integration";
  const description = "Explore real-world case studies showcasing how our loyalty platform drives engagement and growth. See measurable results from successful implementations across retail, fashion, and F&B sectors.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export const revalidate = 3600; // Revalidate every hour

export default async function CaseStudyPage() {
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
