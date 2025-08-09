import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { 
  AppState, 
  TimestampUnit, 
  TimestampConversion, 
  ConversionHistory,
  BatchConversionItem,
  BatchConversionResult
} from '@/types/timestamp';
import { 
  convertTimestamp, 
  batchConvertTimestamps, 
  getCurrentTimestamp 
} from './timestamp-utils';

interface AppActions {
  // 单个转换操作
  setInput: (input: string) => void;
  setUnit: (unit: TimestampUnit) => void;
  convertSingle: () => void;
  clearResult: () => void;
  
  // 批量转换操作
  setBatchItems: (items: BatchConversionItem[]) => void;
  addBatchItem: (input: string) => void;
  removeBatchItem: (id: string) => void;
  convertBatch: () => void;
  clearBatch: () => void;
  
  // 历史记录操作
  addToHistory: (conversion: TimestampConversion, unit: TimestampUnit) => void;
  clearHistory: () => void;
  removeFromHistory: (id: string) => void;
  
  // UI状态操作
  setActiveTab: (tab: 'single' | 'batch' | 'code') => void;
  toggleDarkMode: () => void;
  setLoading: (loading: boolean) => void;
  
  // 设置操作
  setDefaultTimezone: (timezone: string) => void;
  setShowRelativeTime: (show: boolean) => void;
  setMaxHistoryItems: (max: number) => void;
  
  // 工具方法
  getCurrentTimestampForUnit: () => number;
  getStats: () => {
    totalConversions: number;
    todayConversions: number;
    popularUnits: { unit: TimestampUnit; count: number }[];
  };
}

