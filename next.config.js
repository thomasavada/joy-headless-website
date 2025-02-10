/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the static export configuration
  // output: 'export',
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
        protocol: 'https',
        hostname: 'cdn1.avada.io',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 