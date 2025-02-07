import { log } from "console";

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

const ghostUrl = process.env.NEXT_PUBLIC_GHOST_URL?.replace(/\/$/, '');
const ghostKey = process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY;

if (!ghostUrl || !ghostKey) {
  console.error('Ghost API configuration missing:', { ghostUrl, ghostKey });
}

// API Functions
export async function getPosts() {
  try {
    const url = `${ghostUrl}/ghost/api/content/posts/?key=${ghostKey}&include=tags,authors`;
    console.log("Fetching from URL:", url);
    
    const res = await fetch(url, { 
      next: { revalidate: 60 },
      headers: {
        'Accept-Version': 'v5.0',
        'Accept': 'application/json',
      }
    });
    
    if (!res.ok) {
      const error = await res.json();
      console.error("API Error:", error);
      return [];
    }
    
    const data = await res.json();
    console.log("Response data:", data);
    return data.posts;
  } catch (err) {
    console.error("Fetch error:", err);
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