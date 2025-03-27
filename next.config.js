/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    domains: ['cdn-web.joy.so', 'storage.googleapis.com', 'joy.so'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-web.joy.so',
        pathname: '/cdn/image/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/joy-ghost-cms.firebasestorage.app/**',
      },
      {
        protocol: 'https',
        hostname: 'joy.so',
        pathname: '/wp-content/uploads/**',
      }
    ],
    loader: 'custom',
    loaderFile: './image-loaders.js',
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ⚠️ Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  compress: false
}

module.exports = nextConfig
