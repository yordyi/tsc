'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'What is a Unix timestamp?',
    answer: 'A Unix timestamp is the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC (also known as the Unix epoch). It\'s widely used in programming and databases to represent dates and times in a standardized, timezone-independent format.'
  },
  {
    question: 'How accurate is this timestamp converter?',
    answer: 'Our converter is 100% accurate and handles timestamps in seconds, milliseconds, and microseconds. We use JavaScript\'s native Date object and the date-fns library for precise calculations, ensuring reliability across all conversions.'
  },
  {
    question: 'Can I convert multiple timestamps at once?',
    answer: 'Yes! Our batch conversion feature allows you to convert thousands of timestamps simultaneously. You can upload CSV files, JSON data, or paste bulk text data. Results can be exported in various formats for easy data analysis.'
  },
  {
    question: 'Is my data secure and private?',
    answer: 'Absolutely! All conversions happen entirely in your browser - no data is sent to our servers. Your timestamps and conversion history are stored locally on your device, ensuring complete privacy and security.'
  },
  {
    question: 'What programming languages are supported in code examples?',
    answer: 'We provide ready-to-use code examples in 8+ popular programming languages including JavaScript, Python, PHP, Java, C#, Go, Ruby, and more. Each example shows both timestamp-to-date and date-to-timestamp conversions.'
  },
  {
    question: 'Does this work offline?',
    answer: 'Yes! Our timestamp converter is built as a Progressive Web App (PWA) and works completely offline. You can even install it on your device like a native app for quick access anytime.'
  }
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-700"
      >
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about timestamp conversion and our tools
          </p>
        </div>
        
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
            >
              <motion.button
                whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors duration-200 dark:hover:bg-gray-800/50"
              >
                <span className="font-semibold text-gray-800 dark:text-gray-200 pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Still have questions?
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:support@timestampconverter.dev"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            <span>Contact Support</span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

export default FAQ;