import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (smallest), falls back to WebP, then the source format.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
