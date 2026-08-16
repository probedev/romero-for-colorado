import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Live site URLs use trailing slashes (/issues/, /privacy-policy/)
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
