import Link from 'next/link';
import Image from 'next/image';
import {Post} from '@/lib/ghost';

interface CaseStudyCardProps {
  post: Post;
}

export const CaseStudyCard = ({ post }: CaseStudyCardProps) => {
  return (
    <Link
      href={`/case-study/${post.slug}`}
      className="group block bg-white rounded-lg overflow-hidden transition-all hover:shadow-lg"
    >
      {/* Card Image */}
      {post.feature_image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.feature_image}
            alt={post.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Card Content */}
      <div className="p-6">
        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span
                key={tag.id}
                className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {post.excerpt}
          </p>
        )}

        {/* Read More */}
        <div className="mt-4 flex items-center text-primary font-medium text-sm">
          Read case study
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};
