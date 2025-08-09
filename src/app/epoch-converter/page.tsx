'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History, Atom, Microscope, Globe2, Calculator, Cpu, Clock, Database, Code, BookOpen, Zap, CheckCircle, ArrowRight, Calendar, Timer } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { TimestampConverter } from '@/components/TimestampConverter';
import { CurrentTimestamp } from '@/components/CurrentTimestamp';
import { BatchConverter } from '@/components/BatchConverter';
import { CodeExamples } from '@/components/CodeExamples';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function EpochConverterPage() {
  const { isDarkMode } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [epochStats, setEpochStats] = useState({
    currentEpoch: 0,
    daysSinceEpoch: 0,
    yearsSinceEpoch: 0,
    secondsInDay: 86400,
    millisecondsInDay: 86400000
  });

  useEffect(() => {
    setMounted(true);
    
    const updateEpochStats = () => {
      const now = Date.now();
      const epochSeconds = Math.floor(now / 1000);
      const daysSince = Math.floor(epochSeconds / 86400);
      const yearsSince = parseFloat((daysSince / 365.25).toFixed(2));
      
      setEpochStats({
        currentEpoch: epochSeconds,
        daysSinceEpoch: daysSince,
        yearsSinceEpoch: yearsSince,
        secondsInDay: 86400,
        millisecondsInDay: 86400000
      });
    };

    updateEpochStats();
    const interval = setInterval(updateEpochStats, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null;
  }

  // Epoch-specific FAQ data
  const epochFAQ = [
    {
      question: "什么是Epoch时间？",
      answer: "Epoch时间是指从特定起始点（通常是1970年1月1日00:00:00 UTC）开始计算的时间表示方法。Unix Epoch是最常见的epoch，但不同系统可能使用不同的epoch起始点。"
    },
    {
      question: "Unix Epoch为什么选择1970年1月1日？",
      answer: "1970年1月1日被选为Unix Epoch是因为：1）接近Unix系统开发时间；2）是一个整数年份；3）避免了历史上的复杂日历调整；4）为负数时间戳提供了合理的历史范围；5）计算简单且易于实现。"
    },
    {
      question: "除了Unix Epoch还有其他Epoch吗？",
      answer: "是的，存在多种Epoch：Windows文件时间使用1601年1月1日；.NET DateTime使用0001年1月1日；Java使用1970年1月1日但以毫秒为单位；GPS时间使用1980年1月6日。我们的转换器支持多种Epoch格式。"
    },
    {
      question: "Epoch时间的精度有哪些？",
      answer: "Epoch时间支持多种精度：秒级（最常见）、毫秒级（JavaScript、Java）、微秒级（高精度应用）、纳秒级（科学计算）、100纳秒级（Windows FILETIME）。不同精度适用于不同的应用场景。"
    },
    {
      question: "Epoch转换如何处理时区？",
      answer: "Epoch时间本身是UTC时间，不包含时区信息。这是它的优势之一——全球统一。当需要显示本地时间时，需要在Epoch时间基础上应用时区偏移。我们的转换器自动处理时区转换。"
    },
    {
      question: "负数Epoch时间如何理解？",
      answer: "负数Epoch时间表示epoch起始点之前的时间。例如，Unix时间戳-86400表示1969年12月31日00:00:00 UTC。这对于处理历史数据和向后兼容性很重要。"
    },
    {
      question: "Epoch时间在编程中的最佳实践？",
      answer: "最佳实践包括：1）始终使用UTC进行存储和计算；2）仅在显示时转换为本地时区；3）选择合适的精度避免溢出；4）处理边界情况和异常值；5）使用标准库而非手动计算；6）考虑闰秒的影响。"
    },
    {
      question: "如何选择合适的Epoch精度？",
      answer: "选择原则：日志记录通常用秒级；用户界面用毫秒级；金融交易用微秒或纳秒级；科学计算根据需求选择最高精度；数据库存储考虑空间和性能平衡；API设计考虑兼容性。"
    },
    {
      question: "Epoch时间转换的常见错误？",
      answer: "常见错误：1）秒和毫秒单位混淆；2）忽略时区处理；3）32位系统溢出问题；4）闰秒处理不当；5）日期边界计算错误；6）浮点精度丢失；7）历史日期处理错误。我们的转换器避免了这些问题。"
    },
    {
      question: "Epoch转换器的准确性如何保证？",
      answer: "我们通过以下方式保证准确性：1）使用IEEE 754标准的双精度计算；2）参考权威时间标准；3）处理所有边界情况；4）支持完整的64位范围；5）严格测试各种输入；6）实时验证算法正确性。"
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 dark:from-black dark:via-purple-950 dark:to-indigo-950">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 pb-12" data-page="epoch-converter">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 pt-8"
          >
            <div className="mb-6 relative">
              <History className="w-20 h-20 text-purple-400 mx-auto mb-4" />
              <div className="absolute -top-2 -right-8">
                <Atom className="w-8 h-8 text-blue-400 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Scientific{' '}
              <span className="text-purple-400">Epoch Converter</span>{' '}
              Tool
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              The most sophisticated epoch time converter engineered for precision and scientific accuracy. Master Unix epoch, understand time origins, and convert with mathematical precision across different epoch standards and time systems.
            </p>
            
            {/* Epoch Statistics */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-5xl mx-auto border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-6">Live Epoch Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-purple-400 mb-1" id="current-epoch">
                    {epochStats.currentEpoch.toLocaleString()}
                  </div>
                  <div className="text-gray-300 text-sm">Current Epoch</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {epochStats.daysSinceEpoch.toLocaleString()}
                  </div>
                  <div className="text-gray-300 text-sm">Days Since Epoch</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {epochStats.yearsSinceEpoch}
                  </div>
                  <div className="text-gray-300 text-sm">Years Since Epoch</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-orange-400 mb-1">
                    {epochStats.secondsInDay.toLocaleString()}
                  </div>
                  <div className="text-gray-300 text-sm">Seconds Per Day</div>
                </div>
              </div>
            </div>

            {/* Scientific Precision Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-gray-300 mb-8">
              <div className="flex items-center space-x-2">
                <Microscope className="w-5 h-5 text-purple-400" />
                <span>Nanosecond Precision</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-blue-400" />
                <span>IEEE 754 Standard</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe2 className="w-5 h-5 text-green-400" />
                <span>Universal Compatibility</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-orange-400" />
                <span>Scientific Documentation</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                data-cta="primary"
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold flex items-center justify-center transition-colors"
                onClick={() => document.querySelector('#converter')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Convert Epoch Time
                <History className="w-5 h-5 ml-2" />
              </button>
              <button 
                className="border-2 border-purple-400/30 hover:border-purple-400/50 text-purple-400 px-8 py-3 rounded-xl font-semibold transition-colors"
                onClick={() => document.querySelector('#scientific')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Scientific Details
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
                Precision Epoch Converter
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Convert epoch timestamps with scientific precision. Support for multiple epoch systems, precision levels, and mathematical accuracy validation.
              </p>
            </div>
            <TimestampConverter />
          </motion.div>

          {/* Epoch Systems Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Epoch Systems & Standards
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Understanding different epoch systems used across computing platforms and scientific applications.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-4">Major Epoch Systems</h3>
                <div className="space-y-4">
                  {[
                    { 
                      system: "Unix Epoch", 
                      date: "1970-01-01 00:00:00 UTC", 
                      value: "0",
                      usage: "Unix, Linux, macOS, most programming languages",
                      precision: "Seconds/Milliseconds"
                    },
                    { 
                      system: "Windows FILETIME", 
                      date: "1601-01-01 00:00:00 UTC", 
                      value: "0",
                      usage: "Windows file systems, .NET Framework",
                      precision: "100-nanosecond intervals"
                    },
                    { 
                      system: "NTP Timestamp", 
                      date: "1900-01-01 00:00:00 UTC", 
                      value: "0",
                      usage: "Network Time Protocol",
                      precision: "Seconds with fraction"
                    },
                    { 
                      system: "GPS Epoch", 
                      date: "1980-01-06 00:00:00 UTC", 
                      value: "0",
                      usage: "Global Positioning System",
                      precision: "Seconds/Weeks"
                    },
                    { 
                      system: "J2000.0 Epoch", 
                      date: "2000-01-01 12:00:00 TT", 
                      value: "0.0",
                      usage: "Astronomical calculations",
                      precision: "Julian days"
                    }
                  ].map((system, index) => (
                    <div key={index} className="bg-white/10 rounded-xl p-4 hover:bg-white/15 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-semibold text-purple-400">{system.system}</h4>
                        <span className="text-xs text-gray-400">{system.precision}</span>
                      </div>
                      <div className="text-green-300 font-mono text-sm mb-2">{system.date}</div>
                      <div className="text-gray-300 text-sm mb-2">{system.usage}</div>
                      <div className="text-blue-400 text-xs">Start Value: {system.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-4">Precision Levels</h3>
                <div className="space-y-4">
                  {[
                    { level: "Seconds", digits: "10", range: "1970-2038 (32-bit)", accuracy: "±1 second" },
                    { level: "Milliseconds", digits: "13", range: "1970-2287", accuracy: "±1 millisecond" },
                    { level: "Microseconds", digits: "16", range: "1970-2255", accuracy: "±1 microsecond" },
                    { level: "Nanoseconds", digits: "19", range: "1970-2262", accuracy: "±1 nanosecond" },
                    { level: "100-nanoseconds", digits: "Variable", range: "1601-30828", accuracy: "±100 nanoseconds" }
                  ].map((precision, index) => (
                    <div key={index} className="bg-white/10 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-lg font-semibold text-blue-400">{precision.level}</h4>
                        <span className="text-xs bg-purple-500/30 px-2 py-1 rounded">{precision.digits} digits</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Range: </span>
                          <span className="text-green-300">{precision.range}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Accuracy: </span>
                          <span className="text-orange-300">{precision.accuracy}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Mathematical Foundation</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• IEEE 754 double-precision floating-point</li>
                    <li>• 64-bit integer arithmetic for large ranges</li>
                    <li>• Leap year calculation algorithms</li>
                    <li>• Time zone offset calculations</li>
                    <li>• Daylight saving time adjustments</li>
                    <li>• Calendar system conversions</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scientific Applications */}
          <motion.div
            id="scientific"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-16"
            data-section="features"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Scientific & Technical Applications
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Epoch converters in research, engineering, and high-precision applications across various scientific domains.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Microscope className="w-8 h-8 text-purple-400" />,
                  title: "Scientific Research",
                  description: "Precise time measurement for experiments, data logging, astronomical observations, and physics research requiring nanosecond accuracy.",
                  applications: ["Particle physics experiments", "Astronomical observations", "Laboratory data logging", "Research synchronization"],
                  precision: "Nanosecond"
                },
                {
                  icon: <Database className="w-8 h-8 text-blue-400" />,
                  title: "Big Data & Analytics",
                  description: "Time-series data analysis, event correlation, and temporal database operations requiring consistent time representation across systems.",
                  applications: ["Time-series databases", "Event stream processing", "Data warehouse ETL", "Analytics pipelines"],
                  precision: "Millisecond"
                },
                {
                  icon: <Globe2 className="w-8 h-8 text-green-400" />,
                  title: "Distributed Systems",
                  description: "Synchronization across global systems, consensus algorithms, distributed transactions, and microservices coordination.",
                  applications: ["Distributed consensus", "Transaction ordering", "Log synchronization", "Service coordination"],
                  precision: "Microsecond"
                },
                {
                  icon: <Cpu className="w-8 h-8 text-red-400" />,
                  title: "High-Frequency Trading",
                  description: "Ultra-low latency trading systems, market data timestamps, order matching, and financial transaction processing.",
                  applications: ["Order timestamps", "Market data feeds", "Latency measurement", "Trade settlement"],
                  precision: "Nanosecond"
                }
              ].map((application, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
                >
                  <div className="mb-4">
                    {application.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {application.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {application.description}
                  </p>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">Required Precision</span>
                      <span className="text-sm bg-purple-500/30 px-2 py-1 rounded">{application.precision}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {application.applications.map((app, idx) => (
                      <li key={idx} className="flex items-center text-sm text-blue-300">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {app}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Batch Processing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                High-Volume Epoch Processing
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Process thousands of epoch timestamps simultaneously with scientific accuracy and performance optimization.
              </p>
            </div>
            <BatchConverter mode="to-date" />
          </motion.div>

          {/* Advanced Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-16 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
            data-section="technical"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Advanced Epoch Features
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Professional-grade features for precise epoch time handling and conversion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Precision Control",
                  items: ["Nanosecond accuracy", "IEEE 754 compliance", "Rounding mode selection", "Error bounds calculation"]
                },
                {
                  title: "Format Support",
                  items: ["Multiple epoch systems", "Custom precision levels", "Scientific notation", "Binary representations"]
                },
                {
                  title: "Validation & Testing",
                  items: ["Range validation", "Overflow detection", "Accuracy verification", "Performance benchmarks"]
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">{feature.title}</h3>
                  <ul className="space-y-3">
                    {feature.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 mr-2 text-purple-400" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Code Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Epoch Programming Examples
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Implementation examples for epoch handling in various programming languages and frameworks.
              </p>
            </div>
            <CodeExamples />
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mb-12"
            data-section="faq"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Epoch Converter FAQ
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Comprehensive answers about epoch time systems, conversion accuracy, and technical implementation details.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {epochFAQ.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                    data-faq-item
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-6 hover:bg-white/5 rounded-2xl transition-colors">
                        <h3 className="text-lg font-semibold text-white group-open:text-purple-400" data-faq-question>
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