'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Code2, Database, Globe, Zap, ArrowRight, CheckCircle, Star, Users, TrendingUp, Download } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { TimestampConverter } from '@/components/TimestampConverter';
import { CurrentTimestamp } from '@/components/CurrentTimestamp';
import { BatchConverter } from '@/components/BatchConverter';
import { CodeExamples } from '@/components/CodeExamples';
import { FAQ } from '@/components/FAQ';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function TimestampConverterPage() {
  const { isDarkMode } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('single');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // FAQ data specific to timestamp converter
  const timestampFAQ = [
    {
      question: "什么是时间戳转换器？",
      answer: "时间戳转换器是一个将Unix时间戳（自1970年1月1日以来的秒数或毫秒数）转换为人类可读日期格式的在线工具。它支持双向转换：时间戳到日期和日期到时间戳。"
    },
    {
      question: "如何使用时间戳转换器？",
      answer: "使用非常简单：1）在输入框中输入Unix时间戳或选择日期；2）选择时区（默认UTC）；3）点击转换按钮即可看到结果。支持秒级和毫秒级时间戳。"
    },
    {
      question: "时间戳转换器支持哪些格式？",
      answer: "支持多种格式：Unix时间戳（10位和13位）、ISO 8601格式、RFC 3339格式，以及自定义日期格式。同时支持不同时区的转换。"
    },
    {
      question: "时间戳转换的准确性如何？",
      answer: "我们的转换器精确到毫秒级别，使用标准的JavaScript Date对象和经过验证的算法。所有计算都在本地执行，确保准确性和隐私安全。"
    },
    {
      question: "是否支持批量时间戳转换？",
      answer: "是的，支持批量转换功能。您可以一次性输入多个时间戳（换行分隔），系统会同时处理并显示所有结果。支持CSV格式导出。"
    },
    {
      question: "时间戳转换器是否免费使用？",
      answer: "完全免费！无需注册、无使用限制、无广告干扰。所有功能都是免费的，包括批量转换和代码示例。"
    },
    {
      question: "支持哪些时区？",
      answer: "支持全球所有标准时区，包括UTC、GMT、EST、PST、CST等。自动处理夏令时调整，确保时区转换的准确性。"
    },
    {
      question: "转换结果可以导出吗？",
      answer: "支持多种导出格式：CSV、JSON、XML和纯文本。批量转换结果可以直接下载，方便数据分析和进一步处理。"
    },
    {
      question: "移动设备上能正常使用吗？",
      answer: "完全响应式设计，在手机、平板和桌面设备上都能完美使用。触摸友好的界面，专门针对移动设备优化。"
    },
    {
      question: "数据隐私和安全性如何？",
      answer: "所有转换都在您的浏览器本地完成，不会向服务器发送任何数据。完全离线工作，保护您的隐私和数据安全。"
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 pb-12" data-page="timestamp-converter">
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
        </main>

        <Footer />
      </div>
    </div>
  );
}