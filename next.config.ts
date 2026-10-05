import type { NextConfig } from "next";

// Vercel manages its own optimized output — `standalone` breaks
// `.next/next-server.js.nft.json` tracing on Vercel, so only use it
// for Docker / self-hosted builds.
const isVercel = process.env.VERCEL === "1";

const nextConfig: NextConfig = {
  ...(isVercel ? {} : { output: "standalone" }),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "workshop.indianautomobiledoctor.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

export default nextConfig;
