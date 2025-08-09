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
import { Breadcrumb, generateBreadcrumb, generateBreadcrumbSchema } from '@/components/Breadcrumb';
import { RelatedLinks, generateRelatedLinksSchema } from '@/components/RelatedLinks';

export default function UnixTimestampConverterPage() {
  const { isDarkMode } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('converter');
  const pathname = '/unix-timestamp-converter';
  
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

  // Unix-specific FAQ data
  const unixtimestampconverterFAQ = [
    {
      question: "What is a Unix timestamp?",
      answer: "A Unix timestamp is the number of seconds since January 1, 1970, 00:00:00 UTC. This is the standard POSIX time representation, widely used in computer systems and programming to represent time."
    },
    {
      question: "Why does Unix timestamp start from 1970?",
      answer: "January 1, 1970, is called the 'Unix Epoch.' This date was chosen because it was close to the development time of Unix operating system and near the beginning of the computer era, making it convenient for calculations and storage."
    },
    {
      question: "What are the advantages of Unix timestamps?",
      answer: "Main advantages include: 1) Strong cross-platform compatibility; 2) High storage efficiency (only one integer needed); 3) Simple calculations; 4) Timezone-independent; 5) Easy to compare and sort; 6) Widespread system support."
    },
    {
      question: "What precisions does Unix timestamp support?",
      answer: "Our converter supports multiple precisions: seconds (10 digits), milliseconds (13 digits), microseconds (16 digits). Different systems and programming languages may use different precisions."
    },
    {
      question: "What is the Year 2038 problem?",
      answer: "The Year 2038 problem refers to 32-bit systems being unable to represent times after January 19, 2038, 03:14:07. Modern 64-bit systems have solved this problem and can represent time ranges of billions of years."
    },
    {
      question: "How do Unix timestamps handle leap seconds?",
      answer: "Unix timestamps do not include leap seconds; they assume every day has 86,400 seconds. When leap seconds occur, Unix time 'repeats' or 'skips' a second to maintain synchronization with UTC."
    },
    {
      question: "What do negative Unix timestamps represent?",
      answer: "Negative Unix timestamps represent times before January 1, 1970. For example, -86400 represents December 31, 1969, 00:00:00 UTC. Our converter fully supports negative timestamps."
    },
    {
      question: "How are Unix timestamps stored in databases?",
      answer: "In databases, Unix timestamps are usually stored as INTEGER or BIGINT types. This saves more space than DATETIME types and is more efficient for cross-timezone queries."
    },
    {
      question: "How to handle Unix timestamps in programming?",
      answer: "Most programming languages have built-in timestamp handling functions. JavaScript uses Date objects, Python uses datetime modules, Java uses Instant classes. We provide code examples for multiple languages."
    },
    {
      question: "What is the maximum value of Unix timestamp?",
      answer: "The maximum value for 32-bit systems is 2147483647 (year 2038). 64-bit systems can theoretically represent up to year 292,277,026,596. Our converter supports the full 64-bit range."
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 dark:from-gray-900 dark:via-gray-800 dark:to-black">
        <Header />
        
        {/* SEO结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([breadcrumbSchema, relatedLinksSchema])
          }}
        />
        
        <main className="max-w-7xl mx-auto px-4 pb-12" data-page="unix-timestamp-converter">
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
                {unixtimestampconverterFAQ.map((faq, index) => (
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
          
          {/* 相关工具推荐 */}
          <RelatedLinks currentPage={pathname} className="mb-16" />
        </main>

        <Footer />
      </div>
    </div>
  );
}