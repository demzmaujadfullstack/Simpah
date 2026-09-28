import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  reactCompiler: false,
  
  // Tambahkan konfigurasi images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        port: "",
        pathname: "/api/**",
      },
      {
        protocol: "https",
        hostname: "**", // Untuk gambar lain yang mungkin kamu pakai
      },
    ],
  },
};

export default nextConfig;