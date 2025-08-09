import { format, formatDistanceToNow, isValid } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { 
  TimestampUnit, 
  TimestampConversion, 
  BatchConversionItem, 
  BatchConversionResult,
  CodeExample 
} from '@/types/timestamp';

/**
 * 验证时间戳输入是否有效
 */
export function validateTimestamp(input: string, unit: TimestampUnit): boolean {
  const num = parseFloat(input);
  
  if (isNaN(num) || num < 0) {
    return false;
  }
  
  // 检查时间戳范围的合理性
  switch (unit) {
    case 'seconds':
      // Unix时间戳范围：1970-01-01 到 2038-01-19 (32位) 或更大范围 (64位)
      return num >= 0 && num <= 4102444800; // 2100年
    case 'milliseconds':
      return num >= 0 && num <= 4102444800000; // 2100年 * 1000
    case 'microseconds':
      return num >= 0 && num <= 4102444800000000; // 2100年 * 1000000
    default:
      return false;
  }
}

/**
 * 将时间戳转换为Date对象
 */
export function timestampToDate(timestamp: number, unit: TimestampUnit): Date {
  let milliseconds: number;
  
  switch (unit) {
    case 'seconds':
      milliseconds = timestamp * 1000;
      break;
    case 'milliseconds':
      milliseconds = timestamp;
      break;
    case 'microseconds':
      milliseconds = timestamp / 1000;
      break;
    default:
      throw new Error(`不支持的时间单位: ${unit}`);
  }
  
  const date = new Date(milliseconds);
  
  if (!isValid(date)) {
    throw new Error('无效的时间戳');
  }
  
  return date;
}

/**
 * 将Date对象转换为时间戳
 */
export function dateToTimestamp(date: Date, unit: TimestampUnit): number {
  const milliseconds = date.getTime();
  
  switch (unit) {
    case 'seconds':
      return Math.floor(milliseconds / 1000);
    case 'milliseconds':
      return milliseconds;
    case 'microseconds':
      return milliseconds * 1000;
    default:
      throw new Error(`不支持的时间单位: ${unit}`);
  }
}

/**
 * 核心转换函数
 */
