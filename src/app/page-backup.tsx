'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, Smartphone, Code2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { TimestampConverter } from '@/components/TimestampConverter';
import { CurrentTimestamp } from '@/components/CurrentTimestamp';
import FeatureCards from '@/components/FeatureCards';
import CodeExamples from '@/components/CodeExamples';
import FAQ from '@/components/FAQ';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const { isDarkMode } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
        <Header />
        
        <main className="max-w-6xl mx-auto px-4 pb-12">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Modern{' '}
              <span className="text-yellow-300">Timestamp</span>{' '}
              Converter
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Convert Unix timestamps to human-readable dates instantly. 
              The fastest, most accurate timestamp converter built for developers.
            </p>
            
            {/* Feature Highlights */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-blue-100">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-300" />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-yellow-300" />
                <span>Mobile First</span>
              </div>
              <div className="flex items-center space-x-2">
                <Code2 className="w-5 h-5 text-yellow-300" />
                <span>Developer Friendly</span>
              </div>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <TimestampConverter />
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <FeatureCards />
          </motion.div>

          {/* Code Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-12"
          >
            <CodeExamples />
          </motion.div>

          {/* Performance Section - Lightning Fast */}
          <motion.div
            id="performance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-12 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                闪电般快速的转换体验
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                无需服务器请求，全部计算在本地完成。实时验证输入，瞬间显示结果。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl font-bold text-yellow-300 mb-2">小于 1ms</div>
                  <div className="text-blue-100">单次转换时间</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl font-bold text-yellow-300 mb-2">1000+</div>
                  <div className="text-blue-100">批量转换支持</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl font-bold text-yellow-300 mb-2">0KB</div>
                  <div className="text-blue-100">服务器流量消耗</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Timezone Support Section */}
          <motion.div
            id="timezones"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mb-12 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                全球时区支持
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                支持世界上所有时区的转换，自动检测夏令时调整。精确到毫秒级别。
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['UTC', 'GMT+8', 'EST', 'PST', 'JST', 'CET', 'IST', 'MST'].map((tz) => (
                  <div key={tz} className="bg-white/5 rounded-lg p-3">
                    <div className="text-green-300 font-semibold">{tz}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Export Options Section */}
          <motion.div
            id="export"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mb-12 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                多种导出选项
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                支持CSV、JSON、XML多种格式导出，方便数据分析和批量处理。
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {['CSV', 'JSON', 'XML', 'Excel', 'TXT'].map((format) => (
                  <div key={format} className="bg-white/5 rounded-lg px-4 py-2">
                    <span className="text-pink-300 font-semibold">{format}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mb-12"
          >
            <FAQ />
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  );
}