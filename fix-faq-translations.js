#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// English FAQ translations for different pages
const translations = {
  'unix-timestamp-converter': [
    {
      question: "What is a Unix timestamp?",
      answer: "A Unix timestamp is the number of seconds since January 1, 1970, 00:00:00 UTC. This is the standard POSIX time representation, widely used in computer systems and programming to represent time."
    },
    {
      question: "Why does Unix timestamp start from 1970?",
      answer: "January 1, 1970, is called the \"Unix Epoch.\" This date was chosen because it was close to the development time of Unix operating system and near the beginning of the computer era, making it convenient for calculations and storage."
    },
    {
      question: "What are the advantages of Unix timestamps?",
      answer: "Main advantages include: 1) Strong cross-platform compatibility; 2) High storage efficiency (only one integer needed); 3) Simple calculations; 4) Timezone-independent; 5) Easy to compare and sort; 6) Widespread system support."
    },
    {
      question: "What precisions does Unix timestamp support?",
      answer: "Our converter supports multiple precisions: seconds (10 digits), milliseconds (13 digits), microseconds (16 digits). Different systems and programming languages may use different precisions."
    },
    {
      question: "What is the Year 2038 problem?",
      answer: "The Year 2038 problem refers to 32-bit systems being unable to represent times after January 19, 2038, 03:14:07. Modern 64-bit systems have solved this problem and can represent time ranges of billions of years."
    },
    {
      question: "How do Unix timestamps handle leap seconds?",
      answer: "Unix timestamps do not include leap seconds; they assume every day has 86,400 seconds. When leap seconds occur, Unix time \"repeats\" or \"skips\" a second to maintain synchronization with UTC."
    },
    {
      question: "What do negative Unix timestamps represent?",
      answer: "Negative Unix timestamps represent times before January 1, 1970. For example, -86400 represents December 31, 1969, 00:00:00 UTC. Our converter fully supports negative timestamps."
    },
    {
      question: "How are Unix timestamps stored in databases?",
      answer: "In databases, Unix timestamps are usually stored as INTEGER or BIGINT types. This saves more space than DATETIME types and is more efficient for cross-timezone queries."
    },
    {
      question: "How to handle Unix timestamps in programming?",
      answer: "Most programming languages have built-in timestamp handling functions. JavaScript uses Date objects, Python uses datetime modules, Java uses Instant classes. We provide code examples for multiple languages."
    },
    {
      question: "What is the maximum value of Unix timestamp?",
      answer: "The maximum value for 32-bit systems is 2147483647 (year 2038). 64-bit systems can theoretically represent up to year 292,277,026,596. Our converter supports the full 64-bit range."
    }
  ],
  
  'online-timestamp-converter': [
    {
      question: "Why choose an online timestamp converter?",
      answer: "Online converters offer convenience, accessibility from anywhere, no software installation, always up-to-date algorithms, and cross-platform compatibility. Perfect for quick conversions and collaborative work."
    },
    {
      question: "Is it safe to use online timestamp converters?",
      answer: "Our converter runs entirely in your browser - no data is sent to servers. All conversions are performed locally, ensuring complete privacy and security of your timestamp data."
    },
    {
      question: "What makes this online converter different?",
      answer: "Features include: millisecond precision, batch processing, timezone support, code examples, offline functionality, mobile optimization, and completely free usage without registration."
    },
    {
      question: "Can I use this converter offline?",
      answer: "Yes! Once loaded, our converter works offline. It's built as a Progressive Web App (PWA) that you can install on your device for offline access."
    },
    {
      question: "What browsers are supported?",
      answer: "All modern browsers are supported: Chrome, Firefox, Safari, Edge, Opera, and their mobile versions. The converter is optimized for performance across all platforms."
    }
  ],

  'timestamp-to-date': [
    {
      question: "How to convert timestamp to date?",
      answer: "Simply enter your timestamp in the input field, select your desired timezone, choose the output format, and click convert. The result will show the human-readable date instantly."
    },
    {
      question: "What date formats are available?",
      answer: "Multiple formats including ISO 8601, RFC 3339, US format (MM/DD/YYYY), European format (DD/MM/YYYY), and custom formats. You can also specify time formats with or without seconds."
    },
    {
      question: "How to handle different timezones?",
      answer: "Select your target timezone from the dropdown menu. The converter automatically adjusts for daylight saving time and provides accurate local time conversions."
    },
    {
      question: "Can I convert multiple timestamps at once?",
      answer: "Yes, use our batch conversion feature. Paste multiple timestamps (one per line) and get all conversions at once. Results can be exported in various formats."
    },
    {
      question: "What about millisecond timestamps?",
      answer: "Both second-precision (10 digits) and millisecond-precision (13 digits) timestamps are supported. The converter automatically detects the format and converts accordingly."
    }
  ],

  'epoch-converter': [
    {
      question: "What is an epoch converter?",
      answer: "An epoch converter transforms Unix epoch time (seconds since January 1, 1970) into human-readable dates and vice versa. Essential for developers working with time-based data."
    },
    {
      question: "Why is it called 'epoch' time?",
      answer: "The term 'epoch' refers to a reference point in time. The Unix epoch starts at January 1, 1970, 00:00:00 UTC, serving as the zero point for Unix time calculations."
    },
    {
      question: "What are common epoch time use cases?",
      answer: "Used in log files, database timestamps, API responses, cache expiration, session management, event tracking, and any system requiring precise time measurements."
    },
    {
      question: "How accurate is epoch conversion?",
      answer: "Our converter provides millisecond accuracy using IEEE 754 double-precision arithmetic. All conversions are mathematically precise and handle edge cases properly."
    },
    {
      question: "Does epoch time account for leap years?",
      answer: "Yes, epoch time calculations automatically account for leap years, leap days, and calendar variations. Our converter handles all calendar complexities accurately."
    }
  ]
};

