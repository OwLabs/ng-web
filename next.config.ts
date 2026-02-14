import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // --------------------------------------
  // Image handling
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // --------------------------------------
  // Security & Performance
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  // --------------------------------------
  // Experimental optimizations for mobile performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@mui/x-charts'],
  },
};

export default nextConfig;
