import '@testing-library/jest-dom'

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() { return null; }
  disconnect() { return null; }
  unobserve() { return null; }
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() { return null; }
  disconnect() { return null; }
  unobserve() { return null; }
};

// Mock PerformanceObserver for Core Web Vitals测试
global.PerformanceObserver = class PerformanceObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() { return null; }
  disconnect() { return null; }
  takeRecords() { return []; }
};

// Mock performance.getEntriesByType for性能测试
if (typeof global.performance === 'undefined') {
  global.performance = {
    getEntriesByType: jest.fn(() => [
      {
        loadEventEnd: 2000,
        fetchStart: 100,
        startTime: 1500
      }
    ]),
    now: jest.fn(() => Date.now()),
    timing: {
      loadEventEnd: 2000,
      navigationStart: 0
    }
  };
}

// Mock window.matchMedia for响应式测试
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock fetch for API测试
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({ success: true, result: '2021-01-01 00:00:00' }),
    headers: {
      get: jest.fn((header) => {
        if (header === 'content-type') return 'application/json';
        return null;
      })
    }
  })
);

// 全局测试工具函数
global.waitFor = (callback, timeout = 1000) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const checkCondition = () => {
      try {
        const result = callback();
        if (result) {
          resolve(result);
        } else if (Date.now() - startTime > timeout) {
          reject(new Error('Timeout waiting for condition'));
        } else {
          setTimeout(checkCondition, 10);
        }
      } catch (error) {
        if (Date.now() - startTime > timeout) {
          reject(error);
        } else {
          setTimeout(checkCondition, 10);
        }
      }
    };
    checkCondition();
  });
};

// SEO测试辅助函数
global.getSEOData = () => {
  return {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
    keywords: document.querySelector('meta[name="keywords"]')?.getAttribute('content'),
    ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
    ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute('content'),
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    h1Count: document.querySelectorAll('h1').length,
    h2Count: document.querySelectorAll('h2').length,
  };
};

// 性能测试辅助函数
global.measurePageLoad = () => {
  const perfEntries = performance.getEntriesByType('navigation');
  if (perfEntries.length > 0) {
    const entry = perfEntries[0];
    return {
      loadTime: entry.loadEventEnd - entry.fetchStart,
      domContentLoaded: entry.domContentLoadedEventEnd - entry.fetchStart,
      firstByte: entry.responseStart - entry.fetchStart
    };
  }
  return null;
};

// 可访问性测试辅助函数
global.checkAccessibility = (element) => {
  const issues = [];
  
  // 检查图片alt属性
  const images = element.querySelectorAll('img');
  images.forEach(img => {
    if (!img.getAttribute('alt')) {
      issues.push(`Image missing alt attribute: ${img.src}`);
    }
  });
  
  // 检查表单标签
  const inputs = element.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    const id = input.getAttribute('id');
    if (id && !element.querySelector(`label[for="${id}"]`)) {
      issues.push(`Input missing label: ${input.name || input.type}`);
    }
  });
  
  // 检查颜色对比度（简化版）
  const buttons = element.querySelectorAll('button, a');
  buttons.forEach(btn => {
    const styles = window.getComputedStyle(btn);
    const bgColor = styles.backgroundColor;
    const textColor = styles.color;
    if (bgColor === textColor) {
      issues.push(`Low contrast detected on element: ${btn.tagName}`);
    }
  });
  
  return issues;
};

// 移动端测试辅助函数
global.simulateMobileViewport = (width = 375, height = 667) => {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width });
  Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: height });
  window.dispatchEvent(new Event('resize'));
};

// 测试前重置
beforeEach(() => {
  // 重置所有mocks
  jest.clearAllMocks();
  
  // 重置DOM
  document.head.innerHTML = '';
  document.body.innerHTML = '';
  
  // 重置viewport
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
  Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 768 });
  
  // 重置localStorage
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();
});

// 测试后清理
afterEach(() => {
  // 清理任何全局状态
  if (global.gc) {
    global.gc();
  }
});