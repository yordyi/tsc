'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Copy, Check } from 'lucide-react';
import { format } from 'date-fns';
import { TimestampUnit } from '@/types/timestamp';
import { getCurrentTimestamp } from '@/lib/timestamp-utils';

export function CurrentTimestamp() {
  const [currentTime, setCurrentTime] = useState({
    seconds: 0,
    milliseconds: 0,
    microseconds: 0,
    formatted: ''
  });
  const [copiedUnit, setCopiedUnit] = useState<TimestampUnit | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const seconds = Math.floor(now.getTime() / 1000);
      const milliseconds = now.getTime();
      const microseconds = now.getTime() * 1000;
      const formatted = format(now, 'EEEE, MMMM do, yyyy \'at\' HH:mm:ss \'UTC\'');

      setCurrentTime({
        seconds,
        milliseconds,
        microseconds,
        formatted
      });
    };

    // 立即更新一次
    updateTime();

    // 每秒更新
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCopy = async (value: number, unit: TimestampUnit) => {
    try {
      await navigator.clipboard.writeText(value.toString());
      setCopiedUnit(unit);
      setTimeout(() => setCopiedUnit(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const timestampVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.02 }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [1, 0, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
    >
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-3 mb-3">
          <div className="relative">
            <Clock className="w-6 h-6 text-yellow-300" />
            <motion.div
              variants={pulseVariants}
              animate="animate"
              className="absolute inset-0 w-6 h-6 bg-green-400 rounded-full -z-10"
            />
          </div>
          <h3 className="text-lg font-semibold text-white">Current Unix Timestamp</h3>
        </div>
        
        <motion.div
          key={currentTime.seconds} // 重新渲染动画
          initial={{ scale: 0.95, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-3xl md:text-4xl font-mono font-bold text-white mb-2"
        >
          {currentTime.seconds.toLocaleString()}
        </motion.div>
        
        <p className="text-sm text-blue-100">
          {currentTime.formatted}
        </p>
      </div>

      {/* Timestamp Units Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Seconds */}
        <motion.div
          variants={timestampVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10 cursor-pointer group"
          onClick={() => handleCopy(currentTime.seconds, 'seconds')}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-blue-200">Seconds</h4>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              {copiedUnit === 'seconds' ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-blue-300" />
              )}
            </motion.div>
          </div>
          <div className="text-xl font-mono font-bold text-white">
            {currentTime.seconds.toLocaleString()}
          </div>
          <div className="text-xs text-blue-200 mt-1">
            Standard Unix timestamp
          </div>
        </motion.div>

        {/* Milliseconds */}
        <motion.div
          variants={timestampVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          transition={{ delay: 0.1 }}
          className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10 cursor-pointer group"
          onClick={() => handleCopy(currentTime.milliseconds, 'milliseconds')}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-blue-200">Milliseconds</h4>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              {copiedUnit === 'milliseconds' ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-blue-300" />
              )}
            </motion.div>
          </div>
          <div className="text-xl font-mono font-bold text-white">
            {currentTime.milliseconds.toLocaleString()}
          </div>
          <div className="text-xs text-blue-200 mt-1">
            JavaScript format
          </div>
        </motion.div>

        {/* Microseconds */}
        <motion.div
          variants={timestampVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          transition={{ delay: 0.2 }}
          className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10 cursor-pointer group"
          onClick={() => handleCopy(currentTime.microseconds, 'microseconds')}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-blue-200">Microseconds</h4>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              {copiedUnit === 'microseconds' ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-blue-300" />
              )}
            </motion.div>
          </div>
          <div className="text-xl font-mono font-bold text-white">
            {currentTime.microseconds.toLocaleString()}
          </div>
          <div className="text-xs text-blue-200 mt-1">
            High precision format
          </div>
        </motion.div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-blue-200">
          Click any timestamp to copy to clipboard • Updates every second
        </p>
      </div>
    </motion.div>
  );
}