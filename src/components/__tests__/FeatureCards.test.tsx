import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeatureCards from '../FeatureCards';
import { useAppStore } from '@/lib/store';

// Mock useAppStore
jest.mock('@/lib/store');
const mockUseAppStore = useAppStore as jest.MockedFunction<typeof useAppStore>;

// Mock scrollIntoView
Object.defineProperty(window, 'Element', {
  writable: true,
  value: class MockElement {
    scrollIntoView = jest.fn();
  }
});

// Mock querySelector
Object.defineProperty(document, 'querySelector', {
  writable: true,
  value: jest.fn()
});

describe('FeatureCards Navigation', () => {
  const mockSetActiveTab = jest.fn();
  
  beforeEach(() => {
    mockUseAppStore.mockReturnValue({
      activeTab: 'single',
      setActiveTab: mockSetActiveTab,
      isDarkMode: false,
      // Add other required store properties
      currentInput: '',
      currentUnit: 'seconds',
      currentResult: null,
      history: [],
      batchItems: [],
      batchResult: null,
      isLoading: false,
      defaultTimezone: 'UTC',
      showRelativeTime: true,
      maxHistoryItems: 50,
      // Mock functions
      setInput: jest.fn(),
      setUnit: jest.fn(),
      convertSingle: jest.fn(),
      clearResult: jest.fn(),
      setBatchItems: jest.fn(),
      addBatchItem: jest.fn(),
      removeBatchItem: jest.fn(),
      convertBatch: jest.fn(),
      clearBatch: jest.fn(),
      addToHistory: jest.fn(),
      clearHistory: jest.fn(),
      removeFromHistory: jest.fn(),
      toggleDarkMode: jest.fn(),
      setLoading: jest.fn(),
      setDefaultTimezone: jest.fn(),
      setShowRelativeTime: jest.fn(),
      setMaxHistoryItems: jest.fn(),
      getCurrentTimestampForUnit: jest.fn(),
      getStats: jest.fn()
    });

    jest.clearAllMocks();
  });

  test('should render all feature cards with correct titles', () => {
    render(<FeatureCards />);
    
    expect(screen.getByText('Batch Conversion')).toBeInTheDocument();
    expect(screen.getByText('Timezone Support')).toBeInTheDocument();
    expect(screen.getByText('Code Examples')).toBeInTheDocument();
    expect(screen.getByText('Lightning Fast')).toBeInTheDocument();
    expect(screen.getByText('Conversion History')).toBeInTheDocument();
    expect(screen.getByText('Export Options')).toBeInTheDocument();
  });

  test('should switch to batch tab when clicking Batch Conversion card', () => {
    render(<FeatureCards />);
    
    const batchCard = screen.getByText('Batch Conversion').closest('div[role="button"]') || 
                      screen.getByText('Batch Conversion').closest('.cursor-pointer');
    
    expect(batchCard).toBeInTheDocument();
    
    fireEvent.click(batchCard!);
    
    expect(mockSetActiveTab).toHaveBeenCalledWith('batch');
  });

  test('should switch to history tab when clicking Conversion History card', () => {
    render(<FeatureCards />);
    
    const historyCard = screen.getByText('Conversion History').closest('div[role="button"]') || 
                        screen.getByText('Conversion History').closest('.cursor-pointer');
    
    expect(historyCard).toBeInTheDocument();
    
    fireEvent.click(historyCard!);
    
    expect(mockSetActiveTab).toHaveBeenCalledWith('code'); // Note: history tab is mapped to 'code'
  });

  test('should scroll to code examples section when clicking Code Examples card', () => {
    const mockElement = {
      scrollIntoView: jest.fn()
    };
    
    (document.querySelector as jest.Mock).mockReturnValue(mockElement);
    
    render(<FeatureCards />);
    
    const codeCard = screen.getByText('Code Examples').closest('div[role="button"]') || 
                     screen.getByText('Code Examples').closest('.cursor-pointer');
    
    expect(codeCard).toBeInTheDocument();
    
    fireEvent.click(codeCard!);
    
    expect(document.querySelector).toHaveBeenCalledWith('#examples');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  test('should scroll to timezone section when clicking Timezone Support card', () => {
    const mockElement = {
      scrollIntoView: jest.fn()
    };
    
    (document.querySelector as jest.Mock).mockReturnValue(mockElement);
    
    render(<FeatureCards />);
    
    const timezoneCard = screen.getByText('Timezone Support').closest('div[role="button"]') || 
                         screen.getByText('Timezone Support').closest('.cursor-pointer');
    
    expect(timezoneCard).toBeInTheDocument();
    
    fireEvent.click(timezoneCard!);
    
    expect(document.querySelector).toHaveBeenCalledWith('#timezones');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  test('should scroll to performance section when clicking Lightning Fast card', () => {
    const mockElement = {
      scrollIntoView: jest.fn()
    };
    
    (document.querySelector as jest.Mock).mockReturnValue(mockElement);
    
    render(<FeatureCards />);
    
    const performanceCard = screen.getByText('Lightning Fast').closest('div[role="button"]') || 
                           screen.getByText('Lightning Fast').closest('.cursor-pointer');
    
    expect(performanceCard).toBeInTheDocument();
    
    fireEvent.click(performanceCard!);
    
    expect(document.querySelector).toHaveBeenCalledWith('#performance');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  test('should scroll to export section when clicking Export Options card', () => {
    const mockElement = {
      scrollIntoView: jest.fn()
    };
    
    (document.querySelector as jest.Mock).mockReturnValue(mockElement);
    
    render(<FeatureCards />);
    
    const exportCard = screen.getByText('Export Options').closest('div[role="button"]') || 
                       screen.getByText('Export Options').closest('.cursor-pointer');
    
    expect(exportCard).toBeInTheDocument();
    
    fireEvent.click(exportCard!);
    
    expect(document.querySelector).toHaveBeenCalledWith('#export');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  test('should handle missing target elements gracefully', () => {
    (document.querySelector as jest.Mock).mockReturnValue(null);
    
    render(<FeatureCards />);
    
    const codeCard = screen.getByText('Code Examples').closest('div[role="button"]') || 
                     screen.getByText('Code Examples').closest('.cursor-pointer');
    
    expect(() => {
      fireEvent.click(codeCard!);
    }).not.toThrow();
    
    expect(document.querySelector).toHaveBeenCalledWith('#examples');
  });
});