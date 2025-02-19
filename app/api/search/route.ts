import { NextResponse } from 'next/server';
import { getRegularPosts } from '@/lib/ghost';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const { posts } = await getRegularPosts({
      search: query,
      limit: 5, // Limit to 5 results
      page: 1,
    });

    // Transform the posts to match the SearchResult interface
    const results = posts.map(post => ({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search failed:', error);
    return NextResponse.json([], { status: 500 });
  }
}