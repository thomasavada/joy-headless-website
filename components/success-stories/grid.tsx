"use client";

import { useState } from "react";
import { PostOrPage } from "@tryghost/content-api";
import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "fashion-beauty", label: "Fashion & Beauty" },
  { id: "food-beverages", label: "Food & Beverages" },
  { id: "electronics-decor", label: "Electronics - Decor" },
];

interface SuccessStoriesGridProps {
  posts: PostOrPage[];
}

export const SuccessStoriesGrid = ({ posts }: SuccessStoriesGridProps) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPosts = activeCategory === "all" 
    ? posts 
    : posts.filter(post => 
        post.tags?.some(tag => tag.slug === activeCategory)
      );

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Achieving Measurable Success:<br />
          Real-World Results from Our Clients
        </h2>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeCategory === category.id
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Success stories grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <Link 
            key={post.id} 
            href={`/case-study/${post.slug}`}
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