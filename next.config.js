/** @type {import('next').NextConfig} */
const nextConfig = {
  // 图片优化
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // 基础性能配置
  compress: true, // 启用gzip压缩
  poweredByHeader: false,
  generateEtags: false,
  trailingSlash: false,
  
  // 实验性功能优化
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'date-fns', 'date-fns-tz'],
    webVitalsAttribution: ['CLS', 'LCP', 'INP'],
  },
  
  // 编译器优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // 性能和缓存头
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // 安全头
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
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // 性能头
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
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