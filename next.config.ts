import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/PokeAPI/sprites/**",
      },
    ],
  },
};

export default nextConfig;
