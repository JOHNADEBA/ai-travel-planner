import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.0.6", // Your iPhone's IP address
    "*.local", // Allow any .local domain
  ],
};

export default nextConfig;
