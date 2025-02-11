module.exports = function loader({ src, width, quality }) {
  if (src.includes('storage.googleapis.com/joy-ghost-cms.firebasestorage.app')) {
    const pathMatch = src.match(/firebasestorage\.app\/(.*)/);
    if (pathMatch && pathMatch[1]) {
      return `https://cdn-web.joy.so/cdn/image/${pathMatch[1]}`;
    }
  }
  return src;
} 