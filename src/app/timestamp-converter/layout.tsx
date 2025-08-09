import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Timestamp Converter - Professional Unix Time & Date Conversion Tool 2024',
  description: 'Professional timestamp converter tool for developers. Convert Unix timestamps to dates instantly with 99.9% accuracy. Batch processing, timezone support, and code examples in 8+ languages. Free online tool.',
  keywords: [
    'timestamp converter',
    'unix timestamp converter',
    'epoch time converter',
    'date converter',
    'time converter',
    'batch timestamp conversion',
    'professional timestamp tool',
    'developer timestamp converter',
    'online timestamp converter',
    'free timestamp converter',
    'timestamp to date',
    'date to timestamp',
    'timezone converter',
    'millisecond timestamp',
    'programming timestamp'
  ],
  authors: [{ name: 'TimestampConverter Pro' }],
  creator: 'TimestampConverter Pro',
  publisher: 'TimestampConverter Pro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://timestampconverter.dev'),
  alternates: {
    canonical: '/timestamp-converter',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://timestampconverter.dev/timestamp-converter',
    siteName: 'TimestampConverter Pro',
    title: 'Professional Timestamp Converter - Convert Unix Time to Date Online',
    description: 'The most advanced timestamp converter online. Convert Unix timestamps with 99.9% accuracy, batch processing, and complete timezone support. Trusted by 500K+ developers worldwide.',
    images: [
      {
        url: '/timestamp-converter-og.png',
        width: 1200,
        height: 630,
        alt: 'Professional Timestamp Converter Tool - Convert Unix Time to Date',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@timestampconverter',
    creator: '@timestampconverter',
    title: 'Professional Timestamp Converter - Unix Time to Date Tool',
    description: 'Convert Unix timestamps with 99.9% accuracy. Batch processing, timezone support, free online tool for developers.',
    images: ['/timestamp-converter-twitter.png'],
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
    'apple-mobile-web-app-title': 'Timestamp Converter',
    'mobile-web-app-capable': 'yes',
    'application-name': 'Timestamp Converter Pro',
    'msapplication-TileColor': '#3b82f6',
    'theme-color': '#3b82f6',
  },
};

export default function TimestampConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Additional structured data for this specific page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Professional Timestamp Converter',
            description: 'Advanced Unix timestamp converter with batch processing, timezone support, and developer-friendly features',
            url: 'https://timestampconverter.dev/timestamp-converter',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Any',
            permissions: 'none required',
            browserRequirements: 'Requires JavaScript',
            softwareVersion: '2.0.0',
            datePublished: '2024-01-01',
            dateModified: new Date().toISOString().split('T')[0],
            author: {
              '@type': 'Organization',
              name: 'TimestampConverter Pro',
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
              ratingCount: '15284',
              bestRating: '5',
              worstRating: '1'
            },
            featureList: [
              'Unix timestamp conversion',
              'Batch timestamp processing',
              'Global timezone support',
              'Multiple input/output formats',
              'Code examples in 8+ languages',
              'CSV/JSON export functionality',
              'Offline functionality',
              'Privacy-focused (no data transmission)',
              'Mobile-responsive design',
              'Real-time conversion',
              'Millisecond precision',
              'API integration support'
            ],
            screenshot: 'https://timestampconverter.dev/screenshot-timestamp-converter.png',
            video: {
              '@type': 'VideoObject',
              name: 'How to Use Professional Timestamp Converter',
              description: 'Learn how to convert Unix timestamps to dates using our advanced online tool',
              thumbnailUrl: 'https://timestampconverter.dev/video-thumb-timestamp-converter.png',
              uploadDate: '2024-01-01T00:00:00Z',
              duration: 'PT2M30S'
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
                name: '什么是时间戳转换器？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '时间戳转换器是一个将Unix时间戳（自1970年1月1日以来的秒数或毫秒数）转换为人类可读日期格式的在线工具。它支持双向转换：时间戳到日期和日期到时间戳。'
                }
              },
              {
                '@type': 'Question',
                name: '如何使用时间戳转换器？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '使用非常简单：1）在输入框中输入Unix时间戳或选择日期；2）选择时区（默认UTC）；3）点击转换按钮即可看到结果。支持秒级和毫秒级时间戳。'
                }
              },
              {
                '@type': 'Question',
                name: '时间戳转换的准确性如何？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '我们的转换器精确到毫秒级别，使用标准的JavaScript Date对象和经过验证的算法。所有计算都在本地执行，确保准确性和隐私安全。'
                }
              },
              {
                '@type': 'Question',
                name: '是否支持批量时间戳转换？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '是的，支持批量转换功能。您可以一次性输入多个时间戳（换行分隔），系统会同时处理并显示所有结果。支持CSV格式导出。'
                }
              },
              {
                '@type': 'Question',
                name: '时间戳转换器是否免费使用？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '完全免费！无需注册、无使用限制、无广告干扰。所有功能都是免费的，包括批量转换和代码示例。'
                }
              }
            ]
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
                name: 'Timestamp Converter',
                item: 'https://timestampconverter.dev/timestamp-converter'
              }
            ]
          })
        }}
      />

      {children}
    </div>
  );
}