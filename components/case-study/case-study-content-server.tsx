import { Post } from '@/lib/ghost';
import { SuccessStoryInfo } from '@/lib/strapi';
import { PostContent } from '@/components/blog/post-content';
import { JsonLd } from '@/components/blog/json-ld';
import { RelatedPosts } from "@/components/blog/related-posts";
import { JSDOM } from 'jsdom';

interface CaseStudyContentServerProps {
  post: Post;
  successStoryInfo: SuccessStoryInfo | null;
  relatedPosts: Post[];
  jsonLd: any;
}

interface ImageSize {
  width: number;
  height: number;
  breakpoint?: number;
}

const imageSizes: ImageSize[] = [
  { width: 640, height: 360, breakpoint: 640 },   // Mobile
  { width: 768, height: 432, breakpoint: 1024 },  // Tablet
  { width: 1200, height: 675 }                    // Desktop
];

const transformJoyUrl = (url: string, width?: number, height?: number): string => {
  // First handle the domain replacement
  if (url.startsWith('https://joy.so/wp-content/uploads/')) {
    url = url.replace(
      'https://joy.so/wp-content/uploads/',
      'https://cdn-web.joy.so/cdn/image/'
    )
  }
  
  // Remove size suffix if present
  url = url.replace(/-\d+x\d+\.webp$/, '.webp')

  // Add width and height parameters if provided
  if (width || height) {
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    params.append('q', '90');
    url += (url.includes('?') ? '&' : '?') + params.toString();
  }
  
  return url;
}

const processPostContent = (html: string) => {
  // Only run on server
  if (typeof window === 'undefined') {
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // Transform image URLs in the content
    const images = doc.querySelectorAll('img');
    images.forEach((img) => {
      const src = img.getAttribute('src');
      if (src && img.parentNode) {
        const imgWrapper = doc.createElement('div');
        imgWrapper.className = 'relative aspect-video';
        
        // Generate srcset with different sizes
        const srcset = imageSizes
          .map(size => {
            const url = transformJoyUrl(src, size.width, size.height);
            return `${url} ${size.width}w`;
          })
          .join(', ');

        // Use mobile-first approach for sizes
        const sizes = '(max-width: 640px) 640px, ' +
                     '(max-width: 1024px) 768px, ' +
                     '1200px';
        
        // Use mobile size as default src for faster initial load
        imgWrapper.innerHTML = `
          <img
            src="${transformJoyUrl(src, imageSizes[0].width, imageSizes[0].height)}"
            srcset="${srcset}"
            sizes="${sizes}"
            alt="${img.getAttribute('alt') || ''}"
            width="${imageSizes[2].width}"
            height="${imageSizes[2].height}"
            class="w-full h-full object-cover rounded-lg"
            loading="lazy"
            decoding="async"
            fetchpriority="auto"
            style="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;"
          />
        `;
        
        img.parentNode.replaceChild(imgWrapper, img);
      }
    });

    return doc.body.innerHTML;
  }
  return html;
}

export function CaseStudyContentServer({ 
  post, 
  successStoryInfo, 
  relatedPosts,
  jsonLd 
}: CaseStudyContentServerProps) {
  // Transform feature image URL if it exists
  if (post.feature_image) {
    post.feature_image = transformJoyUrl(post.feature_image);
  }

  // Process the HTML content with image transformations
  const processedHtml = processPostContent(post.html || '');

  return (
    <>
      <JsonLd data={jsonLd} />
      <PostContent 
        post={post} 
        successStoryInfo={successStoryInfo || undefined} 
        processedHtml={processedHtml}
      />
      <div className="container mx-auto px-4 max-w-6xl">
        <RelatedPosts posts={relatedPosts} currentPostId={post.id} />
      </div>
    </>
  );
} 