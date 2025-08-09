'use client';

import React, { useState, useEffect } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}

export function AnimatedSection({ children, delay = 0, className = '', id }: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [motion, setMotion] = useState<typeof import('framer-motion').motion | null>(null);

  useEffect(() => {
    // 动态导入 framer-motion
    import('framer-motion').then((framerMotion) => {
      setMotion(framerMotion.motion);
    });

    // 延迟显示动画
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // 为LCP优化：如果没有延迟或framer-motion未加载，立即显示内容
  if (!motion || delay === 0) {
    return (
      <div 
        id={id}
        className={`transition-all duration-600 ${isVisible || delay === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}
        style={{ transitionDelay: delay === 0 ? '0ms' : `${delay}ms` }}
      >
        {children}
      </div>
    );
  }

  const MotionDiv = motion.div;

  return (
    <MotionDiv
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className={className}
    >
      {children}
    </MotionDiv>
  );
}