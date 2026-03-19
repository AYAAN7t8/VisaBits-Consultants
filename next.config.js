/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // THIS IS CRITICAL for GitHub Pages
  trailingSlash: true, // Also recommended for static sites
   eslint: {
    ignoreDuringBuilds: true, // This disables ESLint during build
  },
  images: {
    unoptimized: true, // Required for static export
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;