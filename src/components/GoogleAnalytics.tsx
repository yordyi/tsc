'use client';

import Script from 'next/script';
import { useEffect } from 'react';

interface GoogleAnalyticsProps {
  measurementId?: string;
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  useEffect(() => {
    if (!measurementId) return;

    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || [];
    
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }

    // Configure GA4
    gtag('js', new Date());
    gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    });

    // Track page views for SPA
    const handleRouteChange = () => {
      gtag('config', measurementId, {
        page_title: document.title,
        page_location: window.location.href,
      });
    };

    // Listen for route changes (Next.js)
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [measurementId]);

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  );
}

// Custom analytics events for timestamp converter
export const trackEvent = (
  action: string,
  category: string = 'engagement',
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Specific events for the timestamp converter
export const analytics = {
  // Conversion events
  trackTimestampConversion: (inputType: 'timestamp' | 'date', timezone?: string) => {
    trackEvent('convert_timestamp', 'conversion', `${inputType}_${timezone || 'default'}`);
  },

  trackBatchConversion: (count: number) => {
    trackEvent('batch_convert', 'conversion', 'batch_operation', count);
  },

  trackTimezoneChange: (timezone: string) => {
    trackEvent('change_timezone', 'interaction', timezone);
  },

  trackFormatChange: (format: string) => {
    trackEvent('change_format', 'interaction', format);
  },

  trackCodeExampleCopy: (language: string) => {
    trackEvent('copy_code_example', 'engagement', language);
  },

  trackFeatureCardClick: (feature: string) => {
    trackEvent('click_feature_card', 'navigation', feature);
  },

  trackHistoryView: () => {
    trackEvent('view_conversion_history', 'engagement');
  },

  trackHistoryClear: (count: number) => {
    trackEvent('clear_history', 'interaction', 'history_clear', count);
  },

  // SEO events
  trackPWAInstall: () => {
    trackEvent('pwa_install', 'engagement', 'app_install');
  },

  trackPWAPrompt: () => {
    trackEvent('pwa_prompt_shown', 'engagement', 'install_prompt');
  },

  trackShareClick: (method: string) => {
    trackEvent('share_click', 'engagement', method);
  },

  // Performance events
  trackPerformance: (metric: string, value: number) => {
    trackEvent('performance_metric', 'performance', metric, Math.round(value));
  },

  // Error tracking
  trackError: (error: string, context?: string) => {
    trackEvent('error_occurred', 'error', `${error}_${context || 'unknown'}`);
  },
};