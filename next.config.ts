import type { NextConfig } from "next";

const config: NextConfig = {
  images: { qualities: [80], formats: ["image/avif", "image/webp"] },
};

export default config;
