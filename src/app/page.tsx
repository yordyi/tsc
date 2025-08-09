'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, Smartphone, Code2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { TimestampConverter } from '@/components/TimestampConverter';
import { CurrentTimestamp } from '@/components/CurrentTimestamp';
import { FeatureCards } from '@/components/FeatureCards';
import { CodeExamples } from '@/components/CodeExamples';
import { FAQ } from '@/components/FAQ';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const { isDarkMode } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // 避免hydration不匹配
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

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
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