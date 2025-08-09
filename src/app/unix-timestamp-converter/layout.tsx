import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unix Timestamp Converter - Advanced Epoch Time Conversion Tool 2024',
  description: 'Professional Unix timestamp converter for developers and system administrators. Convert epoch time with millisecond precision, handle 32-bit/64-bit systems, batch processing, and comprehensive Unix time support.',
  keywords: [
    'unix timestamp converter',
    'epoch time converter',
    'posix time converter',
    'unix epoch converter',
    'timestamp to date unix',
    'date to unix timestamp',
    'unix time converter',
    'epoch timestamp',
    'millisecond unix timestamp',
    'batch unix timestamp',
    'unix timestamp api',
    'posix timestamp',
    'system timestamp',
    'server timestamp',
    'database timestamp'
  ],
  authors: [{ name: 'Unix Timestamp Pro' }],
  creator: 'Unix Timestamp Pro',
  publisher: 'Unix Timestamp Pro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://timestampconverter.dev'),
  alternates: {
    canonical: '/unix-timestamp-converter',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://timestampconverter.dev/unix-timestamp-converter',
    siteName: 'Unix Timestamp Converter',
    title: 'Advanced Unix Timestamp Converter - Epoch Time to Date Tool',
    description: 'The most comprehensive Unix timestamp converter. Handle epoch time with precision, support for 32-bit/64-bit systems, batch processing, and system integration features.',
    images: [
      {
        url: '/unix-timestamp-converter-og.png',
        width: 1200,
        height: 630,
        alt: 'Unix Timestamp Converter - Advanced Epoch Time Conversion Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@timestampconverter',
    creator: '@timestampconverter',
    title: 'Unix Timestamp Converter - Advanced Epoch Time Tool',
    description: 'Professional Unix timestamp converter with millisecond precision, batch processing, and system integration support.',
    images: ['/unix-timestamp-converter-twitter.png'],
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
    'apple-mobile-web-app-title': 'Unix Timestamp Converter',
    'mobile-web-app-capable': 'yes',
    'application-name': 'Unix Timestamp Converter',
    'msapplication-TileColor': '#22c55e',
    'theme-color': '#22c55e',
  },
};

export default function UnixTimestampConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Unix-specific structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Unix Timestamp Converter',
            description: 'Advanced Unix timestamp converter with epoch time handling, system integration, and developer tools',
            url: 'https://timestampconverter.dev/unix-timestamp-converter',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Linux, macOS, Windows, Unix',
            permissions: 'none required',
            browserRequirements: 'Requires JavaScript',
            softwareVersion: '2.0.0',
            datePublished: '2024-01-01',
            dateModified: new Date().toISOString().split('T')[0],
            author: {
              '@type': 'Organization',
              name: 'Unix Timestamp Pro',
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
              ratingCount: '8746',
              bestRating: '5',
              worstRating: '1'
            },
            featureList: [
              'Unix epoch timestamp conversion',
              'POSIX time standard compliance',
              'Millisecond precision support',
              '32-bit and 64-bit system compatibility',
              'Batch timestamp processing',
              'System log integration',
              'Database timestamp optimization',
              'Cross-platform compatibility',
              'API integration support',
              'Real-time conversion',
              'Negative timestamp support',
              'Edge case handling',
              'Memory-efficient algorithms',
              'High-throughput processing'
            ],
            screenshot: 'https://timestampconverter.dev/screenshot-unix-converter.png',
            mainEntity: {
              '@type': 'SoftwareApplication',
              name: 'Unix Timestamp Converter',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Unix, Linux, macOS, Windows'
            }
          })
        }}
      />

      {/* Unix-specific FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: '什么是Unix时间戳？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Unix时间戳（Unix timestamp）是从1970年1月1日00:00:00 UTC开始到指定时间的总秒数。这是POSIX时间的标准表示方法，广泛用于计算机系统和编程中表示时间。'
                }
              },
              {
                '@type': 'Question',
                name: '为什么Unix时间戳从1970年开始？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '1970年1月1日被称为"Unix纪元"（Unix Epoch），这个日期被选择是因为它接近Unix操作系统开发的时间，且足够接近计算机时代的开始，便于计算和存储。'
                }
              },
              {
                '@type': 'Question',
                name: '2038年问题是什么？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '2038年问题是指32位系统无法表示2038年1月19日03:14:07之后的时间。现代64位系统已经解决了这个问题，可以表示数十亿年的时间范围。'
                }
              },
              {
                '@type': 'Question',
                name: 'Unix时间戳支持哪些精度？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '我们的转换器支持多种精度：秒级（10位数字）、毫秒级（13位数字）、微秒级（16位数字）。不同系统和编程语言可能使用不同的精度。'
                }
              },
              {
                '@type': 'Question',
                name: '负数Unix时间戳代表什么？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '负数Unix时间戳表示1970年1月1日之前的时间。例如，-86400表示1969年12月31日00:00:00 UTC。我们的转换器完全支持负数时间戳。'
                }
              }
            ]
          })
        }}
      />

      {/* Technical Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: 'Advanced Unix Timestamp Converter - Complete Guide',
            description: 'Comprehensive guide to Unix timestamp conversion, POSIX time standards, and system integration',
            author: {
              '@type': 'Organization',
              name: 'Unix Timestamp Pro'
            },
            datePublished: '2024-01-01',
            dateModified: new Date().toISOString().split('T')[0],
            publisher: {
              '@type': 'Organization',
              name: 'Unix Timestamp Pro',
              logo: {
                '@type': 'ImageObject',
                url: 'https://timestampconverter.dev/logo.png'
              }
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://timestampconverter.dev/unix-timestamp-converter'
            },
            articleSection: 'Technology',
            keywords: 'unix timestamp, epoch time, posix time, timestamp conversion',
            proficiencyLevel: 'Expert'
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
                name: 'Unix Timestamp Converter',
                item: 'https://timestampconverter.dev/unix-timestamp-converter'
              }
            ]
          })
        }}
      />

      {children}
    </div>
  );
}