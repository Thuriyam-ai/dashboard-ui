/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is the most important line. It tells Next.js to create
  // a self-contained, static 'out' folder. This should be unconditional.
  output: 'export',

  // These are fine for managing your build process.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // CRITICAL: DO NOT include basePath or assetPrefix.
  // Your EC2 server is the root, so no prefix is needed.
  // The lines for GITHUB_PAGES have been removed.

  trailingSlash: true,
  images: {
    // This is required for 'output: "export"'.
    unoptimized: true,
  },
};

module.exports = nextConfig;