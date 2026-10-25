import type { NextConfig } from "next";

// Vercel manages its own optimized output — `standalone` breaks
// `.next/next-server.js.nft.json` tracing on Vercel, so only use it
// for Docker / self-hosted builds.
const isVercel = process.env.VERCEL === "1";

const nextConfig: NextConfig = {
  ...(isVercel ? {} : { output: "standalone" }),
  images: {
    // Mobile ad traffic: never generate 2048/3840px variants and serve AVIF first.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 420, 480, 640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 2592000,
  },
};

export default nextConfig;
