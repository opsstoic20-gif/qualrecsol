import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (a parent lockfile exists in Downloads).
  turbopack: { root: path.resolve(".") },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
