/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  trailingSlash: false,
  
  // SEO优化
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // 性能优化
  swcMinify: true,
  
  // 构建优化
  output: 'standalone',
  
  // 环境变量
  env: {
    SITE_NAME: 'TimestampConverter',
    SITE_URL: 'https://timestampconverter.dev',
  },
};

module.exports = nextConfig;