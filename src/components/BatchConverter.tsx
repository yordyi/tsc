'use client';

import { motion } from 'framer-motion';
import { Upload, Download, Trash2 } from 'lucide-react';

interface BatchConverterProps {
  mode: 'to-date' | 'to-timestamp';
}

export function BatchConverter({ mode }: BatchConverterProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Batch Timestamp Converter
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Convert multiple timestamps at once. Upload CSV/JSON files or paste bulk data.
        </p>
      </div>

      {/* Upload Area */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors duration-200"
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          Upload File or Paste Data
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Supports CSV, JSON, and plain text formats
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Choose File
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            Paste Text
          </motion.button>
        </div>
      </motion.div>

      {/* Results Area */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Conversion Results
          </h4>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
              title="Download Results"
            >
              <Download className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200"
              title="Clear Results"
            >
              <Trash2 className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
        
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <Upload className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Upload data or paste timestamps to see conversion results</p>
        </div>
      </div>
    </div>
  );
}