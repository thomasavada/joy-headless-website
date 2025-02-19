"use client";

import Link from "next/link";
import Image from "next/image";

// Define our own types instead of using @tryghost/content-api
interface Tag {
  id: string;
  slug: string;
  name: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  feature_image?: string;
  tags?: Tag[];
}

interface SuccessStoriesGridProps {
  posts: Post[];
}

export const SuccessStoriesGrid = ({ posts }: SuccessStoriesGridProps) => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Achieving Measurable Success:<br />
          Real-World Results from Our Clients
        </h2>
      </div>

      {/* Success stories grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/${post.slug}`}
            className="group block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            {post.feature_image && (
              <div className="relative h-48 w-full">
                <Image
                  src={post.feature_image}
                  alt={post.title || ""}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 line-clamp-3">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};