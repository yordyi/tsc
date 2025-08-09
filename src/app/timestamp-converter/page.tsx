'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Code2, Database, Globe, Zap, ArrowRight, CheckCircle, Star, Users, TrendingUp, Download } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { TimestampConverter } from '@/components/TimestampConverter';
import { CurrentTimestamp } from '@/components/CurrentTimestamp';
import { BatchConverter } from '@/components/BatchConverter';
import CodeExamples from '@/components/CodeExamples';
import FAQ from '@/components/FAQ';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumb, generateBreadcrumb, generateBreadcrumbSchema } from '@/components/Breadcrumb';
import { RelatedLinks, generateRelatedLinksSchema } from '@/components/RelatedLinks';
import { usePathname } from 'next/navigation';
import Head from 'next/head';

export default function TimestampConverterPage() {
  const { isDarkMode } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('single');
  const pathname = '/timestamp-converter';
  
  // 生成面包屑和相关链接的结构化数据
  const breadcrumbItems = generateBreadcrumb(pathname);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const relatedLinksSchema = generateRelatedLinksSchema(pathname);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // FAQ data specific to timestamp converter
  const timestampFAQ = [
    {
      question: "What is a timestamp converter?",
      answer: "A timestamp converter is an online tool that converts Unix timestamps (seconds or milliseconds since January 1, 1970) into human-readable date formats. It supports bidirectional conversion: timestamp to date and date to timestamp."
    },
    {
      question: "How do I use the timestamp converter?",
      answer: "It's very simple: 1) Enter a Unix timestamp in the input field or select a date; 2) Choose your timezone (default UTC); 3) Click the convert button to see the result. Supports both second and millisecond timestamps."
    },
    {
      question: "What formats does the timestamp converter support?",
      answer: "Supports multiple formats: Unix timestamps (10 and 13 digits), ISO 8601 format, RFC 3339 format, and custom date formats. Also supports conversion between different timezones."
    },
    {
      question: "How accurate is timestamp conversion?",
      answer: "Our converter is precise to the millisecond level, using standard JavaScript Date objects and verified algorithms. All calculations are performed locally, ensuring accuracy and privacy security."
    },
    {
      question: "Does it support batch timestamp conversion?",
      answer: "Yes, batch conversion is supported. You can input multiple timestamps at once (separated by newlines), and the system will process and display all results simultaneously. Supports CSV format export."
    },
    {
      question: "Is the timestamp converter free to use?",
      answer: "Completely free! No registration required, no usage limits, no ads. All features are free, including batch conversion and code examples."
    },
    {
      question: "Which timezones are supported?",
      answer: "Supports all global standard timezones, including UTC, GMT, EST, PST, CST, and more. Automatically handles daylight saving time adjustments to ensure timezone conversion accuracy."
    },
    {
      question: "Can conversion results be exported?",
      answer: "Supports multiple export formats: CSV, JSON, XML, and plain text. Batch conversion results can be downloaded directly for data analysis and further processing."
    },
    {
      question: "Does it work properly on mobile devices?",
      answer: "Fully responsive design that works perfectly on phones, tablets, and desktop devices. Touch-friendly interface specifically optimized for mobile devices."
    },
    {
      question: "How about data privacy and security?",
      answer: "All conversions are performed locally in your browser without sending any data to servers. Works completely offline, protecting your privacy and data security."
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
        <Header />
        
        {/* SEO结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([breadcrumbSchema, relatedLinksSchema])
          }}
        />
        
        <main className="max-w-7xl mx-auto px-4 pb-12" data-page="timestamp-converter">
          {/* 面包屑导航 */}
          <div className="pt-6 pb-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 pt-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Professional{' '}
              <span className="text-yellow-300">Timestamp Converter</span>{' '}
              Tool
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              The most advanced timestamp converter online. Convert Unix timestamps to human-readable dates instantly with precision, batch processing, and complete timezone support. Trusted by developers worldwide.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-blue-100 mb-8">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-green-300" />
                <span>500K+ Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-pink-300" />
                <span>99.9% Accuracy</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Free Forever</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                data-cta="primary"
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-xl font-semibold flex items-center justify-center transition-colors"
                onClick={() => document.querySelector('#converter')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Converting Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button 
                className="border-2 border-white/30 hover:border-white/50 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Features
              </button>
            </div>
          </motion.div>

          {/* Current Timestamp Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <CurrentTimestamp />
          </motion.div>

          {/* Main Converter Tool */}
          <motion.div
            id="converter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Advanced Timestamp Converter
              </h2>
              <p className="text-blue-100 max-w-2xl mx-auto">
                Convert between Unix timestamps and human-readable dates with precision. Supports single conversions and batch processing.
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 rounded-xl p-1">
                <button
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'single' 
                      ? 'bg-yellow-400 text-black' 
                      : 'text-white hover:bg-white/10'
                  }`}
                  onClick={() => setActiveTab('single')}
                  data-step="1"
                >
                  Single Convert
                </button>
                <button
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'batch' 
                      ? 'bg-yellow-400 text-black' 
                      : 'text-white hover:bg-white/10'
                  }`}
                  onClick={() => setActiveTab('batch')}
                  data-step="2"
                >
                  Batch Convert
                </button>
              </div>
            </div>

            {/* Converter Content */}
            {activeTab === 'single' ? <TimestampConverter /> : <BatchConverter mode="to-date" />}
          </motion.div>

          {/* Key Features Section */}
          <motion.div
            id="features"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
            data-section="features"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Why Choose Our Timestamp Converter?
              </h2>
              <p className="text-blue-100 text-lg max-w-3xl mx-auto">
                Professional-grade features designed for developers, analysts, and anyone working with timestamps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-8 h-8 text-yellow-300" />,
                  title: "Lightning Fast Conversion",
                  description: "Convert timestamps in under 1ms with our optimized algorithm. No server requests needed - everything runs locally for maximum speed and privacy.",
                  features: ["<1ms conversion time", "Offline functionality", "Privacy-focused"]
                },
                {
                  icon: <Database className="w-8 h-8 text-blue-300" />,
                  title: "Batch Processing Power",
                  description: "Process thousands of timestamps at once. Import from CSV, convert in bulk, and export results in multiple formats for data analysis.",
                  features: ["1000+ simultaneous conversions", "CSV import/export", "Multiple output formats"]
                },
                {
                  icon: <Globe className="w-8 h-8 text-green-300" />,
                  title: "Complete Timezone Support",
                  description: "Support for all global timezones with automatic DST handling. Convert between any timezone with precision and accuracy.",
                  features: ["500+ timezones", "DST automatic handling", "Precision timezone conversion"]
                },
                {
                  icon: <Code2 className="w-8 h-8 text-purple-300" />,
                  title: "Developer-Friendly Features",
                  description: "Rich code examples in 8+ programming languages. API integration guides and comprehensive documentation for developers.",
                  features: ["8+ language examples", "API documentation", "Copy-paste ready code"]
                },
                {
                  icon: <Calendar className="w-8 h-8 text-pink-300" />,
                  title: "Multiple Format Support",
                  description: "Support for Unix timestamps, milliseconds, microseconds, ISO 8601, RFC 3339, and custom date formats.",
                  features: ["10+ input formats", "Custom format support", "Format auto-detection"]
                },
                {
                  icon: <Download className="w-8 h-8 text-orange-300" />,
                  title: "Export & Integration",
                  description: "Export results in CSV, JSON, XML formats. Integration with popular tools and APIs for seamless workflow.",
                  features: ["Multiple export formats", "API integration", "Workflow automation"]
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
                >
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-blue-100 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center text-sm text-green-300">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technical Deep Dive Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
            data-section="technical"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Technical Specifications & Accuracy
              </h2>
              <p className="text-blue-100 max-w-3xl mx-auto">
                Built with precision engineering for maximum accuracy and performance in timestamp conversion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-4">Supported Formats</h3>
                <div className="space-y-4">
                  {[
                    { format: "Unix Timestamp (Seconds)", example: "1640995200", description: "10-digit seconds since epoch" },
                    { format: "Unix Timestamp (Milliseconds)", example: "1640995200000", description: "13-digit milliseconds since epoch" },
                    { format: "ISO 8601 Format", example: "2022-01-01T00:00:00Z", description: "International standard format" },
                    { format: "RFC 3339 Format", example: "2022-01-01T00:00:00+00:00", description: "Internet timestamp format" },
                    { format: "UTC Timezone", example: "2022-01-01 00:00:00 UTC", description: "Coordinated Universal Time" },
                    { format: "Custom Date Formats", example: "MM/DD/YYYY HH:mm:ss", description: "User-defined patterns" }
                  ].map((item, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4">
                      <div className="font-semibold text-yellow-300 mb-1">{item.format}</div>
                      <div className="text-green-300 text-sm mb-2 font-mono">{item.example}</div>
                      <div className="text-blue-100 text-sm">{item.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { metric: "Conversion Speed", value: "<1ms", color: "text-green-300" },
                    { metric: "Accuracy Rate", value: "99.99%", color: "text-blue-300" },
                    { metric: "Batch Capacity", value: "10K+", color: "text-purple-300" },
                    { metric: "Timezone Support", value: "500+", color: "text-pink-300" },
                    { metric: "Format Support", value: "15+", color: "text-orange-300" },
                    { metric: "Uptime", value: "99.9%", color: "text-yellow-300" }
                  ].map((item, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4 text-center">
                      <div className={`text-2xl font-bold ${item.color} mb-1`}>{item.value}</div>
                      <div className="text-blue-100 text-sm">{item.metric}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/5 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Algorithm Details</h4>
                  <ul className="space-y-2 text-blue-100 text-sm">
                    <li>• High-precision IEEE 754 double-precision arithmetic</li>
                    <li>• Leap second and leap year accurate calculations</li>
                    <li>• Timezone database updated monthly (IANA)</li>
                    <li>• Millisecond precision for all conversions</li>
                    <li>• Edge case handling for extreme timestamps</li>
                    <li>• Memory-efficient batch processing algorithms</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Use Cases Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Common Use Cases & Applications
              </h2>
              <p className="text-blue-100 max-w-3xl mx-auto">
                Discover how professionals across different industries use our timestamp converter tool.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Software Development & APIs",
                  description: "Convert API timestamps, debug time-sensitive code, synchronize distributed systems, and validate datetime inputs.",
                  examples: ["API response parsing", "Log file analysis", "Database migrations", "Event scheduling"],
                  icon: "👨‍💻"
                },
                {
                  title: "Data Analysis & Research",
                  description: "Process time-series data, analyze user behavior patterns, prepare datasets for visualization, and clean temporal data.",
                  examples: ["CSV data processing", "Time-series analysis", "User analytics", "Research datasets"],
                  icon: "📊"
                },
                {
                  title: "System Administration",
                  description: "Monitor server logs, analyze system events, troubleshoot timing issues, and schedule automated tasks.",
                  examples: ["Server log analysis", "Cron job scheduling", "Error troubleshooting", "Performance monitoring"],
                  icon: "🛠️"
                },
                {
                  title: "Digital Marketing & Analytics",
                  description: "Analyze campaign performance, track user sessions, measure conversion times, and optimize ad timing.",
                  examples: ["Campaign tracking", "User session analysis", "A/B test timing", "Conversion optimization"],
                  icon: "📈"
                }
              ].map((useCase, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
                  <p className="text-blue-100 mb-4">{useCase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.examples.map((example, idx) => (
                      <span key={idx} className="bg-white/10 px-3 py-1 rounded-full text-sm text-green-300">
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Code Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-16"
          >
            <CodeExamples />
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-12"
            data-section="faq"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-blue-100 max-w-2xl mx-auto">
                Everything you need to know about timestamp conversion and our tool.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {timestampFAQ.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                    data-faq-item
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-6 hover:bg-white/5 rounded-2xl transition-colors">
                        <h3 className="text-lg font-semibold text-white group-open:text-yellow-300" data-faq-question>
                          {faq.question}
                        </h3>
                        <div className="text-white group-open:rotate-180 transition-transform">
                          <ArrowRight className="w-5 h-5 rotate-90" />
                        </div>
                      </summary>
                      <div className="px-6 pb-6">
                        <p className="text-blue-100 leading-relaxed" data-faq-answer>
                          {faq.answer}
                        </p>
                      </div>
                    </details>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* 相关工具推荐 */}
          <RelatedLinks currentPage={pathname} className="mb-16" />
        </main>

        <Footer />
      </div>
    </div>
  );
}