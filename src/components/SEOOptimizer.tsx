'use client';

import React from 'react';

interface SEOOptimizerProps {
  page: string;
  keywords: string[];
  description: string;
  structuredData?: object;
}

export const SEOOptimizer: React.FC<SEOOptimizerProps> = ({
  page,
  keywords,
  description,
  structuredData
}) => {
  const generateMetaTags = () => {
    return (
      <>
        {/* Primary Meta Tags */}
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(', ')} />
        
        {/* Robots */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://timestampconverter.dev/${page}`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://timestampconverter.dev/${page}`} />
        <meta property="og:title" content={document.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`https://timestampconverter.dev/${page}-og.png`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://timestampconverter.dev/${page}`} />
        <meta name="twitter:title" content={document.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`https://timestampconverter.dev/${page}-twitter.png`} />
        
        {/* Structured Data */}
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData)
            }}
          />
        )}
      </>
    );
  };

  React.useEffect(() => {
    // Update page-specific SEO elements
    const updateSEO = () => {
      // Add structured data to head if not already present
      if (structuredData && !document.querySelector(`script[data-page="${page}"]`)) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-page', page);
        script.innerHTML = JSON.stringify(structuredData);
        document.head.appendChild(script);
      }
    };

    updateSEO();
  }, [page, structuredData]);

  return null; // This component doesn't render anything visible
};

// Hook for SEO optimization
export const useSEO = (config: SEOOptimizerProps) => {
  React.useEffect(() => {
    // Update meta description if different
    const existingDescription = document.querySelector('meta[name="description"]');
    if (existingDescription && existingDescription.getAttribute('content') !== config.description) {
      existingDescription.setAttribute('content', config.description);
    }
    
    // Update meta keywords
    const existingKeywords = document.querySelector('meta[name="keywords"]');
    const keywordString = config.keywords.join(', ');
    if (existingKeywords && existingKeywords.getAttribute('content') !== keywordString) {
      existingKeywords.setAttribute('content', keywordString);
    }
  }, [config.description, config.keywords]);
};

export default SEOOptimizer;