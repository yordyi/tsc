'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, ArrowRight, Clock, Globe, FileText, Zap, CheckCircle, Download, RefreshCw, Copy, Settings, Calendar, Timer } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { TimestampConverter } from '@/components/TimestampConverter';
import { CurrentTimestamp } from '@/components/CurrentTimestamp';
import { BatchConverter } from '@/components/BatchConverter';
import { ConversionHistory } from '@/components/ConversionHistory';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumb, generateBreadcrumb, generateBreadcrumbSchema } from '@/components/Breadcrumb';
import { RelatedLinks, generateRelatedLinksSchema } from '@/components/RelatedLinks';

export default function TimestampToDatePage() {
  const { isDarkMode } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [conversionMode, setConversionMode] = useState('single');
  const [outputFormat, setOutputFormat] = useState('iso');
  const pathname = '/timestamp-to-date';
  
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

  // Timestamp to Date specific FAQ
  const timestamptodateFAQ = [
    {
      question: "How to convert timestamp to date?",
      answer: "Simply enter your timestamp in the input field, select your desired timezone, choose the output format, and click convert. The result will show the human-readable date instantly."
    },
    {
      question: "What date formats are available?",
      answer: "Multiple formats including ISO 8601, RFC 3339, US format (MM/DD/YYYY), European format (DD/MM/YYYY), and custom formats. You can also specify time formats with or without seconds."
    },
    {
      question: "How to handle different timezones?",
      answer: "Select your target timezone from the dropdown menu. The converter automatically adjusts for daylight saving time and provides accurate local time conversions."
    },
    {
      question: "Can I convert multiple timestamps at once?",
      answer: "Yes, use our batch conversion feature. Paste multiple timestamps (one per line) and get all conversions at once. Results can be exported in various formats."
    },
    {
      question: "What about millisecond timestamps?",
      answer: "Both second-precision (10 digits) and millisecond-precision (13 digits) timestamps are supported. The converter automatically detects the format and converts accordingly."
    }
  ];

  const outputFormats = [
    { id: 'iso', label: 'ISO 8601', example: '2024-01-01T12:00:00Z' },
    { id: 'local', label: 'Local Format', example: '1/1/2024, 12:00:00 PM' },
    { id: 'custom', label: 'Custom Format', example: 'YYYY-MM-DD HH:mm:ss' },
    { id: 'relative', label: 'Relative Time', example: '2 hours ago' },
    { id: 'full', label: 'Full Description', example: 'Monday, January 1, 2024 at 12:00:00 PM UTC' }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 dark:from-orange-900 dark:via-red-900 dark:to-pink-900">
        <Header />
        
        {/* SEO结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([breadcrumbSchema, relatedLinksSchema])
          }}
        />
        
        <main className="max-w-7xl mx-auto px-4 pb-12" data-page="timestamp-to-date">
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
            <div className="mb-6 relative">
              <CalendarDays className="w-20 h-20 text-orange-300 mx-auto mb-4" />
              <div className="absolute -top-2 -right-8 animate-bounce">
                <ArrowRight className="w-8 h-8 text-yellow-300" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Instant{' '}
              <span className="text-orange-300">Timestamp to Date</span>{' '}
              Converter
            </h1>
            <p className="text-xl text-orange-100 mb-8 max-w-4xl mx-auto">
              Transform Unix timestamps into human-readable dates instantly with our powerful conversion tool. Support for all timestamp formats, global timezones, custom output formats, and batch processing capabilities.
            </p>
            
            {/* Conversion Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-orange-100 mb-8">
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-5 h-5 text-yellow-300" />
                <span>Real-time Conversion</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-green-300" />
                <span>500+ Timezones</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-300" />
                <span>Multiple Formats</span>
              </div>
              <div className="flex items-center space-x-2">
                <Copy className="w-5 h-5 text-purple-300" />
                <span>Batch Processing</span>
              </div>
            </div>

            {/* Live Demo */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-4xl mx-auto border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Live Conversion Demo</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-orange-300 text-sm mb-2">Current Unix Timestamp</div>
                  <div className="text-2xl font-mono font-bold text-white bg-white/10 rounded-lg p-3">
                    {Math.floor(Date.now() / 1000)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-orange-300 text-sm mb-2">Converted to Date</div>
                  <div className="text-lg font-bold text-white bg-white/10 rounded-lg p-3">
                    {new Date().toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      timeZoneName: 'short'
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                data-cta="primary"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold flex items-center justify-center transition-colors"
                onClick={() => document.querySelector('#converter')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Converting Now
                <CalendarDays className="w-5 h-5 ml-2" />
              </button>
              <button 
                className="border-2 border-orange-300/30 hover:border-orange-300/50 text-orange-300 px-8 py-3 rounded-xl font-semibold transition-colors"
                onClick={() => document.querySelector('#formats')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Output Formats
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
                Advanced Timestamp to Date Converter
              </h2>
              <p className="text-orange-100 max-w-3xl mx-auto">
                Convert any timestamp to human-readable date format with precision and flexibility. Choose your preferred output format and timezone.
              </p>
            </div>

            {/* Conversion Mode Selector */}
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 rounded-xl p-1">
                <button
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    conversionMode === 'single' 
                      ? 'bg-orange-500 text-white' 
                      : 'text-orange-100 hover:bg-white/10'
                  }`}
                  onClick={() => setConversionMode('single')}
                  data-step="1"
                >
                  Single Convert
                </button>
                <button
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    conversionMode === 'batch' 
                      ? 'bg-orange-500 text-white' 
                      : 'text-orange-100 hover:bg-white/10'
                  }`}
                  onClick={() => setConversionMode('batch')}
                  data-step="2"
                >
                  Batch Convert
                </button>
                <button
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    conversionMode === 'history' 
                      ? 'bg-orange-500 text-white' 
                      : 'text-orange-100 hover:bg-white/10'
                  }`}
                  onClick={() => setConversionMode('history')}
                  data-step="3"
                >
                  History
                </button>
              </div>
            </div>

            {/* Converter Content */}
            {conversionMode === 'single' && <TimestampConverter />}
            {conversionMode === 'batch' && <BatchConverter mode="to-date" />}
            {conversionMode === 'history' && <ConversionHistory />}
          </motion.div>

          {/* Output Formats Section */}
          <motion.div
            id="formats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
            data-section="features"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Flexible Output Formats
              </h2>
              <p className="text-orange-100 max-w-3xl mx-auto">
                Choose from a variety of date formats to match your specific needs and regional preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {outputFormats.map((format, index) => (
                <motion.div
                  key={format.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors cursor-pointer"
                  onClick={() => setOutputFormat(format.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">{format.label}</h3>
                    {outputFormat === format.id && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 mb-4">
                    <code className="text-orange-300 text-sm font-mono">{format.example}</code>
                  </div>
                  <div className="text-orange-100 text-sm">
                    {format.id === 'iso' && 'International standard format, perfect for APIs and databases.'}
                    {format.id === 'local' && 'Localized format based on user preferences and locale.'}
                    {format.id === 'custom' && 'Define your own format using pattern strings.'}
                    {format.id === 'relative' && 'Human-friendly relative time descriptions.'}
                    {format.id === 'full' && 'Complete date and time description with full context.'}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Conversion Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Powerful Conversion Features
              </h2>
              <p className="text-orange-100 max-w-3xl mx-auto">
                Advanced features designed to handle any timestamp conversion scenario with precision and ease.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Zap className="w-8 h-8 text-yellow-400" />,
                  title: "Instant Conversion",
                  description: "Real-time conversion as you type with live preview and validation.",
                  features: ["Real-time processing", "Input validation", "Live preview", "Error detection"]
                },
                {
                  icon: <Globe className="w-8 h-8 text-blue-400" />,
                  title: "Global Timezones",
                  description: "Support for all world timezones with automatic DST handling.",
                  features: ["500+ timezones", "DST automation", "Historical data", "UTC normalization"]
                },
                {
                  icon: <Settings className="w-8 h-8 text-purple-400" />,
                  title: "Custom Formats",
                  description: "Flexible output formatting with custom patterns and localization.",
                  features: ["Custom patterns", "Localization", "Multiple outputs", "Format templates"]
                },
                {
                  icon: <Download className="w-8 h-8 text-green-400" />,
                  title: "Export Options",
                  description: "Export conversion results in various formats for further use.",
                  features: ["CSV export", "JSON format", "Excel files", "Print friendly"]
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
                >
                  <div className="mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-orange-100 mb-4 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center justify-center text-xs text-orange-300">
                        <CheckCircle className="w-3 h-3 mr-2" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Conversion Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Conversion Examples & Use Cases
              </h2>
              <p className="text-orange-100 max-w-3xl mx-auto">
                See how different timestamps convert to dates and discover common use cases.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white mb-4">Example Conversions</h3>
                <div className="space-y-4">
                  {[
                    { timestamp: '0', date: 'January 1, 1970 00:00:00 UTC', description: 'Unix Epoch start' },
                    { timestamp: '1609459200', date: 'January 1, 2021 00:00:00 UTC', description: 'New Year 2021' },
                    { timestamp: '1640995200', date: 'January 1, 2022 00:00:00 UTC', description: 'New Year 2022' },
                    { timestamp: '2147483647', date: 'January 19, 2038 03:14:07 UTC', description: '32-bit limit' },
                    { timestamp: '1640995200000', date: 'January 1, 2022 00:00:00 UTC', description: 'Millisecond timestamp' },
                    { timestamp: '-86400', date: 'December 31, 1969 00:00:00 UTC', description: 'Day before epoch' }
                  ].map((example, index) => (
                    <div key={index} className="bg-white/10 rounded-xl p-4 hover:bg-white/15 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <span className="text-orange-300 font-mono font-semibold">{example.timestamp}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 my-2 sm:my-0" />
                        <span className="text-green-300 font-semibold">{example.date}</span>
                      </div>
                      <div className="text-orange-100 text-sm">{example.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white mb-4">Common Use Cases</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Log File Analysis",
                      description: "Convert server log timestamps to readable dates for debugging and analysis.",
                      icon: "📊"
                    },
                    {
                      title: "Database Records",
                      description: "Transform database timestamp fields into user-friendly date displays.",
                      icon: "🗄️"
                    },
                    {
                      title: "API Response Parsing",
                      description: "Convert API timestamp responses to display in user interfaces.",
                      icon: "🔌"
                    },
                    {
                      title: "Data Migration",
                      description: "Batch convert timestamps during system migrations and data imports.",
                      icon: "🔄"
                    },
                    {
                      title: "Event Scheduling",
                      description: "Convert event timestamps to local time zones for scheduling systems.",
                      icon: "📅"
                    },
                    {
                      title: "Performance Monitoring",
                      description: "Analyze system performance metrics with readable timestamp data.",
                      icon: "⏱️"
                    }
                  ].map((useCase, index) => (
                    <div key={index} className="bg-white/10 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{useCase.icon}</div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">{useCase.title}</h4>
                          <p className="text-orange-100 text-sm">{useCase.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-12"
            data-section="faq"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Timestamp to Date Conversion FAQ
              </h2>
              <p className="text-orange-100 max-w-2xl mx-auto">
                Everything you need to know about converting timestamps to readable dates.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {timestamptodateFAQ.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                    data-faq-item
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-6 hover:bg-white/5 rounded-2xl transition-colors">
                        <h3 className="text-lg font-semibold text-white group-open:text-orange-300" data-faq-question>
                          {faq.question}
                        </h3>
                        <div className="text-white group-open:rotate-180 transition-transform">
                          <ArrowRight className="w-5 h-5 rotate-90" />
                        </div>
                      </summary>
                      <div className="px-6 pb-6">
                        <p className="text-orange-100 leading-relaxed" data-faq-answer>
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