/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Only apply basePath and assetPrefix for GitHub Pages deployment
  ...(process.env.GITHUB_PAGES === 'true' && {
    basePath: '/dashboard-ui',
    assetPrefix: '/dashboard-ui/',
  }),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
