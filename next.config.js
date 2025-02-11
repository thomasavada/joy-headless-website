/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'joy.so',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdnapps.avada.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "ghost.joy.so",
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn1.avada.io',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "github.com",
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "cdn-web.joy.so",
        pathname: '/**',
      }
    ],
    domains: ['storage.googleapis.com'],
    loader: 'custom',
    loaderFile: './image-loader.js',
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
}

module.exports = nextConfig
