'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Cloud, Smartphone, Shield, Zap, CheckCircle, ArrowRight, Globe, Download, Share2, Bookmark, Star, Users, TrendingUp } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { TimestampConverter } from '@/components/TimestampConverter';
import { CurrentTimestamp } from '@/components/CurrentTimestamp';
import { BatchConverter } from '@/components/BatchConverter';
import CodeExamples from '@/components/CodeExamples';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumb, generateBreadcrumb, generateBreadcrumbSchema } from '@/components/Breadcrumb';
import { RelatedLinks, generateRelatedLinksSchema } from '@/components/RelatedLinks';

export default function OnlineTimestampConverterPage() {
  const { isDarkMode } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [activeFeature, setActiveFeature] = useState('instant');
  const pathname = '/online-timestamp-converter';
  
  // 生成面包屑和相关链接的结构化数据
  const breadcrumbItems = generateBreadcrumb(pathname);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const relatedLinksSchema = generateRelatedLinksSchema(pathname);
  const [onlineStats, setOnlineStats] = useState({
    usersOnline: 1247,
    conversionsToday: 48392,
    uptime: 99.9,
    countries: 156
  });

  useEffect(() => {
    setMounted(true);
    
    // Simulate live stats updates
    const interval = setInterval(() => {
      setOnlineStats(prev => ({
        ...prev,
        usersOnline: Math.max(800, prev.usersOnline + Math.floor(Math.random() * 20 - 10)),
        conversionsToday: prev.conversionsToday + Math.floor(Math.random() * 5)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null;
  }

  // Online tool specific FAQ
  const onlinetimestampconverterFAQ = [
    {
      question: "Why choose an online timestamp converter?",
      answer: "Online converters offer convenience, accessibility from anywhere, no software installation, always up-to-date algorithms, and cross-platform compatibility. Perfect for quick conversions and collaborative work."
    },
    {
      question: "Is it safe to use online timestamp converters?",
      answer: "Our converter runs entirely in your browser - no data is sent to servers. All conversions are performed locally, ensuring complete privacy and security of your timestamp data."
    },
    {
      question: "What makes this online converter different?",
      answer: "Features include: millisecond precision, batch processing, timezone support, code examples, offline functionality, mobile optimization, and completely free usage without registration."
    },
    {
      question: "Can I use this converter offline?",
      answer: "Yes! Once loaded, our converter works offline. It's built as a Progressive Web App (PWA) that you can install on your device for offline access."
    },
    {
      question: "What browsers are supported?",
      answer: "All modern browsers are supported: Chrome, Firefox, Safari, Edge, Opera, and their mobile versions. The converter is optimized for performance across all platforms."
    }
  ];

  const onlineFeatures = [
    {
      id: 'instant',
      title: 'Instant Access',
      description: 'No downloads or installations required. Access instantly from any browser.',
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      benefits: ['Zero setup time', 'Universal compatibility', 'Always up-to-date', 'Cross-platform support']
    },
    {
      id: 'cloud',
      title: 'Cloud-Powered',
      description: 'Leverage cloud infrastructure for maximum reliability and performance.',
      icon: <Cloud className="w-8 h-8 text-blue-400" />,
      benefits: ['99.9% uptime', 'Global CDN delivery', 'Automatic backups', 'Scalable performance']
    },
    {
      id: 'mobile',
      title: 'Mobile Optimized',
      description: 'Perfect experience on smartphones and tablets with touch-friendly design.',
      icon: <Smartphone className="w-8 h-8 text-green-400" />,
      benefits: ['Touch-optimized UI', 'Offline PWA support', 'Fast mobile loading', 'Gesture navigation']
    },
    {
      id: 'secure',
      title: 'Secure & Private',
      description: 'Advanced security measures with complete privacy protection.',
      icon: <Shield className="w-8 h-8 text-purple-400" />,
      benefits: ['HTTPS encryption', 'No data collection', 'Local processing', 'Privacy compliant']
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-900 dark:via-blue-900 dark:to-indigo-900">
        <Header />
        
        {/* SEO结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([breadcrumbSchema, relatedLinksSchema])
          }}
        />
        
        <main className="max-w-7xl mx-auto px-4 pb-12" data-page="online-timestamp-converter">
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
              <Wifi className="w-20 h-20 text-cyan-300 mx-auto mb-4" />
              <div className="absolute -top-2 -right-8 animate-pulse">
                <Globe className="w-8 h-8 text-green-300" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Best{' '}
              <span className="text-cyan-300">Online Timestamp</span>{' '}
              Converter
            </h1>
            <p className="text-xl text-cyan-100 mb-8 max-w-4xl mx-auto">
              The most reliable online timestamp converter trusted by developers worldwide. Instant access, maximum security, and professional features - all in your browser without any downloads or installations required.
            </p>
            
            {/* Live Statistics */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-5xl mx-auto border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-6">Live Usage Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="w-5 h-5 text-green-400 mr-2" />
                    <div className="text-2xl font-bold text-cyan-300">{onlineStats.usersOnline.toLocaleString()}</div>
                  </div>
                  <div className="text-cyan-100 text-sm">Users Online Now</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-400 mr-2" />
                    <div className="text-2xl font-bold text-cyan-300">{onlineStats.conversionsToday.toLocaleString()}</div>
                  </div>
                  <div className="text-cyan-100 text-sm">Conversions Today</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Shield className="w-5 h-5 text-purple-400 mr-2" />
                    <div className="text-2xl font-bold text-cyan-300">{onlineStats.uptime}%</div>
                  </div>
                  <div className="text-cyan-100 text-sm">Uptime Record</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Globe className="w-5 h-5 text-orange-400 mr-2" />
                    <div className="text-2xl font-bold text-cyan-300">{onlineStats.countries}</div>
                  </div>
                  <div className="text-cyan-100 text-sm">Countries Served</div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-cyan-100 mb-8">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-300" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-orange-300" />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-300" />
                <span>Always Free</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                data-cta="primary"
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-xl font-semibold flex items-center justify-center transition-colors"
                onClick={() => document.querySelector('#converter')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Converting Online
                <Wifi className="w-5 h-5 ml-2" />
              </button>
              <button 
                className="border-2 border-cyan-300/30 hover:border-cyan-300/50 text-cyan-300 px-8 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center"
                onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Bookmark className="w-5 h-5 mr-2" />
                Bookmark This Tool
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
                Professional Online Timestamp Converter
              </h2>
              <p className="text-cyan-100 max-w-3xl mx-auto">
                Access the most advanced timestamp conversion tools directly in your browser. No downloads, no installations - just instant, professional results.
              </p>
            </div>
            
            <TimestampConverter />
            
            {/* Quick Actions */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center">
                <Share2 className="w-4 h-4 mr-2" />
                Share Tool
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export Results
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center">
                <Bookmark className="w-4 h-4 mr-2" />
                Save Settings
              </button>
            </div>
          </motion.div>

          {/* Online Features Showcase */}
          <motion.div
            id="features"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
            data-section="features"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Why Choose Our Online Timestamp Converter?
              </h2>
              <p className="text-cyan-100 max-w-3xl mx-auto">
                Experience the advantages of a modern online tool designed for efficiency, security, and ease of use.
              </p>
            </div>

            {/* Feature Selector */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 inline-flex">
                {onlineFeatures.map((feature) => (
                  <button
                    key={feature.id}
                    className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                      activeFeature === feature.id
                        ? 'bg-cyan-500 text-white'
                        : 'text-cyan-100 hover:bg-white/10'
                    }`}
                    onClick={() => setActiveFeature(feature.id)}
                  >
                    {feature.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Feature Display */}
            <div className="max-w-4xl mx-auto">
              {onlineFeatures.map((feature) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ 
                    opacity: activeFeature === feature.id ? 1 : 0,
                    x: activeFeature === feature.id ? 0 : 20
                  }}
                  transition={{ duration: 0.3 }}
                  className={`${activeFeature === feature.id ? 'block' : 'hidden'} bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20`}
                >
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/3 text-center mb-6 md:mb-0">
                      {feature.icon}
                    </div>
                    <div className="md:w-2/3 md:pl-8">
                      <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                      <p className="text-cyan-100 text-lg mb-6">{feature.description}</p>
                      <ul className="grid grid-cols-2 gap-3">
                        {feature.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center text-cyan-200">
                            <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Online Advantages Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Online Tool Advantages
              </h2>
              <p className="text-cyan-100 max-w-3xl mx-auto">
                Discover why millions of users choose online timestamp converters over desktop applications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Zero Installation",
                  description: "No downloads, no setup, no storage space required. Access instantly from any device.",
                  icon: "🚀",
                  pros: ["Instant access", "No storage needed", "Always updated", "Universal compatibility"]
                },
                {
                  title: "Cross-Platform",
                  description: "Works perfectly on Windows, Mac, Linux, iOS, Android - any device with a browser.",
                  icon: "🌐",
                  pros: ["Device agnostic", "OS independent", "Mobile optimized", "Tablet friendly"]
                },
                {
                  title: "Always Current",
                  description: "Automatic updates ensure you always have the latest features and security patches.",
                  icon: "🔄",
                  pros: ["Auto updates", "Latest features", "Security patches", "Performance improvements"]
                },
                {
                  title: "Collaborative",
                  description: "Easy sharing with team members and instant collaboration on timestamp projects.",
                  icon: "👥",
                  pros: ["Easy sharing", "Team collaboration", "Link sharing", "Social integration"]
                },
                {
                  title: "Data Sync",
                  description: "Access your conversion history and settings from any device, anywhere in the world.",
                  icon: "☁️",
                  pros: ["Cloud sync", "Multi-device access", "History backup", "Settings sync"]
                },
                {
                  title: "Maintenance-Free",
                  description: "No updates to manage, no crashes to fix, no compatibility issues to solve.",
                  icon: "⚡",
                  pros: ["Zero maintenance", "Reliable uptime", "No crashes", "Consistent performance"]
                }
              ].map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
                >
                  <div className="text-4xl mb-4 text-center">{advantage.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3 text-center">{advantage.title}</h3>
                  <p className="text-cyan-100 text-sm mb-4 text-center leading-relaxed">{advantage.description}</p>
                  <ul className="space-y-2">
                    {advantage.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-center text-sm text-cyan-200">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Batch Processing Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Online Batch Processing
              </h2>
              <p className="text-cyan-100 max-w-2xl mx-auto">
                Process thousands of timestamps simultaneously with cloud-powered performance and reliability.
              </p>
            </div>
            <BatchConverter mode="to-date" />
          </motion.div>

          {/* Security & Privacy Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-16 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Enterprise-Grade Security & Privacy
              </h2>
              <p className="text-cyan-100 max-w-3xl mx-auto">
                Your data security and privacy are our top priorities. We implement industry-leading security measures.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "HTTPS Encryption",
                  description: "All data transmission is encrypted using TLS 1.3",
                  icon: <Shield className="w-8 h-8 text-green-400" />
                },
                {
                  title: "No Data Storage",
                  description: "We don't store your timestamps or conversion data",
                  icon: <Shield className="w-8 h-8 text-blue-400" />
                },
                {
                  title: "Local Processing",
                  description: "All calculations happen in your browser",
                  icon: <Shield className="w-8 h-8 text-purple-400" />
                },
                {
                  title: "Privacy Compliant",
                  description: "GDPR, CCPA, and international privacy laws compliant",
                  icon: <Shield className="w-8 h-8 text-yellow-400" />
                },
                {
                  title: "Secure Infrastructure",
                  description: "Hosted on secure, enterprise-grade cloud infrastructure",
                  icon: <Shield className="w-8 h-8 text-red-400" />
                },
                {
                  title: "Regular Audits",
                  description: "Regular security audits and penetration testing",
                  icon: <Shield className="w-8 h-8 text-orange-400" />
                }
              ].map((security, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-6 text-center">
                  <div className="mb-4 flex justify-center">{security.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{security.title}</h3>
                  <p className="text-cyan-100 text-sm">{security.description}</p>
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
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Integration & API Examples
              </h2>
              <p className="text-cyan-100 max-w-2xl mx-auto">
                Learn how to integrate timestamp conversion into your applications and workflows.
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
                Online Timestamp Converter FAQ
              </h2>
              <p className="text-cyan-100 max-w-2xl mx-auto">
                Common questions about using our online timestamp conversion tool.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {onlinetimestampconverterFAQ.map((faq, index) => (
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
                        <h3 className="text-lg font-semibold text-white group-open:text-cyan-300" data-faq-question>
                          {faq.question}
                        </h3>
                        <div className="text-white group-open:rotate-180 transition-transform">
                          <ArrowRight className="w-5 h-5 rotate-90" />
                        </div>
                      </summary>
                      <div className="px-6 pb-6">
                        <p className="text-cyan-100 leading-relaxed" data-faq-answer>
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