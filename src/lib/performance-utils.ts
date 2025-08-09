// 性能优化工具函数

// 防抖函数 - 优化用户输入性能
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    const callNow = immediate && !timeout;
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
}

// 节流函数 - 优化滚动和resize事件
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// requestAnimationFrame优化的函数执行
export function rafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    if (rafId !== null) {
      return;
    }
    
    rafId = requestAnimationFrame(() => {
      func(...args);
      rafId = null;
    });
  };
}

// 优化的事件监听器管理
export class EventManager {
  private listeners = new Map<string, Set<EventListener>>();
  
  addEventListener(
    element: EventTarget,
    event: string,
    listener: EventListener,
    options?: AddEventListenerOptions
  ) {
    element.addEventListener(event, listener, { passive: true, ...options });
    
    const key = `${event}-${element.constructor.name}`;
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key)!.add(listener);
  }
  
  removeEventListener(
    element: EventTarget,
    event: string,
    listener: EventListener
  ) {
    element.removeEventListener(event, listener);
    
    const key = `${event}-${element.constructor.name}`;
    if (this.listeners.has(key)) {
      this.listeners.get(key)!.delete(listener);
    }
  }
  
  removeAllListeners() {
    this.listeners.clear();
  }
}

// 批量DOM更新优化
export function batchDOMUpdates(updates: () => void) {
  requestAnimationFrame(() => {
    updates();
  });
}

// 图片懒加载优化
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };
  
  return new IntersectionObserver(callback, defaultOptions);
}

// Web Worker 工厂函数
export function createWorker(workerFunction: Function): Worker {
  const workerBlob = new Blob([`(${workerFunction.toString()})()`], {
    type: 'application/javascript',
  });
  return new Worker(URL.createObjectURL(workerBlob));
}

// 性能监控工具
export class PerformanceMonitor {
  private metrics = new Map<string, number[]>();
  
  mark(name: string) {
    performance.mark(name);
  }
  
  measure(name: string, startMark: string, endMark?: string) {
    performance.measure(name, startMark, endMark);
    const measure = performance.getEntriesByName(name, 'measure')[0];
    
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(measure.duration);
    
    return measure.duration;
  }
  
  getAverage(name: string): number {
    const values = this.metrics.get(name);
    if (!values || values.length === 0) return 0;
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }
  
  clear() {
    performance.clearMarks();
    performance.clearMeasures();
    this.metrics.clear();
  }
}

// Core Web Vitals 监控
export function observeWebVitals(callback: (metric: any) => void) {
  if (typeof window === 'undefined') return;
  
  // LCP 监控
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    callback({
      name: 'LCP',
      value: lastEntry.startTime,
      entries,
    });
  }).observe({ type: 'largest-contentful-paint', buffered: true });
  
  // FID 监控 (替代 INP)
  new PerformanceObserver((list) => {
    list.getEntries().forEach((entry: any) => {
      callback({
        name: 'FID',
        value: entry.processingStart - entry.startTime,
        entry,
      });
    });
  }).observe({ type: 'first-input', buffered: true });
  
  // CLS 监控
  new PerformanceObserver((list) => {
    let clsValue = 0;
    list.getEntries().forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    });
    callback({
      name: 'CLS',
      value: clsValue,
    });
  }).observe({ type: 'layout-shift', buffered: true });
}

// 资源预加载优化
export function preloadResource(href: string, as: string, crossorigin?: string) {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (crossorigin) link.crossOrigin = crossorigin;
  
  document.head.appendChild(link);
}

// DNS预取优化
export function prefetchDNS(hostname: string) {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = hostname;
  
  document.head.appendChild(link);
}