import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-site",
  },

  // Yalnızca tüm alt alan adları HTTPS kullanıyorsa etkinleştir.
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000",
  },

  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      "form-action 'self'",

      // Next.js ve mevcut GTM kurulumu için geçiş politikası.
      // Daha sonra nonce/hash tabanlı CSP'ye geçirilebilir.
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",

      "style-src 'self' 'unsafe-inline'",

      "img-src 'self' data: blob: https://res.cloudinary.com https://images.unsplash.com https://pvjiyqhacbpkdqoqtiey.supabase.co https://www.google-analytics.com https://www.googletagmanager.com",

      "font-src 'self' data:",

      "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://pvjiyqhacbpkdqoqtiey.supabase.co wss://pvjiyqhacbpkdqoqtiey.supabase.co",

      // Bu kaynaklar gerçekten kullanılmıyorsa daha sonra kaldırılabilir.
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,

  turbopack: {
    root: __dirname,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pvjiyqhacbpkdqoqtiey.supabase.co",
        pathname: "/**",
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;