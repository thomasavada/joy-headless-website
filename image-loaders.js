function transformImageUrl(url) {
  // First handle the domain replacement
  if (url.startsWith('https://joy.so/wp-content/uploads/')) {
    url = url.replace(
      'https://joy.so/wp-content/uploads/',
      'https://cdn-web.joy.so/cdn/image/'
    )
  }
  
  // Remove size suffix if present
  return url.replace(/-\d+x\d+\.webp$/, '.webp')
}

module.exports = function loader({ src, width, quality }) {
  try {
    // Transform the URL
    const transformedSrc = transformImageUrl(src);

    // Add width parameter
    const url = new URL(transformedSrc);
    url.searchParams.set('width', width);
    
    if (quality) {
      url.searchParams.set('quality', quality);
    }
    
    return url.toString();
  } catch (error) {
    return src;
  }
} 