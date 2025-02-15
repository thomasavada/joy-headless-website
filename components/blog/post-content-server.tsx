import { JSDOM } from 'jsdom';
import { Post } from '@/lib/ghost';

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
    params.append('q', '90'); // Add quality parameter
    url += (url.includes('?') ? '&' : '?') + params.toString();
  }
  
  return url;
}

export function processPostContent(html: string) {
  // Only run on server
  if (typeof window === 'undefined') {
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // Transform image URLs in the content
    const images = doc.querySelectorAll('img');
    images.forEach((img) => {
      const src = img.getAttribute('src');
      const alt = img.getAttribute('alt') || '';
      const figureParent = img.closest('.kg-image-card');
      const existingCaption = figureParent?.querySelector('figcaption')?.innerHTML;
      
      if (src && img.parentNode) {
        const figure = doc.createElement('figure');
        figure.className = 'kg-card kg-image-card kg-card-hascaption';
        
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
            alt="${alt}"
            width="${imageSizes[2].width}"
            height="${imageSizes[2].height}"
            class="w-full h-full object-contain object-center rounded-lg"
            loading="lazy"
            decoding="async"
            fetchpriority="auto"
          />
        `;
        
        figure.appendChild(imgWrapper);
        
        // Add caption if it exists in the original markup
        if (existingCaption) {
          const figcaption = doc.createElement('figcaption');
          figcaption.innerHTML = existingCaption;
          figure.appendChild(figcaption);
        }
        
        // Replace the entire kg-image-card if it exists, otherwise just replace the img
        if (figureParent) {
          figureParent.parentNode?.replaceChild(figure, figureParent);
        } else {
          img.parentNode.replaceChild(figure, img);
        }
      }
    });

    // Also transform feature images
    const featureImages = doc.querySelectorAll('img[data-feature-image]');
    featureImages.forEach((img) => {
      const src = img.getAttribute('src');
      if (src) {
        const srcset = imageSizes
          .map(size => {
            const url = transformJoyUrl(src, size.width, size.height);
            return `${url} ${size.width}w`;
          })
          .join(', ');

        // Use mobile size as default src
        img.setAttribute('src', transformJoyUrl(src, imageSizes[0].width, imageSizes[0].height));
        img.setAttribute('srcset', srcset);
        img.setAttribute('sizes', '(max-width: 640px) 640px, (max-width: 1024px) 768px, 1200px');
      }
    });

    return doc.body.innerHTML;
  }
  return html;
} 