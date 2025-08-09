// 时间戳转换相关类型定义

export type TimestampUnit = 'seconds' | 'milliseconds' | 'microseconds';

export interface TimestampConversion {
  original: number;
  unit: TimestampUnit;
  humanReadable: {
    utc: string;
    local: string;
    iso8601: string;
    relative: string;
  };
  formatted: {
    date: string;
    time: string;
    dateTime: string;
    timestamp: number;
  };
}

export interface ConversionHistory {
  id: string;
  timestamp: number;
  unit: TimestampUnit;
  convertedAt: Date;
  result: TimestampConversion;
}

export interface BatchConversionItem {
  id: string;
  input: string;
  original: number;
  unit: TimestampUnit;
  result?: TimestampConversion;
  error?: string;
}

export interface BatchConversionResult {
  total: number;
  successful: number;
  failed: number;
  items: BatchConversionItem[];
}

export interface TimezoneInfo {
  name: string;
  abbreviation: string;
  offset: string;
  offsetMinutes: number;
}

export interface CodeExample {
  language: string;
  label: string;
  icon: string;
  code: string;
  description: string;
}

// 应用状态类型
export interface AppState {
  // 当前转换
  currentInput: string;
  currentUnit: TimestampUnit;
  currentResult: TimestampConversion | null;
  
  // 历史记录
  history: ConversionHistory[];
  
  // 批量转换
  batchItems: BatchConversionItem[];
  batchResult: BatchConversionResult | null;
  
  // UI状态
  isDarkMode: boolean;
  isLoading: boolean;
  activeTab: 'single' | 'batch' | 'code';
  
  // 设置
  defaultTimezone: string;
  showRelativeTime: boolean;
  maxHistoryItems: number;
}

// 表单验证类型
export interface TimestampFormData {
  input: string;
  unit: TimestampUnit;
  timezone?: string;
}

// API响应类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 统计信息类型
export interface ConversionStats {
  totalConversions: number;
  todayConversions: number;
  popularUnits: { unit: TimestampUnit; count: number }[];
  averageConversionsPerDay: number;
}