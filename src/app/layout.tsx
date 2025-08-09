import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Timestamp Converter - Free Unix Time & Epoch Converter Online 2024',
  description: 'Free online timestamp converter. Convert Unix timestamps to human-readable dates instantly. Supports batch conversion, timezones, and code examples. Fast, accurate, and developer-friendly.',
  keywords: [
    'timestamp converter',
    'unix timestamp',
    'epoch converter',
    'time converter',
    'date converter',
    'batch timestamp converter',
    'unix time converter',
    'online timestamp tool',
    'developer tools',
    'programming timestamp'
  ],
  authors: [{ name: 'TimestampConverter' }],
  creator: 'TimestampConverter',
  publisher: 'TimestampConverter',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://timestampconverter.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://timestampconverter.dev',
    siteName: 'TimestampConverter',
    title: 'Timestamp Converter - Free Unix Time & Epoch Converter Online',
    description: 'Convert Unix timestamps to human-readable dates instantly. The fastest, most accurate timestamp converter built for developers.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TimestampConverter - Modern Timestamp Conversion Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@timestampconverter',
    creator: '@timestampconverter',
    title: 'Timestamp Converter - Free Unix Time & Epoch Converter',
    description: 'Convert Unix timestamps instantly. Fast, accurate, developer-friendly.',
    images: ['/twitter-image.png'],
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'your-google-verification-code-here',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'TimestampConverter',
    'mobile-web-app-capable': 'yes',
    'application-name': 'TimestampConverter',
    'msapplication-TileColor': '#3b82f6',
    'theme-color': '#3b82f6',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google Fonts */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Performance hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'TimestampConverter',
              description: 'Free online Unix timestamp converter with batch processing and code examples',
              url: 'https://timestampconverter.dev',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Any',
              permissions: 'none required',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              },
              featureList: [
                'Unix timestamp conversion',
                'Batch processing',
                'Multiple time zones',
                'Code examples in 8+ languages',
                'Offline functionality',
                'Privacy-focused (no data sent to server)'
              ],
              screenshot: 'https://timestampconverter.dev/screenshot.png',
              softwareVersion: '2.0.0',
              datePublished: '2024-01-01',
              dateModified: new Date().toISOString().split('T')[0],
              author: {
                '@type': 'Organization',
                name: 'TimestampConverter'
              }
            })
          }}
        />
      </head>
      <body 
        className={`${inter.className} font-sans antialiased scroll-smooth`}
        suppressHydrationWarning
      >
        {children}
        
        {/* Google Analytics 4 */}
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID} />
      </body>
    </html>
  );
}