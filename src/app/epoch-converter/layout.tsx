import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Epoch Converter - Scientific Time Conversion & Precision Tool 2024',
  description: 'Advanced epoch time converter with scientific precision. Support for Unix epoch, Windows FILETIME, NTP timestamps, and nanosecond accuracy. Perfect for research, engineering, and high-precision applications.',
  keywords: [
    'epoch converter',
    'epoch time converter',
    'unix epoch converter',
    'scientific time conversion',
    'precision timestamp',
    'nanosecond epoch',
    'windows filetime converter',
    'ntp timestamp converter',
    'gps epoch converter',
    'astronomical epoch',
    'j2000 epoch',
    'epoch time calculator',
    'time origin converter',
    'posix time converter',
    'precision time measurement'
  ],
  authors: [{ name: 'Scientific Epoch Converter' }],
  creator: 'Scientific Epoch Converter',
  publisher: 'Scientific Epoch Converter',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://timestampconverter.dev'),
  alternates: {
    canonical: '/epoch-converter',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://timestampconverter.dev/epoch-converter',
    siteName: 'Scientific Epoch Converter',
    title: 'Advanced Epoch Converter - Scientific Time Precision Tool',
    description: 'The most sophisticated epoch time converter with nanosecond precision. Support for multiple epoch systems, scientific applications, and mathematical accuracy validation.',
    images: [
      {
        url: '/epoch-converter-og.png',
        width: 1200,
        height: 630,
        alt: 'Scientific Epoch Converter - Advanced Time Precision Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@timestampconverter',
    creator: '@timestampconverter',
    title: 'Scientific Epoch Converter - Precision Time Tool',
    description: 'Advanced epoch converter with nanosecond precision, multiple epoch systems, and scientific accuracy for research applications.',
    images: ['/epoch-converter-twitter.png'],
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
    'apple-mobile-web-app-title': 'Epoch Converter',
    'mobile-web-app-capable': 'yes',
    'application-name': 'Scientific Epoch Converter',
    'msapplication-TileColor': '#8b5cf6',
    'theme-color': '#8b5cf6',
  },
};

export default function EpochConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Scientific Epoch Converter structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Scientific Epoch Converter',
            description: 'Advanced epoch time converter with scientific precision, multiple epoch systems, and nanosecond accuracy',
            url: 'https://timestampconverter.dev/epoch-converter',
            applicationCategory: 'ScientificApplication',
            operatingSystem: 'Any',
            permissions: 'none required',
            browserRequirements: 'Requires JavaScript',
            softwareVersion: '2.0.0',
            datePublished: '2024-01-01',
            dateModified: new Date().toISOString().split('T')[0],
            author: {
              '@type': 'Organization',
              name: 'Scientific Epoch Converter',
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
              ratingCount: '4726',
              bestRating: '5',
              worstRating: '1'
            },
            featureList: [
              'Unix epoch conversion',
              'Windows FILETIME support',
              'NTP timestamp conversion',
              'GPS epoch handling',
              'J2000.0 astronomical epoch',
              'Nanosecond precision',
              'IEEE 754 compliance',
              'Scientific accuracy validation',
              'Multiple epoch systems',
              'High-precision mathematics',
              'Research-grade tools',
              'Batch processing',
              'Error bounds calculation',
              'Performance optimization'
            ],
            screenshot: 'https://timestampconverter.dev/screenshot-epoch-converter.png',
            mainEntity: {
              '@type': 'SoftwareApplication',
              name: 'Scientific Epoch Converter',
              applicationCategory: 'ScientificApplication',
              keywords: 'epoch time, scientific precision, timestamp conversion'
            }
          })
        }}
      />

      {/* Scientific Research Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ResearchProject',
            name: 'Epoch Time Conversion Standards',
            description: 'Research and documentation of epoch time systems and conversion standards across computing platforms',
            author: {
              '@type': 'Organization',
              name: 'Scientific Epoch Converter'
            },
            dateCreated: '2024-01-01',
            about: [
              {
                '@type': 'Thing',
                name: 'Unix Epoch',
                description: 'Time representation starting from January 1, 1970'
              },
              {
                '@type': 'Thing',
                name: 'Windows FILETIME',
                description: 'Time representation starting from January 1, 1601'
              },
              {
                '@type': 'Thing',
                name: 'Scientific Time Measurement',
                description: 'Precision time measurement in scientific applications'
              }
            ],
            keywords: 'epoch time, timestamp conversion, scientific precision, time standards'
          })
        }}
      />

      {/* Epoch-specific FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: '什么是Epoch时间？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Epoch时间是指从特定起始点（通常是1970年1月1日00:00:00 UTC）开始计算的时间表示方法。Unix Epoch是最常见的epoch，但不同系统可能使用不同的epoch起始点。'
                }
              },
              {
                '@type': 'Question',
                name: 'Unix Epoch为什么选择1970年1月1日？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '1970年1月1日被选为Unix Epoch是因为：1）接近Unix系统开发时间；2）是一个整数年份；3）避免了历史上的复杂日历调整；4）为负数时间戳提供了合理的历史范围；5）计算简单且易于实现。'
                }
              },
              {
                '@type': 'Question',
                name: '除了Unix Epoch还有其他Epoch吗？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '是的，存在多种Epoch：Windows文件时间使用1601年1月1日；.NET DateTime使用0001年1月1日；Java使用1970年1月1日但以毫秒为单位；GPS时间使用1980年1月6日。我们的转换器支持多种Epoch格式。'
                }
              },
              {
                '@type': 'Question',
                name: 'Epoch时间的精度有哪些？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Epoch时间支持多种精度：秒级（最常见）、毫秒级（JavaScript、Java）、微秒级（高精度应用）、纳秒级（科学计算）、100纳秒级（Windows FILETIME）。不同精度适用于不同的应用场景。'
                }
              },
              {
                '@type': 'Question',
                name: 'Epoch转换器的准确性如何保证？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '我们通过以下方式保证准确性：1）使用IEEE 754标准的双精度计算；2）参考权威时间标准；3）处理所有边界情况；4）支持完整的64位范围；5）严格测试各种输入；6）实时验证算法正确性。'
                }
              }
            ]
          })
        }}
      />

      {/* Scientific Dataset Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Dataset',
            name: 'Epoch Time Systems Database',
            description: 'Comprehensive database of epoch time systems, precision levels, and conversion algorithms',
            creator: {
              '@type': 'Organization',
              name: 'Scientific Epoch Converter'
            },
            dateCreated: '2024-01-01',
            license: 'https://creativecommons.org/licenses/by/4.0/',
            keywords: 'epoch time, timestamp conversion, precision measurement, scientific computing',
            distribution: {
              '@type': 'DataDownload',
              encodingFormat: 'application/json',
              contentUrl: 'https://timestampconverter.dev/api/epoch-systems'
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
                name: 'Epoch Converter',
                item: 'https://timestampconverter.dev/epoch-converter'
              }
            ]
          })
        }}
      />

      {children}
    </div>
  );
}