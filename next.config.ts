import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // --------------------------------------
  // Image handling for static export (hosting for static like Github Pages, S3)
  // images: {
  //   unoptimized: true,
  // },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // --------------------------------------
  // Security & Performance (hosting for vercel/netlify)
  poweredByHeader: false,
  // --------------------------------------
  // Performance optimizations
  compress: true,
  // --------------------------------------
  // Enable production source maps for better debugging (optional)
  productionBrowserSourceMaps: false,
};

export default nextConfig;
