import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    // OLD: remotePatterns: [
    // OLD:   {
    // OLD:     protocol: 'http',
    // OLD:     hostname: 'localhost',
    // OLD:     port: '4004',
    // OLD:     pathname: '**',
    // OLD:   },
    // OLD:   {
    // OLD:     protocol: 'https',
    // OLD:     hostname: 'chipsweb-dev.chips.com.vn',
    // OLD:     pathname: '/**',
    // OLD:   },
    // OLD: ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4004',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'chipsweb-dev.chips.com.vn',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.INTERNAL_API_BASE_URL}:path*`,
      },
    ];
  },
};
export default nextConfig;
