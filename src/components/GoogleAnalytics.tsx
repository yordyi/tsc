'use client';

import Script from 'next/script';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

interface GoogleAnalyticsProps {
  measurementId?: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  // Don't render anything if no measurementId
  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        onError={() => {
          console.warn('[GA] Script loading error');
        }}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        onError={() => {
          console.warn('[GA] Config script error');
        }}
        dangerouslySetInnerHTML={{
          __html: `
            try {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${measurementId}', {
                page_title: document.title || '',
                page_location: window.location.href || '',
              });
            } catch (error) {
              console.warn('[GA] Inline script error:', error);
            }
          `,
        }}
      />
    </>
  );
}

// Minimal analytics tracking function
export const trackEvent = (
  action: string,
  category: string = 'engagement',
  label?: string,
  value?: number
) => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  } catch (error) {
    console.warn('[GA] Event tracking error:', error);
  }
};
