'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center space-x-2 text-sm ${className}`}
      aria-label="面包屑导航"
    >
      {/* 首页链接 */}
      <Link href="/">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center text-blue-200 hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span className="sr-only">首页</span>
        </motion.div>
      </Link>

      {/* 面包屑项目 */}
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          <ChevronRight className="w-4 h-4 text-blue-300 mx-1" />
          
          {item.current ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white font-medium"
              aria-current="page"
            >
              {item.name}
            </motion.span>
          ) : (
            <Link href={item.href}>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-blue-200 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {item.name}
              </motion.span>
            </Link>
          )}
        </div>
      ))}
    </motion.nav>
  );
}

// 预设的面包屑路径配置
export const breadcrumbPaths = {
  '/timestamp-converter': [
    { name: 'Timestamp转换器', href: '/timestamp-converter', current: true }
  ],
  '/unix-timestamp-converter': [
    { name: 'Unix时间戳转换', href: '/unix-timestamp-converter', current: true }
  ],
  '/epoch-converter': [
    { name: 'Epoch转换器', href: '/epoch-converter', current: true }
  ],
  '/timestamp-to-date': [
    { name: '时间戳转日期', href: '/timestamp-to-date', current: true }
  ],
  '/online-timestamp-converter': [
    { name: '在线转换工具', href: '/online-timestamp-converter', current: true }
  ]
} as const;

// 生成面包屑的工具函数
export function generateBreadcrumb(pathname: string): BreadcrumbItem[] {
  const path = breadcrumbPaths[pathname as keyof typeof breadcrumbPaths];
  return path ? [...path] : [];
}

// 用于SEO的结构化数据生成函数
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "首页",
        "item": "/"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.name,
        "item": item.href
      }))
    ]
  };
}