// 生成唯一ID
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set, get) => ({
      // 初始状态
      currentInput: '',
      currentUnit: 'seconds',
      currentResult: null,
      history: [],
      batchItems: [],
      batchResult: null,
      isDarkMode: false,
      isLoading: false,
      activeTab: 'single',
      defaultTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      showRelativeTime: true,
      maxHistoryItems: 50,
      
      // 单个转换操作
      setInput: (input: string) => {
        set({ currentInput: input });
      },
      
      setUnit: (unit: TimestampUnit) => {
        set({ currentUnit: unit });
      },
      
      convertSingle: () => {
        const { currentInput, currentUnit } = get();
        
        if (!currentInput.trim()) {
          set({ currentResult: null });
          return;
        }
        
        set({ isLoading: true });
        
        try {
          const timestamp = parseFloat(currentInput);
          const result = convertTimestamp(timestamp, currentUnit);
          
          set({ 
            currentResult: result, 
            isLoading: false 
          });
          
          // 添加到历史记录
          get().addToHistory(result, currentUnit);
        } catch (error) {
          console.error('转换失败:', error);
          set({ 
            currentResult: null, 
            isLoading: false 
          });
        }
      },
      
      clearResult: () => {
        set({ 
          currentInput: '', 
          currentResult: null 
        });
      },
      
      // 批量转换操作
      setBatchItems: (items: BatchConversionItem[]) => {
        set({ batchItems: items });
      },
      
      addBatchItem: (input: string) => {
        const { batchItems, currentUnit } = get();
        const newItem: BatchConversionItem = {
          id: generateId(),
          input,
          original: parseFloat(input) || 0,
          unit: currentUnit
        };
        
        set({ 
          batchItems: [...batchItems, newItem] 
        });
      },
      
      removeBatchItem: (id: string) => {
        const { batchItems } = get();
        set({ 
          batchItems: batchItems.filter(item => item.id !== id) 
        });
      },
      
      convertBatch: () => {
        const { batchItems, currentUnit } = get();
        
        if (batchItems.length === 0) {
          return;
        }
        
        set({ isLoading: true });
        
        try {
          const inputs = batchItems.map(item => item.input);
          const result = batchConvertTimestamps(inputs, currentUnit);
          
          set({ 
            batchResult: result,
            isLoading: false 
          });
          
          // 将成功的转换添加到历史记录
          result.items.forEach(item => {
            if (item.result) {
              get().addToHistory(item.result, currentUnit);
            }
          });
        } catch (error) {
          console.error('批量转换失败:', error);
          set({ 
            batchResult: null,
            isLoading: false 
          });
        }
      },
      
      clearBatch: () => {
        set({ 
          batchItems: [], 
          batchResult: null 
        });
      },
      
      // 历史记录操作
      addToHistory: (conversion: TimestampConversion, unit: TimestampUnit) => {
        const { history, maxHistoryItems } = get();
        
        const historyItem: ConversionHistory = {
          id: generateId(),
          timestamp: conversion.original,
          unit,
          convertedAt: new Date(),
          result: conversion
        };
        
        const newHistory = [historyItem, ...history].slice(0, maxHistoryItems);
        
        set({ history: newHistory });
      },
      
      clearHistory: () => {
        set({ history: [] });
      },
      
      removeFromHistory: (id: string) => {
        const { history } = get();
        set({ 
          history: history.filter(item => item.id !== id) 
        });
      },
      
      // UI状态操作
      setActiveTab: (tab: 'single' | 'batch' | 'code') => {
        set({ activeTab: tab });
      },
      
      toggleDarkMode: () => {
        set(state => ({ isDarkMode: !state.isDarkMode }));
      },
      
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
      
      // 设置操作
      setDefaultTimezone: (timezone: string) => {
        set({ defaultTimezone: timezone });
      },
      
      setShowRelativeTime: (show: boolean) => {
        set({ showRelativeTime: show });
      },
      
      setMaxHistoryItems: (max: number) => {
        set({ maxHistoryItems: Math.max(10, Math.min(100, max)) });
      },
      
      // 工具方法
      getCurrentTimestampForUnit: () => {
        const { currentUnit } = get();
        return getCurrentTimestamp(currentUnit);
      },
      
      getStats: () => {
        const { history } = get();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const todayConversions = history.filter(
          item => item.convertedAt >= today
        ).length;
        
        // 统计各单位使用频率
        const unitCounts = history.reduce((acc, item) => {
          acc[item.unit] = (acc[item.unit] || 0) + 1;
          return acc;
        }, {} as Record<TimestampUnit, number>);
        
        const popularUnits = Object.entries(unitCounts)
          .map(([unit, count]) => ({ unit: unit as TimestampUnit, count }))
          .sort((a, b) => b.count - a.count);
        
        return {
          totalConversions: history.length,
          todayConversions,
          popularUnits
        };
      }
    }),
    {
      name: 'timestamp-converter-storage',
      storage: createJSONStorage(() => localStorage),
      // 只持久化必要的数据
      partialize: (state) => ({
        history: state.history,
        isDarkMode: state.isDarkMode,
        defaultTimezone: state.defaultTimezone,
        showRelativeTime: state.showRelativeTime,
        maxHistoryItems: state.maxHistoryItems,
        currentUnit: state.currentUnit
      })
    }
  )
);

// 钩子函数，用于方便地访问特定状态
export const useCurrentConversion = () => {
  const store = useAppStore();
  return {
    input: store.currentInput,
    unit: store.currentUnit,
    result: store.currentResult,
    isLoading: store.isLoading,
    setInput: store.setInput,
    setUnit: store.setUnit,
    convert: store.convertSingle,
    clear: store.clearResult
  };
};

export const useBatchConversion = () => {
  const store = useAppStore();
  return {
    items: store.batchItems,
    result: store.batchResult,
    isLoading: store.isLoading,
    setItems: store.setBatchItems,
    addItem: store.addBatchItem,
    removeItem: store.removeBatchItem,
    convert: store.convertBatch,
    clear: store.clearBatch
  };
};

export const useConversionHistory = () => {
  const store = useAppStore();
  return {
    history: store.history,
    addToHistory: store.addToHistory,
    clearHistory: store.clearHistory,
    removeFromHistory: store.removeFromHistory
  };
};

export const useAppSettings = () => {
  const store = useAppStore();
  return {
    isDarkMode: store.isDarkMode,
    defaultTimezone: store.defaultTimezone,
    showRelativeTime: store.showRelativeTime,
    maxHistoryItems: store.maxHistoryItems,
    toggleDarkMode: store.toggleDarkMode,
    setDefaultTimezone: store.setDefaultTimezone,
    setShowRelativeTime: store.setShowRelativeTime,
    setMaxHistoryItems: store.setMaxHistoryItems
  };
};