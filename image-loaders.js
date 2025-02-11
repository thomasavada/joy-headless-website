function transformGoogleStorageUrl(src) {
  if (src.includes('storage.googleapis.com/joy-ghost-cms.firebasestorage.app')) {
    const pathMatch = src.match(/firebasestorage\.app\/(.*)/);
    if (pathMatch && pathMatch[1]) {
      return `https://cdn-web.joy.so/cdn/image/${pathMatch[1]}`;
    }
  }
  return src;
}

module.exports = function loader({ src, width, quality }) {
  // Transform URL if it's from Google Storage
  const transformedSrc = transformGoogleStorageUrl(src);
  
  // Add width parameter
  const url = new URL(transformedSrc);
  url.searchParams.set('width', width);
  
  if (quality) {
    url.searchParams.set('quality', quality);
  }
  
  return url.toString();
} 