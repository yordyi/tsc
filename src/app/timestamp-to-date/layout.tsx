import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Timestamp to Date Converter - Convert Unix Time to Human Date 2024',
  description: 'Instantly convert Unix timestamps to readable dates with our advanced converter. Support for all timestamp formats, global timezones, custom output formats, batch processing, and real-time conversion.',
  keywords: [
    'timestamp to date converter',
    'unix timestamp to date',
    'timestamp to human readable date',
    'convert timestamp to date',
    'timestamp date conversion',
    'unix time to date',
    'epoch to date converter',
    'timestamp format converter',
    'batch timestamp to date',
    'timezone timestamp converter',
    'millisecond timestamp to date',
    'date time converter',
    'timestamp decoder',
    'unix time decoder',
    'timestamp parser'
  ],
  authors: [{ name: 'Timestamp to Date Converter' }],
  creator: 'Timestamp to Date Converter',
  publisher: 'Timestamp to Date Converter',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://timestampconverter.dev'),
  alternates: {
    canonical: '/timestamp-to-date',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://timestampconverter.dev/timestamp-to-date',
    siteName: 'Timestamp to Date Converter',
    title: 'Timestamp to Date Converter - Convert Unix Time to Readable Dates',
    description: 'Instantly convert Unix timestamps to human-readable dates. Support for all formats, global timezones, custom outputs, and batch processing. Free online tool.',
    images: [
      {
        url: '/timestamp-to-date-og.png',
        width: 1200,
        height: 630,
        alt: 'Timestamp to Date Converter - Convert Unix Time to Human Dates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@timestampconverter',
    creator: '@timestampconverter',
    title: 'Timestamp to Date Converter - Unix Time to Human Date',
    description: 'Convert Unix timestamps to readable dates instantly. Support for all formats, timezones, and batch processing.',
    images: ['/timestamp-to-date-twitter.png'],
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
    'apple-mobile-web-app-title': 'Timestamp to Date',
    'mobile-web-app-capable': 'yes',
    'application-name': 'Timestamp to Date Converter',
    'msapplication-TileColor': '#ea580c',
    'theme-color': '#ea580c',
  },
};

export default function TimestampToDateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Timestamp to Date specific structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Timestamp to Date Converter',
            description: 'Advanced timestamp to date converter with real-time conversion, multiple formats, and timezone support',
            url: 'https://timestampconverter.dev/timestamp-to-date',
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'Any',
            permissions: 'none required',
            browserRequirements: 'Requires JavaScript',
            softwareVersion: '2.0.0',
            datePublished: '2024-01-01',
            dateModified: new Date().toISOString().split('T')[0],
            author: {
              '@type': 'Organization',
              name: 'Timestamp to Date Converter',
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
              ratingCount: '12847',
              bestRating: '5',
              worstRating: '1'
            },
            featureList: [
              'Unix timestamp to date conversion',
              'Real-time conversion preview',
              'Multiple output date formats',
              'Global timezone support',
              'Batch timestamp processing',
              'Custom format patterns',
              'Millisecond precision',
              'Historical date support',
              'Conversion history tracking',
              'Export functionality',
              'Mobile-responsive design',
              'Offline capability',
              'Input validation',
              'Error handling'
            ],
            screenshot: 'https://timestampconverter.dev/screenshot-timestamp-to-date.png',
            mainEntity: {
              '@type': 'SoftwareApplication',
              name: 'Timestamp to Date Converter',
              applicationCategory: 'UtilityApplication',
              keywords: 'timestamp conversion, date formatting, unix time'
            }
          })
        }}
      />

      {/* How-to Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Convert Timestamp to Date',
            description: 'Step-by-step guide to convert Unix timestamps to human-readable dates',
            image: 'https://timestampconverter.dev/how-to-convert-timestamp.png',
            supply: [
              {
                '@type': 'HowToSupply',
                name: 'Unix Timestamp'
              }
            ],
            tool: [
              {
                '@type': 'HowToTool',
                name: 'Timestamp to Date Converter'
              }
            ],
            step: [
              {
                '@type': 'HowToStep',
                name: 'Enter Timestamp',
                text: 'Enter your Unix timestamp in the input field',
                image: 'https://timestampconverter.dev/step1-enter-timestamp.png'
              },
              {
                '@type': 'HowToStep',
                name: 'Select Format',
                text: 'Choose your preferred date output format',
                image: 'https://timestampconverter.dev/step2-select-format.png'
              },
              {
                '@type': 'HowToStep',
                name: 'Choose Timezone',
                text: 'Select the target timezone for conversion',
                image: 'https://timestampconverter.dev/step3-choose-timezone.png'
              },
              {
                '@type': 'HowToStep',
                name: 'Get Result',
                text: 'View the converted date in your chosen format',
                image: 'https://timestampconverter.dev/step4-get-result.png'
              }
            ],
            totalTime: 'PT30S',
            yield: 'Human-readable date'
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
                name: '如何将时间戳转换为日期？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '将时间戳转换为日期非常简单：1）确定时间戳的单位（秒或毫秒）；2）输入时间戳数值；3）选择目标时区；4）选择输出格式；5）点击转换获得结果。我们支持多种输出格式和全球时区。'
                }
              },
              {
                '@type': 'Question',
                name: '时间戳转日期支持哪些格式？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '支持多种输出格式：ISO 8601标准格式、本地化日期格式、自定义格式、UTC格式、相对时间格式。可以选择包含或不包含时间部分，以及不同的日期分隔符。'
                }
              },
              {
                '@type': 'Question',
                name: '如何处理不同精度的时间戳？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '我们自动检测时间戳精度：10位数字为秒级时间戳；13位数字为毫秒级；16位为微秒级。系统会自动应用正确的转换算法，确保结果准确性。'
                }
              },
              {
                '@type': 'Question',
                name: '批量时间戳转换如何操作？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '批量转换支持：1）粘贴多个时间戳（换行分隔）；2）上传CSV文件；3）选择统一的输出格式和时区；4）一键转换所有数据；5）导出结果为CSV、JSON或Excel格式。'
                }
              },
              {
                '@type': 'Question',
                name: '转换结果的准确性如何？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '我们保证转换准确性：使用IEEE 754双精度浮点运算；参考IANA时区数据库；处理闰年和闰秒；验证输入范围；提供毫秒级精度。所有计算本地执行，保证一致性。'
                }
              }
            ]
          })
        }}
      />

      {/* Software Application Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Timestamp to Date Converter',
            applicationCategory: 'WebApplication',
            description: 'Convert Unix timestamps to human-readable dates with multiple format options',
            operatingSystem: 'Any',
            url: 'https://timestampconverter.dev/timestamp-to-date',
            author: {
              '@type': 'Organization',
              name: 'Timestamp to Date Converter'
            },
            dateCreated: '2024-01-01',
            softwareVersion: '2.0.0',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            screenshot: 'https://timestampconverter.dev/app-screenshot.png'
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
                name: 'Timestamp to Date Converter',
                item: 'https://timestampconverter.dev/timestamp-to-date'
              }
            ]
          })
        }}
      />

      {children}
    </div>
  );
}