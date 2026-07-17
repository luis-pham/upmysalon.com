import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/nghe-may',
        destination: '/le-tan-ai-nghe-may-dat-lich',
        permanent: true,
      },
      {
        source: '/ai-nghe-may-dat-lich',
        destination: '/le-tan-ai-nghe-may-dat-lich',
        permanent: true,
      },
      {
        source: '/tin-nhan',
        destination: '/ai-quan-ly-inbox-facebook-ig',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
