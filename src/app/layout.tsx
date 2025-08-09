import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { ServiceWorkerRegistration } from '@/components/ServiceWorkerRegistration';
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
        url: '/og-image.svg',
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
    images: ['/og-image.svg'],
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
        {/* Critical Performance Optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Optimized font loading with display=swap - preload for performance */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
        
        {/* Favicon with optimized loading */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        
        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* DNS prefetch and resource hints for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Preload critical resources for LCP improvement */}
        <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
        <link rel="preload" href="/_next/static/chunks/framework.js" as="script" />
        <link rel="preload" href="/_next/static/chunks/main.js" as="script" />
        
        {/* Critical CSS inlined for performance */}
        <style>{`
          :root {
            --font-inter: 'Inter', system-ui, sans-serif;
            --shadow-glass: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            --backdrop-blur: blur(10px);
          }
          html { scroll-behavior: smooth; }
          body { margin: 0; padding: 0; font-family: var(--font-inter); background: #ffffff; color: #111827; line-height: 1.6; }
          .dark body { background: #111827; color: #f9fafb; }
          .min-h-screen { min-height: 100vh; }
          .bg-gradient-to-br { background: linear-gradient(to bottom right, #2563eb, #7c3aed, #6b21a8); }
          .dark .bg-gradient-to-br { background: linear-gradient(to bottom right, #111827, #6b21a8, #111827); }
          .max-w-6xl { max-width: 72rem; }
          .mx-auto { margin-left: auto; margin-right: auto; }
          .px-4 { padding-left: 1rem; padding-right: 1rem; }
          .pb-12 { padding-bottom: 3rem; }
          .text-center { text-align: center; }
          .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
          .font-bold { font-weight: 700; }
          .text-white { color: #ffffff; }
          .text-yellow-300 { color: #fde047; }
          .mb-6 { margin-bottom: 1.5rem; }
          .mb-8 { margin-bottom: 2rem; }
          .mb-12 { margin-bottom: 3rem; }
          @media (min-width: 768px) {
            .md\\:text-6xl { font-size: 3.75rem; line-height: 1; }
          }
          .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
          .duration-600 { transition-duration: 600ms; }
          .opacity-0 { opacity: 0; }
          .opacity-100 { opacity: 1; }
          .translate-y-0 { transform: translateY(0px); }
          .translate-y-5 { transform: translateY(1.25rem); }
          *:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }
        `}</style>
        
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
              screenshot: 'https://timestampconverter.dev/og-image.svg',
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
        
        {/* Service Worker Registration */}
        <ServiceWorkerRegistration />
        
        {/* Google Analytics 4 */}
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID} />
      </body>
    </html>
  );
}