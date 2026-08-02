import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
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
