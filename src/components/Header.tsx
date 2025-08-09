'use client';

import { motion } from 'framer-motion';
import { Clock, Sun, Moon, Github, Menu, X } from 'lucide-react';
import { useAppSettings } from '@/lib/store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const { isDarkMode, toggleDarkMode } = useAppSettings();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Main navigation links configuration
  const navigationLinks = [
    { name: 'Home', href: '/', keywords: 'timestamp converter' },
    { name: 'Timestamp Converter', href: '/timestamp-converter', keywords: 'timestamp converter tool' },
    { name: 'Unix Timestamp', href: '/unix-timestamp-converter', keywords: 'unix timestamp converter' },
    { name: 'Epoch Converter', href: '/epoch-converter', keywords: 'epoch time converter' },
    { name: 'Timestamp to Date', href: '/timestamp-to-date', keywords: 'timestamp to date converter' },
    { name: 'Online Converter', href: '/online-timestamp-converter', keywords: 'online timestamp converter' }
  ];
  
  // Check if current page is active
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href;
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full px-4 py-6"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
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
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <nav className="flex items-center space-x-1">
            {navigationLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active 
                        ? 'bg-white/20 text-white border border-white/30' 
                        : 'text-blue-100 hover:text-white hover:bg-white/10'
                    }`}
                    title={link.keywords}
                  >
                    {link.name}
                  </motion.div>
                </Link>
              );
            })}
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
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="lg:hidden max-w-7xl mx-auto mt-4"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-4 shadow-xl">
            <nav className="flex flex-col space-y-2">
              {navigationLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        active 
                          ? 'bg-white/20 text-white border border-white/30' 
                          : 'text-blue-100 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {link.name}
                    </motion.div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </motion.div>
      )}

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