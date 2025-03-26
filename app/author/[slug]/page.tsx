import { getAuthor, getPostsByAuthor, getSettings, Post, Settings, Author } from '@/lib/ghost';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { frontEndDomain } from "@/lib/frontend";
import { ForcedTheme } from '@/components/ForcedTheme';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { JsonLd } from '@/components/blog/json-ld';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const [author, { settings }] = await Promise.all([
    getAuthor(params.slug),
    getSettings() as Promise<Settings>
  ]);

  if (!author) {
    return {
      title: `Not Found | ${settings.title}`,
      description: 'The requested author could not be found.',
    };
  }

  return {
    title: `${author.name} | ${settings.title}`,
    description: author.bio || `Articles written by ${author.name}`,
    alternates: {
      canonical: `https://${frontEndDomain}/author/${author.slug}`,
    },
    openGraph: {
      title: `${author.name} | ${settings.title}`,
      description: author.bio || `Articles written by ${author.name}`,
      images: author.profile_image ? [author.profile_image] : [],
      type: 'profile',
      url: `https://${frontEndDomain}/author/${author.slug}`,
    },
    twitter: {
      card: 'summary',
      title: `${author.name} | ${settings.title}`,
      description: author.bio || `Articles written by ${author.name}`,
      images: author.profile_image ? [author.profile_image] : [],
    },
  };
}

export default async function AuthorPage({ params }: Props) {
  const [author, posts] = await Promise.all([
    getAuthor(params.slug),
    getPostsByAuthor(params.slug)
  ]);

  if (!author) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://${frontEndDomain}/author/${author.slug}#person`,
    name: author.name,
    description: author.bio || `Articles written by ${author.name}`,
    image: author.profile_image || undefined,
    url: `https://${frontEndDomain}/author/${author.slug}`,
    jobTitle: "Author",
    worksFor: {
      "@type": "Organization",
      "@id": `https://${frontEndDomain}/#organization`,
      name: "Joy.so",
      url: `https://${frontEndDomain}`
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://${frontEndDomain}/author/${author.slug}`
    },
    knowsAbout: ["Loyalty Programs", "Customer Retention", "E-commerce"],
    publishedBy: {
      "@type": "Organization",
      "@id": `https://${frontEndDomain}/#organization`,
      name: "Joy.so"
    },
    author: {
      "@type": "Person",
      "@id": `https://${frontEndDomain}/author/${author.slug}#person`
    }
  };

  return (
    <ForcedTheme theme="light">
      <main className="flex min-h-screen flex-col">
        <JsonLd data={jsonLd} />
        {/* Author Header */}
        <div className="w-full bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-16 max-w-6xl">
            <div className="flex flex-col items-center text-center space-y-6">
              {author.profile_image && (
                <Image
                  src={author.profile_image}
                  alt={author.name}
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              )}
              <h1 className="text-4xl font-bold">{author.name}</h1>
              {author.bio && (
                <p className="text-lg text-gray-600 max-w-2xl">{author.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Author Posts */}
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <h2 className="text-2xl font-bold mb-8">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: Post) => (
              <article key={post.id} className="flex flex-col">
                <Link
                  href={`/${post.slug}`}
                  className="group hover:no-underline"
                >
                  {post.feature_image && (
                    <div className="relative aspect-[2/1] mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={post.feature_image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.published_at}>
                        {formatDate(post.published_at)}
                      </time>
                    </div>
                    <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </ForcedTheme>
  );
}