export function convertTimestamp(
  timestamp: number, 
  unit: TimestampUnit,
  timezone: string = 'UTC'
): TimestampConversion {
  try {
    const date = timestampToDate(timestamp, unit);
    
    // 生成各种格式的时间字符串
    const utcString = format(date, 'EEEE, MMMM do, yyyy \'at\' HH:mm:ss \'UTC\'');
    const localString = formatInTimeZone(
      date, 
      Intl.DateTimeFormat().resolvedOptions().timeZone,
      'EEEE, MMMM do, yyyy \'at\' HH:mm:ss zzz'
    );
    const iso8601 = date.toISOString();
    const relative = formatDistanceToNow(date, { addSuffix: true });
    
    return {
      original: timestamp,
      unit,
      humanReadable: {
        utc: utcString,
        local: localString,
        iso8601,
        relative
      },
      formatted: {
        date: format(date, 'yyyy-MM-dd'),
        time: format(date, 'HH:mm:ss'),
        dateTime: format(date, 'yyyy-MM-dd HH:mm:ss'),
        timestamp: Math.floor(date.getTime() / 1000)
      }
    };
  } catch (error) {
    throw new Error(`转换失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

/**
 * 批量转换时间戳
 */
export function batchConvertTimestamps(
  inputs: string[],
  unit: TimestampUnit
): BatchConversionResult {
  const items: BatchConversionItem[] = inputs.map((input, index) => {
    const id = `batch-${Date.now()}-${index}`;
    const trimmedInput = input.trim();
    
    if (!trimmedInput) {
      return {
        id,
        input: trimmedInput,
        original: 0,
        unit,
        error: '输入为空'
      };
    }
    
    const timestamp = parseFloat(trimmedInput);
    
    if (!validateTimestamp(trimmedInput, unit)) {
      return {
        id,
        input: trimmedInput,
        original: timestamp,
        unit,
        error: '无效的时间戳'
      };
    }
    
    try {
      const result = convertTimestamp(timestamp, unit);
      return {
        id,
        input: trimmedInput,
        original: timestamp,
        unit,
        result
      };
    } catch (error) {
      return {
        id,
        input: trimmedInput,
        original: timestamp,
        unit,
        error: error instanceof Error ? error.message : '转换失败'
      };
    }
  });
  
  const successful = items.filter(item => item.result && !item.error).length;
  const failed = items.length - successful;
  
  return {
    total: items.length,
    successful,
    failed,
    items
  };
}

/**
 * 获取当前时间戳
 */
export function getCurrentTimestamp(unit: TimestampUnit): number {
  const now = new Date();
  return dateToTimestamp(now, unit);
}

/**
 * 解析日期字符串并转换为时间戳
 */
export function parseAndConvertDate(
  dateString: string, 
  unit: TimestampUnit,
  timezone?: string
): number {
  let date: Date;
  
  // 尝试多种日期格式
  if (dateString.includes('T') || dateString.includes('Z')) {
    // ISO 8601 格式
    date = new Date(dateString);
  } else if (dateString.includes('/') || dateString.includes('-')) {
    // 常见日期格式
    date = new Date(dateString);
  } else {
    // 尝试作为时间戳解析
    const timestamp = parseFloat(dateString);
    if (!isNaN(timestamp)) {
      date = timestampToDate(timestamp, unit);
    } else {
      throw new Error('无法解析日期字符串');
    }
  }
  
  if (!isValid(date)) {
    throw new Error('无效的日期');
  }
  
  return dateToTimestamp(date, unit);
}

/**
 * 格式化文件大小（用于批量处理）
 */
export function formatFileSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * 生成代码示例
 */
export function getCodeExamples(timestamp: number, unit: TimestampUnit): CodeExample[] {
  const examples: CodeExample[] = [
    {
      language: 'javascript',
      label: 'JavaScript',
      icon: '🟨',
      description: 'JavaScript Date 对象处理',
      code: `// 时间戳转换为Date对象
const timestamp = ${timestamp};
const date = new Date(${unit === 'seconds' ? 'timestamp * 1000' : 'timestamp'});

console.log(date.toISOString());
console.log(date.toLocaleString());

// Date对象转换为时间戳
const now = new Date();
const ${unit} = ${unit === 'seconds' ? 'Math.floor(now.getTime() / 1000)' : 'now.getTime()'};
console.log(${unit});`
    },
    {
      language: 'python',
      label: 'Python',
      icon: '🐍',
      description: 'Python datetime 模块',
      code: `import datetime

# 时间戳转换为datetime对象
timestamp = ${timestamp}
${unit === 'seconds' ? 
  'dt = datetime.datetime.fromtimestamp(timestamp)' : 
  'dt = datetime.datetime.fromtimestamp(timestamp / 1000)'
}

print(dt.strftime('%Y-%m-%d %H:%M:%S'))
print(dt.isoformat())

# datetime对象转换为时间戳
now = datetime.datetime.now()
${unit}_timestamp = ${unit === 'seconds' ? 'int(now.timestamp())' : 'int(now.timestamp() * 1000)'}
print(${unit}_timestamp)`
    },
    {
      language: 'php',
      label: 'PHP',
      icon: '🐘',
      description: 'PHP DateTime 类',
      code: `<?php
// 时间戳转换为DateTime对象
$timestamp = ${timestamp};
${unit === 'seconds' ? 
  '$date = new DateTime("@$timestamp");' : 
  '$date = DateTime::createFromFormat("U.u", number_format($timestamp / 1000, 3, ".", ""));'
}

echo $date->format('Y-m-d H:i:s') . "\\n";
echo $date->format('c') . "\\n";

// DateTime对象转换为时间戳
$now = new DateTime();
$${unit}_timestamp = ${unit === 'seconds' ? '$now->getTimestamp()' : 'round($now->getTimestamp() * 1000)'};
echo $${unit}_timestamp;
?>`
    },
    {
      language: 'java',
      label: 'Java',
      icon: '☕',
      description: 'Java 8+ LocalDateTime',
      code: `import java.time.*;

// 时间戳转换为LocalDateTime
long timestamp = ${timestamp}L;
${unit === 'seconds' ? 
  'LocalDateTime dateTime = LocalDateTime.ofEpochSecond(timestamp, 0, ZoneOffset.UTC);' : 
  'LocalDateTime dateTime = LocalDateTime.ofEpochSecond(timestamp / 1000, 0, ZoneOffset.UTC);'
}

System.out.println(dateTime.toString());
System.out.println(dateTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));

// LocalDateTime转换为时间戳
LocalDateTime now = LocalDateTime.now();
long ${unit}Timestamp = ${unit === 'seconds' ? 
  'now.toEpochSecond(ZoneOffset.UTC)' : 
  'now.toEpochSecond(ZoneOffset.UTC) * 1000'
};
System.out.println(${unit}Timestamp);`
    }
  ];
  
  return examples;
}

/**
 * 导出CSV格式的批量转换结果
 */
export function exportToCsv(items: BatchConversionItem[]): string {
  const headers = ['输入', '时间戳', '单位', 'UTC时间', '本地时间', 'ISO8601', '错误'];
  const rows = items.map(item => [
    item.input,
    item.original.toString(),
    item.unit,
    item.result?.humanReadable.utc || '',
    item.result?.humanReadable.local || '',
    item.result?.humanReadable.iso8601 || '',
    item.error || ''
  ]);
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field.replace(/"/g, '""')}"`).join(','))
    .join('\\n');
    
  return csvContent;
}

/**
 * 导出JSON格式的批量转换结果
 */
export function exportToJson(items: BatchConversionItem[]): string {
  return JSON.stringify(items, null, 2);
}