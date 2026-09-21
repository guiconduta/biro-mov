import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // capas dos trabalhos vêm das miniaturas do YouTube
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
};

export default nextConfig;
