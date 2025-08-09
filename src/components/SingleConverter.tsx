'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Calendar, Clock, Zap, ChevronDown } from 'lucide-react';
import { useCurrentConversion } from '@/lib/store';
import { TimestampUnit } from '@/types/timestamp';
import { validateTimestamp, parseAndConvertDate } from '@/lib/timestamp-utils';

interface SingleConverterProps {
  mode: 'to-date' | 'to-timestamp';
}

export function SingleConverter({ mode }: SingleConverterProps) {
  const { input, unit, result, isLoading, setInput, setUnit, convert, clear } = useCurrentConversion();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string>('');

  // 预设时间戳按钮
  const presets = [
    { label: 'Now', getValue: () => Math.floor(Date.now() / (unit === 'seconds' ? 1000 : unit === 'milliseconds' ? 1 : 0.001)) },
    { label: 'Yesterday', getValue: () => Math.floor((Date.now() - 24 * 60 * 60 * 1000) / (unit === 'seconds' ? 1000 : unit === 'milliseconds' ? 1 : 0.001)) },
    { label: 'Last Week', getValue: () => Math.floor((Date.now() - 7 * 24 * 60 * 60 * 1000) / (unit === 'seconds' ? 1000 : unit === 'milliseconds' ? 1 : 0.001)) },
  ];

  // 实时转换
  useEffect(() => {
    if (input.trim()) {
      const timeoutId = setTimeout(() => {
        if (mode === 'to-date') {
          if (validateTimestamp(input, unit)) {
            setInputError('');
            convert();
          } else {
            setInputError('Invalid timestamp format');
          }
        } else {
          try {
            const timestamp = parseAndConvertDate(input, unit);
            setInput(timestamp.toString());
            convert();
            setInputError('');
          } catch {
            setInputError('Invalid date format');
          }
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setInputError('');
    }
  }, [input, unit, mode, convert, setInput]);

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handlePresetClick = (preset: typeof presets[0]) => {
    const value = preset.getValue();
    setInput(value.toString());
  };

  const CopyButton = ({ text, field }: { text: string; field: string }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => handleCopy(text, field)}
      className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg shadow hover:shadow-md transition-all duration-200 group"
    >
      {copiedField === field ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200" />
      )}
    </motion.button>
  );

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            {mode === 'to-date' ? 'Enter Unix Timestamp' : 'Enter Date/Time'}
          </label>
          
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'to-date' ? '1703556234' : '2023-12-25 22:30:34'}
              className={`w-full px-4 py-4 text-lg border-2 rounded-xl focus:ring-0 transition-all duration-200 font-mono dark:bg-gray-800 dark:text-white ${
                inputError 
                  ? 'border-red-300 dark:border-red-600 focus:border-red-500 dark:focus:border-red-400' 
                  : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'
              }`}
            />
            
            {mode === 'to-date' && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as TimestampUnit)}
                  className="text-sm border-none bg-transparent text-gray-500 dark:text-gray-400 focus:ring-0 dark:bg-gray-800"
                >
                  <option value="seconds">Seconds</option>
                  <option value="milliseconds">Milliseconds</option>
                  <option value="microseconds">Microseconds</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            )}
          </div>
          
          {inputError && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-600 dark:text-red-400"
            >
              {inputError}
            </motion.p>
          )}

          {/* Preset Buttons */}
          {mode === 'to-date' && (
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <motion.button
                  key={preset.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePresetClick(preset)}
                  className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-200"
                >
                  {preset.label}
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            {mode === 'to-date' ? 'Human Readable Date' : 'Unix Timestamp'}
          </label>
          
          {result ? (
            <div className="space-y-3">
              {mode === 'to-date' ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <p className="font-semibold text-gray-800 dark:text-gray-200">UTC Time</p>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{result.formatted.date}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{result.formatted.time}</p>
                    </div>
                    <CopyButton text={result.humanReadable.utc} field="utc" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <p className="font-semibold text-gray-800 dark:text-gray-200">Local Time</p>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 break-all">{result.humanReadable.local}</p>
                    </div>
                    <CopyButton text={result.humanReadable.local} field="local" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">ISO 8601</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-mono break-all">{result.humanReadable.iso8601}</p>
                    </div>
                    <CopyButton text={result.humanReadable.iso8601} field="iso8601" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Relative Time</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">{result.humanReadable.relative}</p>
                    </div>
                    <CopyButton text={result.humanReadable.relative} field="relative" />
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Unix Timestamp</p>
                    <p className="text-lg text-gray-600 dark:text-gray-400 font-mono">{result.formatted.timestamp}</p>
                  </div>
                  <CopyButton text={result.formatted.timestamp.toString()} field="timestamp" />
                </motion.div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-400 dark:text-gray-600">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Enter a {mode === 'to-date' ? 'timestamp' : 'date'} to see the conversion</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={convert}
          disabled={!input.trim() || !!inputError || isLoading}
          className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Zap className="w-4 h-4" />
              <span>Convert Now</span>
            </>
          )}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={clear}
          className="flex-1 sm:flex-none py-3 px-6 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
        >
          Clear
        </motion.button>
      </div>
    </div>
  );
}