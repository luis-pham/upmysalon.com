import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const r2PublicHost = (() => {
  const raw = process.env.R2_PUBLIC_URL?.trim();
  if (!raw) return null;
  try {
    return new URL(raw).hostname;
  } catch {
    return null;
  }
})();

const nextConfig: NextConfig = {
  images: {
    // When localPatterns is set, ONLY matching paths are allowed.
    // Must include public/ assets (/hero, /brand) — not only Payload media proxy.
    localPatterns: [
      { pathname: '/hero/**' },
      { pathname: '/brand/**' },
      { pathname: '/api/media/file/**' },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      ...(r2PublicHost
        ? [
            {
              protocol: 'https' as const,
              hostname: r2PublicHost,
            },
          ]
        : []),
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    };
    return webpackConfig;
  },
  turbopack: {
    root: path.resolve(dirname),
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

export default withPayload(nextConfig, { devBundleServerPackages: false });
