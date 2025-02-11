
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

// API Functions
export async function getPosts() {
  try {
    const url = `${ghostUrl}/ghost/api/content/posts/?key=${ghostKey}&include=tags,authors&order=published_at%20DESC`;
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
}

export async function getFeaturedPosts() {
  try {
    const url = `${ghostUrl}/ghost/api/content/posts/?key=${ghostKey}&filter=featured:true&include=tags,authors&limit=all&order=published_at%20DESC`;
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

export async function getRegularPosts() {
  try {
    const url = `${ghostUrl}/ghost/api/content/posts/?key=${ghostKey}&filter=featured:false&include=tags,authors&limit=all&order=published_at%20DESC`;
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        'Accept-Version': 'v5.0',
        'Accept': 'application/json',
      }
    });

    if (!res.ok) {
      console.error('Failed to fetch regular posts:', await res.text());
      return [];
    }

    const data = await res.json();
    return data.posts;
  } catch (err) {
    console.error('Error fetching regular posts:', err);
    return [];
  }
}

export async function getSinglePost(slug: string) {
  try {
    const url = `${ghostUrl}/ghost/api/content/posts/slug/${slug}/?key=${ghostKey}&include=tags,authors`;

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

export async function getPostsByTag(tag: string) {
  try {
    const url = `${ghostUrl}/ghost/api/content/posts/?key=${ghostKey}&filter=tag:${tag}&include=tags,authors`;

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
