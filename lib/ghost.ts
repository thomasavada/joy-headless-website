// Define types for Ghost content
export interface Post {
  id: string;
  slug: string;
  title: string;
  html: string;
  feature_image: string;
  featured: boolean;
  published_at: string;
  updated_at: string;
  excerpt: string;
  tags: Tag[];
  primary_author: Author;
  meta_title?: string;
  meta_description?: string;
  og_title?: string;
  og_description?: string;
  twitter_title?: string;
  twitter_description?: string;
  codeinjection_head?: string; // This will contain the JSON-LD script
  canonical_url?: string;
  url?: string; // Ghost CMS provides this as fallback
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  profile_image?: string;
  bio?: string;
}

// Update Settings interface to match Ghost API structure
export interface Settings {
  settings: {
    title: string;
    description: string;
    icon?: string;
    logo?: string;
    cover_image?: string;
  }
}

const ghostUrl = process.env.NEXT_PUBLIC_GHOST_URL?.replace(/\/$/, '');
const ghostKey = process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY;

if (!ghostUrl || !ghostKey) {
  console.error('Ghost API configuration missing:', { ghostUrl, ghostKey });
}

// URL Builder helper
const buildGhostUrl = (endpoint: string, params: Record<string, any>) => {
  const searchParams = new URLSearchParams();

  // Add API key
  searchParams.append('key', ghostKey || '');

  // Add all other params
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      searchParams.append(key, value.join(','));
    } else if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  return `${ghostUrl}/ghost/api/${endpoint}?${searchParams.toString()}`;
};

// API Functions
export const getPosts = async ({
  filter = '',
  include = ['tags', 'authors'],
  limit = 'all'
}: {
  filter?: string;
  include?: string[];
  limit?: string | number;
} = {}) => {
  try {
    const url = buildGhostUrl('content/posts/', {
      filter,
      include,
      limit,
      order: 'published_at DESC'
    });

    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        'Accept-Version': 'v5.0',
        'Accept': 'application/json',
      }
    });

    if (!res.ok) {
      console.error('Failed to fetch posts:', await res.text());
      return [];
    }

    const data = await res.json();
    return data.posts;
  } catch (err) {
    console.error('Error fetching posts:', err);
    return [];
  }
};

// Get featured posts (excluding success stories)
export async function getFeaturedPosts() {
  try {
    const url = buildGhostUrl('content/posts/', {
      filter: 'featured:true+tag:-success-stories',
      include: ['tags', 'authors'],
      limit: 'all',
      order: 'published_at DESC'
    });

    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        'Accept-Version': 'v5.0',
        'Accept': 'application/json',
      }
    });

    if (!res.ok) {
      console.error('Failed to fetch featured posts:', await res.text());
      return [];
    }

    const data = await res.json();
    return data.posts;
  } catch (err) {
    console.error('Error fetching featured posts:', err);
    return [];
  }
}

// Get regular posts (excluding success stories)
export async function getRegularPosts({
  page = 1,
  limit = 9,
  search = ''
}: {
  page?: number;
  limit?: number;
  search?: string;
} = {}) {
  try {
    // Build the filter string based on search term
    let filter = 'tag:-case-study';
    if (search) {
      // Use proper Ghost Content API search syntax
      // ~' operator performs a case-insensitive contains search
      filter = `${filter}+title:~'${search}'`;
    }

    const url = buildGhostUrl('content/posts/', {
      filter,
      include: ['tags', 'authors'],
      limit: limit,
      page: page,
      order: 'published_at DESC'
    });

    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        'Accept-Version': 'v5.0',
        'Accept': 'application/json',
      }
    });

    if (!res.ok) {
      console.error('Failed to fetch regular posts:', await res.text());
      return {
        posts: [],
        totalPosts: 0
      };
    }

    const data = await res.json();
    return {
      posts: data.posts,
      totalPosts: data.meta.pagination.total
    };
  } catch (err) {
    console.error('Error fetching regular posts:', err);
    return {
      posts: [],
      totalPosts: 0
    };
  }
}

// Update getSinglePost to use URL builder
export async function getSinglePost(slug: string) {
  try {
    const url = buildGhostUrl(`content/posts/slug/${slug}/`, {
      include: ['tags', 'authors']
    });

    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        'Accept-Version': 'v5.0',
        'Accept': 'application/json',
      }
    });

    const data = await res.json();
    return data.posts[0];
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Update getPostsByTag to use URL builder
export async function getPostsByTag(tag: string) {
  try {
    const url = buildGhostUrl('content/posts/', {
      filter: `tag:${tag}`,
      include: ['tags', 'authors']
    });

    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        'Accept-Version': 'v5.0',
        'Accept': 'application/json',
      }
    });

    const data = await res.json();
    return data.posts;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Update getSettings function
export async function getSettings() {
  try {
    const url = `${ghostUrl}/ghost/api/content/settings/?key=${ghostKey}`;

    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'Accept-Version': 'v5.0',
        'Accept': 'application/json',
      }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch settings');
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error fetching settings:', err);
    return {
      settings: {
        title: 'Joy | Rewards & Loyalty Program for Shopify Business',
        description: 'Drive high conversion rates with Joy - an all-in-one solution for effortless loyalty program.'
      }
    };
  }
}

export async function getRelatedPosts(post: Post) {
  try {
    // Get posts with the same primary tag
    // @ts-ignore
    const primaryTag = post?.primary_tag?.slug;

    if (primaryTag) {
      const url = `${ghostUrl}/ghost/api/content/posts/?key=${ghostKey}&filter=tag:${primaryTag}&include=tags,authors&limit=4`;

      const res = await fetch(url, {
        next: { revalidate: 60 },
        headers: {
          'Accept-Version': 'v5.0',
          'Accept': 'application/json',
        }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch related posts');
      }

      const data = await res.json();
      return data.posts;
    }

    // Fallback: get latest posts if no primary tag
    const url = `${ghostUrl}/ghost/api/content/posts/?key=${ghostKey}&include=tags,authors&limit=4`;

    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        'Accept-Version': 'v5.0',
        'Accept': 'application/json',
      }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch latest posts');
    }

    const data = await res.json();
    return data.posts;
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

// Get a single page by slug
export async function getPage(slug: string): Promise<Post | null> {
  try {
    const url = buildGhostUrl(`content/pages/slug/${slug}/`, {
      include: ['tags', 'authors']
    });

    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        'Accept-Version': 'v5.0',
        'Accept': 'application/json',
      }
    });

    if (!res.ok) {
      console.error('Failed to fetch page:', await res.text());
      return null;
    }

    const data = await res.json();
    return data.pages[0] || null;
  } catch (err) {
    console.error('Error fetching page:', err);
    return null;
  }
}

// Get all pages
export async function getPages(): Promise<Post[]> {
  try {
    const url = buildGhostUrl('content/pages/', {
      include: ['tags', 'authors'],
      limit: 'all'
    });

    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        'Accept-Version': 'v5.0',
        'Accept': 'application/json',
      }
    });

    if (!res.ok) {
      console.error('Failed to fetch pages:', await res.text());
      return [];
    }

    const data = await res.json();
    return data.pages;
  } catch (err) {
    console.error('Error fetching pages:', err);
    return [];
  }
}
