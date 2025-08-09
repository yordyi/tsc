'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Server, Code, Database, Clock, Globe, Zap, CheckCircle, ArrowRight, Lightbulb, FileText, Cpu } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { TimestampConverter } from '@/components/TimestampConverter';
import { CurrentTimestamp } from '@/components/CurrentTimestamp';
import { BatchConverter } from '@/components/BatchConverter';
import { CodeExamples } from '@/components/CodeExamples';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function UnixTimestampConverterPage() {
  const { isDarkMode } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('converter');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Unix-specific FAQ data
  const unixFAQ = [
    {
      question: "什么是Unix时间戳？",
      answer: "Unix时间戳（Unix timestamp）是从1970年1月1日00:00:00 UTC开始到指定时间的总秒数。这是POSIX时间的标准表示方法，广泛用于计算机系统和编程中表示时间。"
    },
    {
      question: "为什么Unix时间戳从1970年开始？",
      answer: "1970年1月1日被称为\"Unix纪元\"（Unix Epoch），这个日期被选择是因为它接近Unix操作系统开发的时间，且足够接近计算机时代的开始，便于计算和存储。"
    },
    {
      question: "Unix时间戳的优势是什么？",
      answer: "Unix时间戳的主要优势包括：1）跨平台兼容性强；2）存储效率高（只需一个整数）；3）计算简单；4）不受时区影响；5）易于比较和排序；6）广泛的系统支持。"
    },
    {
      question: "Unix时间戳支持哪些精度？",
      answer: "我们的转换器支持多种精度：秒级（10位数字）、毫秒级（13位数字）、微秒级（16位数字）。不同系统和编程语言可能使用不同的精度。"
    },
    {
      question: "2038年问题是什么？",
      answer: "2038年问题是指32位系统无法表示2038年1月19日03:14:07之后的时间。现代64位系统已经解决了这个问题，可以表示数十亿年的时间范围。"
    },
    {
      question: "Unix时间戳如何处理闰秒？",
      answer: "Unix时间戳不包含闰秒，它假设每天都是86400秒。当发生闰秒时，Unix时间会\"重复\"一秒或\"跳过\"一秒来保持与UTC的同步。"
    },
    {
      question: "负数Unix时间戳代表什么？",
      answer: "负数Unix时间戳表示1970年1月1日之前的时间。例如，-86400表示1969年12月31日00:00:00 UTC。我们的转换器完全支持负数时间戳。"
    },
    {
      question: "Unix时间戳在数据库中如何存储？",
      answer: "在数据库中，Unix时间戳通常存储为INTEGER或BIGINT类型。这比DATETIME类型更节省空间，且在跨时区查询时更高效。"
    },
    {
      question: "如何在编程中处理Unix时间戳？",
      answer: "大多数编程语言都有内置的时间戳处理函数。JavaScript使用Date对象，Python使用datetime模块，Java使用Instant类。我们提供了多种语言的代码示例。"
    },
    {
      question: "Unix时间戳的最大值是多少？",
      answer: "32位系统的最大值是2147483647（2038年）。64位系统理论上可以表示到292,277,026,596年。我们的转换器支持完整的64位范围。"
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 dark:from-gray-900 dark:via-gray-800 dark:to-black">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 pb-12" data-page="unix-timestamp-converter">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 pt-8"
          >
            <div className="mb-6">
              <Terminal className="w-16 h-16 text-green-400 mx-auto mb-4" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Advanced{' '}
              <span className="text-green-400">Unix Timestamp</span>{' '}
              Converter
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              The most comprehensive Unix timestamp converter designed for developers and system administrators. Convert Unix epoch time with millisecond precision, handle edge cases, and understand the technical depths of POSIX time.
            </p>
            
            {/* Unix-specific Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-gray-300 mb-8">
              <div className="flex items-center space-x-2">
                <Server className="w-5 h-5 text-blue-400" />
                <span>System Compatible</span>
              </div>
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-purple-400" />
                <span>Database Optimized</span>
              </div>
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-yellow-400" />
                <span>API Ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-red-400" />
                <span>64-bit Support</span>
              </div>
            </div>

            {/* Unix Timeline */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-4xl mx-auto border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Unix Epoch Timeline</h3>
              <div className="flex justify-between items-center text-sm text-gray-300">
                <div className="text-center">
                  <div className="text-green-400 font-mono font-bold">0</div>
                  <div>1970-01-01</div>
                  <div>Unix Epoch</div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-green-400 to-blue-400 mx-4"></div>
                <div className="text-center">
                  <div className="text-blue-400 font-mono font-bold">{Math.floor(Date.now() / 1000)}</div>
                  <div>Now</div>
                  <div>Current Time</div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-400 to-red-400 mx-4"></div>
                <div className="text-center">
                  <div className="text-red-400 font-mono font-bold">2147483647</div>
                  <div>2038-01-19</div>
                  <div>32-bit Limit</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                data-cta="primary"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold flex items-center justify-center transition-colors"
                onClick={() => setActiveSection('converter')}
              >
                Convert Unix Timestamp
                <Terminal className="w-5 h-5 ml-2" />
              </button>
              <button 
                className="border-2 border-green-400/30 hover:border-green-400/50 text-green-400 px-8 py-3 rounded-xl font-semibold transition-colors"
                onClick={() => setActiveSection('technical')}
              >
                Technical Details
              </button>
            </div>
          </motion.div>

          {/* Current Unix Timestamp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <CurrentTimestamp />
          </motion.div>

          {/* Main Converter Section */}
          {activeSection === 'converter' && (
            <motion.div
              id="converter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-16 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Unix Timestamp Converter
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Convert Unix timestamps (epoch time) to human-readable dates and vice versa with full precision support.
                </p>
              </div>
              <TimestampConverter />
            </motion.div>
          )}

          {/* Unix Timestamp Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
            data-section="features"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Unix Timestamp Features & Capabilities
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Comprehensive Unix timestamp handling with professional-grade features for system administration and development.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Clock className="w-8 h-8 text-green-400" />,
                  title: "Precision Time Handling",
                  description: "Support for seconds, milliseconds, and microsecond precision Unix timestamps. Handle edge cases and extreme values with accuracy.",
                  features: ["Millisecond precision", "Microsecond support", "Edge case handling", "Extreme value support"],
                  color: "green"
                },
                {
                  icon: <Server className="w-8 h-8 text-blue-400" />,
                  title: "System Integration",
                  description: "Seamlessly integrate with Linux, macOS, Windows systems. Compatible with system logs, cron jobs, and server monitoring.",
                  features: ["Cross-platform support", "Log file parsing", "Cron job scheduling", "Server monitoring"],
                  color: "blue"
                },
                {
                  icon: <Database className="w-8 h-8 text-purple-400" />,
                  title: "Database Optimization",
                  description: "Efficient storage and retrieval in databases. Support for MySQL, PostgreSQL, MongoDB timestamp formats and indexing.",
                  features: ["Database efficiency", "Index optimization", "Query performance", "Storage savings"],
                  color: "purple"
                },
                {
                  icon: <Code className="w-8 h-8 text-yellow-400" />,
                  title: "Programming Language Support",
                  description: "Code examples and integration guides for 10+ programming languages. API-ready formats and best practices.",
                  features: ["10+ languages", "API integration", "Best practices", "Code examples"],
                  color: "yellow"
                },
                {
                  icon: <Globe className="w-8 h-8 text-pink-400" />,
                  title: "Timezone Independence",
                  description: "Unix timestamps are timezone-agnostic by design. Perfect for global applications and distributed systems.",
                  features: ["Timezone independence", "Global compatibility", "UTC foundation", "Cross-region sync"],
                  color: "pink"
                },
                {
                  icon: <Zap className="w-8 h-8 text-orange-400" />,
                  title: "Performance Optimized",
                  description: "Lightning-fast conversion algorithms optimized for high-throughput applications and real-time processing.",
                  features: ["High throughput", "Real-time processing", "Memory efficient", "CPU optimized"],
                  color: "orange"
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
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((feat, idx) => (
                      <li key={idx} className={`flex items-center text-sm text-${feature.color}-400`}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technical Deep Dive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
            data-section="technical"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Unix Timestamp Technical Specifications
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Deep technical insights into Unix timestamp implementation, standards, and best practices.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Standards & Formats */}
              <div className="space-y-6">
                <div className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-400" />
                    Standards & Specifications
                  </h3>
                  <div className="space-y-4">
                    {[
                      { standard: "POSIX.1-2008", description: "IEEE standard for Unix timestamp", status: "Compliant" },
                      { standard: "ISO 8601", description: "International date/time standard", status: "Supported" },
                      { standard: "RFC 3339", description: "Internet date/time format", status: "Compatible" },
                      { standard: "IEEE 754", description: "Floating-point arithmetic", status: "Precision" }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                        <div>
                          <div className="text-green-400 font-semibold">{item.standard}</div>
                          <div className="text-gray-300 text-sm">{item.description}</div>
                        </div>
                        <div className="text-blue-400 text-sm font-medium">{item.status}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-yellow-400" />
                    Implementation Details
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Epoch start: 1970-01-01T00:00:00Z (UTC)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>32-bit range: -2,147,483,648 to 2,147,483,647</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>64-bit range: ±292 billion years</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Leap seconds: Not included (86400 seconds/day)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Precision: Nanosecond with proper handling</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column - Format Examples & Usage */}
              <div className="space-y-6">
                <div className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Format Examples</h3>
                  <div className="space-y-4">
                    {[
                      { format: "Seconds", digits: "10", example: "1640995200", description: "Standard Unix timestamp" },
                      { format: "Milliseconds", digits: "13", example: "1640995200000", description: "JavaScript/Java format" },
                      { format: "Microseconds", digits: "16", example: "1640995200000000", description: "High precision format" },
                      { format: "Nanoseconds", digits: "19", example: "1640995200000000000", description: "Ultra-high precision" }
                    ].map((item, index) => (
                      <div key={index} className="p-3 bg-white/10 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-blue-400 font-semibold">{item.format}</span>
                          <span className="text-gray-400 text-sm">{item.digits} digits</span>
                        </div>
                        <div className="text-green-300 font-mono text-sm mb-1">{item.example}</div>
                        <div className="text-gray-300 text-xs">{item.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">System Usage</h3>
                  <div className="space-y-3">
                    {[
                      { system: "Linux", usage: "stat, date, touch commands" },
                      { system: "macOS", usage: "System logs, file timestamps" },
                      { system: "Windows", usage: "Unix subsystem, PowerShell" },
                      { system: "Docker", usage: "Container timestamps" },
                      { system: "Git", usage: "Commit timestamps" },
                      { system: "Databases", usage: "Timestamp columns" }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-white/10 rounded-lg">
                        <span className="text-purple-400 font-medium">{item.system}</span>
                        <span className="text-gray-300 text-sm">{item.usage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Batch Processing Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Batch Unix Timestamp Processing
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Process large volumes of Unix timestamps efficiently. Perfect for log analysis, data migration, and system administration tasks.
              </p>
            </div>
            <BatchConverter mode="to-date" />
          </motion.div>

          {/* Code Examples for Unix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Unix Timestamp Code Examples
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Implementation examples in popular programming languages for Unix timestamp handling.
              </p>
            </div>
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
                Unix Timestamp FAQ
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Everything you need to know about Unix timestamps, from basics to advanced concepts.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {unixFAQ.map((faq, index) => (
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
                        <h3 className="text-lg font-semibold text-white group-open:text-green-400" data-faq-question>
                          {faq.question}
                        </h3>
                        <div className="text-white group-open:rotate-180 transition-transform">
                          <ArrowRight className="w-5 h-5 rotate-90" />
                        </div>
                      </summary>
                      <div className="px-6 pb-6">
                        <p className="text-gray-300 leading-relaxed" data-faq-answer>
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