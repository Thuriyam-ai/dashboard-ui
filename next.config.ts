import type { NextConfig } from "next";

/**
 * NextJS Configuration File
 * Documentation: https://nextjs.org/docs/app/api-reference/config/next-config-js
 */

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages (disabled for development)
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  // Configure basePath for GitHub Pages (replace 'vercel-deployment' with your repo name)
  basePath: process.env.NODE_ENV === 'production' ? '/dashboard-ui' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/dashboard-ui/' : '',
  // Disable ESLint during builds to prevent deployment failures
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript type checking during builds if needed
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
