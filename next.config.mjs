import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/categorii/profile-pvc/exen-6040a",
        destination: "/categorii/profile-pvc#exen-6040a",
        permanent: true,
      },
    ];
  },
  // Pins the project root (silences the multiple-lockfiles warning)
  turbopack: {
    root: __dirname,
  },
  images: {
    // 75 is the default; 90 is used by the hero image
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pvjiyqhacbpkdqoqtiey.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
};

export default nextConfig;