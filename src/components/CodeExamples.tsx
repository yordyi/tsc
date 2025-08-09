'use client';

import { motion } from 'framer-motion';
import { Code2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const languages = [
  { id: 'javascript', name: 'JavaScript', icon: '🟨' },
  { id: 'python', name: 'Python', icon: '🐍' },
  { id: 'php', name: 'PHP', icon: '🐘' },
  { id: 'java', name: 'Java', icon: '☕' },
];

const codeExamples = {
  javascript: `// Convert Unix timestamp to Date
const timestamp = 1703556234;
const date = new Date(timestamp * 1000);

console.log(date.toISOString());
// Output: "2023-12-25T22:30:34.000Z"

// Convert Date to Unix timestamp
const now = new Date();
const unixTimestamp = Math.floor(now.getTime() / 1000);
console.log(unixTimestamp);`,
  
  python: `import datetime

# Convert Unix timestamp to datetime
timestamp = 1703556234
dt = datetime.datetime.fromtimestamp(timestamp)

print(dt.strftime('%Y-%m-%d %H:%M:%S'))
print(dt.isoformat())

# Convert datetime to Unix timestamp
now = datetime.datetime.now()
unix_timestamp = int(now.timestamp())
print(unix_timestamp)`,

  php: `<?php
// Convert Unix timestamp to DateTime
$timestamp = 1703556234;
$date = new DateTime("@$timestamp");

echo $date->format('Y-m-d H:i:s') . "\\n";
echo $date->format('c') . "\\n";

// Convert DateTime to Unix timestamp
$now = new DateTime();
$unix_timestamp = $now->getTimestamp();
echo $unix_timestamp;
?>`,

  java: `import java.time.*;

// Convert Unix timestamp to LocalDateTime
long timestamp = 1703556234L;
LocalDateTime dateTime = LocalDateTime.ofEpochSecond(
    timestamp, 0, ZoneOffset.UTC);

System.out.println(dateTime.toString());

// Convert LocalDateTime to Unix timestamp
LocalDateTime now = LocalDateTime.now();
long unixTimestamp = now.toEpochSecond(ZoneOffset.UTC);
System.out.println(unixTimestamp);`
};

export function CodeExamples() {
  const [activeLanguage, setActiveLanguage] = useState('javascript');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeExamples[activeLanguage as keyof typeof codeExamples]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  return (
    <section id="examples" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 rounded-3xl p-8 border border-gray-700"
      >
        <div className="flex items-center space-x-3 mb-6">
          <Code2 className="w-6 h-6 text-green-400" />
          <h2 className="text-2xl font-bold text-white">Code Examples</h2>
        </div>
        
        {/* Language Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {languages.map((lang) => (
            <motion.button
              key={lang.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveLanguage(lang.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeLanguage === lang.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <span className="mr-2">{lang.icon}</span>
              {lang.name}
            </motion.button>
          ))}
        </div>

        {/* Code Block */}
        <div className="relative bg-black rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="text-sm">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-sm">Copy</span>
                </>
              )}
            </motion.button>
          </div>
          
          <pre className="text-green-400 font-mono text-sm overflow-x-auto">
            <code>{codeExamples[activeLanguage as keyof typeof codeExamples]}</code>
          </pre>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Copy-paste ready code examples for popular programming languages
          </p>
        </div>
      </motion.div>
    </section>
  );
}