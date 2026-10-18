/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true, // Render-blocking (Oluşturmayı engelleyen) CSS gecikmesini çözer
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'izqycswerjfnjbxirqga.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/oivvupgw/image/upload/**',
      },
    ],
  },
};

module.exports = nextConfig;