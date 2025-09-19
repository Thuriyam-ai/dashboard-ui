import type { NextConfig } from "next";

/**
 * NextJS Configuration File
 * Documentation: https://nextjs.org/docs/app/api-reference/config/next-config-js
 */

const nextConfig: NextConfig = {
  // Remove static export for Vercel deployment
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: false, // Enable image optimization for Vercel
  },
  // Remove basePath and assetPrefix for Vercel
  // basePath: process.env.NODE_ENV === 'production' ? '/dashboard-ui' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/dashboard-ui/' : '',
  // Disable ESLint during builds to prevent deployment failures
  eslint: {
    ignoreDuringBuilds: process.env.ESLINT_NO_DEV_ERRORS === "true",
  },
  // Disable TypeScript type checking during builds if needed
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
