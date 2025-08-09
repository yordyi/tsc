'use client';

import { motion } from 'framer-motion';
import { Clock, Sun, Moon, Github } from 'lucide-react';
import { useAppSettings } from '@/lib/store';

export function Header() {
  const { isDarkMode, toggleDarkMode } = useAppSettings();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full px-4 py-6"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-white/30">
            <Clock className="w-5 h-5 text-yellow-300" />
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">TimestampConverter</h1>
            <p className="text-blue-200 text-xs">2024 Edition</p>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#converter"
              className="text-blue-100 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Converter
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#batch"
              className="text-blue-100 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Batch Tool
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#examples"
              className="text-blue-100 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Code Examples
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#api"
              className="text-blue-100 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              API Docs
            </motion.a>
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </motion.button>

          {/* GitHub Link */}
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://github.com/your-username/timestamp-converter"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
            title="View on GitHub"
          >
            <Github className="w-5 h-5" />
          </motion.a>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white"
          >
            <div className="space-y-1">
              <div className="w-5 h-0.5 bg-white"></div>
              <div className="w-5 h-0.5 bg-white"></div>
              <div className="w-5 h-0.5 bg-white"></div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Performance Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-7xl mx-auto mt-4"
      >
        <div className="flex items-center justify-center space-x-2 text-xs text-blue-200">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>High Performance • Lightning Fast • 100% Accurate</span>
        </div>
      </motion.div>
    </motion.nav>
  );
}