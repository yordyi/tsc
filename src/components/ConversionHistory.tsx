'use client';

import { motion } from 'framer-motion';
import { History, Trash2, Copy } from 'lucide-react';

export function ConversionHistory() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Conversion History
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Your recent timestamp conversions are saved locally
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
          title="Clear All History"
        >
          <Trash2 className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="space-y-3">
        {/* Empty State */}
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <History className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">No conversion history yet</p>
          <p className="text-sm">Your timestamp conversions will appear here</p>
        </div>
      </div>
    </div>
  );
}