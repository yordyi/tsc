'use client';

import { motion } from 'framer-motion';
import { Clock, Heart, Code2, Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { name: 'Timestamp Converter', href: '#converter' },
      { name: 'Batch Converter', href: '#batch' },
      { name: 'API Documentation', href: '#api' },
      { name: 'Code Examples', href: '#examples' },
    ],
    resources: [
      { name: 'What is Unix Timestamp?', href: '#learn' },
      { name: 'Programming Guides', href: '#guides' },
      { name: 'Best Practices', href: '#practices' },
      { name: 'Troubleshooting', href: '#help' },
    ],
    company: [
      { name: 'About', href: '#about' },
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Contact', href: '#contact' },
    ]
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/your-username/timestamp-converter' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/timestampconverter' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@timestampconverter.dev' },
  ];

  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-3 mb-4"
            >
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                <Clock className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <h3 className="text-white text-xl font-bold">TimestampConverter</h3>
                <p className="text-blue-200 text-sm">Professional Edition 2024</p>
              </div>
            </motion.div>
            
            <p className="text-blue-100 mb-6 leading-relaxed">
              The most advanced timestamp converter built for developers. 
              Fast, accurate, and completely free. Convert Unix timestamps 
              to human-readable dates with ease.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-blue-200 hover:text-white hover:bg-white/20 transition-all duration-200 border border-white/20"
                    title={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link.name}>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href={link.href}
                    className="text-blue-200 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href={link.href}
                    className="text-blue-200 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.name}>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href={link.href}
                    className="text-blue-200 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Performance Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white mb-1">99.9%</div>
              <div className="text-xs text-blue-200">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">&lt;100ms</div>
              <div className="text-xs text-blue-200">Response Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">1M+</div>
              <div className="text-xs text-blue-200">Conversions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">100%</div>
              <div className="text-xs text-blue-200">Privacy</div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-blue-200">
              <span>© {currentYear} TimestampConverter.</span>
              <span>•</span>
              <span>Built with Next.js, TypeScript & Tailwind CSS</span>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 text-sm text-blue-200"
            >
              <span>Made with</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 10, 0] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatDelay: 3 
                }}
              >
                <Heart className="w-4 h-4 text-red-400 fill-current" />
              </motion.div>
              <span>by developers, for developers</span>
            </motion.div>
          </div>
        </div>

        {/* Tech Stack Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
            <Code2 className="w-4 h-4 text-green-400" />
            <span className="text-xs text-blue-200">
              Powered by Modern Web Technologies
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}