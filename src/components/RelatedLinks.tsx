'use client';

import { motion } from 'framer-motion';
import { Clock, ArrowRight, TrendingUp, Star } from 'lucide-react';
import Link from 'next/link';

interface RelatedTool {
  name: string;
  href: string;
  description: string;
  keywords: string;
  isPopular?: boolean;
  isFeatured?: boolean;
}

interface RelatedLinksProps {
  currentPage: string;
  className?: string;
}

export function RelatedLinks({ currentPage, className = '' }: RelatedLinksProps) {
  // 所有工具配置
  const allTools: RelatedTool[] = [
    {
      name: 'Timestamp转换器',
      href: '/timestamp-converter',
      description: '功能最全面的时间戳转换工具，支持多种格式和批量处理',
      keywords: 'timestamp converter tool',
      isFeatured: true
    },
    {
      name: 'Unix时间戳转换',
      href: '/unix-timestamp-converter',
      description: '专业的Unix时间戳转换器，精确到毫秒级别',
      keywords: 'unix timestamp converter',
      isPopular: true
    },
    {
      name: 'Epoch转换器',
      href: '/epoch-converter',
      description: '高精度的Epoch时间转换，适用于系统开发',
      keywords: 'epoch time converter'
    },
    {
      name: '时间戳转日期',
      href: '/timestamp-to-date',
      description: '将时间戳快速转换为人类可读的日期格式',
      keywords: 'timestamp to date converter',
      isPopular: true
    },
    {
      name: '在线转换工具',
      href: '/online-timestamp-converter',
      description: '无需安装的在线时间戳转换，随时随地使用',
      keywords: 'online timestamp converter',
      isFeatured: true
    }
  ];

  // 根据当前页面获取相关工具（排除当前页面）
  const getRelatedTools = (current: string): RelatedTool[] => {
    const filtered = allTools.filter(tool => tool.href !== current);
    
    // 智能推荐算法：优先推荐热门和特色工具
    const sortedTools = filtered.sort((a, b) => {
      const scoreA = (a.isPopular ? 2 : 0) + (a.isFeatured ? 3 : 0);
      const scoreB = (b.isPopular ? 2 : 0) + (b.isFeatured ? 3 : 0);
      return scoreB - scoreA;
    });

    // 返回前3个相关工具
    return sortedTools.slice(0, 3);
  };

  const relatedTools = getRelatedTools(currentPage);

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 ${className}`}
    >
      {/* 标题区域 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5 text-blue-300" />
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold">相关转换工具</h3>
            <p className="text-blue-200 text-sm">发现更多时间戳转换解决方案</p>
          </div>
        </div>
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-blue-300 hover:text-white transition-colors duration-200 cursor-pointer text-sm font-medium flex items-center space-x-1"
          >
            <span>查看全部</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </Link>
      </div>

      {/* 相关工具列表 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedTools.map((tool, index) => (
          <Link key={tool.href} href={tool.href}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -2, scale: 1.02 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
            >
              {/* 工具标题和标签 */}
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-white font-medium text-sm group-hover:text-blue-200 transition-colors duration-200">
                  {tool.name}
                </h4>
                <div className="flex items-center space-x-1">
                  {tool.isPopular && (
                    <div className="flex items-center bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      热门
                    </div>
                  )}
                  {tool.isFeatured && (
                    <div className="flex items-center bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      推荐
                    </div>
                  )}
                </div>
              </div>

              {/* 工具描述 */}
              <p className="text-blue-200 text-xs leading-relaxed mb-3 group-hover:text-blue-100 transition-colors duration-200">
                {tool.description}
              </p>

              {/* 关键词标签 */}
              <div className="flex items-center justify-between">
                <span className="text-blue-300 text-xs opacity-60">
                  {tool.keywords}
                </span>
                <ArrowRight className="w-4 h-4 text-blue-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* SEO优化的"另请参阅"链接 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 pt-4 border-t border-white/10"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-blue-200 text-xs">另请参阅：</span>
          {relatedTools.slice(0, 2).map((tool, index) => (
            <span key={tool.href} className="flex items-center text-xs">
              <Link href={tool.href} className="text-blue-300 hover:text-white transition-colors duration-200">
                {tool.name}
              </Link>
              {index < 1 && <span className="text-blue-300 mx-2">•</span>}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// 页面级别的相关链接配置
export const pageRelatedLinks = {
  '/timestamp-converter': {
    primary: ['/unix-timestamp-converter', '/epoch-converter'],
    secondary: ['/timestamp-to-date', '/online-timestamp-converter']
  },
  '/unix-timestamp-converter': {
    primary: ['/timestamp-converter', '/epoch-converter'],
    secondary: ['/timestamp-to-date', '/online-timestamp-converter']
  },
  '/epoch-converter': {
    primary: ['/unix-timestamp-converter', '/timestamp-converter'],
    secondary: ['/timestamp-to-date', '/online-timestamp-converter']
  },
  '/timestamp-to-date': {
    primary: ['/timestamp-converter', '/unix-timestamp-converter'],
    secondary: ['/epoch-converter', '/online-timestamp-converter']
  },
  '/online-timestamp-converter': {
    primary: ['/timestamp-converter', '/unix-timestamp-converter'],
    secondary: ['/epoch-converter', '/timestamp-to-date']
  }
} as const;

// 生成内链的SEO结构化数据
export function generateRelatedLinksSchema(currentPage: string): object {
  const config = pageRelatedLinks[currentPage as keyof typeof pageRelatedLinks];
  if (!config) return {};

  const allTools = [
    { name: 'Timestamp转换器', href: '/timestamp-converter' },
    { name: 'Unix时间戳转换', href: '/unix-timestamp-converter' },
    { name: 'Epoch转换器', href: '/epoch-converter' },
    { name: '时间戳转日期', href: '/timestamp-to-date' },
    { name: '在线转换工具', href: '/online-timestamp-converter' }
  ];

  const relatedUrls = [...config.primary, ...config.secondary];
  
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "相关时间戳转换工具",
    "itemListElement": relatedUrls.map((url, index) => {
      const tool = allTools.find(t => t.href === url);
      return {
        "@type": "ListItem",
        "position": index + 1,
        "name": tool?.name || '',
        "url": url
      };
    })
  };
}