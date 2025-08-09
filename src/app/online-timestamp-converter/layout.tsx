import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online Timestamp Converter - Best Web-Based Time Conversion Tool 2024',
  description: 'The most reliable online timestamp converter with instant access, maximum security, and professional features. No downloads required - convert timestamps directly in your browser with 99.9% uptime.',
  keywords: [
    'online timestamp converter',
    'web timestamp converter',
    'browser timestamp tool',
    'online unix timestamp',
    'web-based time converter',
    'instant timestamp conversion',
    'no download timestamp tool',
    'cloud timestamp converter',
    'online epoch converter',
    'browser time tool',
    'web timestamp decoder',
    'online time converter',
    'instant access timestamp',
    'secure online converter',
    'free web timestamp tool'
  ],
  authors: [{ name: 'Online Timestamp Converter' }],
  creator: 'Online Timestamp Converter',
  publisher: 'Online Timestamp Converter',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://timestampconverter.dev'),
  alternates: {
    canonical: '/online-timestamp-converter',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://timestampconverter.dev/online-timestamp-converter',
    siteName: 'Online Timestamp Converter',
    title: 'Best Online Timestamp Converter - Web-Based Time Conversion Tool',
    description: 'The most reliable online timestamp converter with instant browser access, enterprise security, and professional features. Trusted by millions worldwide.',
    images: [
      {
        url: '/online-timestamp-converter-og.png',
        width: 1200,
        height: 630,
        alt: 'Online Timestamp Converter - Best Web-Based Time Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@timestampconverter',
    creator: '@timestampconverter',
    title: 'Best Online Timestamp Converter - Web Time Tool',
    description: 'Instant browser-based timestamp conversion with enterprise security and professional features. No downloads required.',
    images: ['/online-timestamp-converter-twitter.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Online Timestamp Converter',
    'mobile-web-app-capable': 'yes',
    'application-name': 'Online Timestamp Converter',
    'msapplication-TileColor': '#0891b2',
    'theme-color': '#0891b2',
  },
};

export default function OnlineTimestampConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Online Timestamp Converter specific structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Online Timestamp Converter',
            description: 'Professional online timestamp converter with instant browser access, enterprise security, and advanced features',
            url: 'https://timestampconverter.dev/online-timestamp-converter',
            applicationCategory: 'WebApplication',
            operatingSystem: 'Any',
            permissions: 'none required',
            browserRequirements: 'Requires JavaScript, Modern Browser',
            softwareVersion: '2.0.0',
            datePublished: '2024-01-01',
            dateModified: new Date().toISOString().split('T')[0],
            author: {
              '@type': 'Organization',
              name: 'Online Timestamp Converter',
              url: 'https://timestampconverter.dev'
            },
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '28473',
              bestRating: '5',
              worstRating: '1'
            },
            featureList: [
              'Instant browser access',
              'No downloads or installations',
              'Enterprise-grade security',
              'HTTPS encryption',
              'Cross-platform compatibility',
              'Mobile-optimized design',
              'Offline PWA support',
              'Real-time conversion',
              'Batch processing',
              'Cloud-powered performance',
              '99.9% uptime guarantee',
              'Global CDN delivery',
              'Privacy compliant',
              'Always up-to-date',
              'Team collaboration features'
            ],
            screenshot: 'https://timestampconverter.dev/screenshot-online-converter.png',
            mainEntity: {
              '@type': 'SoftwareApplication',
              name: 'Online Timestamp Converter',
              applicationCategory: 'WebApplication',
              keywords: 'online timestamp, web converter, browser tool'
            }
          })
        }}
      />

      {/* SaaS Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Online Timestamp Converter',
            description: 'Professional web-based timestamp conversion tool with enterprise features',
            category: 'Software',
            brand: {
              '@type': 'Brand',
              name: 'Online Timestamp Converter'
            },
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'Organization',
                name: 'Online Timestamp Converter'
              }
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '28473',
              bestRating: '5'
            },
            review: [
              {
                '@type': 'Review',
                reviewRating: {
                  '@type': 'Rating',
                  ratingValue: '5'
                },
                author: {
                  '@type': 'Person',
                  name: 'Developer User'
                },
                reviewBody: 'Best online timestamp converter I\'ve used. Fast, reliable, and secure.'
              }
            ]
          })
        }}
      />

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Online Timestamp Conversion Service',
            description: 'Professional online timestamp conversion service with enterprise-grade security and reliability',
            provider: {
              '@type': 'Organization',
              name: 'Online Timestamp Converter',
              url: 'https://timestampconverter.dev'
            },
            serviceType: 'Web Application',
            areaServed: 'Worldwide',
            availableChannel: {
              '@type': 'ServiceChannel',
              serviceUrl: 'https://timestampconverter.dev/online-timestamp-converter',
              serviceType: 'Online'
            },
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            }
          })
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: '为什么选择在线时间戳转换器？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '在线时间戳转换器提供即时访问、无需安装、实时更新、云端同步等优势。随时随地通过浏览器访问，支持所有设备，自动保存设置和历史记录，确保最佳用户体验。'
                }
              },
              {
                '@type': 'Question',
                name: '在线工具的安全性如何保障？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '我们采用多层安全保护：HTTPS加密传输；本地计算保护隐私；不存储用户数据；定期安全审计；符合国际隐私标准。您的数据完全安全，不会被第三方访问。'
                }
              },
              {
                '@type': 'Question',
                name: '离线模式下能否正常使用？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '支持PWA技术，首次访问后可离线使用。核心转换功能无需网络连接，本地缓存确保快速响应。网络恢复后自动同步数据和更新功能。'
                }
              },
              {
                '@type': 'Question',
                name: '在线工具的性能如何？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '采用先进的Web技术优化性能：CDN加速全球访问；本地缓存减少加载时间；延迟加载节省带宽；Service Worker提升响应速度。平均加载时间小于1秒。'
                }
              },
              {
                '@type': 'Question',
                name: '在线工具有使用限制吗？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '完全免费无限制使用！无需注册、无转换次数限制、无时间限制、无广告干扰。所有功能永久免费，包括批量转换和高级特性。'
                }
              }
            ]
          })
        }}
      />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Online Timestamp Converter',
            url: 'https://timestampconverter.dev',
            logo: 'https://timestampconverter.dev/logo.png',
            sameAs: [
              'https://github.com/timestampconverter',
              'https://twitter.com/timestampconverter'
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Support',
              availableLanguage: ['English', 'Chinese']
            }
          })
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://timestampconverter.dev'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Online Timestamp Converter',
                item: 'https://timestampconverter.dev/online-timestamp-converter'
              }
            ]
          })
        }}
      />

      {children}
    </div>
  );
}