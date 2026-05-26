import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "styled-components",
    "@sanity/ui",
    "@sanity/visual-editing",
  ],
  compiler: {
    styledComponents: true,
  },
  // Exclude heavy Sanity Studio packages from the server bundle
  serverExternalPackages: [
    "sanity",
    "@sanity/vision",
    "@sanity/client",
  ],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
