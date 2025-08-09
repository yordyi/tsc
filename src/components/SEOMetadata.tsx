import Head from 'next/head';

interface SEOMetadataProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  twitterImage?: string;
  breadcrumb?: Array<{
    name: string;
    url: string;
  }>;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
}

export function SEOMetadata({
  title,
  description,
  canonical,
  ogImage = '/og-image.png',
  twitterImage = '/twitter-image.png',
  breadcrumb,
  faq,
  article,
}: SEOMetadataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://timestampconverter.dev';
  const fullTitle = title ? `${title} | TimestampConverter` : 'TimestampConverter - Free Unix Time & Epoch Converter Online';
  const fullDescription = description || 'Free online timestamp converter. Convert Unix timestamps to human-readable dates instantly. Supports batch conversion, timezones, and code examples.';
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  // Generate structured data
  const structuredData: any = {
    '@context': 'https://schema.org',
    '@graph': [
      // WebSite schema
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'TimestampConverter',
        description: fullDescription,
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
        potentialAction: [
          {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${siteUrl}/?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        ],
      },
      // Organization schema
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'TimestampConverter',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          '@id': `${siteUrl}/#logo`,
          inLanguage: 'en-US',
          url: `${siteUrl}/icon-512x512.png`,
          contentUrl: `${siteUrl}/icon-512x512.png`,
          width: 512,
          height: 512,
          caption: 'TimestampConverter',
        },
        image: {
          '@id': `${siteUrl}/#logo`,
        },
      },
      // WebApplication schema
      {
        '@type': 'WebApplication',
        '@id': `${canonicalUrl}/#webapp`,
        url: canonicalUrl,
        name: fullTitle,
        description: fullDescription,
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        softwareVersion: '2.0.0',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        permissions: 'none required',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Unix timestamp conversion',
          'Batch processing capability',
          'Multiple timezone support',
          'Code examples in 8+ programming languages',
          'Offline functionality',
          'Privacy-focused - no data sent to server',
          'PWA installable',
          'Mobile responsive design',
        ],
        screenshot: `${siteUrl}/screenshot.png`,
        author: {
          '@type': 'Organization',
          name: 'TimestampConverter',
        },
      },
    ],
  };

  // Add breadcrumb if provided
  if (breadcrumb && breadcrumb.length > 0) {
    structuredData['@graph'].push({
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}/#breadcrumb`,
      itemListElement: breadcrumb.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${siteUrl}${item.url}`,
      })),
    });
  }

  // Add FAQ if provided
  if (faq && faq.length > 0) {
    structuredData['@graph'].push({
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}/#faq`,
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  // Add Article if provided
  if (article) {
    structuredData['@graph'].push({
      '@type': 'TechArticle',
      '@id': `${canonicalUrl}/#article`,
      headline: title,
      description: description,
      image: `${siteUrl}${ogImage}`,
      datePublished: article.publishedTime || new Date().toISOString(),
      dateModified: article.modifiedTime || new Date().toISOString(),
      author: {
        '@type': 'Organization',
        name: article.author || 'TimestampConverter',
      },
      publisher: {
        '@type': 'Organization',
        name: 'TimestampConverter',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/icon-512x512.png`,
        },
      },
      keywords: article.tags?.join(', '),
    });
  }

  return (
    <Head>
      {/* Enhanced Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content="timestamp converter, unix timestamp, epoch converter, time converter, date converter, batch timestamp converter, unix time converter, online timestamp tool, developer tools, programming timestamp" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="TimestampConverter - Modern Timestamp Conversion Tool" />
      <meta property="og:site_name" content="TimestampConverter" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@timestampconverter" />
      <meta name="twitter:creator" content="@timestampconverter" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={`${siteUrl}${twitterImage}`} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      <meta name="geo.position" content="39.50;-98.35" />
      <meta name="ICBM" content="39.50, -98.35" />
      
      {/* Apple */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="TimestampConverter" />
      
      {/* Microsoft */}
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Theme */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="color-scheme" content="light dark" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </Head>
  );
}

// Pre-defined SEO configurations for different pages
export const seoConfigs = {
  home: {
    title: 'Free Unix Time & Epoch Converter Online 2025',
    description: 'Free online timestamp converter. Convert Unix timestamps to human-readable dates instantly. Supports batch conversion, timezones, and code examples. Fast, accurate, and developer-friendly.',
    canonical: '/',
    faq: [
      {
        question: 'What is a Unix timestamp?',
        answer: 'A Unix timestamp is the number of seconds since January 1, 1970, 00:00:00 UTC (Unix Epoch). It\'s a standardized way to represent time in programming.',
      },
      {
        question: 'How accurate is this timestamp converter?',
        answer: 'Our converter is 100% accurate and uses JavaScript\'s native Date object for conversions. All calculations are performed locally in your browser.',
      },
      {
        question: 'Can I convert timestamps in batch?',
        answer: 'Yes! Our batch converter allows you to convert multiple timestamps at once. Simply paste your timestamps separated by newlines.',
      },
      {
        question: 'Do you store my timestamp data?',
        answer: 'No, we never store your data. All conversions happen locally in your browser for complete privacy and security.',
      },
      {
        question: 'What timezones are supported?',
        answer: 'We support all major timezones worldwide, including UTC, EST, PST, GMT, and many more. You can select your preferred timezone from the dropdown.',
      },
    ],
  },
  
  timestampConverter: {
    title: 'Timestamp Converter - Convert Unix Time to Date',
    description: 'Convert Unix timestamps to human-readable dates and vice versa. Supports multiple formats, timezones, and provides code examples for developers.',
    canonical: '/timestamp-converter',
    ogImage: '/timestamp-converter-og.png',
    twitterImage: '/timestamp-converter-twitter.png',
  },
  
  unixTimestampConverter: {
    title: 'Unix Timestamp Converter - Epoch Time Converter Tool',
    description: 'Professional Unix timestamp converter for developers. Convert epoch time to date with timezone support and programming examples.',
    canonical: '/unix-timestamp-converter',
    ogImage: '/unix-timestamp-converter-og.png',
    twitterImage: '/unix-timestamp-converter-twitter.png',
  },
  
  timestampToDate: {
    title: 'Timestamp to Date Converter - Unix Time to Human Readable',
    description: 'Convert timestamps to human-readable dates instantly. Support for multiple date formats and timezones. Perfect for developers and data analysts.',
    canonical: '/timestamp-to-date',
    ogImage: '/timestamp-to-date-og.png',
    twitterImage: '/timestamp-to-date-twitter.png',
  },
};