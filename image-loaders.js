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

module.exports = function loader({ src, width, quality = 90 }) {
  try {
    // Transform the URL
    const transformedSrc = transformImageUrl(src);

    // Add width parameter
    const url = new URL(transformedSrc);
    url.searchParams.set('width', width);
    
    // Always set quality parameter with default of 90
    url.searchParams.set('q', quality.toString());
    
    return url.toString();
  } catch (error) {
    return src;
  }
} 