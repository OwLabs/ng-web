import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // --------------------------------------
  // Disables double rendering in development
  // reactStrictMode: false,
  // --------------------------------------
  // Image handling for static export (hosting for static like Github Pages, S3)
  // images: {
  //   unoptimized: true,
  // },
  // --------------------------------------
  // Security & Performance (hosting for vercel/netlify)
  // poweredByHeader: false,
};

export default nextConfig;
