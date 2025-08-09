'use client';

import { motion } from 'framer-motion';
import { Layers, Globe, Code2, Zap, History, Download } from 'lucide-react';
import { useAppStore } from '@/lib/store';

interface Feature {
  icon: any;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  textColor: string;
  link: string;
  action?: 'scroll' | 'tab';
  tabTarget?: 'single' | 'batch' | 'code';
}

const features: Feature[] = [
  {
    icon: Layers,
    title: 'Batch Conversion',
    description: 'Convert thousands of timestamps at once. Upload CSV, JSON files or paste bulk data.',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-600 dark:text-blue-400',
    link: '#batch',
    action: 'tab',
    tabTarget: 'batch'
  },
  {
    icon: Globe,
    title: 'Timezone Support',
    description: 'Convert to any timezone worldwide. Automatic daylight saving time detection.',
    color: 'from-green-500 to-green-600', 
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    textColor: 'text-green-600 dark:text-green-400',
    link: '#timezones',
    action: 'scroll'
  },
  {
    icon: Code2,
    title: 'Code Examples',
    description: 'Get code snippets in 8+ programming languages. Copy-paste ready examples.',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30', 
    textColor: 'text-purple-600 dark:text-purple-400',
    link: '#examples',
    action: 'scroll'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Instant conversions with real-time validation. No server requests needed.',
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    textColor: 'text-yellow-600 dark:text-yellow-400',
    link: '#performance',
    action: 'scroll'
  },
  {
    icon: History,
    title: 'Conversion History',
    description: 'Keep track of your recent conversions. Export and import conversion data.',
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    link: '#history',
    action: 'tab',
    tabTarget: 'code'
  },
  {
    icon: Download,
    title: 'Export Options',
    description: 'Export results in CSV, JSON, or XML format. Perfect for data analysis.',
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-100 dark:bg-pink-900/30',
    textColor: 'text-pink-600 dark:text-pink-400',
    link: '#export',
    action: 'scroll'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { 
    y: -8, 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 20 
    } 
  }
};

function FeatureCards() {
  const { setActiveTab } = useAppStore();

  const handleCardClick = (feature: Feature) => {
    if (feature.action === 'tab' && feature.tabTarget) {
      // 对于需要切换Tab的功能
      setActiveTab(feature.tabTarget);
      // 滚动到转换器区域
      setTimeout(() => {
        const converterElement = document.querySelector('#timestamp-converter');
        converterElement?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (feature.action === 'scroll') {
      // 对于需要滚动到特定区域的功能
      const element = document.querySelector(feature.link);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          Powerful Features for Developers
        </h2>
        <p className="text-blue-100 max-w-2xl mx-auto">
          Everything you need for timestamp conversion and more. Built with modern web technologies for maximum performance.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group cursor-pointer"
              onClick={() => handleCardClick(feature)}
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:shadow-md transition-shadow duration-300`}
              >
                <Icon className={`w-6 h-6 ${feature.textColor}`} />
              </motion.div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                {feature.description}
              </p>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${feature.textColor} font-medium text-sm hover:underline transition-all duration-200 flex items-center space-x-1 group-hover:translate-x-1`}
              >
                <span>Learn More</span>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </motion.button>

              {/* Hover Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 pointer-events-none`}></div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-12"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-xl font-medium hover:bg-white/20 transition-all duration-200"
        >
          View All Features
        </motion.button>
      </motion.div>
    </section>
  );
}

export default FeatureCards;