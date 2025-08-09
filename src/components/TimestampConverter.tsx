'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, RotateCcw, History, Layers } from 'lucide-react';
import { useAppStore, useCurrentConversion } from '@/lib/store';
import { TimestampUnit } from '@/types/timestamp';
import { SingleConverter } from './SingleConverter';
import { BatchConverter } from './BatchConverter';
import { ConversionHistory } from './ConversionHistory';

export function TimestampConverter() {
  const { activeTab, setActiveTab } = useAppStore();
  const [conversionMode, setConversionMode] = useState<'to-date' | 'to-timestamp'>('to-date');

  const tabs = [
    {
      id: 'single' as const,
      label: 'Single Conversion',
      icon: RotateCcw,
      description: 'Convert individual timestamps'
    },
    {
      id: 'batch' as const,
      label: 'Batch Conversion',
      icon: Layers,
      description: 'Convert multiple timestamps at once'
    },
    {
      id: 'code' as const,
      label: 'History',
      icon: History,
      description: 'View conversion history'
    }
  ];

  const modeToggleVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 transition-colors duration-300">
      {/* Conversion Mode Toggle */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setConversionMode('to-date')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            conversionMode === 'to-date'
              ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          <ArrowRight className="w-4 h-4 mr-2 inline" />
          Timestamp to Date
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setConversionMode('to-timestamp')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            conversionMode === 'to-timestamp'
              ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          <ArrowLeft className="w-4 h-4 mr-2 inline" />
          Date to Timestamp
        </motion.button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-1 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 relative ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
              }`}
            >
              <Icon className="w-4 h-4 mr-2 inline" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.icon.name}</span>
              
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white dark:bg-gray-700 rounded-lg shadow-sm -z-10"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'single' && (
            <SingleConverter mode={conversionMode} />
          )}
          
          {activeTab === 'batch' && (
            <BatchConverter mode={conversionMode} />
          )}
          
          {activeTab === 'code' && (
            <ConversionHistory />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}