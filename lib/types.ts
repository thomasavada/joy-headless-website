export interface Tag {
  id: string;
  name: string;
  slug?: string;
  description?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  feature_image?: string;
  tags?: Tag[];
  published_at: string;
  updated_at?: string;
} 