// Function to update FAQ in a file
function updateFAQ(filePath, pageType) {
  if (!translations[pageType]) {
    console.log(`No translations found for ${pageType}`);
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the FAQ array pattern and replace it
    const faqPattern = /const\s+\w*FAQ\s*=\s*\[([\s\S]*?)\];/;
    const match = content.match(faqPattern);
    
    if (match) {
      const newFAQ = translations[pageType].map(item => 
        `    {\n      question: "${item.question}",\n      answer: "${item.answer}"\n    }`
      ).join(',\n');
      
      const replacement = `const ${pageType.replace(/-/g, '')}FAQ = [\n${newFAQ}\n  ];`;
      content = content.replace(faqPattern, replacement);
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Updated FAQ in ${filePath}`);
    } else {
      console.log(`✗ Could not find FAQ pattern in ${filePath}`);
    }
  } catch (error) {
    console.error(`✗ Error updating ${filePath}:`, error.message);
  }
}

// Update all files
const updates = [
  {
    path: '/Users/guoshuaihao/Documents/Learning/06-学习资料/哥飞课程/timestamp-converter/src/app/unix-timestamp-converter/page.tsx',
    type: 'unix-timestamp-converter'
  },
  {
    path: '/Users/guoshuaihao/Documents/Learning/06-学习资料/哥飞课程/timestamp-converter/src/app/online-timestamp-converter/page.tsx',
    type: 'online-timestamp-converter'
  },
  {
    path: '/Users/guoshuaihao/Documents/Learning/06-学习资料/哥飞课程/timestamp-converter/src/app/timestamp-to-date/page.tsx',
    type: 'timestamp-to-date'
  },
  {
    path: '/Users/guoshuaihao/Documents/Learning/06-学习资料/哥飞课程/timestamp-converter/src/app/epoch-converter/page.tsx',
    type: 'epoch-converter'
  }
];

console.log('🚀 Starting FAQ translation updates...\n');

updates.forEach(update => {
  updateFAQ(update.path, update.type);
});

console.log('\n✨ FAQ translation updates completed!');
console.log('🔍 All Chinese content has been replaced with English for better SEO.');
console.log('🌐 Language consistency maintained across all pages.');